"use client";

import React from "react";
import Accordion from "./ui/Accordion";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const clients = [
  {
    title: "Growing Businesses",
    description:
      "You’ve built a solid foundation and DIY’d your branding / website to get this far. Now, your brand touchpoints feel inconsistent and you’re ready to elevate everything with a cohesive and professional brand that aligns with your growth.",
  },
  {
    title: "New Businesses",
    description:
      "Your new business is taking shape and you’re ready to make a lasting impression with branding and website design. The next thing on your to-do list is to invest in branding and website design that attracts your ideal clients and conveys your mission with clarity and confidence.",
  },
  {
    title: "Established Businesses",
    description:
      "After 7+ successful years (congratulations!), your business has evolved, but your original branding and website no longer feels aligned. It’s time for a rebrand that captures the true essence of your business and positions you for continued success.",
  },
  {
    title: "Personal Brands",
    description:
      "You’re a coach, consultant, or influencer who wants a standout personal brand and website that feels aligned with your voice, values, and vision. Let’s bring your brand to life authentically.",
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

export default function ClientsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="bg-[#5a5d59] sm:py-20 px-4 sm:px-6 md:px-8 lg:px-10 py-10"
    >
      <motion.h2
        variants={itemVariants}
        className="text-lg sm:text-xl md:text-2xl font-bold leading-tight sm:mb-8"
      >
        Clients we design for —
      </motion.h2>

      <motion.div variants={itemVariants} className="px-3 sm:px-8 sm:mt-12">
        <Accordion
          items={clients.map((client, i) => ({
            number: (i + 1).toString().padStart(2, "0"),
            question: client.title,
            answer: client.description,
          }))}
        />
      </motion.div>
    </motion.section>
  );
}
