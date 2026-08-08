import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Meal } from "@/lib/data/mealsData";
import { useDeliveryConfigStore } from "./deliveryConfigStore";

export interface SelectedMealItem {
  meal: Meal;
  quantity: number;
}

export interface WeekOption {
  label: string;          // e.g. "This Week  (Aug 5 – Aug 11)"
  startDate: string;      // ISO — Monday of the delivery week
  endDate: string;        // ISO — Sunday of the delivery week
  orderCloseDate: string; // ISO — Thursday 11:59 pm of the PREVIOUS week (orders close)
  deliveryDays: string;   // e.g. "Monday & Thursday"
  weekOf: string;         // e.g. "August 5"
  isClosed: boolean;      // true when current time is past orderCloseDate
}

/** Returns the current week + next 3 weeks as selectable options */
export function getWeekOptions(): WeekOption[] {
  const options: WeekOption[] = [];
  const today = new Date();

  // Snap to Monday of the current week
  const dow = today.getDay(); // 0 = Sun
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const fmtLong = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  const fmtClose = (d: Date) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  for (let i = 0; i < 4; i++) {
    const start = new Date(monday);
    start.setDate(monday.getDate() + i * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    // Orders close the Thursday before the delivery week at 11:59 pm
    const closeDate = new Date(start);
    closeDate.setDate(start.getDate() - 4); // Thursday of previous week
    closeDate.setHours(23, 59, 59, 999);

    const isClosed = today > closeDate;

    const prefix =
      i === 0 ? "This Week" : i === 1 ? "Next Week" : `Week ${i + 1}`;

    options.push({
      label: `${prefix}  (${fmt(start)} – ${fmt(end)})`,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      orderCloseDate: closeDate.toISOString(),
      deliveryDays: "Monday & Thursday",
      weekOf: fmtLong(start),
      isClosed,
    });
  }
  return options;
}

/**
 * Order type — "one-time" is the default for the current implementation.
 * "recurring" is reserved for future weekly repeat functionality.
 * Adding it to the store now means the UI toggle can be wired up later
 * without any structural store changes.
 */
export type OrderType = "one-time" | "recurring";

interface SubscriptionData {
  // Step 1: Week + Meal selection
  selectedWeek: WeekOption | null;
  selectedMeals: SelectedMealItem[];

  /**
   * Order type — always "one-time" for now.
   * Reserved for future "Repeat this order every week" toggle.
   */
  orderType: OrderType;

  // Step 2: Register
  email: string;
  phoneNumber: string;
  password: string;
  agreedToTerms: boolean;

  // Step 3: Address
  deliveryAddress: string;

  // Step 4: Payment
  paymentMethod: "card" | null;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface SubscriptionStore extends SubscriptionData {
  currentStep: number;
  isSubscribed: boolean;

  // Week
  setSelectedWeek: (week: WeekOption) => void;

  // Order type (reserved for future recurring order toggle)
  setOrderType: (type: OrderType) => void;

  // Meal selection
  addMeal: (meal: Meal) => void;
  removeMeal: (mealId: string) => void;
  updateMealQuantity: (mealId: string, quantity: number) => void;
  clearMeals: () => void;

  // Computed helpers — prices in cents, matching API
  getMealsSubtotal: () => number;
  getMealsCount: () => number;
  getDeliveryFee: () => number;
  getOrderTotal: () => number;

  // Step navigation
  setRegistrationData: (data: {
    email: string;
    phoneNumber: string;
    password: string;
    agreedToTerms: boolean;
  }) => void;
  setDeliveryAddress: (address: string) => void;
  setPaymentData: (data: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  }) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeSubscription: () => void;
  resetSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      isSubscribed: false,
      selectedWeek: null,
      selectedMeals: [],
      orderType: "one-time", // default — "recurring" available for future use
      email: "",
      phoneNumber: "",
      password: "",
      agreedToTerms: false,
      deliveryAddress: "",
      paymentMethod: null,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",

      // Changing the week clears meal selections so totals don't bleed across weeks
      setSelectedWeek: (week) => set({ selectedWeek: week, selectedMeals: [] }),

      setOrderType: (type) => set({ orderType: type }),

      addMeal: (meal) =>
        set((state) => {
          const existing = state.selectedMeals.find(
            (item) => item.meal._id === meal._id
          );
          if (existing) {
            return {
              selectedMeals: state.selectedMeals.map((item) =>
                item.meal._id === meal._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            selectedMeals: [...state.selectedMeals, { meal, quantity: 1 }],
          };
        }),

      removeMeal: (mealId) =>
        set((state) => ({
          selectedMeals: state.selectedMeals.filter(
            (item) => item.meal._id !== mealId
          ),
        })),

      updateMealQuantity: (mealId, quantity) => {
        if (quantity <= 0) {
          get().removeMeal(mealId);
          return;
        }
        set((state) => ({
          selectedMeals: state.selectedMeals.map((item) =>
            item.meal._id === mealId ? { ...item, quantity } : item
          ),
        }));
      },

      clearMeals: () => set({ selectedMeals: [] }),

      getMealsSubtotal: () =>
        get().selectedMeals.reduce(
          (total, item) => total + item.meal.price * item.quantity,
          0
        ),

      getMealsCount: () =>
        get().selectedMeals.reduce((count, item) => count + item.quantity, 0),

      /**
       * Delegates to deliveryConfigStore so the admin toggle and threshold
       * are the single source of truth. Uses getState() to avoid hook rules.
       */
      getDeliveryFee: () => {
        const mealsCount = get().selectedMeals.reduce(
          (count, item) => count + item.quantity,
          0
        );
        return useDeliveryConfigStore.getState().getDeliveryFee(mealsCount);
      },

      getOrderTotal: () => get().getMealsSubtotal() + get().getDeliveryFee(),

      setRegistrationData: (data) => set(data),
      setDeliveryAddress: (address) => set({ deliveryAddress: address }),
      setPaymentData: (data) => set({ ...data, paymentMethod: "card" }),
      goToStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 4) set({ currentStep: currentStep + 1 });
      },

      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) set({ currentStep: currentStep - 1 });
      },

      completeSubscription: () => set({ isSubscribed: true }),

      resetSubscription: () =>
        set({
          currentStep: 1,
          isSubscribed: false,
          selectedWeek: null,
          selectedMeals: [],
          orderType: "one-time",
          email: "",
          phoneNumber: "",
          password: "",
          agreedToTerms: false,
          deliveryAddress: "",
          paymentMethod: null,
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          cardholderName: "",
        }),
    }),
    { name: "subscription-storage" }
  )
);
