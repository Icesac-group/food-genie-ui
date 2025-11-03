"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Check, Plus } from "lucide-react";
import { useDeliveryStore, DropoffOption } from "@/store/deliveryStore";
import DropoffOptionsModal from "./DropoffOptionsModal";

interface DeliveryAddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing?: boolean;
}

const DeliveryAddressModal = ({
  open,
  onOpenChange,
  isEditing = false,
}: DeliveryAddressModalProps) => {
  const addAddress = useDeliveryStore((state) => state.addAddress);
  const getSelectedAddress = useDeliveryStore(
    (state) => state.getSelectedAddress
  );

  const [formData, setFormData] = useState({
    apartmentType: "",
    apartmentUnit: "",
    buildingName: "",
    buzzerCode: "",
  });

  const [dropoffOptions, setDropoffOptions] = useState<DropoffOption[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dropoffModalOpen, setDropoffModalOpen] = useState(false);

  const apartmentTypes = ["House", "Apartment", "Office", "Hotel", "Other"];

  // Load existing address data when editing
  useEffect(() => {
    if (isEditing && open) {
      const address = getSelectedAddress();
      if (address) {
        setFormData({
          apartmentType: address.apartmentType,
          apartmentUnit: address.apartmentUnit,
          buildingName: address.buildingName,
          buzzerCode: address.buzzerCode,
        });
        setDropoffOptions(address.dropoffOptions);
      }
    } else if (!isEditing && open) {
      // Reset form when creating new
      setFormData({
        apartmentType: "",
        apartmentUnit: "",
        buildingName: "",
        buzzerCode: "",
      });
      setDropoffOptions([]);
    }
  }, [isEditing, open, getSelectedAddress]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddDropoff = (dropoff: DropoffOption) => {
    setDropoffOptions((prev) => [...prev, dropoff]);
  };

  const handleDeleteDropoff = (id: string) => {
    setDropoffOptions((prev) => prev.filter((d) => d.id !== id));
  };

  const checkDeliveryAvailability = () => {
    // Simulate API check
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSave = () => {
    if (
      !formData.apartmentType ||
      !formData.apartmentUnit ||
      !formData.buildingName
    ) {
      alert("Please fill in all required fields");
      return;
    }

    addAddress({
      ...formData,
      dropoffOptions,
    });

    // Reset form
    setFormData({
      apartmentType: "",
      apartmentUnit: "",
      buildingName: "",
      buzzerCode: "",
    });
    setDropoffOptions([]);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-recoleta text-2xl text-[#222021]">
              {isEditing ? "Edit Delivery Address" : "Add Delivery Address"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Apartment Type */}
            <div>
              <Label className="font-campton text-[#222021] text-sm mb-2 block">
                Apartment Type<span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.apartmentType}
                onValueChange={(value) =>
                  handleInputChange("apartmentType", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select apartment type" />
                </SelectTrigger>
                <SelectContent>
                  {apartmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Apartment Unit and Building Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-campton text-[#222021] text-sm mb-2 block">
                  Apartment Unit / Floor<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="E.g 1208"
                  value={formData.apartmentUnit}
                  onChange={(e) =>
                    handleInputChange("apartmentUnit", e.target.value)
                  }
                  className="font-campton"
                />
              </div>
              <div>
                <Label className="font-campton text-[#222021] text-sm mb-2 block">
                  Building Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="E.g Central tower"
                  value={formData.buildingName}
                  onChange={(e) =>
                    handleInputChange("buildingName", e.target.value)
                  }
                  className="font-campton"
                />
              </div>
            </div>

            {/* Buzzer Code */}
            <div>
              <Label className="font-campton text-[#222021] text-sm mb-2 block">
                Buzzer Code<span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="E.g 1208#"
                value={formData.buzzerCode}
                onChange={(e) =>
                  handleInputChange("buzzerCode", e.target.value)
                }
                className="font-campton"
                onBlur={checkDeliveryAvailability}
              />
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-campton text-green-700 font-semibold text-sm">
                      Great news!
                    </p>
                    <p className="font-campton text-green-600 text-sm">
                      We deliver to your area.
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowSuccess(false)}>
                  <X className="w-5 h-5 text-green-600" />
                </button>
              </div>
            )}

            {/* Dropoff Options */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-recoleta text-[#222021] text-xl">
                  Dropoff Options
                </h4>
                <button
                  onClick={() => setDropoffModalOpen(true)}
                  className="text-[#FF7C36] font-campton text-sm font-medium flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-4 h-4" />
                  Add a dropoff
                </button>
              </div>

              {/* Display added dropoff options */}
              {dropoffOptions.length > 0 && (
                <div className="space-y-3">
                  {dropoffOptions.map((dropoff) => (
                    <div
                      key={dropoff.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-campton text-[#222021] font-semibold text-sm mb-1">
                            {dropoff.option}
                          </p>
                          <p className="font-campton text-[#868686] text-xs mb-2">
                            {dropoff.instructions}
                          </p>
                          {dropoff.photo && (
                            <div className="flex items-center gap-2 text-green-600">
                              <Check className="w-4 h-4" />
                              <span className="font-campton text-xs">
                                Photo uploaded
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteDropoff(dropoff.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton px-8 py-6"
              >
                {isEditing ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dropoff Options Modal */}
      <DropoffOptionsModal
        open={dropoffModalOpen}
        onOpenChange={setDropoffModalOpen}
        onSave={handleAddDropoff}
      />
    </>
  );
};

export default DeliveryAddressModal;
