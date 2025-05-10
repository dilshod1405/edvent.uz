"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      // disable: "phone",
      duration: 800,
      easing: "ease-in",
    });
  });

  return (
    <>
      <main className="relative flex flex-col grow">{children}</main>
      
      <Footer />
    </>
  );
}
