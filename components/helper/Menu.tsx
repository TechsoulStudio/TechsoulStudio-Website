"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { BlurFade } from "../ui/blur-fade";
import Link from "next/link";

interface MenuProps {
  onClose: () => void;
}

export default function Menu({ onClose }: MenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  const list = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/project" },
    { label: "Journal & Blogs", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <main
      className={`fixed w-screen h-screen bg-[#bbbab1] z-50 transform transition-transform duration-[1.5s] ease-in-out ${
        animateIn ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        className="absolute right-8 top-8 cursor-pointer"
        onClick={handleClose}
      >
        <MdOutlineClose
          size={42}
          className="text-[#81837e] hover:text-[#81837e] transition-all duration-300 hover:rotate-90"
        />
      </div>

      <div className="absolute left-10 top-12">
        <ol className="text-[#81837e] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
          {list.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex items-center gap-5 transition-all duration-300 ${
                hoveredIndex !== null && hoveredIndex !== index
                  ? "opacity-25"
                  : "opacity-100"
              }`}
            >
              <BlurFade delay={1.5} direction="right" duration={2} inView>
                <FaArrowRight
                  className={`absolute left-0 transition-all duration-300 ${
                    hoveredIndex === index
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }`}
                />
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      const target = document.querySelector(item.href);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                        handleClose();
                      }
                    } else {
                      handleClose();
                    }
                  }}
                  className={`transition-all duration-300 ${
                    hoveredIndex === index
                      ? "pl-10 sm:pl-12 md:pl-16 lg:pl-20"
                      : "pl-0"
                  }`}
                >
                  {item.label}
                </Link>
              </BlurFade>
            </li>
          ))}
        </ol>
      </div>
      <div className="hidden sm:block absolute right-10 bottom-10 cursor-default text-[#81837e] text-2xl sm:text-4xl font-semibold [writing-mode:vertical-rl] rotate-180 leading-tight">
        <BlurFade delay={1.5} direction="right" duration={1} inView>
          TechsoulStudio
        </BlurFade>
      </div>

      <div className="absolute left-10 bottom-10 cursor-default text-[#81837e] text-lg font-semibold pe-5 sm:pe-0">
        <BlurFade delay={1.5} direction="down" duration={1} inView>
          Empowering Business - Designs with a Digital Soul
        </BlurFade>
      </div>
    </main>
  );
}
