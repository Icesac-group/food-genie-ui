import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DeliveryConfig {
  freeDeliveryEnabled: boolean;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number; // in cents
}

interface DeliveryConfigStore extends DeliveryConfig {
  setFreeDeliveryEnabled: (enabled: boolean) => void;
  setFreeDeliveryThreshold: (threshold: number) => void;
  setStandardDeliveryFee: (fee: number) => void;
  getDeliveryFee: (mealsCount: number) => number;
  isFreeDelivery: (mealsCount: number) => boolean;
  mealsUntilFreeDelivery: (mealsCount: number) => number;
}

export const useDeliveryConfigStore = create<DeliveryConfigStore>()(
  persist(
    (set, get) => ({
      freeDeliveryEnabled: true,
      freeDeliveryThreshold: 5,
      standardDeliveryFee: 399, // $3.99

      setFreeDeliveryEnabled: (enabled) => set({ freeDeliveryEnabled: enabled }),
      setFreeDeliveryThreshold: (threshold) =>
        set({ freeDeliveryThreshold: Math.max(1, threshold) }),
      setStandardDeliveryFee: (fee) =>
        set({ standardDeliveryFee: Math.max(0, fee) }),

      getDeliveryFee: (mealsCount) => {
        const { freeDeliveryEnabled, freeDeliveryThreshold, standardDeliveryFee } = get();
        if (freeDeliveryEnabled && mealsCount >= freeDeliveryThreshold) return 0;
        return standardDeliveryFee;
      },

      isFreeDelivery: (mealsCount) => {
        const { freeDeliveryEnabled, freeDeliveryThreshold } = get();
        return freeDeliveryEnabled && mealsCount >= freeDeliveryThreshold;
      },

      mealsUntilFreeDelivery: (mealsCount) => {
        const { freeDeliveryEnabled, freeDeliveryThreshold } = get();
        if (!freeDeliveryEnabled) return 0;
        return Math.max(0, freeDeliveryThreshold - mealsCount);
      },
    }),
    { name: "delivery-config-storage" }
  )
);
