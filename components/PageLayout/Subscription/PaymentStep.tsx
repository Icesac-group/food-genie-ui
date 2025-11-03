"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Lock } from "lucide-react";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentStep = () => {
  const router = useRouter();
  const previousStep = useSubscriptionStore((state) => state.previousStep);
  const selectedPlan = useSubscriptionStore((state) => state.selectedPlan);
  const planPrice = useSubscriptionStore((state) => state.planPrice);
  const setPaymentData = useSubscriptionStore((state) => state.setPaymentData);
  const completeSubscription = useSubscriptionStore(
    (state) => state.completeSubscription
  );

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate prices
  const subtotal = planPrice;
  const delivery = 4.0;
  const tax = 4.0;
  const total = subtotal + delivery + tax;

  // Get first delivery date (next Monday)
  const getFirstDeliveryDate = () => {
    const today = new Date();
    const daysUntilMonday = (8 - today.getDay()) % 7 || 7;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    return nextMonday.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 3);
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (
      !formData.cardNumber ||
      formData.cardNumber.replace(/\s/g, "").length !== 16
    ) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    if (!formData.expiryDate || formData.expiryDate.length !== 5) {
      newErrors.expiryDate = "Please enter a valid expiry date";
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Please enter cardholder name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompletePayment = () => {
    if (validateForm()) {
      setPaymentData(formData);
      completeSubscription();

      toast.success("Payment successful!");

      // Navigate to success page after a short delay
      setTimeout(() => {
        router.push("/subscribe/success");
      }, 1000);
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  return (
    <div className="p-6 md:p-12">
      {/* Back Button */}
      <button
        onClick={previousStep}
        className="flex items-center gap-2 text-[#868686] hover:text-[#FF7C36] transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-campton text-sm">Back</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-calligraffitti text-[#FF7C36] text-lg mb-2">
          One Meal at a Time!
        </p>
        <h1 className="font-recoleta text-[#222021] text-3xl md:text-4xl mb-3">
          Make Your Payment
        </h1>
        <p className="font-campton text-[#868686] text-sm">
          Secure checkout to start your meal subscription
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Side - Payment Form */}
        <div className="border border-[#E0E0E0] rounded-2xl p-6">
          <h3 className="font-campton text-[#222021] text-lg font-semibold mb-2">
            Payment Method
          </h3>
          <p className="font-campton text-[#868686] text-sm mb-6">
            Choose how you'd like to pay
          </p>

          {/* Payment Method Radio */}
          <RadioGroup value="card" className="mb-6">
            <div className="flex items-center space-x-2 p-3 border border-[#FF7C36] rounded-lg bg-[#FFF9F0]">
              <RadioGroupItem value="card" id="card" />
              <Label
                htmlFor="card"
                className="font-campton text-[#222021] text-sm cursor-pointer flex-1"
              >
                Credit/Debit Card
              </Label>
            </div>
          </RadioGroup>

          {/* Card Form */}
          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <Label className="font-campton text-[#868686] text-sm mb-2 block">
                Card Number
              </Label>
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) =>
                  handleInputChange("cardNumber", e.target.value)
                }
                className={`font-campton ${
                  errors.cardNumber ? "border-red-500" : ""
                }`}
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1 font-campton">
                  {errors.cardNumber}
                </p>
              )}
            </div>

            {/* Expiry Date and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Expiry Date
                </Label>
                <Input
                  type="text"
                  placeholder="MM/YYYY"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    handleInputChange("expiryDate", e.target.value)
                  }
                  className={`font-campton ${
                    errors.expiryDate ? "border-red-500" : ""
                  }`}
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.expiryDate}
                  </p>
                )}
              </div>

              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  CVV
                </Label>
                <Input
                  type="text"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  className={`font-campton ${
                    errors.cvv ? "border-red-500" : ""
                  }`}
                  maxLength={3}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <Label className="font-campton text-[#868686] text-sm mb-2 block">
                Card Holder Name
              </Label>
              <Input
                type="text"
                placeholder="Joe Doe"
                value={formData.cardholderName}
                onChange={(e) =>
                  handleInputChange("cardholderName", e.target.value)
                }
                className={`font-campton ${
                  errors.cardholderName ? "border-red-500" : ""
                }`}
              />
              {errors.cardholderName && (
                <p className="text-red-500 text-xs mt-1 font-campton">
                  {errors.cardholderName}
                </p>
              )}
            </div>

            {/* Complete Payment Button */}
            <Button
              onClick={handleCompletePayment}
              className="w-full bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton py-6 text-base mt-4"
            >
              Complete Payment - ${total.toFixed(2)}
            </Button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-[#868686] text-xs font-campton mt-4">
              <Lock className="w-3 h-3" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>

        {/* Right Side - Plan Summary */}
        <div className="border border-[#E0E0E0] rounded-2xl p-6">
          <h3 className="font-campton text-[#222021] text-lg font-semibold mb-6">
            Plan Summary
          </h3>
          <p className="font-campton text-[#868686] text-sm mb-4">
            Review your subscription details
          </p>

          {/* Plan Details */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-campton text-[#222021] text-sm">
                {selectedPlan === "weekly" ? "Weekly Plan" : "Monthly Plan"}
              </span>
              <span className="font-campton text-[#222021] text-sm font-semibold">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-campton text-[#222021] text-sm">
                Delivery
              </span>
              <span className="font-campton text-[#222021] text-sm font-semibold">
                ${delivery.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-campton text-[#222021] text-sm">Tax</span>
              <span className="font-campton text-[#222021] text-sm font-semibold">
                ${tax.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-[#E0E0E0] pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-recoleta text-[#222021] text-xl font-bold">
                Total
              </span>
              <span className="font-recoleta text-[#222021] text-2xl font-bold">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-[#F5F5F5] rounded-lg p-4">
            <h4 className="font-campton text-[#222021] text-sm font-semibold mb-3">
              Delivery Details
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-campton text-[#868686] text-xs">
                  First delivery:
                </span>
                <span className="font-campton text-[#222021] text-xs font-medium">
                  {getFirstDeliveryDate()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-campton text-[#868686] text-xs">
                  Billing cycle:
                </span>
                <span className="font-campton text-[#222021] text-xs font-medium">
                  {selectedPlan === "weekly" ? "Weekly" : "Monthly"}
                </span>
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="mt-6 space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-[#FFE5D0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#FF7C36] text-xs">✓</span>
              </div>
              <p className="font-campton text-[#868686] text-xs">
                Cancel or pause anytime
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-[#FFE5D0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#FF7C36] text-xs">✓</span>
              </div>
              <p className="font-campton text-[#868686] text-xs">
                Skip a week if needed
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-[#FFE5D0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#FF7C36] text-xs">✓</span>
              </div>
              <p className="font-campton text-[#868686] text-xs">
                Free delivery on all orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
