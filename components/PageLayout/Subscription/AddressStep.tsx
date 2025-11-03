"use client";
import React, { useState } from "react";
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
import { ArrowLeft, CheckCircle, X, Trash2, Edit } from "lucide-react";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { toast } from "sonner";
import DropoffOptionsModal from "@/components/PageLayout/WeeklyMenu/Modal/DropoffOptionsModal";

type ApartmentType = "house" | "apartment" | "office" | "hotel" | "other" | "";

interface DropoffOption {
  id: string;
  deliveryWindow: string;
  deliveryNotes: string;
  uploadedFile: File | null;
}

const AddressStep = () => {
  const previousStep = useSubscriptionStore((state) => state.previousStep);
  const nextStep = useSubscriptionStore((state) => state.nextStep);
  const setDeliveryAddress = useSubscriptionStore(
    (state) => state.setDeliveryAddress
  );

  const [apartmentType, setApartmentType] = useState<ApartmentType>("");
  const [showDeliveryMessage, setShowDeliveryMessage] = useState(false);
  const [isDropoffModalOpen, setIsDropoffModalOpen] = useState(false);
  const [dropoffOptions, setDropoffOptions] = useState<DropoffOption[]>([]);
  const [editingDropoffId, setEditingDropoffId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Common fields
  const [formData, setFormData] = useState({
    // House
    additionalDetails: "",
    streetAddress: "",
    // Apartment
    apartmentUnit: "",
    buildingName: "",
    buzzerCode: "",
    // Office
    businessName: "",
    suiteFloorNumber: "",
    // Hotel
    hotelName: "",
    roomFloorNumber: "",
    // Other
    appSuiteFloor: "",
    businessBuildingName: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Show delivery message when required fields are filled
    if (apartmentType && value) {
      setShowDeliveryMessage(true);
    }
  };

  const handleAddDropoff = () => {
    setEditingDropoffId(null);
    setIsDropoffModalOpen(true);
  };

  const handleEditDropoff = (id: string) => {
    setEditingDropoffId(id);
    setIsDropoffModalOpen(true);
  };

  const handleSaveDropoff = (data: {
    deliveryWindow: string;
    deliveryNotes: string;
    uploadedFile: File | null;
  }) => {
    if (editingDropoffId) {
      // Edit existing dropoff
      setDropoffOptions((prev) =>
        prev.map((option) =>
          option.id === editingDropoffId ? { ...option, ...data } : option
        )
      );
      toast.success("Dropoff option updated");
    } else {
      // Add new dropoff
      const newDropoff: DropoffOption = {
        id: Date.now().toString(),
        ...data,
      };
      setDropoffOptions((prev) => [...prev, newDropoff]);
      toast.success("Dropoff option added");
    }
    setIsDropoffModalOpen(false);
  };

  const handleDeleteDropoff = (id: string) => {
    setDropoffOptions((prev) => prev.filter((option) => option.id !== id));
    toast.success("Dropoff option removed");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!apartmentType) {
      newErrors.apartmentType = "Please select an apartment type";
    }

    // Validation based on type
    if (apartmentType === "house") {
      if (!formData.streetAddress) {
        newErrors.streetAddress = "Street address is required";
      }
    } else if (apartmentType === "apartment") {
      if (!formData.apartmentUnit) {
        newErrors.apartmentUnit = "Apartment unit is required";
      }
      if (!formData.buildingName) {
        newErrors.buildingName = "Building name is required";
      }
      if (!formData.buzzerCode) {
        newErrors.buzzerCode = "Buzzer code is required";
      }
    } else if (apartmentType === "office") {
      if (!formData.businessName) {
        newErrors.businessName = "Business name is required";
      }
      if (!formData.suiteFloorNumber) {
        newErrors.suiteFloorNumber = "Suite/floor number is required";
      }
    } else if (apartmentType === "hotel") {
      if (!formData.hotelName) {
        newErrors.hotelName = "Hotel name is required";
      }
      if (!formData.roomFloorNumber) {
        newErrors.roomFloorNumber = "Room/floor number is required";
      }
    } else if (apartmentType === "other") {
      if (!formData.appSuiteFloor) {
        newErrors.appSuiteFloor = "App/Suite/Floor number is required";
      }
      if (!formData.businessBuildingName) {
        newErrors.businessBuildingName = "Business/Building name is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Save address data
      const addressData = {
        apartmentType,
        ...formData,
        dropoffOptions,
      };
      setDeliveryAddress(JSON.stringify(addressData));
      nextStep();
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  // Get the dropoff being edited
  const editingDropoff = editingDropoffId
    ? dropoffOptions.find((opt) => opt.id === editingDropoffId)
    : undefined;

  return (
    <>
      <div className="p-6 md:p-12 max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={previousStep}
          className="flex items-center gap-2 text-[#868686] hover:text-[#FF7C36] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-campton text-sm">Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-calligraffitti text-[#FF7C36] text-lg mb-2">
            One Meal at a Time!
          </p>
          <h1 className="font-recoleta text-[#222021] text-3xl md:text-4xl mb-3">
            Delivery Address
          </h1>
          <p className="font-campton text-[#868686] text-sm">
            We'll use this address for all your meal deliveries
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Apartment Type Selector */}
          <div>
            <Label className="font-campton text-[#868686] text-sm mb-2 block">
              Apartment Type*
            </Label>
            <Select
              value={apartmentType}
              onValueChange={(value: ApartmentType) => {
                setApartmentType(value);
                setShowDeliveryMessage(false);
              }}
            >
              <SelectTrigger
                className={`font-campton w-full ${
                  errors.apartmentType ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select apartment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.apartmentType && (
              <p className="text-red-500 text-xs mt-1 font-campton">
                {errors.apartmentType}
              </p>
            )}
          </div>

          {/* House Fields */}
          {apartmentType === "house" && (
            <>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Additional Details*
                </Label>
                <Input
                  placeholder="Enter house number or name"
                  value={formData.additionalDetails}
                  onChange={(e) =>
                    handleInputChange("additionalDetails", e.target.value)
                  }
                  className="font-campton"
                />
              </div>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Street Address*
                </Label>
                <Input
                  placeholder="Enter street address"
                  value={formData.streetAddress}
                  onChange={(e) =>
                    handleInputChange("streetAddress", e.target.value)
                  }
                  className={`font-campton ${
                    errors.streetAddress ? "border-red-500" : ""
                  }`}
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.streetAddress}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Apartment Fields */}
          {apartmentType === "apartment" && (
            <>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Apartment Unit / Floor*
                </Label>
                <Input
                  placeholder="E.g 1208"
                  value={formData.apartmentUnit}
                  onChange={(e) =>
                    handleInputChange("apartmentUnit", e.target.value)
                  }
                  className={`font-campton ${
                    errors.apartmentUnit ? "border-red-500" : ""
                  }`}
                />
                {errors.apartmentUnit && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.apartmentUnit}
                  </p>
                )}
              </div>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Building Name*
                </Label>
                <Input
                  placeholder="E.g. Central tower"
                  value={formData.buildingName}
                  onChange={(e) =>
                    handleInputChange("buildingName", e.target.value)
                  }
                  className={`font-campton ${
                    errors.buildingName ? "border-red-500" : ""
                  }`}
                />
                {errors.buildingName && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.buildingName}
                  </p>
                )}
              </div>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Buzzer Code*
                </Label>
                <Input
                  placeholder="E.g 1208#"
                  value={formData.buzzerCode}
                  onChange={(e) =>
                    handleInputChange("buzzerCode", e.target.value)
                  }
                  className={`font-campton ${
                    errors.buzzerCode ? "border-red-500" : ""
                  }`}
                />
                {errors.buzzerCode && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.buzzerCode}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Office Fields */}
          {apartmentType === "office" && (
            <>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Business Name*
                </Label>
                <Input
                  placeholder="Enter business name"
                  value={formData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                  className={`font-campton ${
                    errors.businessName ? "border-red-500" : ""
                  }`}
                />
                {errors.businessName && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.businessName}
                  </p>
                )}
              </div>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Suite / Floor Number*
                </Label>
                <Input
                  placeholder="Enter suite / floor number"
                  value={formData.suiteFloorNumber}
                  onChange={(e) =>
                    handleInputChange("suiteFloorNumber", e.target.value)
                  }
                  className={`font-campton ${
                    errors.suiteFloorNumber ? "border-red-500" : ""
                  }`}
                />
                {errors.suiteFloorNumber && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.suiteFloorNumber}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Hotel Fields */}
          {apartmentType === "hotel" && (
            <>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Hotel Name*
                </Label>
                <Input
                  placeholder="Enter hotel name"
                  value={formData.hotelName}
                  onChange={(e) =>
                    handleInputChange("hotelName", e.target.value)
                  }
                  className={`font-campton ${
                    errors.hotelName ? "border-red-500" : ""
                  }`}
                />
                {errors.hotelName && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.hotelName}
                  </p>
                )}
              </div>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Room / Floor Number*
                </Label>
                <Input
                  placeholder="Enter suite/floor number"
                  value={formData.roomFloorNumber}
                  onChange={(e) =>
                    handleInputChange("roomFloorNumber", e.target.value)
                  }
                  className={`font-campton ${
                    errors.roomFloorNumber ? "border-red-500" : ""
                  }`}
                />
                {errors.roomFloorNumber && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.roomFloorNumber}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Other Fields */}
          {apartmentType === "other" && (
            <>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  App / Suite Floor Number*
                </Label>
                <Input
                  placeholder="Enter hotel name"
                  value={formData.appSuiteFloor}
                  onChange={(e) =>
                    handleInputChange("appSuiteFloor", e.target.value)
                  }
                  className={`font-campton ${
                    errors.appSuiteFloor ? "border-red-500" : ""
                  }`}
                />
                {errors.appSuiteFloor && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.appSuiteFloor}
                  </p>
                )}
              </div>
              <div>
                <Label className="font-campton text-[#868686] text-sm mb-2 block">
                  Business / Building Name*
                </Label>
                <Input
                  placeholder="E.g. Central tower"
                  value={formData.businessBuildingName}
                  onChange={(e) =>
                    handleInputChange("businessBuildingName", e.target.value)
                  }
                  className={`font-campton ${
                    errors.businessBuildingName ? "border-red-500" : ""
                  }`}
                />
                {errors.businessBuildingName && (
                  <p className="text-red-500 text-xs mt-1 font-campton">
                    {errors.businessBuildingName}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Delivery Available Message */}
          {showDeliveryMessage && (
            <div className="flex items-center justify-between p-4 bg-[#E8F5E9] border-2 border-[#4CAF50] rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
                <div>
                  <p className="font-campton text-[#4CAF50] text-sm font-semibold">
                    Great news!
                  </p>
                  <p className="font-campton text-[#4CAF50] text-xs">
                    We deliver to your area.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeliveryMessage(false)}
                className="text-[#4CAF50] hover:text-[#388E3C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Dropoff Options Section */}
          {showDeliveryMessage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-recoleta text-[#222021] text-lg">
                  Dropoff Options
                </h3>
                <button
                  onClick={handleAddDropoff}
                  className="text-[#FF7C36] font-campton text-sm hover:underline flex items-center gap-1"
                >
                  <span>+ Add a dropoff</span>
                </button>
              </div>

              {/* Display Saved Dropoff Options */}
              {dropoffOptions.length > 0 && (
                <div className="space-y-3">
                  {dropoffOptions.map((option) => (
                    <div
                      key={option.id}
                      className="border border-[#E0E0E0] rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-campton text-[#222021] text-sm font-semibold mb-2">
                            Details
                          </p>
                          <p className="font-campton text-[#868686] text-xs">
                            • Delivery window: {option.deliveryWindow}
                          </p>
                          <p className="font-campton text-[#868686] text-xs">
                            • {option.deliveryNotes}
                          </p>
                        </div>
                        <button
                          onClick={() => handleEditDropoff(option.id)}
                          className="text-[#868686] hover:text-[#FF7C36]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Uploaded File */}
                      {option.uploadedFile && (
                        <div className="border-2 border-dashed border-[#4CAF50] rounded-lg p-3 bg-[#F1F8F4]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-6 h-6 text-[#4CAF50]" />
                              <div>
                                <p className="font-campton text-[#222021] text-sm font-semibold">
                                  Upload Successful
                                </p>
                                <p className="font-campton text-[#868686] text-xs">
                                  {option.uploadedFile.name} |{" "}
                                  {(option.uploadedFile.size / 1024).toFixed(0)}{" "}
                                  KB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteDropoff(option.id)}
                              className="w-8 h-8 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="w-full bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton py-6 text-base mt-6"
          >
            Continue
          </Button>
        </div>
      </div>

      {/* Dropoff Option Modal */}

      <DropoffOptionsModal
        open={isDropoffModalOpen}
        onOpenChange={setIsDropoffModalOpen}
        onSave={handleAddDropoff}
      />
    </>
  );
};

export default AddressStep;
