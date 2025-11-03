"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: boolean;
}

const countryCodes = [
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+254", country: "KE", flag: "🇰🇪" },
  { code: "+233", country: "GH", flag: "🇬🇭" },
];

export function PhoneInput({
  value,
  onChange,
  className,
  error,
}: PhoneInputProps) {
  const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {/* Grouped Input Container */}
      <div
        className={cn(
          "flex items-center h-11 border rounded-md bg-white transition-colors overflow-hidden",
          "hover:border-[#E0E0E0]",
          error ? "border-red-500" : "border-[#E0E0E0]"
        )}
      >
        {/* Country Code Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 border-r border-[#E0E0E0] bg-[#F5F5F5] hover:bg-[#ECECEC] transition-colors h-full"
        >
          <span className="text-lg">{selectedCode.flag}</span>
          <span className="font-campton text-sm text-[#222021] font-medium">
            {selectedCode.code}
          </span>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 text-[#868686] transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={value}
          onChange={(e) => {
            // Only allow numbers
            const cleaned = e.target.value.replace(/\D/g, "");
            onChange(cleaned);
          }}
          placeholder="Enter phone number"
          className="flex-1 h-full px-4 font-campton text-sm text-[#222021] placeholder:text-[#C4C4C4] bg-transparent border-0 outline-none focus:outline-none focus:ring-0"
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown List */}
          <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-[#E0E0E0] rounded-lg shadow-lg z-20 py-1 max-h-60 overflow-y-auto">
            {countryCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  setSelectedCode(country);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFF9F0] transition-colors",
                  selectedCode.code === country.code && "bg-[#FFF9F0]"
                )}
              >
                <span className="text-lg">{country.flag}</span>
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-campton text-sm text-[#222021] font-medium">
                    {country.code}
                  </span>
                  <span className="font-campton text-xs text-[#868686]">
                    {country.country}
                  </span>
                </div>
                {selectedCode.code === country.code && (
                  <span className="text-[#FF7C36]">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
