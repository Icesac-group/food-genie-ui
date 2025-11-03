"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { images } from "@/public/images/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getRecommendedMeals } from "@/lib/data/mealsData";

interface RecommendedMealsProps {
  currentMealId: string;
}

const RecommendedMeals = ({ currentMealId }: RecommendedMealsProps) => {
  const { FoodMenu } = images();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock recommended meals - filter out current meal
  const recommendedMeals = getRecommendedMeals(parseInt(currentMealId), 8);

  const itemsPerPage = 4;
  const totalSlides = Math.ceil(recommendedMeals.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const visibleMeals = recommendedMeals.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="font-calligraffitti text-[#FF7C36] text-lg mb-2">
          Perfect Pairings
        </p>
        <h2 className="font-recoleta text-[#222021] text-3xl md:text-4xl font-normal mb-4">
          Recommended Additions
        </h2>
        <p className="font-campton text-[#868686] text-sm max-w-3xl mx-auto">
          Why stop at one delicious dish? Browse through our curated
          recommendations and discover complementary flavors that will elevate
          your dining experience to the next level.
        </p>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {visibleMeals.map((meal) => (
          <div
            key={meal.id}
            onClick={() => router.push(`/meals/${meal.id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="p-4">
              <div className="relative h-48 w-full mb-3">
                <Image
                  src={FoodMenu}
                  alt={meal.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {meal.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-[#FD4D07] bg-[#FF7C3633] border border-[#FF7C36] rounded-full font-campton text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-recoleta text-[#222021] text-base font-medium mb-2 line-clamp-1">
                {meal.name}
              </h3>
              <p className="font-campton text-[#222021] text-lg font-semibold mb-2">
                $ {(meal.price / 100).toFixed(2)}
              </p>
              <p className="font-campton text-[#868686] text-sm line-clamp-2">
                {meal.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-[#FF7C36]" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            className="w-10 h-10 rounded-full bg-[#FFE5D0] text-[#FF7C36] hover:bg-[#FF7C36] hover:text-white flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-[#FFE5D0] text-[#FF7C36] hover:bg-[#FF7C36] hover:text-white flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedMeals;
