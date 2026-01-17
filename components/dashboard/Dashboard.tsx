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
import { motion, Variants } from "framer-motion";
import ClientsSection from "../ClientsSection";
import SuccessStoriesCarousel from "../SuccessStories";
import Accordion from "../ui/Accordion";

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

  const work = [
    {
      number: "01",
      question: "Your Team, Your Champions",
      answer:
        "We don’t just join your project, we become part of your journey. Think of us as an extension of your team, bringing expertise and fresh ideas while leaving egos at the door. Together, we’ll create something extraordinary and maybe even have a little fun along the way.",
    },
    {
      number: "02",
      question: "Straight Talk, Always",
      answer:
        "We keep things simple and clear. No buzzwords, no jargon, just honest and open conversations. You’ll always know what’s happening and why, because collaboration works best when everyone’s on the same page.",
    },
    {
      number: "03",
      question: "Let’s Build Together",
      answer:
        "We believe the best work happens when we create together. Our process is open and transparent, and you’re part of it every step of the way. From brainstorming big ideas to nailing down the details, we work as one team.",
    },
    {
      number: "04",
      question: "Big Ideas, No Big Egos",
      answer:
        "We bring strong opinions and years of expertise, but we’re always ready to listen and adapt. Great ideas can come from anywhere, and we’re here to find the ones that work best for you. After all, it’s a team effort.",
    },
    {
      number: "05",
      question: "Results That Actually Matter",
      answer:
        "No fluff, no filler, just work that gets real results. With TechsoulStudio, you’ll get creative solutions that not only look great but also deliver impact. And yes, we’ll make the process as enjoyable as the outcome.",
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

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
            <ClientsSection />
            <SuccessStoriesCarousel />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="bg-[#5a5d59] sm:py-20 px-4 sm:px-6 md:px-8 lg:px-10 py-10"
            >
              <motion.h1
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl font-semibold sm:py-4 text-[#babbb5]"
              >
                How we work.
              </motion.h1>
              <motion.div variants={itemVariants} className="px-3 sm:px-8 text-[#babbb5]">
                <Accordion items={work} />
              </motion.div>
            </motion.div>
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
