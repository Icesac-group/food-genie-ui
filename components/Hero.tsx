'use client';

import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full bg-[#FAFAFA] py-12 pt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Discover Delicious Meals<br /> Tailored Just for You
        </h1>

        <p className="text-gray-600 mt-3 max-w-xl">
          Your personalized AI-powered food assistant. Explore recipes, generate meals, and enjoy good food.
        </p>

        <div className="mt-6 w-full max-w-lg relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl shadow-md border border-gray-200 focus:ring-2 focus:ring-black outline-none"
          />
        </div>
      </div>
    </section>
  );
}
