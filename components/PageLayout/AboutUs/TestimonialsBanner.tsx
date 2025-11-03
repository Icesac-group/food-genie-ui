"use client";
import React from "react";
import Image from "next/image";
import { images } from "@/public/images/images";

const TestimonialsBanner = () => {
  const { FoodMenu } = images();

  const testimonials = [
    {
      quote:
        "Between back-to-back shifts at the hospital, FoodGenie brings me home. That first spoonful of jollof after a 12-hour day? Pure comfort.",
      author: "Dr. Adebayo, Scarborough",
    },
    {
      quote:
        "My kids are growing up here, but I wanted them to know the flavors I grew up with. FoodGenie helps me keep that connection alive.",
      author: "Ngozi, North York",
    },
    {
      quote:
        "I've tried every 'African restaurant' in Brampton. Nothing compares to this. It's like my aunty cooked it herself. Same love, same taste.",
      author: "Temi, Brampton",
    },
    {
      quote:
        "After 3 years in Mississauga, I finally found egusi that reminds me of Sunday dinners back in Enugu. This is the real deal.",
      author: "Chioma, Mississauga",
    },
    {
      quote:
        "My partner isn't Nigerian, but after one plate of FoodGenie's jollof, they finally understood why I talk about it so much. Now we order every week.",
      author: "Amara, Markham",
    },
  ];

  return (
    <section className="w-full relative min-h-[200px] md:min-h-[200px] lg:min-h-[248px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={FoodMenu}
          alt="Nigerian Food"
          fill
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(259.68deg, rgba(151, 151, 151, 0.225413) -64.02%, rgba(74, 74, 74, 0.365347) 27.86%, rgba(0, 0, 0, 0.5) 66.86%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-[97px]">
        {/* Top Testimonials - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Top Left */}
          <div className="lg:col-span-1">
            <p className="font-campton text-white text-xs lg:text-sm xl:text-base leading-relaxed mb-2">
              {testimonials[0].quote}
            </p>
            <p className="font-campton text-white/80 text-xs italic">
              -{testimonials[0].author}-
            </p>
          </div>

          {/* Top Center */}
          <div className="lg:col-span-1 lg:mt-8 xl:mt-20">
            <p className="font-campton text-white text-xs lg:text-sm xl:text-base leading-relaxed mb-2">
              {testimonials[1].quote}
            </p>
            <p className="font-campton text-white/80 text-xs italic">
              -{testimonials[1].author}-
            </p>
          </div>

          {/* Top Right */}
          <div className="hidden lg:block lg:col-span-1">
            <p className="font-campton text-white text-xs lg:text-sm xl:text-base leading-relaxed mb-2">
              {testimonials[2].quote}
            </p>
            <p className="font-campton text-white/80 text-xs italic">
              -{testimonials[2].author}-
            </p>
          </div>
        </div>

        {/* Bottom Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 lg:mt-8">
          {/* Bottom Left */}
          <div className=" md:max-w-sm lg:max-w-md">
            <p className="font-campton text-white text-xs sm:text-sm lg:text-base leading-relaxed mb-2">
              {testimonials[3].quote}
            </p>
            <p className="font-campton text-white/80 text-xs italic">
              -{testimonials[3].author}-
            </p>
          </div>

          {/* Bottom Right */}
          <div className="md:ml-auto md:max-w-sm lg:max-w-md">
            <p className="font-campton text-white text-xs sm:text-sm lg:text-base leading-relaxed mb-2">
              {testimonials[4].quote}
            </p>
            <p className="font-campton text-white/80 text-xs italic">
              -{testimonials[4].author}-
            </p>
          </div>
        </div>

        {/* Mobile Only Testimonial - Show top right testimonial on mobile */}
        <div className="md:hidden mt-4">
          <p className="font-campton text-white text-xs leading-relaxed mb-2">
            {testimonials[2].quote}
          </p>
          <p className="font-campton text-white/80 text-xs italic">
            -{testimonials[2].author}-
          </p>
        </div>

        {/* Main Heading - Centered */}
        <div className="text-center mb-2 mt-5">
          <h2 className="font-recoleta text-white text-3xl md:text-5xl lg:text-6xl font-normal leading-tight">
            Bringing Authentic Nigerian Flavors Straight to Your Table.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsBanner;
