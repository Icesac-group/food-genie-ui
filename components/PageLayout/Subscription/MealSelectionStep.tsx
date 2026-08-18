"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowLeft, Plus, Minus, ShoppingBag, X, CalendarDays, ChevronRight, Truck, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { getWeekOptions, WeekOption } from "@/store/subscriptionStore";
import { useDeliveryConfigStore } from "@/store/deliveryConfigStore";
import { getMeals, Meal } from "@/lib/data/mealsData";
import { images } from "@/public/images/images";

const CATEGORIES = ["All", "Rice", "Soups", "Swallows", "Grill", "Light Meals"];

/** Minimum number of individual meal portions required before checkout. */
const MIN_ORDER_MEALS = 3;

// ── Meal Card ──────────────────────────────────────────────────────────────
interface MealCardProps {
  meal: Meal;
  cartQty: number;           // quantity already in the order (0 if not added)
  image: StaticImageData;
  onAdd: (qty: number) => void;  // called when "Add to order" is clicked
  onRemove: () => void;
}

const MealCard = ({ meal, cartQty, image, onAdd, onRemove }: MealCardProps) => {
  // Local qty selector — starts at 1 (or current cart qty if already added)
  const [localQty, setLocalQty] = useState(cartQty > 0 ? cartQty : 1);

  // Keep localQty in sync when the cart qty changes from the sidebar
  useEffect(() => {
    if (cartQty > 0) setLocalQty(cartQty);
  }, [cartQty]);

  const isAdded      = cartQty > 0;
  const unavailable  = meal.availability === false;

  const decrease = () => setLocalQty((q) => Math.max(1, q - 1));
  const increase = () => setLocalQty((q) => q + 1);

  return (
    <div
      className={`bg-white rounded-xl border-2 overflow-hidden flex flex-col transition-all ${
        isAdded
          ? "border-[#FF7C36] shadow-md"
          : "border-[#E0E0E0] hover:border-[#FFB88C] hover:shadow-sm"
      } ${unavailable ? "opacity-60" : ""}`}
    >
      {/* Image */}
      <div className="relative h-44 w-full flex-shrink-0">
        <Image
          src={image}
          alt={meal.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        {isAdded && (
          <div className="absolute top-2 left-2 bg-[#FF7C36] text-white rounded-full px-2 py-0.5 font-campton text-xs font-bold shadow flex items-center gap-1">
            <span>✓</span>
            <span>In order</span>
          </div>
        )}
        {unavailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-[#868686] font-campton text-xs px-3 py-1 rounded-full">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Meal name */}
        <h3 className="font-recoleta text-[#222021] text-base font-medium leading-snug mb-1">
          {meal.name}
        </h3>

        {/* Short description */}
        <p className="font-campton text-[#868686] text-xs leading-relaxed line-clamp-2 mb-3">
          {meal.description}
        </p>

        {/* Price */}
        <p className="font-recoleta text-[#FF7C36] text-xl font-bold mb-4">
          ${(meal.price / 100).toFixed(2)}
        </p>

        <div className="mt-auto space-y-3">
          {/* Quantity selector — always visible */}
          <div className="flex items-center justify-between">
            <span className="font-campton text-[#868686] text-xs">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={decrease}
                disabled={unavailable}
                className="w-9 h-9 rounded-md border border-[#E0E0E0] flex items-center justify-center hover:border-[#FF7C36] hover:bg-[#FFF9F0] active:bg-[#FFE5D0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 text-[#FF7C36]" />
              </button>
              <span className="font-campton text-[#222021] text-sm font-semibold w-6 text-center">
                {localQty}
              </span>
              <button
                onClick={increase}
                disabled={unavailable}
                className="w-9 h-9 rounded-md border border-[#E0E0E0] flex items-center justify-center hover:border-[#FF7C36] hover:bg-[#FFF9F0] active:bg-[#FFE5D0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF7C36]" />
              </button>
            </div>
          </div>

          {/* Add to order / Remove button */}
          {isAdded ? (
            <div className="flex gap-2">
              <button
                onClick={() => onAdd(localQty)}
                className="flex-1 py-3 rounded-lg bg-[#FF7C36] text-white font-campton text-sm font-medium hover:bg-[#FF6B1F] active:bg-[#FF5500] transition-colors"
              >
                Update order
              </button>
              <button
                onClick={onRemove}
                className="px-3 py-3 rounded-lg border border-[#E0E0E0] text-[#868686] hover:border-red-300 hover:text-red-400 active:bg-red-50 transition-colors"
                aria-label="Remove from order"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => !unavailable && onAdd(localQty)}
              disabled={unavailable}
              className="w-full py-3 rounded-lg bg-[#FF7C36] text-white font-campton text-sm font-medium hover:bg-[#FF6B1F] active:bg-[#FF5500] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add to order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MealSelectionStep = () => {
  const router = useRouter();
  const { FoodMenu } = images();

  const selectedWeek       = useSubscriptionStore((s) => s.selectedWeek);
  const setSelectedWeek    = useSubscriptionStore((s) => s.setSelectedWeek);
  const selectedMeals      = useSubscriptionStore((s) => s.selectedMeals);
  const addMeal            = useSubscriptionStore((s) => s.addMeal);
  const removeMeal         = useSubscriptionStore((s) => s.removeMeal);
  const updateMealQuantity = useSubscriptionStore((s) => s.updateMealQuantity);
  const getMealsSubtotal   = useSubscriptionStore((s) => s.getMealsSubtotal);
  const getDeliveryFee     = useSubscriptionStore((s) => s.getDeliveryFee);
  const getMealsCount      = useSubscriptionStore((s) => s.getMealsCount);
  const nextStep           = useSubscriptionStore((s) => s.nextStep);
  const fulfillmentMethod  = useSubscriptionStore((s) => s.fulfillmentMethod);
  const setFulfillmentMethod = useSubscriptionStore((s) => s.setFulfillmentMethod);

  const [meals, setMeals]               = useState<Meal[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Compute week options once on mount (client-side only — avoids SSR date mismatch)
  const [weekOptions, setWeekOptions] = useState<WeekOption[]>([]);
  useEffect(() => {
    setWeekOptions(getWeekOptions());
  }, []);

  useEffect(() => {
    getMeals()
      .then((data) => setMeals(data))
      .catch((err) => setError(err.message || "Failed to load meals"))
      .finally(() => setLoading(false));
  }, []);

  const filteredMeals = useMemo(
    () =>
      selectedCategory === "All"
        ? meals
        : meals.filter((m) => m.category === selectedCategory),
    [meals, selectedCategory]
  );

  const getQty = (mealId: string) =>
    selectedMeals.find((s) => s.meal._id === mealId)?.quantity ?? 0;

  const subtotal    = getMealsSubtotal() / 100;
  const deliveryFee = getDeliveryFee() / 100;
  const total       = subtotal + deliveryFee;
  const mealsCount  = getMealsCount();

  // Delivery config — reads live from the admin-configured store
  const isFreeDelivery        = useDeliveryConfigStore((s) => s.isFreeDelivery);
  const mealsUntilFree        = useDeliveryConfigStore((s) => s.mealsUntilFreeDelivery);
  const freeDeliveryEnabled   = useDeliveryConfigStore((s) => s.freeDeliveryEnabled);
  const freeDeliveryThreshold = useDeliveryConfigStore((s) => s.freeDeliveryThreshold);

  const deliveryIsFree    = isFreeDelivery(mealsCount);
  const mealsNeededFree   = mealsUntilFree(mealsCount);

  return (
    <div className="p-6 md:p-12">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#868686] hover:text-[#FF7C36] active:text-[#FF6B1F] transition-colors mb-6 min-h-[44px]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-campton text-sm">Back</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-calligraffitti text-[#FF7C36] text-lg mb-2">
          Build Your Week!
        </p>
        <h1 className="font-recoleta text-[#222021] text-3xl md:text-4xl mb-3">
          Choose Your Meals
        </h1>
        <p className="font-campton text-[#868686] text-sm max-w-xl mx-auto">
          First, pick the week you're ordering for. Then select your meals and
          see your total update instantly.
        </p>
      </div>

      {/* ── Step 1: Week Picker ── */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="w-5 h-5 text-[#FF7C36]" />
          <h2 className="font-recoleta text-[#222021] text-xl">
            Select a week
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {weekOptions.map((week) => {
            const isSelected = selectedWeek?.startDate === week.startDate;
            return (
              <button
                key={week.startDate}
                onClick={() => !week.isClosed && setSelectedWeek(week)}
                disabled={week.isClosed}
                className={`relative text-left p-4 rounded-xl border-2 transition-all ${
                  week.isClosed
                    ? "border-[#E0E0E0] bg-[#F9F9F9] opacity-60 cursor-not-allowed"
                    : isSelected
                    ? "border-[#FF7C36] bg-[#FFF9F0] shadow-md"
                    : "border-[#E0E0E0] bg-white hover:border-[#FFB88C] hover:shadow-md active:scale-[0.98] cursor-pointer"
                }`}
              >
                {/* Closed badge */}
                {week.isClosed && (
                  <span className="absolute -top-2.5 left-4 bg-[#868686] text-white font-campton text-xs px-2 py-0.5 rounded-full">
                    Ordering closed
                  </span>
                )}

                {/* This Week badge */}
                {!week.isClosed && week.label.startsWith("This Week") && (
                  <span className="absolute -top-2.5 left-4 bg-[#FF7C36] text-white font-campton text-xs px-2 py-0.5 rounded-full">
                    This Week
                  </span>
                )}

                {/* Selected tick */}
                {isSelected && !week.isClosed && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#FF7C36] flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}

                {/* Week of */}
                <p className={`font-recoleta text-sm font-semibold mb-0.5 mt-1 ${
                  isSelected && !week.isClosed ? "text-[#FF7C36]" : "text-[#222021]"
                }`}>
                  Week of {week.weekOf}
                </p>

                {/* Date range */}
                <p className="font-campton text-[#9B9B9B] text-xs mb-3">
                  {week.label.split("  ")[1]?.replace(/[()]/g, "")}
                </p>

                {/* Orders close */}
                <div className={`text-xs font-campton ${week.isClosed ? "text-red-400" : "text-[#868686]"}`}>
                  <span className="font-medium">
                    {week.isClosed ? "Orders closed" : "Orders close:"}
                  </span>{" "}
                  {!week.isClosed && new Date(week.orderCloseDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                {/* Delivery days */}
                <div className="text-xs font-campton text-[#868686] mt-1">
                  <span className="font-medium">Delivery:</span>{" "}
                  {week.deliveryDays}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Step 2: Meal Grid (only visible after week is chosen) ── */}
      {selectedWeek ? (
        <>
          {/* Context banner */}
          <div className="max-w-7xl mx-auto mb-6">
            <div className="bg-[#FFF9F0] border border-[#FFD4B3] rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              {/* Week of */}
              <div className="flex items-center gap-2 flex-1">
                <CalendarDays className="w-5 h-5 text-[#FF7C36] flex-shrink-0" />
                <div>
                  <p className="font-recoleta text-[#222021] text-base font-medium">
                    Order for the Week of {selectedWeek.weekOf}
                  </p>
                  <p className="font-campton text-[#9B9B9B] text-xs">
                    {selectedWeek.label.split("  ")[1]?.replace(/[()]/g, "")}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-10 bg-[#FFD4B3]" />

              {/* Orders close */}
              <div className="text-sm font-campton">
                <p className="text-[#868686] text-xs mb-0.5">Orders close</p>
                <p className="text-[#222021] font-medium text-xs">
                  {new Date(selectedWeek.orderCloseDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-10 bg-[#FFD4B3]" />

              {/* Delivery days */}
              <div className="text-sm font-campton">
                <p className="text-[#868686] text-xs mb-0.5">Delivery</p>
                <p className="text-[#222021] font-medium text-xs">
                  {selectedWeek.deliveryDays}
                </p>
              </div>

              {/* Change link */}
              <button
                onClick={() => {
                  const open = weekOptions.find((w) => !w.isClosed);
                  if (open) setSelectedWeek(open);
                }}
                className="font-campton text-xs text-[#FF7C36] underline hover:text-[#FF6B1F] active:text-[#FF5500] whitespace-nowrap self-start sm:self-auto min-h-[36px] px-1"
              >
                Change week
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

            {/* ── Meal Grid ── */}
            <div className="lg:col-span-2">
              {/* Category pills */}
              <div className="flex gap-2 flex-wrap mb-6">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full font-campton text-sm transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#FF7C36] text-white"
                        : "bg-white border border-[#E0E0E0] text-[#868686] hover:border-[#FF7C36] hover:text-[#FF7C36]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="w-8 h-8 border-2 border-[#FF7C36] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="font-campton text-red-400 text-sm">{error}</p>
                  <p className="font-campton text-[#9B9B9B] text-xs mt-1">
                    Check your connection and refresh the page.
                  </p>
                </div>
              ) : filteredMeals.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-campton text-[#9B9B9B]">
                    No meals in this category.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredMeals.map((meal) => (
                    <MealCard
                      key={meal._id}
                      meal={meal}
                      cartQty={getQty(meal._id)}
                      image={FoodMenu}
                      onAdd={(qty) => {
                        const current = getQty(meal._id);
                        if (current === 0) {
                          addMeal(meal);
                          if (qty > 1) updateMealQuantity(meal._id, qty);
                        } else {
                          updateMealQuantity(meal._id, qty);
                        }
                      }}
                      onRemove={() => removeMeal(meal._id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── Order Summary Sidebar ── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-[#E0E0E0] p-6 sticky top-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-recoleta text-[#222021] text-xl">
                    Your Order
                  </h3>
                  {mealsCount > 0 && (
                    <span className="bg-[#FF7C36] text-white text-xs font-campton rounded-full px-2 py-0.5">
                      {mealsCount} {mealsCount === 1 ? "item" : "items"}
                    </span>
                  )}
                </div>

                {/* Selected week chip */}
                <div className="flex items-center gap-2 mb-5 px-3 py-2 bg-[#FFF9F0] border border-[#FFD4B3] rounded-lg">
                  <CalendarDays className="w-3.5 h-3.5 text-[#FF7C36] flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-campton text-[#FF7C36] text-xs font-medium truncate">
                      Week of {selectedWeek.weekOf}
                    </p>
                    <p className="font-campton text-[#9B9B9B] text-xs truncate">
                      Closes {new Date(selectedWeek.orderCloseDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>

                {/* Line items */}
                {selectedMeals.length === 0 ? (
                  <div className="text-center py-10">
                    <ShoppingBag className="w-8 h-8 text-[#E0E0E0] mx-auto mb-2" />
                    <p className="font-campton text-[#9B9B9B] text-sm">
                      Your order is empty
                    </p>
                    <p className="font-campton text-[#BBBBBB] text-xs mt-1">
                      Add meals from the menu
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-5 max-h-72 overflow-y-auto pr-1">
                    {selectedMeals.map((item) => (
                      <div key={item.meal._id}>
                        {/* Name + line total */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="font-campton text-[#222021] text-sm font-medium leading-snug flex-1">
                            {item.meal.name}
                          </p>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="font-campton text-[#222021] text-sm font-semibold">
                              ${((item.meal.price * item.quantity) / 100).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeMeal(item.meal._id)}
                              className="text-[#CCCCCC] hover:text-red-400 active:text-red-500 transition-colors p-1 rounded"
                              aria-label={`Remove ${item.meal.name}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* qty × unit price + inline controls */}
                        <div className="flex items-center justify-between">
                          <span className="font-campton text-[#9B9B9B] text-xs">
                            ${(item.meal.price / 100).toFixed(2)} each
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                item.quantity === 1
                                  ? removeMeal(item.meal._id)
                                  : updateMealQuantity(item.meal._id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded border border-[#E0E0E0] flex items-center justify-center hover:border-[#FF7C36] hover:bg-[#FFF9F0] active:bg-[#FFE5D0] transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3 text-[#FF7C36]" />
                            </button>
                            <span className="font-campton text-[#222021] text-sm font-semibold w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateMealQuantity(item.meal._id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded border border-[#E0E0E0] flex items-center justify-center hover:border-[#FF7C36] hover:bg-[#FFF9F0] active:bg-[#FFE5D0] transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3 text-[#FF7C36]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Minimum order progress */}
                <div className="border-t border-[#F0F0F0] pt-4 mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-campton text-[#868686] text-xs">
                      Minimum order
                    </span>
                    <span className={`font-campton text-xs font-semibold ${
                      mealsCount >= MIN_ORDER_MEALS ? "text-green-600" : "text-[#FF7C36]"
                    }`}>
                      {mealsCount} / {MIN_ORDER_MEALS} meals
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        mealsCount >= MIN_ORDER_MEALS ? "bg-green-500" : "bg-[#FF7C36]"
                      }`}
                      style={{
                        width: `${Math.min((mealsCount / MIN_ORDER_MEALS) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  {mealsCount < MIN_ORDER_MEALS && (
                    <p className="font-campton text-[#9B9B9B] text-xs mt-1.5">
                      Add {MIN_ORDER_MEALS - mealsCount} more{" "}
                      {MIN_ORDER_MEALS - mealsCount === 1 ? "meal" : "meals"} to continue
                    </p>
                  )}
                </div>

                {/* Fulfillment Toggle */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => setFulfillmentMethod("delivery")}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg border-2 transition-all text-xs font-medium font-campton min-h-[40px] ${
                      fulfillmentMethod === "delivery"
                        ? "bg-[#FF7C36] border-[#FF7C36] text-white"
                        : "bg-white border-[#E0E0E0] text-[#868686] hover:border-[#FF7C36] hover:text-[#FF7C36] active:bg-[#FFF9F0]"
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 flex-shrink-0" />
                    Delivery
                  </button>
                  <button
                    onClick={() => setFulfillmentMethod("pickup")}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg border-2 transition-all text-xs font-medium font-campton min-h-[40px] ${
                      fulfillmentMethod === "pickup"
                        ? "bg-[#FF7C36] border-[#FF7C36] text-white"
                        : "bg-white border-[#E0E0E0] text-[#868686] hover:border-[#FF7C36] hover:text-[#FF7C36] active:bg-[#FFF9F0]"
                    }`}
                  >
                    <Store className="w-3.5 h-3.5 flex-shrink-0" />
                    Pickup
                  </button>
                </div>

                {/* Subtotal */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-campton text-[#868686] text-sm">
                      Subtotal
                    </span>
                    <span className="font-campton text-[#222021] text-sm font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Delivery/Pickup line */}
                  <div className="flex justify-between items-center">
                    <span className="font-campton text-[#868686] text-sm">
                      {fulfillmentMethod === "pickup" ? "Pickup" : "Delivery"}
                    </span>
                    {mealsCount === 0 ? (
                      <span className="font-campton text-[#9B9B9B] text-sm">—</span>
                    ) : fulfillmentMethod === "pickup" ? (
                      <span className="font-campton text-green-600 text-sm font-semibold">FREE</span>
                    ) : deliveryIsFree ? (
                      <span className="font-campton text-green-600 text-sm font-semibold flex items-center gap-1">
                        FREE 🎉
                      </span>
                    ) : (
                      <span className="font-campton text-[#222021] text-sm">
                        ${deliveryFee.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Free delivery progress message */}
                  {freeDeliveryEnabled && mealsCount > 0 && !deliveryIsFree && (
                    <div className="bg-[#FFF9F0] border border-[#FFD4B3] rounded-lg px-3 py-2">
                      <p className="font-campton text-[#FF7C36] text-xs">
                        Add <span className="font-semibold">{mealsNeededFree} more{" "}
                        {mealsNeededFree === 1 ? "meal" : "meals"}</span> to unlock{" "}
                        <span className="font-semibold">FREE delivery</span> 🚚
                      </p>
                      <div className="w-full h-1 bg-[#FFE5D0] rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#FF7C36] rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min((mealsCount / freeDeliveryThreshold) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Unlocked message */}
                  {freeDeliveryEnabled && deliveryIsFree && mealsCount > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                      <p className="font-campton text-green-700 text-xs font-medium">
                        🎉 You've unlocked FREE delivery!
                      </p>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t-2 border-[#222021] pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-recoleta text-[#222021] text-lg font-bold">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="font-recoleta text-[#FF7C36] text-2xl font-bold">
                        ${mealsCount === 0 ? "0.00" : total.toFixed(2)}
                      </span>
                      {mealsCount > 0 && (
                        <p className="font-campton text-[#9B9B9B] text-xs mt-0.5">
                          ${subtotal.toFixed(2)} +{" "}
                          {fulfillmentMethod === "pickup"
                            ? "FREE pickup"
                            : deliveryIsFree
                            ? "FREE delivery"
                            : `$${deliveryFee.toFixed(2)} delivery`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={nextStep}
                  disabled={mealsCount < MIN_ORDER_MEALS}
                  className="w-full bg-[#FF7C36] hover:bg-[#FF6B1F] active:bg-[#FF5500] text-white font-campton py-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mealsCount < MIN_ORDER_MEALS ? (
                    <span>
                      {mealsCount === 0
                        ? `Select ${MIN_ORDER_MEALS} meals to continue`
                        : `Add ${MIN_ORDER_MEALS - mealsCount} more to continue`}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Review & Checkout
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Prompt to pick a week first */
        <div className="max-w-7xl mx-auto">
          <div className="border-2 border-dashed border-[#E0E0E0] rounded-2xl py-16 text-center">
            <CalendarDays className="w-10 h-10 text-[#E0E0E0] mx-auto mb-3" />
            <p className="font-recoleta text-[#9B9B9B] text-lg mb-1">
              Select a week above to see the menu
            </p>
            <p className="font-campton text-[#BBBBBB] text-sm">
              Your meal selections will appear here once you choose a week
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSelectionStep;
