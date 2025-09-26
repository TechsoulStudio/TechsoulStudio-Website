"use client";

import React, { useState, useEffect } from "react";
import AnimatedLoader from "@/components/ui/AnimatedLoader";
import HeroSection from "./HeroSection";
import Menu from "../helper/Menu";
import { RiMenu3Fill } from "react-icons/ri";
import ProjectSection from "./ProjectSection";
import { initLenis } from "@/utils/lenis";
import Services from "./Services";
import GetTouch from "./GetTouch";
import SocialMedia from "./SocialMedia";
import Footer from "../helper/Footer";
import VerticalTextLabel from "../VerticalTextLabel";
import { motion } from "framer-motion";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const lenis = initLenis();
    const hasSeenLoader = localStorage.getItem("hasSeenLoader");

    if (hasSeenLoader) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasSeenLoader", "true");
      }, 7000);
      return () => clearTimeout(timer);
    }

    return () => {
      lenis?.destroy?.();
    };
  }, []);

  if (!isClient) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#5a5d59]">
        <AnimatedLoader />
      </div>
    );
  }

  return (
    <div className="bg-[#5a5d59]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="flex flex-col min-h-screen bg-[#5a5d59] text-white"
      >
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setOpenMenu(true)}
            className="px-4 py-2 text-white cursor-pointer"
          >
            <RiMenu3Fill size={36} className="text-[#dad9d6]" />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        {openMenu && <Menu onClose={() => setOpenMenu(false)} />}

        <main className="flex-grow">
          <div className="sticky top-0 z-20">
            <HeroSection />
          </div>
          <div className="relative z-20">
            <ProjectSection />
            <Services />
            <GetTouch />
            <SocialMedia />
            <div>
              <Footer />
            </div>
            <div className="sm:flex flex-col items-end fixed right-5 bottom-[100px] z-10">
              <VerticalTextLabel />
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}
