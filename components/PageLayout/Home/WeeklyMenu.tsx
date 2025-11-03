"use client";
import React, { useState } from "react";
import Image from "next/image";
import { images } from "@/public/images/images";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const WeeklyMenu = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Replace with your actual images
  const { FoodMenu } = images();

  const menuItems = [
    {
      title: "Jollof Rice with Grilled Chicken",
      image: FoodMenu,
    },
    {
      title: "Egusi Soup with Pounded Yam",
      image: FoodMenu,
    },
    {
      title: "Afang Soup with Fufu",
      image: FoodMenu,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % menuItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + menuItems.length) % menuItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full bg-[#FFEBC233] py-12 md:py-20">
      <div className="container mx-auto px-5 md:px-[97px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h3 className="font-calligraffitti text-[#FF7C36] text-xl md:text-2xl ">
                Just Want a Taste?
              </h3>
              <h2 className="font-recoleta text-[#222021] text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-2">
                On the Menu This Week
              </h2>
              <p className="font-campton text-[#9B9B9B] text-sm md:text-base leading-relaxed max-w-lg">
                Choose from a variety of authentic Nigerian dishes. Place a
                one-time order and enjoy the same freshness our subscribers love
              </p>
            </div>

            {/* Current Menu Item */}
            <div>
              <p className="font-campton text-[#222021] text-base md:text-lg font-medium">
                {menuItems[currentSlide].title}
              </p>
            </div>

            {/* Browse Button */}
            <Button
              onClick={() => router.push("/meals")}
              className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white text-base font-campton font-medium px-8 py-6 rounded-lg"
            >
              Browse Full Menu
            </Button>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between gap-4 pt-4">
              {/* Dots */}
              <div className="flex gap-2">
                {menuItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "w-12 bg-[#FF7C36]"
                        : "w-2 bg-[#D9D9D9]"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrow Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-[#FF7C36]" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-[#FF7C36]" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={menuItems[currentSlide].image}
              alt={menuItems[currentSlide].title}
              fill
              className="object-cover transition-opacity duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyMenu;
