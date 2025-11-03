import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DropoffOption {
  id: string;
  option: string;
  instructions: string;
  photo?: string;
}

export interface DeliveryAddress {
  id: string;
  apartmentType: string;
  apartmentUnit: string;
  buildingName: string;
  buzzerCode: string;
  dropoffOptions: DropoffOption[];
  createdAt: Date;
}

interface DeliveryStore {
  addresses: DeliveryAddress[];
  selectedAddressId: string | null;
  addAddress: (address: Omit<DeliveryAddress, "id" | "createdAt">) => void;
  updateAddress: (id: string, address: Partial<DeliveryAddress>) => void;
  deleteAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  getSelectedAddress: () => DeliveryAddress | null;
}

export const useDeliveryStore = create<DeliveryStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,

      addAddress: (address) => {
        const newAddress: DeliveryAddress = {
          ...address,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        set((state) => ({
          addresses: [...state.addresses, newAddress],
          selectedAddressId: newAddress.id,
        }));
      },

      updateAddress: (id, updatedFields) => {
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...updatedFields } : addr
          ),
        }));
      },

      deleteAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((addr) => addr.id !== id),
          selectedAddressId:
            state.selectedAddressId === id ? null : state.selectedAddressId,
        }));
      },

      selectAddress: (id) => {
        set({ selectedAddressId: id });
      },

      getSelectedAddress: () => {
        const state = get();
        return (
          state.addresses.find((addr) => addr.id === state.selectedAddressId) ||
          null
        );
      },
    }),
    {
      name: "delivery-storage",
    }
  )
);
