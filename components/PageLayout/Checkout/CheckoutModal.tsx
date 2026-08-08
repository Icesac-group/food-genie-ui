"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { X, Pencil, Trash2 } from "lucide-react";
import { useMealsStore } from "@/store/mealsStore";
import { useDeliveryStore } from "@/store/deliveryStore";
import { usePaymentStore } from "@/store/paymentStore";
import CardModal from "./CardModal";
import { toast } from "sonner";
import { PhoneInput } from "@/components/ui/phone-input";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutModal = ({ open, onOpenChange }: CheckoutModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedPreferences, setEditedPreferences] = useState("");

  const cart = useMealsStore((state) => state.cart);
  const updateCartItemQuantity = useMealsStore(
    (state) => state.updateCartItemQuantity
  );
  const removeFromCart = useMealsStore((state) => state.removeFromCart);
  const updateCartItemPreferences = useMealsStore(
    (state) => state.updateCartItemPreferences
  );
  const getCartSubtotal = useMealsStore((state) => state.getCartSubtotal);
  const getDeliveryFee = useMealsStore((state) => state.getDeliveryFee);
  const getCartTotal = useMealsStore((state) => state.getCartTotal);

  const getSelectedAddress = useDeliveryStore(
    (state) => state.getSelectedAddress
  );

  const {
    selectedPaymentMethod,
    needsCutlery,
    phoneNumber,
    setPaymentMethod,
    setNeedsCutlery,
    setPhoneNumber,
    getDefaultCard,
  } = usePaymentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedAddress = mounted ? getSelectedAddress() : null;
  const defaultCard = mounted ? getDefaultCard() : null;

  const subtotal = getCartSubtotal() / 100;
  const deliveryFee = getDeliveryFee() / 100;
  const total = getCartTotal() / 100; // already includes delivery fee

  // Filter items with preferences - MOVED BEFORE useEffect
  const itemsWithPreferences = cart.filter(
    (item) => item.preferences && item.preferences.trim() !== ""
  );

  // Debug logging - MOVED AFTER itemsWithPreferences is defined
  useEffect(() => {
    console.log("Cart items:", cart);
    console.log("Items with preferences:", itemsWithPreferences);
  }, [cart, itemsWithPreferences]);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as "cash" | "card");
    if (value === "card" && !defaultCard) {
      setCardModalOpen(true);
    }
  };

  const handleEditPreferences = (
    itemId: string,
    currentPreferences: string
  ) => {
    setEditingItemId(itemId);
    setEditedPreferences(currentPreferences);
  };

  const handleSavePreferences = () => {
    if (editingItemId) {
      updateCartItemPreferences(editingItemId, editedPreferences);
      toast.success("Preferences updated");
      setEditingItemId(null);
      setEditedPreferences("");
    }
  };

  const handleRemovePreferences = (itemId: string) => {
    updateCartItemPreferences(itemId, undefined);
    toast.success("Preferences removed");
  };

  const handlePlaceOrder = () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    if (selectedPaymentMethod === "card" && !defaultCard) {
      toast.error("Please add a payment card");
      setCardModalOpen(true);
      return;
    }

    console.log("Order placed:", {
      cart,
      address: selectedAddress,
      paymentMethod: selectedPaymentMethod,
      needsCutlery,
      phoneNumber,
      total,
    });

    toast.success("Order placed successfully!");
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 gap-0">
          <DialogHeader className="p-6 pb-4 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="font-campton text-[#868686] text-base font-normal">
                Order summary
              </DialogTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="text-[#868686] hover:text-[#222021]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogHeader>

          <div className="p-6 space-y-6">
            {/* Order Preferences Section */}
            {itemsWithPreferences.length > 0 && (
              <div className="space-y-4">
                {itemsWithPreferences.map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#E0E0E0] rounded-lg p-4"
                  >
                    <div className="mb-3">
                      <p className="font-campton text-[#868686] text-sm mb-3">
                        We'll prepare this meal with your special requests:
                      </p>

                      {editingItemId === item.id ? (
                        <div>
                          <Textarea
                            value={editedPreferences}
                            onChange={(e) =>
                              setEditedPreferences(e.target.value)
                            }
                            rows={4}
                            className="w-full mb-2 font-campton text-[#868686] text-sm"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSavePreferences}
                              className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton"
                              size="sm"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingItemId(null)}
                              variant="outline"
                              className="font-campton"
                              size="sm"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-[#E8E8E8] rounded-lg p-4 relative">
                          <button
                            onClick={() =>
                              handleEditPreferences(item.id, item.preferences!)
                            }
                            className="absolute top-3 right-3 text-[#FF7C36] hover:text-[#FF6B1F]"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <div className="space-y-1 pr-8">
                            {typeof item.preferences === "string"
                              ? item.preferences
                                  .split("\n")
                                  .map((pref, idx) => (
                                    <p
                                      key={idx}
                                      className="font-campton text-[#868686] text-sm"
                                    >
                                      {pref}
                                    </p>
                                  ))
                              : null}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Need Cutlery */}
            <div className="border border-[#E0E0E0] rounded-lg p-4">
              <h3 className="font-campton text-[#222021] text-base font-semibold mb-2">
                Need cutlery?
              </h3>
              <p className="font-campton text-[#868686] text-sm mb-3">
                Help us minimize waste. Only ask for cutlery when you need it.
              </p>
              <RadioGroup
                value={needsCutlery ? "yes" : "no"}
                onValueChange={(value) => setNeedsCutlery(value === "yes")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="cutlery-yes" />
                  <Label
                    htmlFor="cutlery-yes"
                    className="font-campton text-[#222021] text-sm cursor-pointer"
                  >
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="cutlery-no" />
                  <Label
                    htmlFor="cutlery-no"
                    className="font-campton text-[#222021] text-sm cursor-pointer"
                  >
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Delivery Address */}
            {mounted && selectedAddress && (
              <div className="border border-[#E0E0E0] rounded-lg p-4">
                <h3 className="font-campton text-[#222021] text-base font-semibold mb-3">
                  Delivery address
                </h3>
                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-campton text-[#868686] text-sm">
                      Map View
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-[#FF7C36] mt-0.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 0C5.243 0 3 2.243 3 5c0 4.5 5 11 5 11s5-6.5 5-11c0-2.757-2.243-5-5-5zm0 7.5c-1.381 0-2.5-1.119-2.5-2.5S6.619 2.5 8 2.5s2.5 1.119 2.5 2.5S9.381 7.5 8 7.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-campton text-[#222021] text-sm font-medium">
                      {selectedAddress.apartmentUnit},{" "}
                      {selectedAddress.buildingName}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Phone Number */}
            <div className="border border-[#E0E0E0] rounded-lg p-4">
              <Label className="font-campton text-[#222021] text-base font-semibold mb-3 block">
                Add your phone number
              </Label>
              <PhoneInput
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
              />
            </div>

            {/* Payment Method */}
            <div className="border border-[#E0E0E0] rounded-lg p-4">
              <h3 className="font-campton text-[#222021] text-base font-semibold mb-2">
                Payment method
              </h3>
              <p className="font-campton text-[#868686] text-sm mb-3">
                Choose your preferred payment method
              </p>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={handlePaymentMethodChange}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="payment-cash" />
                  <Label
                    htmlFor="payment-cash"
                    className="font-campton text-[#222021] text-sm cursor-pointer"
                  >
                    Cash
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="payment-card" />
                  <Label
                    htmlFor="payment-card"
                    className="font-campton text-[#222021] text-sm cursor-pointer"
                  >
                    Card
                  </Label>
                </div>
              </RadioGroup>

              {selectedPaymentMethod === "card" && defaultCard && (
                <div className="mt-3 p-3 bg-[#F5F5F5] rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-campton text-[#222021] text-sm font-medium">
                      •••• •••• •••• {defaultCard.cardNumber.slice(-4)}
                    </p>
                    <p className="font-campton text-[#868686] text-xs">
                      {defaultCard.nameOnCard}
                    </p>
                  </div>
                  <button
                    onClick={() => setCardModalOpen(true)}
                    className="text-[#FF7C36] hover:text-[#FF6B1F] text-sm font-campton"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="border border-[#E0E0E0] rounded-lg p-4">
              <h3 className="font-campton text-[#222021] text-base font-semibold mb-4">
                Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-campton text-[#222021] text-sm">
                    Meals
                  </span>
                  <span className="font-campton text-[#222021] text-sm">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-campton text-[#222021] text-sm">
                    Delivery Fee
                  </span>
                  <span className="font-campton text-[#222021] text-sm">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#E0E0E0] mt-4 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-recoleta text-[#222021] text-xl font-bold">
                    Total
                  </span>
                  <span className="font-recoleta text-[#222021] text-xl font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button className="font-campton text-[#868686] text-xs hover:text-[#FF7C36] flex items-center gap-1">
                  ⓘ Fees Information
                </button>
              </div>
            </div>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              className="w-full bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton py-6 text-base rounded-md"
              size="sm"
            >
              Pay To Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Card Modal */}
      <CardModal open={cardModalOpen} onOpenChange={setCardModalOpen} />
    </>
  );
};

export default CheckoutModal;
