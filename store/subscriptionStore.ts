import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Meal } from "@/lib/data/mealsData";
import { useDeliveryConfigStore } from "./deliveryConfigStore";

export interface SelectedMealItem {
  meal: Meal;
  quantity: number;
}

export interface WeekOption {
  label: string;
  startDate: string;
  endDate: string;
  orderCloseDate: string;
  deliveryDays: string;
  weekOf: string;
  isClosed: boolean;
}

export type OrderType = "one-time" | "recurring";

export function getWeekOptions(): WeekOption[] {
  const options: WeekOption[] = [];
  const today = new Date();

  const dow = today.getDay();
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const fmtLong = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  for (let i = 0; i < 4; i++) {
    const start = new Date(monday);
    start.setDate(monday.getDate() + i * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const closeDate = new Date(start);
    closeDate.setDate(start.getDate() - 4);
    closeDate.setHours(23, 59, 59, 999);

    const isClosed = today > closeDate;
    const prefix = i === 0 ? "This Week" : i === 1 ? "Next Week" : `Week ${i + 1}`;

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

interface SubscriptionData {
  selectedWeek: WeekOption | null;
  selectedMeals: SelectedMealItem[];
  orderType: OrderType;
  email: string;
  phoneNumber: string;
  password: string;
  agreedToTerms: boolean;
  deliveryAddress: string;
  paymentMethod: "card" | null;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface SubscriptionStore extends SubscriptionData {
  currentStep: number;
  isSubscribed: boolean;

  setSelectedWeek: (week: WeekOption) => void;
  setOrderType: (type: OrderType) => void;

  addMeal: (meal: Meal) => void;
  removeMeal: (mealId: string) => void;
  updateMealQuantity: (mealId: string, quantity: number) => void;
  clearMeals: () => void;

  getMealsSubtotal: () => number;
  getMealsCount: () => number;
  getDeliveryFee: () => number;
  getOrderTotal: () => number;

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

      setSelectedWeek: (week) => set({ selectedWeek: week, selectedMeals: [] }),
      setOrderType: (type) => set({ orderType: type }),

      addMeal: (meal) =>
        set((state) => {
          const existing = state.selectedMeals.find((item) => item.meal._id === meal._id);
          if (existing) {
            return {
              selectedMeals: state.selectedMeals.map((item) =>
                item.meal._id === meal._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { selectedMeals: [...state.selectedMeals, { meal, quantity: 1 }] };
        }),

      removeMeal: (mealId) =>
        set((state) => ({
          selectedMeals: state.selectedMeals.filter((item) => item.meal._id !== mealId),
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
