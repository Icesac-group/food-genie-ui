"use client";
import React from "react";
import DeliveryConfigPanel from "@/components/PageLayout/Admin/DeliveryConfigPanel";

const AdminSettingsPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="container mx-auto px-5 md:px-[97px] py-12">
        <div className="mb-10">
          <p className="font-calligraffitti text-[#FF7C36] text-lg mb-1">Admin</p>
          <h1 className="font-recoleta text-[#222021] text-3xl md:text-4xl mb-2">Settings</h1>
          <p className="font-campton text-[#868686] text-sm">
            Configure promotions and delivery rules that apply to all customer orders.
          </p>
        </div>
        <DeliveryConfigPanel />
      </div>
    </div>
  );
};

export default AdminSettingsPage;
