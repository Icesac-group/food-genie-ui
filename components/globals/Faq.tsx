"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("General Information");
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const categories = [
    "General Information",
    "Plans & Pricing",
    "Ordering & Delivery",
    "Meal Selection & Curation",
    "Account & Support",
  ];

  const faqData = {
    "General Information": [
      {
        question: "What is Food Genie?",
        answer:
          "FoodGenie is a subscription-based Nigerian meal service that delivers freshly prepared, authentic dishes to your doorstep once a week. You can subscribe for convenience and savings or place one-time orders whenever you'd like.",
      },
      {
        question: "Do I need to subscribe to order meals?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        question: "How often is the menu updated?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        question: "Do I need to subscribe to order meals?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    "Plans & Pricing": [
      {
        question: "What subscription plans are available?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    "Ordering & Delivery": [
      {
        question: "How does delivery work?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        question: "What areas do you deliver to?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    "Meal Selection & Curation": [
      {
        question: "How do I choose my meals?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        question: "Can I customize my meals?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        question: "Do you accommodate dietary restrictions?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    "Account & Support": [
      {
        question: "How do I manage my account?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        question: "What if I have an issue with my order?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section className="w-full bg-[#FFF9F0] py-12 md:py-20">
      <div className="container mx-auto px-5 md:px-[97px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-4">
            <div className="mb-8">
              <h3 className="font-calligraffitti text-[#FF7C36] text-2xl md:text-3xl mb-2">
                Got Questions?
              </h3>
              <h2 className="font-recoleta text-[#222021] text-3xl md:text-[42px] font-normal leading-tight">
                We've Got Answers
              </h2>
            </div>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenQuestion(null);
                  }}
                  className={`relative w-full text-left py-3 font-campton text-base transition-all flex items-center gap-3 ${
                    activeCategory === category
                      ? "text-[#222021] font-medium"
                      : "text-[#B8B8B8] hover:text-[#222021]"
                  }`}
                >
                  <span
                    className={`w-6 h-2 rounded-full  ${
                      activeCategory === category
                        ? "bg-[#FF7C36]"
                        : "bg-transparent"
                    }`}
                  />
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        activeCategory === category
                          ? "bg-transparent"
                          : "bg-[#FF7C3680]"
                      }`}
                    />
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqData[activeCategory as keyof typeof faqData].map(
                (faq, index) => (
                  <div
                    key={index}
                    className={`bg-[#FF7C361A] rounded-lg transition-all ${
                      openQuestion === index
                        ? "border border-[#FF7C36] bg-[#FFEBC233]"
                        : "border border-transparent"
                    }`}
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full h-[60px] flex items-center justify-between px-6 md:px-8 py-5 md:py-6 text-left"
                    >
                      <h3 className="font-campton text-[#222021] text-base md:text-lg font-medium pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-[#FF7C36] text-white">
                        {openQuestion === index ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {openQuestion === index && (
                      <div className="px-6 md:px-8 pb-6 md:pb-8">
                        <p className="font-campton text-[#9B9B9B] text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
