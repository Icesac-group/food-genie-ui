"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePaymentStore } from "@/store/paymentStore";
import { X } from "lucide-react";

interface CardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CardModal = ({ open, onOpenChange }: CardModalProps) => {
  const addCard = usePaymentStore((state) => state.addCard);

  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    country: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  const handleSave = () => {
    if (
      !formData.nameOnCard ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvc ||
      !formData.country
    ) {
      alert("Please fill in all fields");
      return;
    }

    addCard({
      ...formData,
      isDefault: true,
    });

    // Reset form
    setFormData({
      nameOnCard: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      country: "",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-campton text-[#222021] text-lg font-medium">
              Add a card
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6">
          {/* Info Banner */}
          <div className="mb-6 p-4 bg-[#F5F5F5] rounded-lg border border-[#E0E0E0]">
            <p className="font-campton text-[#868686] text-sm text-center">
              This card will be set as your default payment method for your
              future orders.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name and Card Number Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Name on card
                </Label>
                <Input
                  placeholder="John"
                  value={formData.nameOnCard}
                  onChange={(e) =>
                    handleInputChange("nameOnCard", e.target.value)
                  }
                  className="font-campton"
                />
              </div>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Card number
                </Label>
                <Input
                  placeholder="Enter card number"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "cardNumber",
                      formatCardNumber(e.target.value)
                    )
                  }
                  className="font-campton"
                  maxLength={19}
                />
              </div>
            </div>

            {/* Expiry and CVC Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  MM/YY
                </Label>
                <Input
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    handleInputChange(
                      "expiryDate",
                      formatExpiryDate(e.target.value)
                    )
                  }
                  className="font-campton"
                  maxLength={5}
                />
              </div>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  CVC
                </Label>
                <Input
                  placeholder="Enter CVC"
                  value={formData.cvc}
                  onChange={(e) =>
                    handleInputChange(
                      "cvc",
                      e.target.value.replace(/\D/g, "").substring(0, 3)
                    )
                  }
                  className="font-campton"
                  maxLength={3}
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <Label className="font-campton text-[#868686] text-sm mb-2 block">
                Country
              </Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger className="font-campton w-full">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ng">Nigeria</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="gb">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="gh">Ghana</SelectItem>
                  <SelectItem value="ke">Kenya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Terms */}
            <p className="font-campton text-[#868686] text-xs text-center mt-6">
              By continuing, you have read and accept the Terms and Conditions
              and Privacy Policy
            </p>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              className="w-full bg-[#FF7C36] hover:bg-[#FF6B1F] active:bg-[#FF5500] text-white font-campton py-6 text-base rounded-lg mt-4"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
