"use client";
import React, { useState } from "react";
import Image from "next/image";
import { images } from "@/public/images/images";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const { FoodMenu } = images();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    orderNumber: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <section className="w-full relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 md:h-[403px] h-48">
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

      <div className="relative z-10 container mx-auto px-5 md:px-[97px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-6 md:p-9 shadow-2xl lg:col-span-7">
            <div className="mb-8">
              <h3 className="font-calligraffitti text-[#FF7C36] text-2xl md:text-3xl mb-2">
                Get In Touch
              </h3>
              <h2 className="font-recoleta text-[#222021] text-3xl md:text-4xl font-normal mb-4">
                We're Here to Help
              </h2>
              <p className="font-campton text-[#9B9B9B] text-base">
                Questions about your order, subscription, or delivery? Our team
                is just a message away.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name and Email - Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-campton text-[#9B9B9B] text-sm mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-campton text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7C36] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="font-campton text-[#9B9B9B] text-sm mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-campton text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7C36] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone Number and Order Number - Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-campton text-[#9B9B9B] text-sm mb-2 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-campton text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7C36] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="font-campton text-[#9B9B9B] text-sm mb-2 block">
                    Order Number
                  </label>
                  <input
                    type="text"
                    name="orderNumber"
                    placeholder="Enter Order Number"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-campton text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7C36] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-campton text-[#9B9B9B] text-sm mb-2 block">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Write something here"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg font-campton text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7C36] focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-[#FF7C36] hover:bg-[#FF7C36] text-white font-campton font-medium px-10 py-5 rounded-lg text-base"
                size="sm"
              >
                Send Message
              </Button>
            </form>
          </div>

          <div className="bg-white rounded-lg p-6 md:p-9 shadow-2xl lg:col-span-5">
            <h2 className="font-recoleta text-[#222021] text-2xl md:text-3xl font-normal mb-8">
              Reach Us Directly
            </h2>

            <div className="space-y-8">
              {/* Phone Support */}
              <div className="flex gap-4 bg-[#FFEBC233] p-2 rounded-md">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#FF7C36] flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-campton text-[#222021] text-sm font-normal mb-2">
                    Phone Support
                  </h3>

                  <p className="font-campton text-[#868686] text-xs">
                    Available Mon–Sat, 9am – 7pm (Toronto Time)
                  </p>
                </div>

                <a
                  href="tel:+2459048587"
                  className="font-campton text-[#222021] text-sm font-normal hover:text-[#FF7C36] transition-colors block mb-2"
                >
                  +245 90485875
                </a>
              </div>

              {/* Email Support */}
              <div className="flex gap-4 bg-[#FFEBC233] p-2 rounded-md">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#FF7C36] flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-campton text-[#222021] text-sm font-normal mb-2">
                    Email Support
                  </h3>

                  <p className="font-campton text-[#868686] text-xs">
                    Reply is within 24 hours
                  </p>
                </div>
                <a
                  href="mailto:support@foodgenie.ca"
                  className="font-campton text-[#222021] text-sm font-normal hover:text-[#FF7C36] transition-colors block mb-2"
                >
                  support@foodgenie.ca
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
