"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Lock, Truck, Store, MapPin, Clock } from "lucide-react";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useDeliveryConfigStore } from "@/store/deliveryConfigStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentStep = () => {
  const router = useRouter();

  const previousStep              = useSubscriptionStore((s) => s.previousStep);
  const selectedMeals             = useSubscriptionStore((s) => s.selectedMeals);
  const getMealsSubtotal          = useSubscriptionStore((s) => s.getMealsSubtotal);
  const getDeliveryFee            = useSubscriptionStore((s) => s.getDeliveryFee);
  const getOrderTotal             = useSubscriptionStore((s) => s.getOrderTotal);
  const getMealsCount             = useSubscriptionStore((s) => s.getMealsCount);
  const setPaymentData            = useSubscriptionStore((s) => s.setPaymentData);
  const completeSubscription      = useSubscriptionStore((s) => s.completeSubscription);
  const fulfillmentMethod         = useSubscriptionStore((s) => s.fulfillmentMethod);
  const selectedPickupLocationId  = useSubscriptionStore((s) => s.selectedPickupLocationId);

  const isFreeDeliveryFn          = useDeliveryConfigStore((s) => s.isFreeDelivery);
  const pickupLocations           = useDeliveryConfigStore((s) => s.pickupLocations);

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal   = getMealsSubtotal() / 100;
  const fee        = getDeliveryFee() / 100;   // 0 for pickup, or 0 if free delivery threshold met
  const total      = getOrderTotal() / 100;
  const mealsCount = getMealsCount();

  const isPickup       = fulfillmentMethod === "pickup";
  const feeIsFree      = isPickup || isFreeDeliveryFn(mealsCount);
  const selectedPickup = pickupLocations.find((l) => l.id === selectedPickupLocationId);

  const getFirstDeliveryDate = () => {
    const today = new Date();
    const daysUntilMonday = (8 - today.getDay()) % 7 || 7;
    const next = new Date(today);
    next.setDate(today.getDate() + daysUntilMonday);
    return next.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const formatCardNumber = (v: string) =>
    (v.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ") || v.replace(/\s/g, "")).substring(0, 19);

  const formatExpiryDate = (v: string) => {
    const c = v.replace(/\D/g, "");
    return c.length >= 2 ? `${c.substring(0, 2)}/${c.substring(2, 4)}` : c;
  };

  const handleInputChange = (field: string, value: string) => {
    let f = value;
    if (field === "cardNumber") f = formatCardNumber(value);
    else if (field === "expiryDate") f = formatExpiryDate(value);
    else if (field === "cvv") f = value.replace(/\D/g, "").substring(0, 3);
    setFormData((prev) => ({ ...prev, [field]: f }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length !== 16)
      e.cardNumber = "Please enter a valid 16-digit card number";
    if (!formData.expiryDate || formData.expiryDate.length !== 5)
      e.expiryDate = "Please enter a valid expiry date (MM/YY)";
    if (!formData.cvv || formData.cvv.length !== 3)
      e.cvv = "Please enter a valid 3-digit CVV";
    if (!formData.cardholderName.trim())
      e.cardholderName = "Please enter the cardholder name";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCompletePayment = () => {
    if (!validateForm()) { toast.error("Please fix the errors in the form"); return; }
    setPaymentData(formData);
    completeSubscription();
    toast.success("Payment successful!");
    setTimeout(() => router.push("/home"), 1500);
  };

  return (
    <div className="p-6 md:p-12">
      {/* Back */}
      <button onClick={previousStep} className="flex items-center gap-2 text-[#868686] hover:text-[#FF7C36] active:text-[#FF6B1F] transition-colors mb-6 min-h-[44px]">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-campton text-sm">Back</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-calligraffitti text-[#FF7C36] text-lg mb-2">Almost there!</p>
        <h1 className="font-recoleta text-[#222021] text-3xl md:text-4xl mb-3">Make Your Payment</h1>
        <p className="font-campton text-[#868686] text-sm">
          Secure checkout for your {mealsCount} selected {mealsCount === 1 ? "meal" : "meals"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* ── Payment Form ── */}
        <div className="border border-[#E0E0E0] rounded-2xl p-6">
          <h3 className="font-campton text-[#222021] text-lg font-semibold mb-2">Payment Method</h3>
          <p className="font-campton text-[#868686] text-sm mb-6">Choose how you'd like to pay</p>

          <RadioGroup value="card" className="mb-6">
            <div className="flex items-center space-x-2 p-3 border border-[#FF7C36] rounded-lg bg-[#FFF9F0]">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="font-campton text-[#222021] text-sm cursor-pointer flex-1">
                Credit / Debit Card
              </Label>
            </div>
          </RadioGroup>

          <div className="space-y-4">
            <div>
              <Label className="font-campton text-[#868686] text-sm mb-2 block">Card Number</Label>
              <Input type="text" placeholder="1234 5678 9012 3456" value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                className={`font-campton ${errors.cardNumber ? "border-red-500" : ""}`} maxLength={19} />
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1 font-campton">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">Expiry Date</Label>
                <Input type="text" placeholder="MM/YY" value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  className={`font-campton ${errors.expiryDate ? "border-red-500" : ""}`} maxLength={5} />
                {errors.expiryDate && <p className="text-red-500 text-xs mt-1 font-campton">{errors.expiryDate}</p>}
              </div>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">CVV</Label>
                <Input type="text" placeholder="123" value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  className={`font-campton ${errors.cvv ? "border-red-500" : ""}`} maxLength={3} />
                {errors.cvv && <p className="text-red-500 text-xs mt-1 font-campton">{errors.cvv}</p>}
              </div>
            </div>

            <div>
              <Label className="font-campton text-[#868686] text-sm mb-2 block">Cardholder Name</Label>
              <Input type="text" placeholder="Jane Doe" value={formData.cardholderName}
                onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                className={`font-campton ${errors.cardholderName ? "border-red-500" : ""}`} />
              {errors.cardholderName && <p className="text-red-500 text-xs mt-1 font-campton">{errors.cardholderName}</p>}
            </div>

            <Button onClick={handleCompletePayment} className="w-full bg-[#FF7C36] hover:bg-[#FF6B1F] active:bg-[#FF5500] text-white font-campton py-6 text-base mt-4">
              Pay ${total.toFixed(2)}
              {isPickup ? " (Pickup — no delivery fee)" : feeIsFree ? " (Free delivery applied)" : ""}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[#868686] text-xs font-campton">
              <Lock className="w-3 h-3" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>

        {/* ── Order Summary ── */}
        <div className="border border-[#E0E0E0] rounded-2xl p-6">
          <h3 className="font-campton text-[#222021] text-lg font-semibold mb-1">Order Summary</h3>
          <p className="font-campton text-[#868686] text-sm mb-6">
            {mealsCount} {mealsCount === 1 ? "meal" : "meals"} selected
          </p>

          {/* Fulfillment badge */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-5 ${isPickup ? "bg-blue-50 border border-blue-200" : "bg-[#FFF9F0] border border-[#FFD4B3]"}`}>
            {isPickup
              ? <Store className="w-4 h-4 text-blue-500 flex-shrink-0" />
              : <Truck className="w-4 h-4 text-[#FF7C36] flex-shrink-0" />
            }
            <span className={`font-campton text-xs font-medium ${isPickup ? "text-blue-600" : "text-[#FF7C36]"}`}>
              {isPickup ? "Pickup order" : "Delivery order"}
            </span>
          </div>

          {/* Meal line items */}
          <div className="space-y-3 mb-6 max-h-44 overflow-y-auto pr-1">
            {selectedMeals.map((item) => (
              <div key={item.meal._id} className="flex justify-between items-center">
                <div>
                  <p className="font-campton text-[#222021] text-sm truncate max-w-[180px]">{item.meal.name}</p>
                  <p className="font-campton text-[#9B9B9B] text-xs">{item.quantity} × ${(item.meal.price / 100).toFixed(2)}</p>
                </div>
                <span className="font-campton text-[#222021] text-sm font-semibold">
                  ${((item.meal.price * item.quantity) / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-3 mb-4 border-t border-[#F0F0F0] pt-4">
            <div className="flex justify-between">
              <span className="font-campton text-[#222021] text-sm">Food Subtotal</span>
              <span className="font-campton text-[#222021] text-sm">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-campton text-[#222021] text-sm">
                {isPickup ? "Pickup" : "Delivery"}
              </span>
              {feeIsFree ? (
                <span className="font-campton text-green-600 text-sm font-semibold">
                  {isPickup ? "FREE 🛍️" : "FREE 🎉"}
                </span>
              ) : (
                <span className="font-campton text-[#222021] text-sm">${fee.toFixed(2)}</span>
              )}
            </div>

            {/* Confirmation banners */}
            {isPickup && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                <p className="font-campton text-blue-700 text-xs font-medium">
                  🛍️ No delivery fee — you've chosen pickup!
                </p>
              </div>
            )}
            {!isPickup && feeIsFree && (
              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <p className="font-campton text-green-700 text-xs font-medium">
                  🎉 Free delivery applied to your order!
                </p>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="border-t border-[#E0E0E0] pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-recoleta text-[#222021] text-xl font-bold">Total</span>
              <span className="font-recoleta text-[#FF7C36] text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
            {feeIsFree && (
              <p className="font-campton text-green-600 text-xs mt-1">
                {isPickup ? "Includes free pickup" : "Includes FREE delivery"}
              </p>
            )}
          </div>

          {/* Fulfillment details */}
          <div className="bg-[#F9F9F9] rounded-lg p-4">
            <h4 className="font-campton text-[#222021] text-sm font-semibold mb-3">
              {isPickup ? "Pickup Details" : "Delivery Details"}
            </h4>

            {isPickup && selectedPickup ? (
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Store className="w-3.5 h-3.5 text-[#868686] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-campton text-[#222021] text-xs font-medium">{selectedPickup.name}</p>
                    <p className="font-campton text-[#868686] text-xs">{selectedPickup.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#868686] flex-shrink-0 mt-0.5" />
                  <p className="font-campton text-[#868686] text-xs">{selectedPickup.pickupDays}</p>
                </div>
                {selectedPickup.instructions && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#868686] flex-shrink-0 mt-0.5" />
                    <p className="font-campton text-[#868686] text-xs">{selectedPickup.instructions}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-campton text-[#868686] text-xs">First delivery</span>
                  <span className="font-campton text-[#222021] text-xs font-medium">{getFirstDeliveryDate()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-campton text-[#868686] text-xs">Billing</span>
                  <span className="font-campton text-[#222021] text-xs font-medium">Pay per order</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
