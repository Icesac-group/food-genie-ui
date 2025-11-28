"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { images } from "@/public/images/images";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Plus,
  Minus,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getMealById,  } from "@/lib/data/mealsData";
import { useMealsStore } from "@/store/mealsStore";
import { useDeliveryStore } from "@/store/deliveryStore";
import DeliveryAddressModal from "@/components/PageLayout/WeeklyMenu/Modal/DeliveryAddressModal";
import OrderSummary from "../OrderSummary/OrderSummary";
import { toast } from "sonner";

interface MealDetailsProps {
  mealId: string;
}

const MealDetails = ({ mealId }: MealDetailsProps) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const router = useRouter();
  const { FoodMenu } = images();
  const addToCart = useMealsStore((state) => state.addToCart);
  const getSelectedAddress = useDeliveryStore(
    (state) => state.getSelectedAddress
  );

  const [quantity, setQuantity] = useState(1);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [preferences, setPreferences] = useState("");
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedAddress = mounted ? getSelectedAddress() : null;
  const hasAddress = !!selectedAddress;

  // Get meal data
  // const meal = getMealById(parseInt(mealId));

  // if (!meal) {
  //   return (
  //     <div className="text-center py-16">
  //       <p className="font-campton text-[#9B9B9B] text-lg">Meal not found</p>
  //       <Button
  //         onClick={() => router.push("/meals")}
  //         className="mt-4 bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton"
  //       >
  //         Browse All Meals
  //       </Button>
  //     </div>
  //   );
  // }
const [meal, setMeal] = useState<any>(null);

useEffect(() => {
  if (!mealId) return;

  async function fetchMeal() {
    try {
      const data = await getMealById(mealId);
      setMeal(data);
    } catch (err) {
      console.error("Failed to fetch meal:", err);
    }
  }

  fetchMeal();
}, [mealId]);

console.log("Meal:", meal);

interface MealDetailsProps {
  mealId: string;
}

// const MealDetails = ({ mealId }: MealDetailsProps) => {
//   console.log("Meal ID inside MealDetails:", mealId); // 🔹 Test log

//   const [meal, setMeal] = useState<any>(null);

//   useEffect(() => {
//     if (mealId) {
//       async function fetchMeal() {
//         try {
//           const data = await getMealById(mealId);
//           setMeal(data);
//           console.log("Fetched meal object:", data); // 🔹 Test log
//         } catch (err) {
//           console.error("Error fetching meal by ID:", err);
//         }
//       }
//       fetchMeal();
//     }
//   }, [mealId]);

//   return <div>{meal ? meal.name : "Loading..."}</div>;
// };



  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!hasAddress) {
      toast.error("Please add a delivery address first");
      setModalOpen(true);
      return;
    }
    const finalPreferences = preferences
      ? preferences
      : meal.preferences?.join("\n");

    console.log("Adding to cart with preferences:", finalPreferences);

    addToCart(meal, quantity, finalPreferences);

    toast.success("Added to cart!", {
      description: `${quantity} ${meal.name} added successfully`,
    });

    setQuantity(1);
    setPreferences("");
  };
  const subtotal = (meal.price * quantity) / 100;
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        {/* Left Side - Meal Details */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#868686] hover:text-[#FF7C36] bg-[#F5F5F5] rounded-full py-2 px-4 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-campton text-sm">Back</span>
            </button>

            {/* Header */}
            <div className="mb-6">
              <p className="font-calligraffitti text-[#FF7C36] text-lg">
                Your Order
              </p>
              <h1 className="font-recoleta text-[#222021] text-xl md:text-3xl font-normal mb-1">
                {meal.name}
              </h1>
              {meal.subtitle && (
                <p className="font-campton text-[#4A4A4A] text-lg mb-2">
                  {meal.subtitle}
                </p>
              )}

              {/* Quantity and Price */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-3">
                <div className="flex-1">
                  <p className="font-campton text-[#222021] text-2xl font-semibold">
                    $ {(meal.price / 100).toFixed(2)}
                  </p>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton px-8"
                >
                  Add Item
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src={FoodMenu}
                alt={meal.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Your Preference */}
            {meal.preferences && meal.preferences.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-recoleta text-[#222021] text-xl">
                    Your preference
                  </h3>
                </div>

                <p className="font-campton text-[#4A4A4A] text-sm mb-1">
                  Your custom preferences:
                </p>

                {isEditingPreferences ? (
                  <div>
                    <Textarea
                      placeholder="Add your preferences..."
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                      rows={4}
                      className="w-full"
                    />
                    <Button
                      onClick={() => setIsEditingPreferences(false)}
                      className="mt-2 bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton"
                      size="sm"
                    >
                      Save Preferences
                    </Button>
                  </div>
                ) : (
                  <div className="bg-[#E8E8E8] rounded-sm p-4">
                    {preferences ? (
                      <div>
                        <p className="font-campton text-[#222021] text-sm">
                          {preferences}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <ul className="space-y-1">
                          {meal.preferences.map((pref: string, index: number) => (
                            <li
                              key={index}
                              className="font-campton text-[#868686] text-sm font-medium"
                            >
                              {pref}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() =>
                            setIsEditingPreferences(!isEditingPreferences)
                          }
                          className="text-[#FF7C36] hover:text-[#FF6B1F]"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:col-span-5">
          <OrderSummary showCheckoutButton={true} />
        </div>

        {/* Preparation Instructions */}
        {/* Preparation Instructions */}
        {meal.prepInstructions && (
          <div className="lg:col-span-12 mt-8">
            <div className=" p-6 md:p-10">
              <p className="font-calligraffitti text-[#FF7C36] text-lg">
                Ready to eat in minutes!
              </p>
              <h3 className="font-recoleta text-[#222021] text-2xl md:text-4xl mb-6">
                Preparation Instructions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Microwave */}
                {meal.prepInstructions.microwave && (
                  <div>
                    <div className="flex items-baseline gap-3 mb-4">
                      <h4 className="font-recoleta text-[#313131] md:text-2xl text-lg">
                        Microwave
                      </h4>
                      {meal.prepInstructions.microwave.time && (
                        <span className="font-campton text-[#4A4A4A] text-sm">
                          {meal.prepInstructions.microwave.time}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-3">
                      {meal.prepInstructions.microwave.steps?.map(
                        (step: string, index: number) => (
                          <li
                            key={index}
                            className="font-campton text-[#313131] text-sm mb-3"
                          >
                            {step}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Oven */}
                {meal.prepInstructions.oven && (
                  <div>
                    <div className="flex items-baseline gap-3 mb-4">
                      <h4 className="font-recoleta text-[#313131] md:text-2xl text-lg">
                        Oven
                      </h4>
                      {meal.prepInstructions.oven.time && (
                        <span className="font-campton text-[#4A4A4A] text-sm">
                          {meal.prepInstructions.oven.time}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-3">
                      {meal.prepInstructions.oven.steps?.map((step: string, index: number) => (
                        <li
                          key={index}
                          className="font-campton text-[#313131] text-sm mb-3"
                        >
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delivery Address Modal */}
      <DeliveryAddressModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        isEditing={isEditing}
      />
    </>
  );
};

export default MealDetails;
