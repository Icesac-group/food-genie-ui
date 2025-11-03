"use client";
import React, { useState } from "react";
import Image from "next/image";
import { images } from "@/public/images/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: any;
}

const TopMenuCarousel = () => {
  const { FoodMenu } = images();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock top menu items - replace with actual data
  const topMenuItems: MenuItem[] = [
    {
      id: 1,
      name: "Jollof Rice with Grilled Chicken",
      price: 4800,
      image: FoodMenu,
    },
    {
      id: 2,
      name: "Egusi Soup with Pounded Yam",
      price: 5200,
      image: FoodMenu,
    },
    {
      id: 3,
      name: "Fried Rice & Chicken",
      price: 4500,
      image: FoodMenu,
    },
    {
      id: 4,
      name: "Suya Platter",
      price: 6500,
      image: FoodMenu,
    },
  ];

  const handlePrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? topMenuItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === topMenuItems.length - 1 ? 0 : prev + 1
    );
  };

  const scrollToMeals = () => {
    const mealsSection = document.getElementById("meals-section");
    if (mealsSection) {
      mealsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentItem = topMenuItems[currentSlide];

  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-calligraffitti text-[#FF7C36] text-xs md:text-sm">
            Taste Nigeria in Every Bite
          </h3>
          <h2 className="font-recoleta text-[#222021] text-2xl md:text-3xl font-normal mb-2">
            Top Of The Menu This Week
          </h2>
          <p className="font-campton text-[#868686] text-xs md:text-sm">
            Choose one-time orders or subscribe & save 20% on every meal.
          </p>
        </div>
        <Button
          onClick={scrollToMeals}
          variant="outline"
          className="border border-[#FF7C36] text-[#FF7C36] hover:bg-[#FF7C36] hover:text-white font-campton hidden md:block"
        >
          Browse Full Menu
        </Button>
      </div>

      {/* Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={currentItem.image}
            alt={currentItem.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h3 className="font-recoleta text-[#222021] text-xl md:text-2xl font-medium mb-3">
              {currentItem.name}
            </h3>
            <p className="font-campton text-[#222021] text-2xl font-semibold">
              $ {(currentItem.price / 100).toFixed(2)}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Dots */}
            <div className="flex gap-2">
              {topMenuItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-12 bg-[#FF7C36]"
                      : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={handlePrevious}
                className="w-10 h-10 rounded-full   bg-[#FF7C361A] text-[#FF7C36] hover:bg-[#FF7C36] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full  bg-[#FF7C361A] text-[#FF7C36] hover:bg-[#FF7C36] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Browse Button */}
          <Button
            onClick={scrollToMeals}
            variant="outline"
            className="border-2 border-[#FF7C36] text-[#FF7C36] hover:bg-[#FF7C36] hover:text-white font-campton w-full md:hidden"
          >
            Browse Full Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopMenuCarousel;
