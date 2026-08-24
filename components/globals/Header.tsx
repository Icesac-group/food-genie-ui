"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { images } from "@/public/images/images";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { logo } = images();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "Meals", href: "/meals" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 py-5 md:px-[97px] px-5">
          {/* Left section - Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Genie Logo"
                width={100}
                height={40}
                className="h-8 lg:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-campton pb-1 border-b transition-colors ${isActive(item.href)
                    ? "text-[#FF7C36] border-[#FF7C36]"
                    : "text-[#B0B0B0] border-transparent hover:text-[#FF7C36]"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-campton font-medium text-[#222021] hover:text-[#FF7C36] transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-campton font-medium bg-[#FF7C36] hover:bg-[#FF6B1F] text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="sm:hidden p-2 rounded-lg text-gray-600 hover:text-[#FF7C36] hover:bg-orange-50 active:bg-orange-100 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer active:scale-95"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Mobile Menu Dropdown */}
          <nav className="absolute top-full left-0 right-0 sm:hidden bg-white shadow-lg border-t border-gray-200 z-50">
            {/* Menu Items */}
            <div className="py-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-8 text-base font-medium font-campton transition-colors hover:bg-orange-50 active:bg-orange-100 min-h-[48px] flex items-center ${isActive(item.href)
                      ? "text-[#FF7C36] bg-orange-50 border-l-4 border-[#FF7C36]"
                      : "text-gray-600 hover:text-[#FF7C36]"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2 px-6 flex flex-col gap-3 pb-4">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 text-base font-medium font-campton text-[#222021] hover:text-[#FF7C36] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-3 text-base font-medium font-campton bg-[#FF7C36] hover:bg-[#FF6B1F] text-white rounded-lg transition-colors cursor-pointer active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
