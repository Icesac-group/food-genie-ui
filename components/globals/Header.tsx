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
    { name: "Weekly Menu", href: "/weekly-menu" },
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
                className={`text-sm font-campton pb-1 border-b transition-colors ${
                  isActive(item.href)
                    ? "text-[#FF7C36] border-[#FF7C36]"
                    : "text-[#B0B0B0] border-transparent hover:text-[#FF7C36]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-gray-600 hover:text-gray-900"
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
                  className={`block py-3 px-8 text-base font-medium font-campton transition-colors hover:bg-gray-50 ${
                    isActive(item.href)
                      ? "text-[#FF7C36] bg-orange-50 border-l-4 border-[#FF7C36]"
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
