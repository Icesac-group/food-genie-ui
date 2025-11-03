"use client";
import React from "react";
import Image from "next/image";
import { images } from "@/public/images/images";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const AboutUsSection = () => {
  const { FoodMenu } = images();
  const router = useRouter();

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-[97px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24 md:mb-32">
          <div className="order-2 lg:order-1">
            <p className="font-calligraffitti text-[#FF7C36] text-base md:text-lg leading-0 ">
              Built for Us By Us!
            </p>
            <h2 className="font-recoleta text-[#222021] text-2xl md:text-[34px] font-normal mb-2">
              Our Story
            </h2>
            <div className="space-y-4 font-campton text-[#9B9B9B] text-sm leading-relaxed">
              <p>
                FoodGenie was born from a simple idea: nobody should miss out on
                the food that feels like home just because life gets busy.
              </p>
              <p>
                Our founders, Nigerians abroad, knew the struggle of craving
                mom's jollof while juggling work and family.
              </p>
              <p>
                We built FoodGenie so you never have to choose. Now, authentic
                egusi, jollof rice, and suya come to you, with all the warmth
                and flavor of home.
              </p>
            </div>
          </div>

          {/* Image - Right */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={FoodMenu}
                alt="Nigerian Food"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFEBC233] py-20  mb-24 md:mb-32 ">
        <div className="container mx-auto px-5 md:px-[97px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={FoodMenu}
                  alt="Nigerian Kitchen"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="font-calligraffitti text-[#FF7C36] text-base md:text-lg leading-0 ">
                Built for Us By Us!
              </p>
              <h2 className="font-recoleta text-[#222021] text-2xl md:text-[34px] font-normal mb-2">
                Our Kitchen & Chefs
              </h2>
              <p className="font-campton text-[#9B9B9B] text-sm">
                Our meals are crafted by experienced chefs who understand both
                tradition and nutrition. Every dish is prepared in a certified
                kitchen that meets strict hygiene standards, with locally
                sourced and imported ingredients chosen for freshness and
                quality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-[97px] ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p className="font-calligraffitti text-[#FF7C36] text-base md:text-lg leading-0 ">
              Built for Us By Us!
            </p>
            <h2 className="font-recoleta text-[#222021] text-2xl md:text-[34px] font-normal mb-2">
              Our Promise
            </h2>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#FF7C36] flex-shrink-0 mt-1" />
                <span className="font-campton text-[#868686] text-sm">
                  Authentic Nigerian recipes prepared by skilled chefs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#FF7C36] flex-shrink-0 mt-1" />
                <span className="font-campton text-[#868686] text-sm">
                  Strict hygiene & safety standards in our kitchens
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#FF7C36] flex-shrink-0 mt-1" />
                <span className="font-campton text-[#868686] text-sm">
                  Delivered fresh once a week for maximum quality
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#FF7C36] flex-shrink-0 mt-1" />
                <span className="font-campton text-[#868686] text-sm">
                  Flexible plans, transparent pricing, no hidden fees
                </span>
              </li>
            </ul>

            <p className="font-campton text-[#9B9B9B] text-sm mb-6">
              Ready to Taste Home? Join hundreds of Nigerians in Toronto
              enjoying authentic meals every week.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => router.push("/meals")}
                variant="outline"
                className="border-2 border-[#FF7C36] text-[#FF7C36] hover:bg-[#FF7C36] hover:text-white font-campton px-8 py-6 rounded-lg bg-transparent"
              >
                Browse Full Menu
              </Button>
              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton px-8 py-6 rounded-lg"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>

          {/* Image - Right */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={FoodMenu}
                alt="Fresh Nigerian Meals"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
