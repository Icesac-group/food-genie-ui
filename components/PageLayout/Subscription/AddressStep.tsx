"use client";
import React, { useState, useEffect } from "react";
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
import { ArrowLeft, Truck, Store, CheckCircle, Trash2, MapPin, Clock } from "lucide-react";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { useDeliveryConfigStore } from "@/store/deliveryConfigStore";
import { toast } from "sonner";
import DropoffOptionsModal from "@/components/PageLayout/WeeklyMenu/Modal/DropoffOptionsModal";
import { DropoffOption } from "@/store/deliveryStore";

type ApartmentType = "house" | "apartment" | "office" | "hotel" | "other" | "";

const AddressStep = () => {
  const previousStep = useSubscriptionStore((s) => s.previousStep);
  const nextStep = useSubscriptionStore((s) => s.nextStep);
  const setDeliveryAddress = useSubscriptionStore((s) => s.setDeliveryAddress);
  const fulfillmentMethod = useSubscriptionStore((s) => s.fulfillmentMethod);
  const setFulfillmentMethod = useSubscriptionStore((s) => s.setFulfillmentMethod);
  const selectedPickupLocationId = useSubscriptionStore((s) => s.selectedPickupLocationId);
  const setSelectedPickupLocationId = useSubscriptionStore((s) => s.setSelectedPickupLocationId);

  const pickupEnabled = useDeliveryConfigStore((s) => s.pickupEnabled);
  const setPickupEnabled = useDeliveryConfigStore((s) => s.setPickupEnabled);
  const getActivePickupLocations = useDeliveryConfigStore((s) => s.getActivePickupLocations);
  const activePickupLocations = getActivePickupLocations();

  // Ensure pickup is always enabled so the toggle works
  useEffect(() => {
    if (!pickupEnabled) setPickupEnabled(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Delivery form state ────────────────────────────────────────────────────
  const [apartmentType, setApartmentType] = useState<ApartmentType>("");
  const [isDropoffModalOpen, setIsDropoffModalOpen] = useState(false);
  const [dropoffOptions, setDropoffOptions] = useState<DropoffOption[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSaveDropoff = (data: DropoffOption) => {
    setDropoffOptions((prev) => {
      const exists = prev.find((o) => o.id === data.id);
      if (exists) return prev.map((o) => o.id === data.id ? data : o);
      return [...prev, data];
    });
    setIsDropoffModalOpen(false);
    toast.success("Dropoff option saved");
  };

  const handleDeleteDropoff = (id: string) => {
    setDropoffOptions((prev) => prev.filter((o) => o.id !== id));
    toast.success("Dropoff option removed");
  };

  // ── Validation & submit ────────────────────────────────────────────────────
  const validateDelivery = () => {
    const e: Record<string, string> = {};
    if (!apartmentType) e.apartmentType = "Please select an address type";
    
    // Global fields
    if (!formData.address) e.address = "Address is required";
    if (!formData.city) e.city = "City is required";
    if (!formData.province) e.province = "Province is required";
    if (!formData.postalCode) e.postalCode = "Postal Code is required";

    // Specific fields
    if (apartmentType === "apartment") {
      if (!formData.apartmentUnit) e.apartmentUnit = "Apartment unit is required";
      if (!formData.buzzerCode) e.buzzerCode = "Buzzer code is required";
    }
    if (apartmentType === "office") {
      if (!formData.businessName) e.businessName = "Business name is required";
      if (!formData.suiteFloorNumber) e.suiteFloorNumber = "Suite/floor number is required";
    }
    if (apartmentType === "hotel") {
      if (!formData.hotelName) e.hotelName = "Hotel name is required";
      if (!formData.roomFloorNumber) e.roomFloorNumber = "Room/floor number is required";
    }
    if (apartmentType === "other") {
      if (!formData.appSuiteFloor) e.appSuiteFloor = "App/Suite/Floor number is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (fulfillmentMethod === "delivery") {
      if (!validateDelivery()) { toast.error("Please fill in all required fields"); return; }
      setDeliveryAddress(JSON.stringify({ apartmentType, ...formData, dropoffOptions }));
      nextStep();
    } else {
      if (!selectedPickupLocationId) { toast.error("Please select a pickup location"); return; }
      nextStep();
    }
  };

  return (
    <>
      <div className="p-6 md:p-12 max-w-2xl mx-auto">
        {/* Back */}
        <button onClick={previousStep} className="flex items-center gap-2 text-[#868686] hover:text-[#FF7C36] active:text-[#FF6B1F] transition-colors mb-6 min-h-[44px]">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-campton text-sm">Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-calligraffitti text-[#FF7C36] text-lg mb-2">Almost done!</p>
          <h1 className="font-recoleta text-[#222021] text-3xl md:text-4xl mb-3">
            How would you like to receive your order?
          </h1>
          <p className="font-campton text-[#868686] text-sm">
            Choose delivery to your address, or pick up from one of our locations.
          </p>
        </div>

        {/* ── Fulfillment Method Selector ── */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* Delivery option */}
          <button
            onClick={() => setFulfillmentMethod("delivery")}
            className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all min-h-[120px] ${fulfillmentMethod === "delivery"
                ? "border-[#FF7C36] bg-[#FFF9F0] shadow-md"
                : "border-[#E0E0E0] bg-white hover:border-[#FFB88C] hover:shadow-sm active:bg-[#FFF9F0]"
              }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${fulfillmentMethod === "delivery" ? "bg-[#FF7C36]" : "bg-[#F0F0F0]"}`}>
              <Truck className={`w-6 h-6 ${fulfillmentMethod === "delivery" ? "text-white" : "text-[#868686]"}`} />
            </div>
            <p className={`font-recoleta text-base font-medium ${fulfillmentMethod === "delivery" ? "text-[#FF7C36]" : "text-[#222021]"}`}>
              Delivery
            </p>
            <p className="font-campton text-[#868686] text-xs text-center">
              Delivered to your address
            </p>
            {fulfillmentMethod === "delivery" && (
              <span className="mt-1 bg-[#FF7C36] text-white text-xs font-campton px-2 py-0.5 rounded-full">Selected</span>
            )}
          </button>

          {/* Pickup option */}
          <button
            onClick={() => setFulfillmentMethod("pickup")}
            className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all min-h-[120px] ${fulfillmentMethod === "pickup"
                ? "border-[#FF7C36] bg-[#FFF9F0] shadow-md"
                : "border-[#E0E0E0] bg-white hover:border-[#FFB88C] hover:shadow-sm active:bg-[#FFF9F0]"
              }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${fulfillmentMethod === "pickup" ? "bg-[#FF7C36]" : "bg-[#F0F0F0]"}`}>
              <Store className={`w-6 h-6 ${fulfillmentMethod === "pickup" ? "text-white" : "text-[#868686]"}`} />
            </div>
            <p className={`font-recoleta text-base font-medium ${fulfillmentMethod === "pickup" ? "text-[#FF7C36]" : "text-[#222021]"}`}>
              Pickup
            </p>
            <p className="font-campton text-[#868686] text-xs text-center">
              Pick up &mdash; no delivery fee
            </p>
            {fulfillmentMethod === "pickup" && (
              <span className="mt-1 bg-[#FF7C36] text-white text-xs font-campton px-2 py-0.5 rounded-full">Selected</span>
            )}
          </button>
        </div>

        {/* ── Delivery: Address Form ── */}
        {fulfillmentMethod === "delivery" && (
          <div className="space-y-4">
            <h2 className="font-recoleta text-[#222021] text-lg mb-2">Delivery Address</h2>

            {/* Apartment Type */}
            <div>
              <Label className="font-campton text-[#868686] text-sm mb-2 block">Address Type*</Label>
              <Select value={apartmentType} onValueChange={(v: ApartmentType) => { setApartmentType(v); }}>
                <SelectTrigger className={`font-campton w-full ${errors.apartmentType ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select address type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.apartmentType && <p className="text-red-500 text-xs mt-1 font-campton">{errors.apartmentType}</p>}
            </div>

            {apartmentType && (
              <>
                {/* Global Address Field */}
                <div>
                  <Label className="font-campton text-[#868686] text-sm mb-2 block">Address*</Label>
                  <Input placeholder="Enter street address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} className={`font-campton ${errors.address ? "border-red-500" : ""}`} />
                  {errors.address && <p className="text-red-500 text-xs mt-1 font-campton">{errors.address}</p>}
                </div>
                
                {/* House */}
                {apartmentType === "house" && (
                  <div>
                    <Label className="font-campton text-[#868686] text-sm mb-2 block">Additional Details</Label>
                    <Input placeholder="Enter house number or name" value={formData.additionalDetails} onChange={(e) => handleInputChange("additionalDetails", e.target.value)} className="font-campton" />
                  </div>
                )}

                {/* Apartment */}
                {apartmentType === "apartment" && (
                  <>
                    <div>
                      <Label className="font-campton text-[#868686] text-sm mb-2 block">Apartment Unit / Floor*</Label>
                      <Input placeholder="E.g 1208" value={formData.apartmentUnit} onChange={(e) => handleInputChange("apartmentUnit", e.target.value)} className={`font-campton ${errors.apartmentUnit ? "border-red-500" : ""}`} />
                      {errors.apartmentUnit && <p className="text-red-500 text-xs mt-1 font-campton">{errors.apartmentUnit}</p>}
                    </div>
                    <div>
                      <Label className="font-campton text-[#868686] text-sm mb-2 block">Buzzer Code*</Label>
                      <Input placeholder="E.g 1208#" value={formData.buzzerCode} onChange={(e) => handleInputChange("buzzerCode", e.target.value)} className={`font-campton ${errors.buzzerCode ? "border-red-500" : ""}`} />
                      {errors.buzzerCode && <p className="text-red-500 text-xs mt-1 font-campton">{errors.buzzerCode}</p>}
                    </div>
                  </>
                )}

                {/* Office */}
                {apartmentType === "office" && (
                  <>
                    <div>
                      <Label className="font-campton text-[#868686] text-sm mb-2 block">Business Name*</Label>
                      <Input placeholder="Enter business name" value={formData.businessName} onChange={(e) => handleInputChange("businessName", e.target.value)} className={`font-campton ${errors.businessName ? "border-red-500" : ""}`} />
                      {errors.businessName && <p className="text-red-500 text-xs mt-1 font-campton">{errors.businessName}</p>}
                    </div>
                    <div>
                      <Label className="font-campton text-[#868686] text-sm mb-2 block">Suite / Floor Number*</Label>
                      <Input placeholder="Enter suite / floor number" value={formData.suiteFloorNumber} onChange={(e) => handleInputChange("suiteFloorNumber", e.target.value)} className={`font-campton ${errors.suiteFloorNumber ? "border-red-500" : ""}`} />
                      {errors.suiteFloorNumber && <p className="text-red-500 text-xs mt-1 font-campton">{errors.suiteFloorNumber}</p>}
                    </div>
                  </>
                )}

                {/* Hotel */}
                {apartmentType === "hotel" && (
                  <>
                    <div>
                      <Label className="font-campton text-[#868686] text-sm mb-2 block">Hotel Name*</Label>
                      <Input placeholder="Enter hotel name" value={formData.hotelName} onChange={(e) => handleInputChange("hotelName", e.target.value)} className={`font-campton ${errors.hotelName ? "border-red-500" : ""}`} />
                      {errors.hotelName && <p className="text-red-500 text-xs mt-1 font-campton">{errors.hotelName}</p>}
                    </div>
                    <div>
                      <Label className="font-campton text-[#868686] text-sm mb-2 block">Room / Floor Number*</Label>
                      <Input placeholder="Enter room / floor number" value={formData.roomFloorNumber} onChange={(e) => handleInputChange("roomFloorNumber", e.target.value)} className={`font-campton ${errors.roomFloorNumber ? "border-red-500" : ""}`} />
                      {errors.roomFloorNumber && <p className="text-red-500 text-xs mt-1 font-campton">{errors.roomFloorNumber}</p>}
                    </div>
                  </>
                )}

                {/* Other */}
                {apartmentType === "other" && (
                  <div>
                    <Label className="font-campton text-[#868686] text-sm mb-2 block">App / Suite / Floor*</Label>
                    <Input placeholder="Enter app / suite / floor" value={formData.appSuiteFloor} onChange={(e) => handleInputChange("appSuiteFloor", e.target.value)} className={`font-campton ${errors.appSuiteFloor ? "border-red-500" : ""}`} />
                    {errors.appSuiteFloor && <p className="text-red-500 text-xs mt-1 font-campton">{errors.appSuiteFloor}</p>}
                  </div>
                )}

                {/* Global City, Province, Postal Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-campton text-[#868686] text-sm mb-2 block">City*</Label>
                    <Input placeholder="Enter city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} className={`font-campton ${errors.city ? "border-red-500" : ""}`} />
                    {errors.city && <p className="text-red-500 text-xs mt-1 font-campton">{errors.city}</p>}
                  </div>
                  <div>
                    <Label className="font-campton text-[#868686] text-sm mb-2 block">Province*</Label>
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
                  <Label className="font-campton text-[#868686] text-sm mb-2 block">Postal Code*</Label>
                  <Input placeholder="e.g. M1A 1A1" value={formData.postalCode} onChange={(e) => handleInputChange("postalCode", e.target.value)} className={`font-campton uppercase ${errors.postalCode ? "border-red-500" : ""}`} />
                  {errors.postalCode && <p className="text-red-500 text-xs mt-1 font-campton">{errors.postalCode}</p>}
                </div>

                {/* Dropoff options */}
                <div className="pt-2 border-t border-gray-100 mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-campton text-[#222021] text-sm font-semibold">Dropoff Options</p>
                    <button onClick={() => setIsDropoffModalOpen(true)} className="font-campton text-[#FF7C36] text-xs hover:text-[#FF6B1F] hover:underline active:text-[#FF5500] min-h-[36px]">+ Add dropoff option</button>
                  </div>
                  {dropoffOptions.length > 0 && (
                    <div className="space-y-2">
                      {dropoffOptions.map((opt) => (
                        <div key={opt.id} className="flex items-center justify-between p-3 bg-[#F9F9F9] rounded-lg">
                          <div>
                            <p className="font-campton text-[#222021] text-xs font-medium">{opt.option}</p>
                            <p className="font-campton text-[#868686] text-xs">{opt.instructions}</p>
                          </div>
                          <button onClick={() => handleDeleteDropoff(opt.id)} className="text-[#868686] hover:text-red-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Pickup: Location Picker ── */}
        {fulfillmentMethod === "pickup" && (
          <div>
            <h2 className="font-recoleta text-[#222021] text-lg mb-4">Select Pickup Location</h2>
            {activePickupLocations.length === 0 ? (
              <div className="border border-[#E0E0E0] rounded-xl p-8 text-center">
                <Store className="w-8 h-8 text-[#E0E0E0] mx-auto mb-2" />
                <p className="font-campton text-[#9B9B9B] text-sm">No pickup locations are currently available.</p>
                <button onClick={() => setFulfillmentMethod("delivery")} className="font-campton text-[#FF7C36] text-sm underline mt-2">Switch to delivery instead</button>
              </div>
            ) : (
              <div className="space-y-3">
                {activePickupLocations.map((location) => {
                  const isSelected = selectedPickupLocationId === location.id;
                  return (
                    <button
                      key={location.id}
                      onClick={() => setSelectedPickupLocationId(location.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected
                          ? "border-[#FF7C36] bg-[#FFF9F0] shadow-md"
                          : "border-[#E0E0E0] bg-white hover:border-[#FFB88C] hover:shadow-sm active:bg-[#FFF9F0]"
                        }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`font-recoleta text-base font-medium ${isSelected ? "text-[#FF7C36]" : "text-[#222021]"}`}>
                              {location.name}
                            </p>
                            {isSelected && <CheckCircle className="w-4 h-4 text-[#FF7C36] flex-shrink-0" />}
                          </div>
                          <div className="flex items-start gap-1.5 mb-2">
                            <MapPin className="w-3.5 h-3.5 text-[#868686] flex-shrink-0 mt-0.5" />
                            <p className="font-campton text-[#868686] text-xs">{location.address}</p>
                          </div>
                          <div className="flex items-start gap-1.5 mb-2">
                            <Clock className="w-3.5 h-3.5 text-[#868686] flex-shrink-0 mt-0.5" />
                            <p className="font-campton text-[#868686] text-xs">{location.pickupDays}</p>
                          </div>
                          {location.instructions && (
                            <div className="bg-[#F9F9F9] rounded-lg px-3 py-2 mt-2">
                              <p className="font-campton text-[#868686] text-xs">
                                <span className="font-semibold text-[#222021]">Instructions: </span>
                                {location.instructions}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <span className="font-campton text-green-600 text-sm font-semibold">FREE</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Continue */}
        <Button
          onClick={handleContinue}
          className="w-full bg-[#FF7C36] hover:bg-[#FF6B1F] active:bg-[#FF5500] text-white font-campton py-6 text-sm mt-8"
        >
          Continue to Payment
        </Button>
      </div>

      <DropoffOptionsModal
        open={isDropoffModalOpen}
        onOpenChange={setIsDropoffModalOpen}
        onSave={handleSaveDropoff}
      />
    </>
  );
};

export default AddressStep;
