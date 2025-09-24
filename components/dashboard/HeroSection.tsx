"use client";

import React from "react";
import { FaArrowDown } from "react-icons/fa6";

export default function HeroSection() {
  const handleScroll = () => {
    const section = document.getElementById("project");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main>
      <section className="w-full bg-[#5a5d59] flex">
        <div className="px-4 py-16 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-2">
          <h1 className="text-lg sm:text-xl md:text-2xl text-[#dad9d6] font-bold leading-tight">
            Branding and Web Design Agency.
          </h1>

          <p className="text-xl sm:text-2xl mt-4 max-w-xl mx-auto text-[#999999] font-semibold">
            TechsoulStudio is a branding and web design agency based in Surat,
            India.
          </p>

          <p className="text-md sm:text-2xl mt-4 max-w-xl mx-auto text-[#999999] font-semibold">
            At TechsoulStudio, we combine strategic design with purpose-driven
            branding to help businesses stand out with clarity, creativity, and
            consistency.
          </p>

          <p className="text-md sm:text-2xl mt-4 max-w-xl mx-auto text-[#999999] font-semibold">
            Our mission at TechsoulStudio is to connect purpose with design and
            building meaningful brands that resonate and inspire.
          </p>

          <div className="mt-10 flex">
            <FaArrowDown
              onClick={handleScroll}
              className="h-12 w-12 animate-bounce text-white cursor-pointer"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
