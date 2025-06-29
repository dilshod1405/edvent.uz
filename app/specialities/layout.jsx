import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import React from "react";

export default function SpecialitiesLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#030613] text-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
