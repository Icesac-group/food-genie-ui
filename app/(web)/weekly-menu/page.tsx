import FAQ from "@/components/globals/Faq";
import Meals from "@/components/globals/meals";
import Testimonials from "@/components/PageLayout/Home/Testimonials";
import WeeklyHero from "@/components/PageLayout/WeeklyMenu/WeeklyHero";
import React from "react";

export default function WeeklyMenuPage() {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <div className="w-full min-h-screen bg-[#FFF9F0]">
        <WeeklyHero />

        {/* Meals Section */}
        <div
          className="container mx-auto px-5 md:px-[97px] pb-16"
          id="meals-section"
        >
          <Meals />
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-10">
        <Testimonials />
      </div>

      {/* FAQ */}
      <div className="mt-10">
        <FAQ />
      </div>
    </div>
  );
}
