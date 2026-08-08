"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { images } from "@/public/images/images";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2, ChevronDown, Pencil } from "lucide-react";
import { useMealsStore } from "@/store/mealsStore";
import { useDeliveryStore } from "@/store/deliveryStore";
import DeliveryAddressModal from "@/components/PageLayout/WeeklyMenu/Modal/DeliveryAddressModal";
import CheckoutModal from "@/components/PageLayout/Checkout/CheckoutModal";
import { toast } from "sonner";

interface OrderSummaryProps {
  showCheckoutButton?: boolean;
}

const OrderSummary = ({ showCheckoutButton = true }: OrderSummaryProps) => {
  const { FoodMenu } = images();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);

  const cart = useMealsStore((state) => state.cart);
  const removeFromCart = useMealsStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useMealsStore(
    (state) => state.updateCartItemQuantity
  );
  const getCartSubtotal = useMealsStore((state) => state.getCartSubtotal);
  const getDeliveryFee = useMealsStore((state) => state.getDeliveryFee);
  const getCartTotal = useMealsStore((state) => state.getCartTotal);

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const getSelectedAddress = useDeliveryStore(
    (state) => state.getSelectedAddress
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedAddress = mounted ? getSelectedAddress() : null;
  const hasAddress = !!selectedAddress;

  const subtotal = getCartSubtotal() / 100;
  const deliveryFee = getDeliveryFee() / 100;
  const total = getCartTotal() / 100;

  const handleQuantityChange = (
    cartItemId: string,
    action: "increase" | "decrease",
    currentQuantity: number
  ) => {
    if (action === "increase") {
      updateCartItemQuantity(cartItemId, currentQuantity + 1);
    } else if (action === "decrease") {
      // At qty 1, decrease removes the item entirely — no predefined minimum
      updateCartItemQuantity(cartItemId, currentQuantity - 1);
    }
  };

  const handleOpenModal = (editing: boolean) => {
    setIsEditing(editing);
    setModalOpen(true);
  };

  const handleCheckout = () => {
    if (!hasAddress) {
      // alert("Please add a delivery address before checkout");
      toast.error("Please add a delivery address before checkout");
      setModalOpen(true);
      return;
    }
    if (cart.length === 0) {
      // alert("Your cart is empty");
      toast.error("Your cart is empty");
      return;
    }
    setCheckoutModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg sticky top-8">
        <h3 className="font-recoleta text-[#222021] text-2xl font-normal mb-6">
          Order Summary
        </h3>

        {cart.length === 0 ? (
          <p className="font-campton text-[#9B9B9B] text-sm mb-6">
            When you add meals, they will appear here
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="mb-6 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-[#FFEBC233] p-2">
                  {item.preferences && (
                    <button className="text-[#868686] font-campton text-sm mb-2 hover:text-[#FF7C36] flex items-center gap-1">
                      ⓘ View Customized order
                    </button>
                  )}

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      {/* <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={FoodMenu}
                          alt={item.meal.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div> */}
                      <div className="flex-1">
                        <p className="font-recoleta text-[#222021] text-base font-medium mb-1">
                          {item.meal.name}
                        </p>
                        <p className="font-campton text-[#4A4A4A] text-sm font-normal">
                          ${(item.meal.price / 100).toFixed(2)} per plate
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#FF7C36] hover:text-[#FF6B1F]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            "decrease",
                            item.quantity
                          )
                        }
                        className="w-6 h-6 rounded-sm bg-[#FFE5D0] flex items-center justify-center hover:bg-[#FFD4B3] transition-colors"
                        aria-label={item.quantity === 1 ? "Remove item" : "Decrease quantity"}
                      >
                        <Minus className="w-3 h-3 text-[#FF7C36]" />
                      </button>
                      <span className="font-campton text-base font-medium min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            "increase",
                            item.quantity
                          )
                        }
                        className="w-6 h-6 rounded-sm bg-[#FFE5D0] flex items-center justify-center hover:bg-[#FFD4B3] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 text-[#FF7C36]" />
                      </button>
                    </div>
                    <p className="font-campton text-[#222021] text-sm font-semibold">
                      $ {((item.meal.price * item.quantity) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="space-y-2 mb-2">
              <div className="flex justify-between">
                <span className="font-campton text-[#222021] text-sm">
                  Subtotal
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

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-recoleta text-[#222021] text-lg font-bold">
                  Total
                </span>
                <span className="font-recoleta text-[#222021] text-lg font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button className="font-campton text-[#868686] text-xs hover:text-[#FF7C36] flex items-center gap-1">
                ⓘ Fees Information
              </button>
            </div>

            {/* Checkout Button */}
            {showCheckoutButton && (
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton py-6 mb-6 text-sm"
                size="sm"
              >
                Pay & Checkout
              </Button>
            )}
          </>
        )}

        {/* Delivery Address */}
        {mounted && (
          <div>
            <button
              onClick={() => setShowAddressDetails(!showAddressDetails)}
              className="w-full flex items-center justify-between"
            >
              <span className="font-campton text-[#222021] text-sm font-semibold">
                Delivery Address
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#868686] transition-transform ${
                  showAddressDetails ? "rotate-180" : ""
                }`}
              />
            </button>

            {showAddressDetails && (
              <div className="mt-3 p-4 border border-gray-200 rounded-lg">
                {hasAddress ? (
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-campton text-[#222021] text-sm font-semibold mb-1">
                          {selectedAddress.apartmentType}
                        </p>
                        <p className="font-campton text-[#868686] text-xs">
                          {selectedAddress.apartmentUnit},{" "}
                          {selectedAddress.buildingName}
                        </p>
                        <p className="font-campton text-[#868686] text-xs">
                          Buzzer: {selectedAddress.buzzerCode}
                        </p>
                      </div>
                      <button
                        onClick={() => handleOpenModal(true)}
                        className="text-[#FF7C36] hover:text-[#FF6B1F]"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleOpenModal(false)}
                      className="text-[#FF7C36] font-campton text-xs hover:underline"
                    >
                      + Add another address
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="font-campton text-[#868686] text-sm mb-3">
                      No delivery address added
                    </p>
                    <Button
                      onClick={() => handleOpenModal(false)}
                      className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton"
                      size="sm"
                    >
                      Add Address
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delivery Address Modal */}
      <DeliveryAddressModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        isEditing={isEditing}
      />

      <CheckoutModal
        open={checkoutModalOpen}
        onOpenChange={setCheckoutModalOpen}
      />
    </>
  );
};

export default OrderSummary;
