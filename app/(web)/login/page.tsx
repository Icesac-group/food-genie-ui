"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { images } from "@/public/images/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { homeHero, logo } = images();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Logged in successfully!");
      router.push("/home"); // Redirect after login
    }, 1500);
  };

  return (
    <div className="min-h-screen flex w-full bg-white relative">
      {/* Back button - Absolute positioned for desktop, relative for mobile */}
      <button 
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[#868686] hover:text-[#FF7C36] bg-white/80 backdrop-blur-sm md:bg-transparent rounded-full py-2 px-4 transition-colors cursor-pointer active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-campton text-sm font-medium">Back</span>
      </button>

      {/* Left side - Image (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen sticky top-0">
        <Image
          src={homeHero}
          alt="Authentic Nigerian Dishes"
          fill
          className="object-cover"
          priority
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="font-recoleta text-4xl mb-4 leading-tight">
            Welcome back to the taste of home.
          </h2>
          <p className="font-campton text-white/80 text-lg">
            Your favorite authentic Nigerian meals, prepared fresh and ready to be delivered.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 md:px-20 lg:px-24">
        
        {/* Mobile Logo */}
        <div className="lg:hidden flex justify-center mb-12 mt-8">
          <Image
            src={logo}
            alt="Food Genie Logo"
            width={120}
            height={48}
            className="h-10 w-auto"
          />
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-recoleta text-[#222021] text-3xl md:text-4xl mb-3">
              Log in to your account
            </h1>
            <p className="font-campton text-[#868686] text-sm md:text-base">
              Enter your credentials to access your account and manage your orders.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="font-campton text-[#222021] text-sm font-medium">Email Address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-[#E0E0E0] focus:border-[#FF7C36] focus:ring-[#FF7C36]/20 transition-all text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-campton text-[#222021] text-sm font-medium">Password</Label>
                <Link href="#" className="font-campton text-sm text-[#FF7C36] hover:text-[#FF6B1F] font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-[#E0E0E0] focus:border-[#FF7C36] focus:ring-[#FF7C36]/20 transition-all text-base pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#868686] hover:text-[#222021] transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#FF7C36] hover:bg-[#FF6B1F] active:bg-[#FF5500] text-white font-campton text-base font-medium rounded-lg cursor-pointer transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center font-campton text-[#868686] text-sm">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="text-[#FF7C36] hover:text-[#FF6B1F] font-semibold transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
