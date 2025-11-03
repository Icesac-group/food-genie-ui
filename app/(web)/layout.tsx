"use client";
import React from "react";
import Header from "@/components/globals/Header";
import Footer from "@/components/globals/Footer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-[100vh] w-full ">
        <div className="relative h-screen w-full">
          <Header />
          <div>
            <div aria-describedby="page body">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
