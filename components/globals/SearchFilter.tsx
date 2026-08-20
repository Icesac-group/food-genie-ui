"use client";
import React from "react";
import { ChevronDown, Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface SearchFilterProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  onMealTagsChange: (tags: string[]) => void;
  onDietaryChange: (dietary: string[]) => void;
  selectedCategory: string;
  selectedMealTags: string[];
  selectedDietary: string[];
}

const SearchFilter = ({
  onSearchChange,
  onCategoryChange,
  onMealTagsChange,
  onDietaryChange,
  selectedCategory,
  selectedMealTags,
  selectedDietary,
}: SearchFilterProps) => {
  const categories = [
    "All",
    "Rice",
    "Soups",
    "Swallows",
    "Grill",
    "Light Meals",
    "Specials",
  ];

  const mealTags = [
    "Top Rated",
    "Subscriber Special",
    "Popular",
    "Traditional",
    "Spicy",
    "Kid-Friendly",
    "Healthy",
    "Grilled",
  ];

  const dietaryOptions = [
    "Gluten-Free",
    "Vegan",
    "Vegetarian",
    "High Protein",
    "Low Carb",
  ];

  const handleMealTagToggle = (tag: string) => {
    const updated = selectedMealTags.includes(tag)
      ? selectedMealTags.filter((t) => t !== tag)
      : [...selectedMealTags, tag];
    onMealTagsChange(updated);
  };

  const handleDietaryToggle = (dietary: string) => {
    const updated = selectedDietary.includes(dietary)
      ? selectedDietary.filter((d) => d !== dietary)
      : [...selectedDietary, dietary];
    onDietaryChange(updated);
  };

  const removeFilter = (type: "tag" | "dietary", value: string) => {
    if (type === "tag") {
      onMealTagsChange(selectedMealTags.filter((t) => t !== value));
    } else {
      onDietaryChange(selectedDietary.filter((d) => d !== value));
    }
  };

  return (
    <div className="w-full mb-8">
      <h3 className="font-recoleta text-[#222021] text-2xl md:text-3xl font-normal mb-6">
        Search & Filter
      </h3>

      {/* Search Bar and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search meals..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg font-campton text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7C36] focus:border-transparent"
          />
        </div>

        {/* Meal Tags Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-[#FF7C36] text-[#FF7C36] bg-transparent hover:bg-[#FF7C36] hover:text-white font-campton whitespace-nowrap"
            >
              Meal Tags
              {selectedMealTags.length > 0 && (
                <span className="ml-2 bg-[#FF7C36] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedMealTags.length}
                </span>
              )}
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-4">
              <h4 className="font-campton font-semibold text-sm">
                Select Meal Tags
              </h4>
              <div className="space-y-3">
                {mealTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedMealTags.includes(tag)}
                      onCheckedChange={() => handleMealTagToggle(tag)}
                    />
                    <Label
                      htmlFor={`tag-${tag}`}
                      className="font-campton text-sm cursor-pointer"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Dietary Options Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="border-[#FF7C36] bg-transparent text-[#FF7C36] hover:bg-[#FF7C36] hover:text-white font-campton whitespace-nowrap"
            >
              Dietary Options
              {selectedDietary.length > 0 && (
                <span className="ml-2 bg-[#FF7C36] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedDietary.length}
                </span>
              )}
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-4">
              <h4 className="font-campton font-semibold text-sm">
                Select Dietary Options
              </h4>
              <div className="space-y-3">
                {dietaryOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dietary-${option}`}
                      checked={selectedDietary.includes(option)}
                      onCheckedChange={() => handleDietaryToggle(option)}
                    />
                    <Label
                      htmlFor={`dietary-${option}`}
                      className="font-campton text-sm cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 font-campton text-sm transition-colors cursor-pointer active:scale-95 ${
              selectedCategory === category
                ? "text-[#FF7C36] border-b-2 border-[#FF7C36] font-medium"
                : "text-[#B0B0B0] hover:text-[#FF7C36]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Active Filters */}
      {(selectedMealTags.length > 0 || selectedDietary.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedMealTags.map((tag) => (
            <button
              key={tag}
              onClick={() => removeFilter("tag", tag)}
              className="px-3 py-1.5 bg-[#FFE5B4] text-[#FF7C36] rounded-full font-campton text-xs font-medium flex items-center gap-2 hover:bg-[#FFD4A3] transition-colors cursor-pointer active:scale-95"
            >
              {tag}
              <X className="w-3 h-3" />
            </button>
          ))}
          {selectedDietary.map((diet) => (
            <button
              key={diet}
              onClick={() => removeFilter("dietary", diet)}
              className="px-3 py-1.5 bg-[#E5F3FF] text-[#0066CC] rounded-full font-campton text-xs font-medium flex items-center gap-2 hover:bg-[#CCE5FF] transition-colors cursor-pointer active:scale-95"
            >
              {diet}
              <X className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
