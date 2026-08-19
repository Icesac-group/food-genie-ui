"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { images } from "@/public/images/images";
import { Button } from "@/components/ui/button";
import { Check, Plus, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import DeliveryAddressModal from "@/components/PageLayout/WeeklyMenu/Modal/DeliveryAddressModal";
import DeliveryAddressSummary from "@/components/PageLayout/WeeklyMenu/Modal/DeliveryAddressSummary";
import TopMenuCarousel from "@/components/PageLayout/WeeklyMenu/TopMenuCarousel";
import { useDeliveryStore } from "@/store/deliveryStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import OrderSummary from "../OrderSummary/OrderSummary";

const WeeklyHero = () => {
  const { FoodMenu } = images();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const getSelectedAddress = useDeliveryStore(
    (state) => state.getSelectedAddress
  );
  const isSubscribed = useSubscriptionStore((state) => state.isSubscribed);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const hasAddress = mounted ? !!getSelectedAddress() : false;

  const benefits = [
    {
      icon: <Check className="w-5 h-5" />,
      title: "Your Choice",
      description: "Pick exactly the meals you want",
    },
    {
      icon: <Check className="w-5 h-5" />,
      title: "Clear Pricing",
      description: "See each meal's price before you order",
    },
    {
      icon: <Check className="w-5 h-5" />,
      title: "No Lock-in",
      description: "Change your order any week",
    },
  ];

  return (
    <>
      {/* Background Image Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={FoodMenu}
            alt="Menu Background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(259.68deg, rgba(151, 151, 151, 0.225413) -64.02%, rgba(74, 74, 74, 0.365347) 27.86%, rgba(0, 0, 0, 0.5) 66.86%)",
            }}
          />
        </div>
      </div>

      {/* This Week's Menu Card */}
      <div className="container mx-auto px-5 md:px-[0px] lg:px-[97px] -mt-32 relative z-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Card - Conditional Rendering Based on Subscription */}
          <div className="lg:col-span-7">
            {isSubscribed ? (
              <TopMenuCarousel />
            ) : (
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
                <h3 className="font-calligraffitti text-[#FF7C36] text-base md:text-lg leading-3">
                  What's Cooking This Week
                </h3>
                <h2 className="font-recoleta text-[#222021] text-3xl md:text-4xl font-normal mb-2">
                  This Week's Menu
                </h2>
                <p className="font-campton text-[#868686] text-xs md:text-sm mb-2">
                  Browse this week's menu, pick the meals you want, and see
                  exactly what you'll pay. No packages, no commitments.
                </p>

                <div className="mb-6 bg-[#FFEBC233] p-5">
                  <h4 className="font-recoleta text-[#222021] text-xl mb-4">
                    How it works
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="text-[#FF7C36] flex-shrink-0 mt-1">
                          {benefit.icon}
                        </div>
                        <div>
                          <h5 className="font-campton text-[#868686] text-sm font-medium mb-1">
                            {benefit.title}
                          </h5>
                          <p className="font-campton text-[#868686] text-xs">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/subscribe")}
                  className="bg-[#FF7C36] hover:bg-[#FF6B1F] active:bg-[#FF5500] text-white font-campton px-8 py-6 rounded-lg"
                  size="sm"
                >
                  Build Your Week
                </Button>
              </div>
            )}
          </div>

          {/* Right Card - Order Summary */}
          <div className="lg:col-span-5">
            <OrderSummary showCheckoutButton={true} />
          </div>
        </div>
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

export default WeeklyHero;
