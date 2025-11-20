import FAQ from "@/components/globals/Faq";
import Meals from "@/components/globals/meals";
import Testimonials from "@/components/PageLayout/Home/Testimonials";
import WeeklyHero from "@/components/PageLayout/WeeklyMenu/WeeklyHero";
import { Plus } from "lucide-react";
import TestRecipe from "@/components/TestRecipe";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="w-full min-h-screen bg-[#FFF9F0]">
        <WeeklyHero />

        <div
          className="container mx-auto px-5 md:px-[97px] pb-16 "
          id="meals-section"
        >
          <Meals />
        </div>
      </div>
      <Testimonials />
       <TestRecipe />;
      <FAQ />
    </div>
  );
}
