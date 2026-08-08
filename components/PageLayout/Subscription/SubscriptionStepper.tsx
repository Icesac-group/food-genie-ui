"use client";
import React from "react";
import { Check } from "lucide-react";
import { useSubscriptionStore } from "@/store/subscriptionStore";

const steps = [
  { number: 1, label: "Meals" },
  { number: 2, label: "Register" },
  { number: 3, label: "Address" },
  { number: 4, label: "Payment" },
];

const SubscriptionStepper = () => {
  const currentStep = useSubscriptionStore((state) => state.currentStep);

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center gap-2">
            {/* Step Circle */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                step.number < currentStep
                  ? "bg-[#FF7C36] text-white"
                  : step.number === currentStep
                  ? "bg-[#FF7C36] text-white"
                  : "bg-white border-2 border-[#E0E0E0] text-[#868686]"
              }`}
            >
              {step.number < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="font-campton font-semibold">
                  {step.number}
                </span>
              )}
            </div>

            {/* Step Label */}
            <span
              className={`font-campton text-sm ${
                step.number <= currentStep
                  ? "text-[#222021] font-medium"
                  : "text-[#868686]"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-12 md:w-24 transition-all ${
                step.number < currentStep ? "bg-[#FF7C36]" : "bg-[#E0E0E0]"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SubscriptionStepper;
