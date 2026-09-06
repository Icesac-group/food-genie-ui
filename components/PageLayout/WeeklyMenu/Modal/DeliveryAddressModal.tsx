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
import { toast } from "sonner";

interface DeliveryAddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing?: boolean;
}

type ApartmentType = "House" | "Apartment" | "Office" | "Hotel" | "Other" | "";

const DeliveryAddressModal = ({
  open,
  onOpenChange,
  isEditing = false,
}: DeliveryAddressModalProps) => {
  const addAddress = useDeliveryStore((state) => state.addAddress);
  const getSelectedAddress = useDeliveryStore(
    (state) => state.getSelectedAddress
  );
  const updateAddress = useDeliveryStore((state) => state.updateAddress);

  const [formData, setFormData] = useState({
    apartmentType: "" as ApartmentType,
    address: "",
    city: "",
    province: "",
    postalCode: "",
    apartmentUnit: "",
    buzzerCode: "",
    additionalDetails: "",
    businessName: "",
    suiteFloorNumber: "",
    hotelName: "",
    roomFloorNumber: "",
    appSuiteFloor: "",
  });

  const [dropoffOptions, setDropoffOptions] = useState<DropoffOption[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dropoffModalOpen, setDropoffModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const apartmentTypes = ["House", "Apartment", "Office", "Hotel", "Other"];

  // Load existing address data when editing
  useEffect(() => {
    if (isEditing && open) {
      const address = getSelectedAddress();
      if (address) {
        setFormData({
          apartmentType: address.apartmentType as ApartmentType,
          address: address.address || "",
          city: address.city || "",
          province: address.province || "",
          postalCode: address.postalCode || "",
          apartmentUnit: address.apartmentUnit || "",
          buzzerCode: address.buzzerCode || "",
          additionalDetails: address.additionalDetails || "",
          businessName: address.businessName || "",
          suiteFloorNumber: address.suiteFloorNumber || "",
          hotelName: address.hotelName || "",
          roomFloorNumber: address.roomFloorNumber || "",
          appSuiteFloor: address.appSuiteFloor || "",
        });
        setDropoffOptions(address.dropoffOptions || []);
      }
    } else if (!isEditing && open) {
      // Reset form when creating new
      setFormData({
        apartmentType: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        apartmentUnit: "",
        buzzerCode: "",
        additionalDetails: "",
        businessName: "",
        suiteFloorNumber: "",
        hotelName: "",
        roomFloorNumber: "",
        appSuiteFloor: "",
      });
      setDropoffOptions([]);
      setErrors({});
    }
  }, [isEditing, open, getSelectedAddress]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleAddDropoff = (dropoff: DropoffOption) => {
    setDropoffOptions((prev) => {
      const exists = prev.find((o) => o.id === dropoff.id);
      if (exists) return prev.map((o) => o.id === dropoff.id ? dropoff : o);
      return [...prev, dropoff];
    });
    setDropoffModalOpen(false);
  };

  const handleDeleteDropoff = (id: string) => {
    setDropoffOptions((prev) => prev.filter((d) => d.id !== id));
  };

  const checkDeliveryAvailability = () => {
    if (formData.postalCode.length >= 3) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const validateDelivery = () => {
    const e: Record<string, string> = {};
    if (!formData.apartmentType) e.apartmentType = "Please select an address type";
    
    // Global fields
    if (!formData.address) e.address = "Address is required";
    if (!formData.city) e.city = "City is required";
    if (!formData.province) e.province = "Province is required";
    if (!formData.postalCode) e.postalCode = "Postal Code is required";

    // Specific fields
    if (formData.apartmentType === "Apartment") {
      if (!formData.apartmentUnit) e.apartmentUnit = "Apartment unit is required";
      if (!formData.buzzerCode) e.buzzerCode = "Buzzer code is required";
    }
    if (formData.apartmentType === "Office") {
      if (!formData.businessName) e.businessName = "Business name is required";
      if (!formData.suiteFloorNumber) e.suiteFloorNumber = "Suite/floor number is required";
    }
    if (formData.apartmentType === "Hotel") {
      if (!formData.hotelName) e.hotelName = "Hotel name is required";
      if (!formData.roomFloorNumber) e.roomFloorNumber = "Room/floor number is required";
    }
    if (formData.apartmentType === "Other") {
      if (!formData.appSuiteFloor) e.appSuiteFloor = "App/Suite/Floor number is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validateDelivery()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isEditing) {
      const address = getSelectedAddress();
      if (address) {
        updateAddress(address.id, {
          ...formData,
          dropoffOptions,
        });
        toast.success("Address updated successfully");
      }
    } else {
      addAddress({
        ...formData,
        dropoffOptions,
      });
      toast.success("Address added successfully");
    }

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
                Address Type<span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.apartmentType}
                onValueChange={(value) =>
                  handleInputChange("apartmentType", value)
                }
              >
                <SelectTrigger className={`w-full ${errors.apartmentType ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select address type" />
                </SelectTrigger>
                <SelectContent>
                  {apartmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.apartmentType && <p className="text-red-500 text-xs mt-1 font-campton">{errors.apartmentType}</p>}
            </div>

            {formData.apartmentType && (
              <>
                {/* Global Address Field */}
                <div>
                  <Label className="font-campton text-[#222021] text-sm mb-2 block">Address*</Label>
                  <Input placeholder="Enter street address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} className={`font-campton ${errors.address ? "border-red-500" : ""}`} />
                  {errors.address && <p className="text-red-500 text-xs mt-1 font-campton">{errors.address}</p>}
                </div>
                
                {/* House */}
                {formData.apartmentType === "House" && (
                  <div>
                    <Label className="font-campton text-[#222021] text-sm mb-2 block">Additional Details</Label>
                    <Input placeholder="Enter house number or name" value={formData.additionalDetails} onChange={(e) => handleInputChange("additionalDetails", e.target.value)} className="font-campton" />
                  </div>
                )}

                {/* Apartment */}
                {formData.apartmentType === "Apartment" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-campton text-[#222021] text-sm mb-2 block">Apartment Unit / Floor*</Label>
                      <Input placeholder="E.g 1208" value={formData.apartmentUnit} onChange={(e) => handleInputChange("apartmentUnit", e.target.value)} className={`font-campton ${errors.apartmentUnit ? "border-red-500" : ""}`} />
                      {errors.apartmentUnit && <p className="text-red-500 text-xs mt-1 font-campton">{errors.apartmentUnit}</p>}
                    </div>
                    <div>
                      <Label className="font-campton text-[#222021] text-sm mb-2 block">Buzzer Code*</Label>
                      <Input placeholder="E.g 1208#" value={formData.buzzerCode} onChange={(e) => handleInputChange("buzzerCode", e.target.value)} className={`font-campton ${errors.buzzerCode ? "border-red-500" : ""}`} />
                      {errors.buzzerCode && <p className="text-red-500 text-xs mt-1 font-campton">{errors.buzzerCode}</p>}
                    </div>
                  </div>
                )}

                {/* Office */}
                {formData.apartmentType === "Office" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-campton text-[#222021] text-sm mb-2 block">Business Name*</Label>
                      <Input placeholder="Enter business name" value={formData.businessName} onChange={(e) => handleInputChange("businessName", e.target.value)} className={`font-campton ${errors.businessName ? "border-red-500" : ""}`} />
                      {errors.businessName && <p className="text-red-500 text-xs mt-1 font-campton">{errors.businessName}</p>}
                    </div>
                    <div>
                      <Label className="font-campton text-[#222021] text-sm mb-2 block">Suite / Floor Number*</Label>
                      <Input placeholder="Enter suite / floor number" value={formData.suiteFloorNumber} onChange={(e) => handleInputChange("suiteFloorNumber", e.target.value)} className={`font-campton ${errors.suiteFloorNumber ? "border-red-500" : ""}`} />
                      {errors.suiteFloorNumber && <p className="text-red-500 text-xs mt-1 font-campton">{errors.suiteFloorNumber}</p>}
                    </div>
                  </div>
                )}

                {/* Hotel */}
                {formData.apartmentType === "Hotel" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-campton text-[#222021] text-sm mb-2 block">Hotel Name*</Label>
                      <Input placeholder="Enter hotel name" value={formData.hotelName} onChange={(e) => handleInputChange("hotelName", e.target.value)} className={`font-campton ${errors.hotelName ? "border-red-500" : ""}`} />
                      {errors.hotelName && <p className="text-red-500 text-xs mt-1 font-campton">{errors.hotelName}</p>}
                    </div>
                    <div>
                      <Label className="font-campton text-[#222021] text-sm mb-2 block">Room / Floor Number*</Label>
                      <Input placeholder="Enter room / floor number" value={formData.roomFloorNumber} onChange={(e) => handleInputChange("roomFloorNumber", e.target.value)} className={`font-campton ${errors.roomFloorNumber ? "border-red-500" : ""}`} />
                      {errors.roomFloorNumber && <p className="text-red-500 text-xs mt-1 font-campton">{errors.roomFloorNumber}</p>}
                    </div>
                  </div>
                )}

                {/* Other */}
                {formData.apartmentType === "Other" && (
                  <div>
                    <Label className="font-campton text-[#222021] text-sm mb-2 block">App / Suite / Floor*</Label>
                    <Input placeholder="Enter app / suite / floor" value={formData.appSuiteFloor} onChange={(e) => handleInputChange("appSuiteFloor", e.target.value)} className={`font-campton ${errors.appSuiteFloor ? "border-red-500" : ""}`} />
                    {errors.appSuiteFloor && <p className="text-red-500 text-xs mt-1 font-campton">{errors.appSuiteFloor}</p>}
                  </div>
                )}

                {/* Global City, Province, Postal Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-campton text-[#222021] text-sm mb-2 block">City*</Label>
                    <Input placeholder="Enter city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} className={`font-campton ${errors.city ? "border-red-500" : ""}`} />
                    {errors.city && <p className="text-red-500 text-xs mt-1 font-campton">{errors.city}</p>}
                  </div>
                  <div>
                    <Label className="font-campton text-[#222021] text-sm mb-2 block">Province*</Label>
                    <Select value={formData.province} onValueChange={(v) => handleInputChange("province", v)}>
                      <SelectTrigger className={`font-campton ${errors.province ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AB">Alberta</SelectItem>
                        <SelectItem value="BC">British Columbia</SelectItem>
                        <SelectItem value="MB">Manitoba</SelectItem>
                        <SelectItem value="NB">New Brunswick</SelectItem>
                        <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
                        <SelectItem value="NS">Nova Scotia</SelectItem>
                        <SelectItem value="ON">Ontario</SelectItem>
                        <SelectItem value="PE">Prince Edward Island</SelectItem>
                        <SelectItem value="QC">Quebec</SelectItem>
                        <SelectItem value="SK">Saskatchewan</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.province && <p className="text-red-500 text-xs mt-1 font-campton">{errors.province}</p>}
                  </div>
                </div>

                <div>
                  <Label className="font-campton text-[#222021] text-sm mb-2 block">Postal Code*</Label>
                  <Input placeholder="e.g. M1A 1A1" value={formData.postalCode} onChange={(e) => handleInputChange("postalCode", e.target.value)} onBlur={checkDeliveryAvailability} className={`font-campton uppercase ${errors.postalCode ? "border-red-500" : ""}`} />
                  {errors.postalCode && <p className="text-red-500 text-xs mt-1 font-campton">{errors.postalCode}</p>}
                </div>
              </>
            )}

            {/* Success Message */}
            {showSuccess && (
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg mt-4">
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
            {formData.apartmentType && (
              <div className="border-t border-gray-100 mt-6 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-recoleta text-[#222021] text-xl">
                    Dropoff Options
                  </h4>
                  <button
                    onClick={() => setDropoffModalOpen(true)}
                    className="text-[#FF7C36] font-campton text-sm font-medium flex items-center gap-1 hover:underline cursor-pointer"
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
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSave}
                className="bg-[#FF7C36] hover:bg-[#FF6B1F] active:bg-[#FF5500] text-white font-campton px-8 py-6 cursor-pointer"
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
