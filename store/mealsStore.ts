import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Meal } from "@/lib/data/mealsData";

export type FulfillmentMethod = "delivery" | "pickup";

export interface CartItem {
  meal: Meal;
  quantity: number;
  preferences?: string;
  id: string;
}

interface MealsStore {
  cart: CartItem[];
  fulfillmentMethod: FulfillmentMethod;
  setFulfillmentMethod: (method: FulfillmentMethod) => void;
  addToCart: (meal: Meal, quantity: number, preferences?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => void;
  updateCartItemPreferences: (cartItemId: string, preferences?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getCartItemsCount: () => number;
  getDeliveryFee: () => number;
}

export const useMealsStore = create<MealsStore>()(
  persist(
    (set, get) => ({
      cart: [],
      fulfillmentMethod: "delivery" as FulfillmentMethod,

      setFulfillmentMethod: (method) => set({ fulfillmentMethod: method }),

      addToCart: (meal, quantity, preferences) => {
        set((state) => {
          // Add new item with preferences
          const newItem: CartItem = {
            meal,
            quantity,
            preferences: preferences || undefined, // Ensure it's stored
            id: `${meal._id}-${Date.now()}`,
          };

          return {
            cart: [...state.cart, newItem],
          };
        });
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== cartItemId),
        }));
      },

      updateCartItemQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          // Remove item rather than setting quantity to 0 or negative
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== cartItemId),
          }));
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },

      updateCartItemPreferences: (cartItemId, preferences) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId ? { ...item, preferences } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getCartSubtotal: () => {
        const state = get();
        return state.cart.reduce(
          (total, item) => total + item.meal.price * item.quantity,
          0
        );
      },

      getDeliveryFee: () => {
        if (get().fulfillmentMethod === "pickup") return 0;
        return 399; // $3.99 in cents
      },

      getCartTotal: () => {
        const state = get();
        return state.getCartSubtotal() + state.getDeliveryFee();
      },

      getCartItemsCount: () => {
        const state = get();
        return state.cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
