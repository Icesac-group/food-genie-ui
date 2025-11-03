"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Chinedu Okafor",
      initials: "CO",
      rating: 3,
      review:
        "It brings the taste of home right to my doorstep. The jollof rice tastes exactly like my grandmother's recipe. I'm so grateful to have found this service!",
      date: "Aug 6, 2025",
    },
    {
      id: 2,
      name: "Chinedu Okafor",
      initials: "CO",
      rating: 3,
      review:
        "It brings the taste of home right to my doorstep. The jollof rice tastes exactly like my grandmother's recipe. I'm so grateful to have found this service!",
      date: "Aug 6, 2025",
    },
    {
      id: 3,
      name: "Chinedu Okafor",
      initials: "CO",
      rating: 3,
      review:
        "It brings the taste of home right to my doorstep. The jollof rice tastes exactly like my grandmother's recipe. I'm so grateful to have found this service!",
      date: "Aug 6, 2025",
    },
    {
      id: 4,
      name: "Chinedu Okafor",
      initials: "CO",
      rating: 3,
      review:
        "It brings the taste of home right to my doorstep. The jollof rice tastes exactly like my grandmother's recipe. I'm so grateful to have found this service!",
      date: "Aug 6, 2025",
    },
  ];

  const itemsPerPage = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getVisibleTestimonials = () => {
    const start = currentSlide * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  };

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="container mx-auto px-5 md:px-[97px]">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h3 className="font-calligraffitti text-[#FF7C36] text-2xl md:text-3xl mb-2">
            Our Community
          </h3>
          <h2 className="font-recoleta text-[#222021] text-3xl md:text-[42px] font-normal leading-tight">
            From Their Tastebuds to Yours
          </h2>
          <p className="font-campton text-[#9B9B9B] text-base md:text-lg mt-4">
            Join thousands of Nigerians abroad who've found their taste of home
            with us
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-8">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {getVisibleTestimonials().map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-3xl p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.12)] transition-shadow"
              >
                {/* Avatar and Name */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4E7F5] flex items-center justify-center">
                    <span className="font-campton text-base font-semibold text-[#1E40AF]">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-recoleta text-[#4A4A4A] text-lg font-normal">
                      {testimonial.name}
                    </h4>
                    {/* Star Rating */}
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < testimonial.rating
                              ? "fill-[#F0C560] text-[#F0C560]"
                              : "fill-[#E0E0E0] text-[#E0E0E0]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="font-campton text-[#9B9B9B] text-sm md:text-base leading-relaxed mb-4">
                  {testimonial.review}
                </p>

                {/* Date */}
                <p className="font-campton text-[#4A4A4A] font-medium text-sm text-right">
                  {testimonial.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-12 bg-[#FF7C36]"
                    : "w-2 bg-[#FFE5B4]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex  gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-[#FF7C361A] border border-[#FF7C36] text-[#FF7C36] hover:bg-[#FF7C36] hover:text-white transition-colors flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-[#FF7C361A] border border-[#FF7C36] text-[#FF7C36] hover:bg-[#FF7C36] hover:text-white transition-colors flex items-center justify-center"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
