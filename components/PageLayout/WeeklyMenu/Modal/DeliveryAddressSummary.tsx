// components/DeliveryAddressSummary.tsx
"use client";
import React from "react";
import { useDeliveryStore } from "@/store/deliveryStore";
import { Check } from "lucide-react";

const DeliveryAddressSummary = () => {
  const getSelectedAddress = useDeliveryStore(
    (state) => state.getSelectedAddress
  );
  const address = getSelectedAddress();

  if (!address) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="font-campton text-[#222021] font-semibold text-sm mb-1">
          Details
        </p>
        <p className="font-campton text-[#868686] text-xs">
          • Delivery window: Weekends 6 AM - 8 PM
        </p>
        <p className="font-campton text-[#868686] text-xs">
          • Fresh meals delivered weekly
        </p>
      </div>

      {address.dropoffOptions.map((dropoff) => (
        <div
          key={dropoff.id}
          className="border border-dashed border-gray-300 rounded-lg p-4"
        >
          {dropoff.photo && (
            <div className="flex items-center justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
            </div>
          )}
          <p className="font-campton text-center text-green-600 font-semibold text-sm mb-1">
            Upload Successful
          </p>
          <p className="font-campton text-center text-[#868686] text-xs">
            {dropoff.option}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DeliveryAddressSummary;
