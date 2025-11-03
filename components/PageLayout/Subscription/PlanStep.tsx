"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/subscriptionStore";

const plans = [
  {
    id: "weekly",
    name: "Weekly Plan",
    price: 45,
    period: "per week",
    icon: "🥘",
    description:
      "Perfect if you want to try us out or prefer weekly flexibility",
    features: [
      "5 fresh meals delivered weekly",
      "Chef-curated recipes",
      "Premium ingredients",
      "Premium ingredients",
      "Cancel anytime",
    ],
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: 45,
    period: "per month",
    icon: "📅",
    description:
      "Perfect if you want to try us out or prefer weekly flexibility",
    features: [
      "5 fresh meals delivered weekly",
      "Chef-curated recipes",
      "Premium ingredients",
      "Premium ingredients",
      "Cancel anytime",
    ],
    badge: "Most Popular",
  },
];

const PlanStep = () => {
  const router = useRouter();

  // Get all store values and functions at once
  const selectedPlan = useSubscriptionStore((state) => state.selectedPlan);
  const setSelectedPlan = useSubscriptionStore(
    (state) => state.setSelectedPlan
  );
  const nextStep = useSubscriptionStore((state) => state.nextStep);

  const [localSelectedPlan, setLocalSelectedPlan] = useState<string | null>(
    selectedPlan
  );

  const handleSelectPlan = (planId: string, price: number) => {
    setLocalSelectedPlan(planId);
    setSelectedPlan(planId as "weekly" | "monthly", price);
  };

  const handleContinue = () => {
    if (localSelectedPlan) {
      nextStep();
    }
  };

  return (
    <div className="p-6 md:p-12">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
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
          Choose Your Meal Plan
        </h1>
        <p className="font-campton text-[#868686] text-sm max-w-2xl mx-auto">
          Select the perfect plan for delicious, ready-to-eat meals at your
          doorstep
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handleSelectPlan(plan.id, plan.price)}
            className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all ${
              localSelectedPlan === plan.id
                ? "border-[#FF7C36] bg-[#FFF9F0]"
                : "border-[#E0E0E0] hover:border-[#FF7C36]"
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#FF7C36] text-white font-campton text-xs px-4 py-1 rounded-full">
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-[#FFE5D0] flex items-center justify-center text-3xl">
                {plan.icon}
              </div>
            </div>

            {/* Plan Details */}
            <div className="text-center mb-4">
              <h3 className="font-recoleta text-[#222021] text-xl mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="font-recoleta text-[#222021] text-3xl font-bold">
                  ${plan.price}
                </span>
                <span className="font-campton text-[#868686] text-sm">
                  {plan.period}
                </span>
              </div>
              <p className="font-campton text-[#868686] text-sm">
                {plan.description}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 font-campton text-[#868686] text-sm"
                >
                  <Check className="w-4 h-4 text-[#FF7C36] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Select Button */}
            <Button
              className={`w-full font-campton ${
                localSelectedPlan === plan.id
                  ? "bg-[#FF7C36] text-white hover:bg-[#FF6B1F]"
                  : "bg-white text-[#FF7C36] border-1 border-[#FF7C36] hover:bg-[#FFF9F0]"
              }`}
            >
              {localSelectedPlan === plan.id ? "Selected" : "Select Plan"}
            </Button>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <Button
          onClick={handleContinue}
          disabled={!localSelectedPlan}
          className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton px-12 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Registration
        </Button>
      </div>
    </div>
  );
};

export default PlanStep;
