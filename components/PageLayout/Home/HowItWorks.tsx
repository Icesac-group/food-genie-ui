"use client";
import React from "react";
import Image from "next/image";
import { images } from "@/public/images/images";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HowItWorks = () => {
  const router = useRouter();
  // Replace these with your actual image imports
  const { choosePlanImg, buildMenuImg, cookDeliverImg } = images();

  const steps = [
    {
      number: "1",
      image: choosePlanImg,
      title: "Choose Your Meals",
      description:
        "Browse this week's menu and pick exactly the meals you want. Each meal is individually priced — no fixed packages.",
    },
    {
      number: "2",
      image: buildMenuImg,
      title: "Build Your Weekly Menu",
      description:
        "Select your favorite dishes from our rotating menu, or let Food Genie suggest meals based on your past choices.",
    },
    {
      number: "3",
      image: cookDeliverImg,
      title: "We Cook & Deliver",
      description:
        "Our chefs prepare your meals fresh and deliver them once a week, straight to your doorstep.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-20">
      <div className="container mx-auto px-5 md:px-[97px]">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h3 className="font-calligraffitti text-[#FF7C36] text-2xl md:text-3xl mb-2">
            Our Process
          </h3>
          <h2 className="font-recoleta text-[#222021] text-3xl md:text-[42px] font-normal leading-tight">
            How Food Genie Works
          </h2>
        </div>

        {/* Steps Grid - Added extra top padding for floating images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32 md:gap-8 mb-12 md:mb-16 pt-32">
          {steps.map((step, index) => (
            <div key={index} className="relative w-full max-w-[360px] mx-auto">
              {/* Image - Floating above card */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-10">
                <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Card */}
              <div className="bg-[#F5F5F5] h-full rounded-[32px] pt-48 pb-10 px-8 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.12)] transition-shadow relative z-0">
                {/* Number Badge */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#FFEBC2] flex items-center justify-center">
                    <span className="font-recoleta text-3xl text-[#222021]">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-recoleta text-[#222021] text-xl md:text-2xl font-normal text-center mb-2 leading-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-campton text-[#9B9B9B] text-sm text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-campton text-[#9B9B9B] text-sm md:text-base mb-8 leading-relaxed">
            Your next favorite Nigerian meal is just a click away.
            <br />
            Fresh, delicious, and delivered straight to your doorstep.
          </p>
          <Button
            onClick={() => router.push("/signup")}
            className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white text-base font-campton font-medium px-4 py-6 w-[220px] rounded-lg"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
