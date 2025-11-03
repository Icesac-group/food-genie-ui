import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SubscriptionPlan = "weekly" | "monthly" | null;

interface SubscriptionData {
  // Step 1: Plan
  selectedPlan: SubscriptionPlan;
  planPrice: number;

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

  // Actions
  setSelectedPlan: (plan: SubscriptionPlan, price: number) => void;
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
      // Initial state
      currentStep: 1,
      isSubscribed: false,
      selectedPlan: null,
      planPrice: 0,
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

      // Actions
      setSelectedPlan: (plan, price) => {
        set({ selectedPlan: plan, planPrice: price });
      },

      setRegistrationData: (data) => {
        set(data);
      },

      setDeliveryAddress: (address) => {
        set({ deliveryAddress: address });
      },

      setPaymentData: (data) => {
        set({ ...data, paymentMethod: "card" });
      },

      goToStep: (step) => {
        set({ currentStep: step });
      },

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 4) {
          set({ currentStep: currentStep + 1 });
        }
      },

      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      completeSubscription: () => {
        set({ isSubscribed: true });
      },

      resetSubscription: () => {
        set({
          currentStep: 1,
          isSubscribed: false,
          selectedPlan: null,
          planPrice: 0,
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
        });
      },
    }),
    {
      name: "subscription-storage",
    }
  )
);
