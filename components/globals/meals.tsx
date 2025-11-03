"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { images } from "@/public/images/images";
import { useMealsStore } from "@/store/mealsStore";
import SearchFilter from "./SearchFilter";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 8;

const Meals = () => {
  const { FoodMenu } = images();
  const router = useRouter();
  const meals = useMealsStore((state: any) => state.meals);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMealTags, setSelectedMealTags] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

  // Filter meals
  const filteredMeals = useMemo(() => {
    return meals.filter((meal: any) => {
      const matchesSearch =
        searchQuery === "" ||
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || meal.category === selectedCategory;

      const matchesTags =
        selectedMealTags.length === 0 ||
        selectedMealTags.some((tag) => meal.tags.includes(tag));

      const matchesDietary =
        selectedDietary.length === 0 ||
        selectedDietary.some((diet) => meal.dietary.includes(diet));

      return matchesSearch && matchesCategory && matchesTags && matchesDietary;
    });
  }, [meals, searchQuery, selectedCategory, selectedMealTags, selectedDietary]);

  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMeals = filteredMeals.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedMealTags, selectedDietary]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="meals-section" className="w-full">
      <SearchFilter
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onMealTagsChange={setSelectedMealTags}
        onDietaryChange={setSelectedDietary}
        selectedCategory={selectedCategory}
        selectedMealTags={selectedMealTags}
        selectedDietary={selectedDietary}
      />

      <div className="mb-4">
        <p className="font-campton text-[#9B9B9B] text-sm">
          Showing {paginatedMeals.length} of {filteredMeals.length} meals
        </p>
      </div>

      {paginatedMeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {paginatedMeals.map((meal: any) => (
            <div
              key={meal.id}
              onClick={() => router.push(`/meals/${meal.id}`)}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="p-4">
                <div className="relative h-48 w-full mb-2">
                  <Image
                    src={FoodMenu}
                    alt={meal.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-wrap gap-1 mb-2 mt-4">
                  {meal.tags.slice(0, 2).map((tag: any, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-[#FD4D07] bg-[#FF7C3633] border border-[#FF7C36] rounded-full font-campton text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-recoleta text-[#222021] text-base font-medium line-clamp-1">
                  {meal.name}
                </h3>
                <p className="font-campton text-[#4A4A4A] text-sm font-normal mb-3">
                  ${(meal.price / 100).toFixed(2)}
                </p>
                <p className="font-campton text-[#868686] text-sm leading-relaxed line-clamp-2">
                  {meal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="font-campton text-[#9B9B9B] text-lg">
            No meals found matching your filters.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Meals;
