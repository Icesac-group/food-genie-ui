"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/public/images/images";
import { Instagram, Facebook } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  const { FoodMenu, LogoName } = images();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  const menuLinks = [
    { label: "Browse Meals", href: "/meals" },
    { label: "How It Works", href: "/how-it-works" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <FaTiktok className="w-5 h-5" />, href: "#", label: "TikTok" },
    { icon: <RiTwitterXFill className="w-5 h-5" />, href: "#", label: "X" },
  ];

  return (
    <div className="mt-60">
      <footer className="w-full bg-[#1A1A1A] text-white -mt-16 md:-mt-20 pt-20 md:pt-24 pb-8 relative z-10">
        <div className="w-full pb-16 md:pb-20 absolute -top-24 z-20">
          <div className="container mx-auto px-5 md:px-[97px]">
            <div className="relative w-full max-w-5xl mx-auto">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={FoodMenu}
                    alt="Nigerian Food"
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(259.8deg, rgba(151, 151, 151, 0.450826) -69.73%, rgba(74, 74, 74, 0.730693) 52.13%, #000000 118.77%)",
                    }}
                  />
                </div>

                <div className="relative z-10 px-5 sm:px-8 md:px-16 py-8 md:py-16 text-center">
                  <h2 className="font-recoleta text-white text-lg sm:text-2xl md:text-4xl font-normal mb-2 md:mb-4">
                    Don't Miss the Next Menu Drop
                  </h2>
                  <p className="font-campton text-white/90 text-xs sm:text-sm md:text-base mb-5 md:mb-8 max-w-2xl mx-auto">
                    Be the first to experience authentic Nigerian cuisine
                    delivered fresh to your door. Join thousands on our
                    waitlist.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-xl mx-auto"
                  >
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-lg font-campton bg-white text-xs md:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-6 md:px-8 py-3 md:py-4 bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton font-medium rounded-lg transition-colors text-xs md:text-base whitespace-nowrap"
                    >
                      Join Wait List
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mx-auto px-5 md:px-[97px] md:mt-56 mt-30">
          <div className="hidden md:flex md:justify-between gap-8 lg:gap-12 mb-12">
            <div className="md:max-w-[350px] lg:max-w-[396px]">
              <Image
                src={LogoName}
                alt="FoodGenie"
                width={150}
                height={50}
                className="mb-6"
              />
              <p className="font-campton text-white/70 text-sm leading-relaxed mb-6">
                Get set for your new routine with chef-prepared Nigerian meals,
                ready when you are.
              </p>

              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF7C36] flex items-center justify-center transition-colors"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 lg:gap-12">
              <div>
                <h3 className="font-campton text-white font-semibold text-base lg:text-lg mb-3 lg:mb-4">
                  Menu
                </h3>
                <ul className="space-y-2 lg:space-y-3">
                  {menuLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="font-campton text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-campton text-white font-semibold text-base lg:text-lg mb-3 lg:mb-4">
                  Company
                </h3>
                <ul className="space-y-2 lg:space-y-3">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="font-campton text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-campton text-white font-semibold text-base lg:text-lg mb-3 lg:mb-4">
                  Legal
                </h3>
                <ul className="space-y-2 lg:space-y-3">
                  {legalLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="font-campton text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden mb-8">
            {/* Logo & Description */}
            <div className="mb-8">
              <Image
                src={LogoName}
                alt="FoodGenie"
                width={120}
                height={40}
                className="mb-4"
              />
              <p className="font-campton text-white/70 text-sm leading-relaxed">
                Get set for your new routine with chef-prepared Nigerian meals,
                ready when you are.
              </p>
            </div>

            {/* Menu Section */}
            <div className="mb-6">
              <h3 className="font-campton text-white font-semibold text-base mb-3">
                Menu
              </h3>
              <ul className="space-y-2">
                {menuLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="font-campton text-white/70 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div className="mb-6">
              <h3 className="font-campton text-white font-semibold text-base mb-3">
                Company
              </h3>
              <ul className="space-y-2">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="font-campton text-white/70 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div className="mb-8">
              <h3 className="font-campton text-white font-semibold text-base mb-3">
                Legal
              </h3>
              <ul className="space-y-2">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="font-campton text-white/70 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Icons Mobile */}
            <div className="flex justify-center gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF7C36] flex items-center justify-center transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6">
            <p className="font-campton text-white/50 text-xs md:text-sm text-center">
              © 2025 FoodGenie. Fresh Nigerian Meals in Toronto |{" "}
              <a
                href="mailto:order@foodgenie.ca"
                className="hover:text-white transition-colors"
              >
                order@foodgenie.ca
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
