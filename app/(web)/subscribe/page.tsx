"use client";
import React from "react";
import Image from "next/image";
import { images } from "@/public/images/images";
import SubscriptionStepper from "@/components/PageLayout/Subscription/SubscriptionStepper";
import MealSelectionStep from "@/components/PageLayout/Subscription/MealSelectionStep";
import RegisterStep from "@/components/PageLayout/Subscription/RegisterStep";
import AddressStep from "@/components/PageLayout/Subscription/AddressStep";
import PaymentStep from "@/components/PageLayout/Subscription/PaymentStep";
import { useSubscriptionStore } from "@/store/subscriptionStore";

const SubscribePage = () => {
  const { FoodMenu } = images();
  const currentStep = useSubscriptionStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <MealSelectionStep />;
      case 2:
        return <RegisterStep />;
      case 3:
        return <AddressStep />;
      case 4:
        return <PaymentStep />;
      default:
        return <MealSelectionStep />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] relative">
      {/* Background Image */}
      <div className="absolute inset-0 h-64 md:h-80">
        <Image
          src={FoodMenu}
          alt="Background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(259.68deg, rgba(151, 151, 151, 0.225413) -64.02%, rgba(74, 74, 74, 0.365347) 27.86%, rgba(0, 0, 0, 0.5) 66.86%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 md:px-[97px] pt-12">
        {/* Stepper */}
        <div className="bg-white rounded-t-2xl p-6 shadow-lg">
          <SubscriptionStepper />
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-b-2xl shadow-lg min-h-[600px]">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
