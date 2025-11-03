"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { toast } from "sonner";
import Link from "next/link";
import { PhoneInput } from "@/components/ui/phone-input";

const RegisterStep = () => {
  const previousStep = useSubscriptionStore((state) => state.previousStep);
  const nextStep = useSubscriptionStore((state) => state.nextStep);
  const setRegistrationData = useSubscriptionStore(
    (state) => state.setRegistrationData
  );
  const email = useSubscriptionStore((state) => state.email);
  const phoneNumber = useSubscriptionStore((state) => state.phoneNumber);

  const [formData, setFormData] = useState({
    email: email || "",
    phoneNumber: phoneNumber || "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password validation
  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };
    return requirements;
  };

  const passwordRequirements = validatePassword(formData.password);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Please enter a valid email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!Object.values(passwordRequirements).every(Boolean)) {
      newErrors.password = "Password does not meet all requirements";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!formData.agreedToTerms) {
      newErrors.terms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setRegistrationData({
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        agreedToTerms: formData.agreedToTerms,
      });
      nextStep();
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  const handleGoogleSignIn = () => {
    // Google OAuth implementation
    toast.info("Google sign-in will be implemented");
  };

  return (
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
          Create Your Account
        </h1>
        <p className="font-campton text-[#868686] text-sm">
          Join thousands of food lovers getting fresh meals weekly
        </p>
      </div>

      {/* Google Sign In */}
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full mb-6 font-campton py-6 border-2 hover:bg-gray-50"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E0E0E0]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-campton text-[#868686] text-sm">
            or sign up with email
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Email */}
        <div>
          <Label className="font-campton text-[#222021] text-sm mb-2 block">
            Email Address*
          </Label>
          <Input
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`font-campton ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 font-campton">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <Label className="font-campton text-[#222021] text-sm mb-2 block">
            Phone Number*
          </Label>
          <PhoneInput
            value={formData.phoneNumber}
            onChange={(value) => handleInputChange("phoneNumber", value)}
            error={!!errors.phoneNumber}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1 font-campton">
              {errors.phoneNumber}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label className="font-campton text-[#222021] text-sm mb-2 block">
            Password*
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="**********"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`font-campton pr-10 bg-transparent ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#868686] hover:text-[#222021]"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Password Requirements */}
          {formData.password && (
            <div className="mt-2 space-y-1">
              <p className="font-campton text-[#222021] text-xs font-semibold">
                Password Requirements
              </p>
              <div className="space-y-0.5">
                <p
                  className={`font-campton text-xs flex items-center gap-1 ${
                    passwordRequirements.length
                      ? "text-green-600"
                      : "text-[#868686]"
                  }`}
                >
                  {passwordRequirements.length ? "✓" : "✗"} At least 8
                  characters
                </p>
                <p
                  className={`font-campton text-xs flex items-center gap-1 ${
                    passwordRequirements.uppercase
                      ? "text-green-600"
                      : "text-[#868686]"
                  }`}
                >
                  {passwordRequirements.uppercase ? "✓" : "✗"} Contains
                  uppercase letter
                </p>
                <p
                  className={`font-campton text-xs flex items-center gap-1 ${
                    passwordRequirements.number
                      ? "text-green-600"
                      : "text-[#868686]"
                  }`}
                >
                  {passwordRequirements.number ? "✓" : "✗"} Contains number
                </p>
                <p
                  className={`font-campton text-xs flex items-center gap-1 ${
                    passwordRequirements.lowercase
                      ? "text-green-600"
                      : "text-[#868686]"
                  }`}
                >
                  {passwordRequirements.lowercase ? "✓" : "✗"} Contains
                  lowercase letter
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Label className="font-campton text-[#222021] text-sm mb-2 block">
            Confirm Password*
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="**********"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`font-campton pr-10 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#868686] hover:text-[#222021]"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1 font-campton">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            checked={formData.agreedToTerms}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                agreedToTerms: checked as boolean,
              }))
            }
            className="mt-1"
          />
          <label
            htmlFor="terms"
            className="font-campton text-[#222021] text-sm cursor-pointer"
          >
            I agree to the{" "}
            <Link href="/terms" className="text-[#FF7C36] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#FF7C36] hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-xs mt-1 font-campton">
            {errors.terms}
          </p>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleContinue}
          className="w-full bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton py-6 text-base mt-6"
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default RegisterStep;
