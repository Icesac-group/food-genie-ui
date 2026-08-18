import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  instructions: string;
  pickupDays: string;   // e.g. "Monday & Thursday, 12pm – 6pm"
  active: boolean;
}

export interface DeliveryConfig {
  freeDeliveryEnabled: boolean;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number; // cents
  pickupEnabled: boolean;
  pickupLocations: PickupLocation[];
}

interface DeliveryConfigStore extends DeliveryConfig {
  // Delivery fee actions
  setFreeDeliveryEnabled: (enabled: boolean) => void;
  setFreeDeliveryThreshold: (threshold: number) => void;
  setStandardDeliveryFee: (fee: number) => void;

  // Pickup actions
  setPickupEnabled: (enabled: boolean) => void;
  addPickupLocation: (location: Omit<PickupLocation, "id">) => void;
  updatePickupLocation: (id: string, updates: Partial<Omit<PickupLocation, "id">>) => void;
  removePickupLocation: (id: string) => void;

  // Computed helpers
  getDeliveryFee: (mealsCount: number) => number;
  isFreeDelivery: (mealsCount: number) => boolean;
  mealsUntilFreeDelivery: (mealsCount: number) => number;
  getActivePickupLocations: () => PickupLocation[];
}

const DEFAULT_PICKUP_LOCATIONS: PickupLocation[] = [
  {
    id: "pickup-1",
    name: "FoodGenie HQ",
    address: "123 Main Street, Toronto, ON M5V 1A1",
    instructions: "Ring the buzzer at the front entrance. Bring your order confirmation.",
    pickupDays: "Monday & Thursday, 12pm – 6pm",
    active: true,
  },
];

export const useDeliveryConfigStore = create<DeliveryConfigStore>()(
  persist(
    (set, get) => ({
      freeDeliveryEnabled: true,
      freeDeliveryThreshold: 5,
      standardDeliveryFee: 399,
      pickupEnabled: true,
      pickupLocations: DEFAULT_PICKUP_LOCATIONS,

      setFreeDeliveryEnabled: (enabled) => set({ freeDeliveryEnabled: enabled }),
      setFreeDeliveryThreshold: (threshold) =>
        set({ freeDeliveryThreshold: Math.max(1, threshold) }),
      setStandardDeliveryFee: (fee) =>
        set({ standardDeliveryFee: Math.max(0, fee) }),

      setPickupEnabled: (enabled) => set({ pickupEnabled: enabled }),

      addPickupLocation: (location) =>
        set((state) => ({
          pickupLocations: [
            ...state.pickupLocations,
            { ...location, id: `pickup-${Date.now()}` },
          ],
        })),

      updatePickupLocation: (id, updates) =>
        set((state) => ({
          pickupLocations: state.pickupLocations.map((loc) =>
            loc.id === id ? { ...loc, ...updates } : loc
          ),
        })),

      removePickupLocation: (id) =>
        set((state) => ({
          pickupLocations: state.pickupLocations.filter((loc) => loc.id !== id),
        })),

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

      getActivePickupLocations: () =>
        get().pickupLocations.filter((loc) => loc.active),
    }),
    { name: "delivery-config-storage" }
  )
);
