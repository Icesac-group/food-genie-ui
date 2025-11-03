import FAQ from "@/components/globals/Faq";
import Hero from "@/components/PageLayout/Home/Hero";
import HowItWorks from "@/components/PageLayout/Home/HowItWorks";
import Testimonials from "@/components/PageLayout/Home/Testimonials";
import WeeklyMenu from "@/components/PageLayout/Home/WeeklyMenu";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WeeklyMenu />
      <Testimonials />
      <FAQ />
    </div>
  );
}
