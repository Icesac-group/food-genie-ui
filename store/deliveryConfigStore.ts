import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Admin-configurable free delivery settings.
 *
 * These values are persisted in localStorage so admin changes survive
 * page refreshes. When a real backend admin API is available, this store
 * should be seeded from that API on app load instead.
 */

export interface DeliveryConfig {
  /** Whether the free-delivery promotion is active */
  freeDeliveryEnabled: boolean;

  /**
   * Minimum total meal quantity (sum of all quantities, not distinct items)
   * required to qualify for free delivery.
   */
  freeDeliveryThreshold: number;

  /** Standard delivery fee in cents when free delivery doesn't apply */
  standardDeliveryFee: number;
}

interface DeliveryConfigStore extends DeliveryConfig {
  // Admin actions
  setFreeDeliveryEnabled: (enabled: boolean) => void;
  setFreeDeliveryThreshold: (threshold: number) => void;
  setStandardDeliveryFee: (fee: number) => void;

  /**
   * Returns the delivery fee in cents for a given order.
   * Pass the total meal count (sum of quantities) — NOT the number of
   * distinct meal types.
   *
   * Returns 0 when freeDeliveryEnabled is true AND mealsCount >= threshold.
   */
  getDeliveryFee: (mealsCount: number) => number;

  /**
   * True when free delivery is enabled AND mealsCount >= threshold.
   */
  isFreeDelivery: (mealsCount: number) => boolean;

  /**
   * How many more meals the customer needs to add to unlock free delivery.
   * Returns 0 if already eligible or feature is disabled.
   */
  mealsUntilFreeDelivery: (mealsCount: number) => number;
}

export const useDeliveryConfigStore = create<DeliveryConfigStore>()(
  persist(
    (set, get) => ({
      // Default config — admin can change these from the dashboard
      freeDeliveryEnabled: true,
      freeDeliveryThreshold: 5,
      standardDeliveryFee: 399, // $3.99 in cents

      setFreeDeliveryEnabled: (enabled) =>
        set({ freeDeliveryEnabled: enabled }),

      setFreeDeliveryThreshold: (threshold) =>
        set({ freeDeliveryThreshold: Math.max(1, threshold) }),

      setStandardDeliveryFee: (fee) =>
        set({ standardDeliveryFee: Math.max(0, fee) }),

      getDeliveryFee: (mealsCount) => {
        const { freeDeliveryEnabled, freeDeliveryThreshold, standardDeliveryFee } = get();
        if (freeDeliveryEnabled && mealsCount >= freeDeliveryThreshold) {
          return 0;
        }
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
