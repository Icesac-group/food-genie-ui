"use client";
import React from "react";
import { use } from "react";
import Image from "next/image";
import { images } from "@/public/images/images";
import MealDetails from "@/components/PageLayout/Meals/MealDetails";
import RecommendedMeals from "@/components/PageLayout/Meals/RecommededMeals";

interface PageProps {
  params: Promise<{ id: string }>;
}

const MealDetailPage = ({ params }: PageProps) => {
  const { id } = use(params);
  const { FoodMenu } = images();

  return (
    <div className="w-full min-h-screen">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={FoodMenu}
            alt="Meal Background"
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
      </div>

      <div className="container mx-auto px-5 md:px-[97px] -mt-32 relative z-10 pb-16">
        <MealDetails mealId={id} />
        <RecommendedMeals currentMealId={id} />
      </div>
    </div>
  );
};

export default MealDetailPage;
