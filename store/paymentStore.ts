import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CardInfo {
  id: string;
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  country: string;
  isDefault: boolean;
}

interface PaymentStore {
  cards: CardInfo[];
  selectedPaymentMethod: "cash" | "card";
  needsCutlery: boolean;
  phoneNumber: string;
  addCard: (card: Omit<CardInfo, "id">) => void;
  removeCard: (cardId: string) => void;
  setDefaultCard: (cardId: string) => void;
  getDefaultCard: () => CardInfo | null;
  setPaymentMethod: (method: "cash" | "card") => void;
  setNeedsCutlery: (needs: boolean) => void;
  setPhoneNumber: (phone: string) => void;
}

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set, get) => ({
      cards: [],
      selectedPaymentMethod: "cash",
      needsCutlery: false,
      phoneNumber: "",

      addCard: (card) => {
        set((state) => {
          const newCard: CardInfo = {
            ...card,
            id: `card-${Date.now()}`,
          };

          // If this is the first card or it's set as default, make all others non-default
          if (card.isDefault || state.cards.length === 0) {
            return {
              cards: [
                ...state.cards.map((c) => ({ ...c, isDefault: false })),
                { ...newCard, isDefault: true },
              ],
            };
          }

          return {
            cards: [...state.cards, newCard],
          };
        });
      },

      removeCard: (cardId) => {
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== cardId),
        }));
      },

      setDefaultCard: (cardId) => {
        set((state) => ({
          cards: state.cards.map((card) => ({
            ...card,
            isDefault: card.id === cardId,
          })),
        }));
      },

      getDefaultCard: () => {
        const state = get();
        return state.cards.find((card) => card.isDefault) || null;
      },

      setPaymentMethod: (method) => {
        set({ selectedPaymentMethod: method });
      },

      setNeedsCutlery: (needs) => {
        set({ needsCutlery: needs });
      },

      setPhoneNumber: (phone) => {
        set({ phoneNumber: phone });
      },
    }),
    {
      name: "payment-storage",
    }
  )
);
