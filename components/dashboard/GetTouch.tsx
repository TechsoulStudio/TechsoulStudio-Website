"use client";

import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

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

export default function GetTouch() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-16 bg-[#5a5d59]">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div className="space-y-1 pt-4" variants={itemVariants}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#babbb5] leading-tight">
            Brands with Soul Based Graphic Design —
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#babbb5] max-w-lg font-semibold">
            Empowering Business
          </p>
          <Link
            href="/contact"
            className="text-lg font-bold text-[#84837e] cursor-pointer pt-4 inline-flex items-center group"
          >
            Get in touch
            <FaArrowRight className="inline-block text-[#babbb5] transition-transform duration-300 group-hover:translate-x-1 ml-2" />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 pt-4 space-y-1"
          variants={containerVariants}
        >
          {[
            "At TechsoulStudio, we believe that great branding isn’t built on guesswork or assumptions. For too long, branding and marketing decisions have relied on trends, opinions, or purely creative instincts, often overlooking the most important factor: the consumer.",
            "By applying evidence-based branding principles, grounded in data, behavioral science, and proven frameworks, we create strategic, purposeful brands. Our approach is focused on understanding consumer behavior, motivations, and needs. This allows us to design visual identities and brand strategies that not only resonate with your audience but also drive long-term value and competitive advantage.",
            "Backed by decades of global research and marketing science, our branding process isn’t just creative it’s strategic, scalable, and smart.",
            "We understand that a brand can sometimes feel intangible or difficult to define. While it may not appear on a balance sheet, it plays a critical role in business success. That is why we help you clearly define and articulate your brand so it resonates with your team, engages stakeholders, and most importantly connects with your customers.",
            "From strategy to storytelling, identity to execution, TechSoul Studio builds purpose-driven brands designed to grow with you and for your market. We make your brand smarter, clearer, and more effective, so your business can be stronger.",
          ].map((paragraph, index) => (
            <motion.p
              key={index}
              variants={itemVariants}
              className="text-base sm:text-lg text-[#babbb5] max-w-2xl leading-[1.4]"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
