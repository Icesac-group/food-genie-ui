"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { images } from "@/public/images/images";
import { useMealsStore } from "@/store/mealsStore";
import { useDeliveryStore } from "@/store/deliveryStore";
import OrderSummary from "@/components/PageLayout/OrderSummary/OrderSummary";
import SearchFilter from "./SearchFilter";
import Pagination from "./Pagination";
import { getMeals, Meal } from "@/lib/data/mealsData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 8;

const Meals = () => {
  const { FoodMenu } = images();

  const addToCart = useMealsStore((state) => state.addToCart);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMealTags, setSelectedMealTags] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

  const [foods, setFoods] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [preferences, setPreferences] = useState("");

  useEffect(() => {
    async function fetchFoods() {
      setLoading(true);
      try {
        const data = await getMeals();
        setFoods(data);
      } catch (err) {
        console.error("Failed to fetch meals:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  // Filter meals from the API data (foods), not from the store
  const filteredMeals = useMemo(() => {
    return foods.filter((meal: Meal) => {
      const matchesSearch =
        searchQuery === "" ||
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || meal.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [foods, searchQuery, selectedCategory, selectedMealTags, selectedDietary]);

  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMeals = filteredMeals.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedMealTags, selectedDietary]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMealClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setQuantity(1);
    setPreferences("");
    setModalOpen(true);
  };

  const handleAddToCart = () => {
    if (!selectedMeal) return;

    addToCart(selectedMeal, quantity, preferences || undefined);

    toast.success("Added to cart!", {
      description: `${quantity}\u00d7 ${selectedMeal.name} added successfully`,
    });

    setModalOpen(false);
    setSelectedMeal(null);
    setQuantity(1);
    setPreferences("");
  };

  return (
    <div id="meals-section" className="w-full flex flex-col lg:flex-row gap-8">
      {/* Left side - Meals Grid */}
      <div className="flex-1 w-full lg:w-2/3 xl:w-3/4">
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

        {loading ? (
          <div className="text-center py-16">
            <p className="font-campton text-[#9B9B9B] text-lg">
              Loading meals...
            </p>
          </div>
        ) : paginatedMeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {paginatedMeals.map((meal: Meal) => (
              <div
                key={meal._id}
                onClick={() => handleMealClick(meal)}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="relative h-48 w-full mb-2 overflow-hidden rounded-lg">
                    <Image
                      src={FoodMenu}
                      alt={meal.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-recoleta text-[#222021] text-base font-medium line-clamp-1">
                    {meal.name}
                  </h3>
                  <p className="font-campton text-[#4A4A4A] text-sm font-normal mb-3">
                    ${(meal.price / 100).toFixed(2)}
                  </p>
                  <p className="font-campton text-[#868686] text-sm leading-relaxed line-clamp-2 mt-auto">
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
            {searchQuery && (
              <p className="font-campton text-[#B0B0B0] text-sm mt-2">
                Try a different search term or clear your filters.
              </p>
            )}
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

      {/* Right side - Order Summary */}
      <div className="w-full lg:w-1/3 xl:w-1/4">
        <OrderSummary showCheckoutButton={true} />
      </div>

      {/* Meal Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 gap-0">
          <DialogHeader className="p-6 pb-4 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="font-recoleta text-[#222021] text-xl font-normal">
                Meal Details
              </DialogTitle>
            </div>
          </DialogHeader>

          {selectedMeal && (
            <div className="p-6 space-y-6">
              {/* Image */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <Image
                  src={FoodMenu}
                  alt={selectedMeal.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 600px) 100vw, 600px"
                />
              </div>

              {/* Name & Price */}
              <div>
                <h2 className="font-recoleta text-[#222021] text-2xl font-medium mb-1">
                  {selectedMeal.name}
                </h2>
                <p className="font-campton text-[#FF7C36] text-xl font-semibold">
                  ${(selectedMeal.price / 100).toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-campton text-[#222021] text-sm font-semibold mb-2">
                  Description
                </h3>
                <p className="font-campton text-[#868686] text-sm leading-relaxed">
                  {selectedMeal.description}
                </p>
              </div>

              {/* Ingredients */}
              {selectedMeal.ingredients && selectedMeal.ingredients.length > 0 && (
                <div>
                  <h3 className="font-campton text-[#222021] text-sm font-semibold mb-2">
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeal.ingredients.map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#FFF9F0] text-[#FF7C36] rounded-full font-campton text-xs font-medium border border-[#FFE5B4]"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-campton text-[#222021] text-sm font-semibold mb-3">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center text-[#868686] hover:border-[#FF7C36] hover:text-[#FF7C36] transition-colors cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-campton text-[#222021] text-lg font-semibold w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center text-[#868686] hover:border-[#FF7C36] hover:text-[#FF7C36] transition-colors cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Special Preferences */}
              <div>
                <h3 className="font-campton text-[#222021] text-sm font-semibold mb-2">
                  Special Preferences{" "}
                  <span className="text-[#B0B0B0] font-normal">(optional)</span>
                </h3>
                <Textarea
                  placeholder="e.g. Extra spicy, no onions, extra meat..."
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  rows={3}
                  className="w-full font-campton text-sm"
                />
              </div>

              {/* Add to Order Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#FF7C36] hover:bg-[#FF6B1F] active:bg-[#FF5500] text-white font-campton py-6 text-base rounded-lg cursor-pointer"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Order &mdash; ${((selectedMeal.price * quantity) / 100).toFixed(2)}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Meals;
