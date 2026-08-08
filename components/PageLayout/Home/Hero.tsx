"use client";
import React from "react";
import Image from "next/image";
import { images } from "@/public/images/images";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Leaf, ChefHat, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const { homeHero } = images();
  const router = useRouter();

  const features = [
    {
      icon: <BadgeCheck className="w-5 h-5" />,
      text: "100% Authentic Recipes",
    },
    {
      icon: <BadgeCheck className="w-5 h-5" />,
      text: "Fresh Ingredients",
    },
    {
      icon: <BadgeCheck className="w-5 h-5" />,
      text: "Eco-friendly",
    },
  ];

  return (
    <section className="relative w-full h-[600px] lg:h-[580px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={homeHero}
          alt="Authentic Nigerian Dishes"
          fill
          className="object-cover"
          style={{
            transform: "scaleX(-1)",
            objectPosition: "center 65%",
          }}
          priority
          quality={100}
        />
        {/* Gradient Overlay - Dark on left, transparent on right */}
        <div
          className="absolute inset-0"
          // style={{
          //   background:
          //     "linear-gradient(90deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%)",
          // }}
          style={{
            background:
              "linear-gradient(259.68deg, rgba(151, 151, 151, 0.293037) -64.02%, rgba(74, 74, 74, 0.474951) 27.86%, rgba(0, 0, 0, 0.65) 66.86%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-5 md:px-[97px]">
          <div className="max-w-3xl">
            {/* Taste Home */}
            <h2 className="font-calligraffitti text-[#FF7C36] text-xl md:text-[26px] mb-1">
              Taste Home
            </h2>

            {/* Main Heading */}
            <h1 className="font-recoleta text-[#F7F7F7] text-3xl md:text-4xl lg:text-[42px] leading-tight mb-4">
              Your Authentic Nigerian Dishes,
              <br />
              Cooked Fresh & Delivered Weekly.
            </h1>

            {/* Description */}
            <p className="font-campton text-white/90 text-xs md:text-sm mb-2 max-w-2xl leading-relaxed">
              Enjoy the comfort of home-style meals without the stress of
              cooking. Pick exactly the meals you want each week — no fixed
              plans, no locked-in packages.
            </p>

            {/* Discount Text */}
            <p className="font-campton text-[#FF7C36] font-semibold text-sm mb-4">
              Pay only for the meals you choose.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                onClick={() => router.push("/subscribe")}
                className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton px-4 py-3  text-base rounded-lg"
                size="lg"
              >
                Build Your Week
              </Button>
              <Button
                onClick={() => router.push("/meals")}
                variant="outline"
                className="border-2 border-[#FF7C36] text-[#FF7C36] hover:bg-transparent hover:text-[#FF7C36] font-campton px-4 py-3 text-base rounded-lg bg-transparent"
                size="lg"
              >
                Browse Meals
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-white font-campton "
                >
                  <span className="">{feature.icon}</span>
                  <span className="text-sm md:text-base">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
