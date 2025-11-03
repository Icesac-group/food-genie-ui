import AboutUsSection from "@/components/PageLayout/AboutUs/AboutUsSection";
import TestimonialsBanner from "@/components/PageLayout/AboutUs/TestimonialsBanner";
import Testimonials from "@/components/PageLayout/Home/Testimonials";
import React from "react";

export default function page() {
  return (
    <div>
      <TestimonialsBanner />
      <AboutUsSection />
      <Testimonials />
    </div>
  );
}
