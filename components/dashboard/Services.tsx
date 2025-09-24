"use client";

import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type Service = string;

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services: Service[] = [
    "Brand Identity Design & Strategy",
    "Digital Product",
    "Graphic Design",
    "Packaging Design",
    "Website Design",
    "E-Commerce Store",
    "Content Design & Photography",
  ];

  const slugify = (text: string) =>
    text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

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
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-16 bg-[#bcbcb4]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <motion.div
          className="space-y-6 pt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl font-bold text-[#84837e] leading-tight"
          >
            Meaning Branding with Purpose —
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-[#84837e] max-w-lg font-semibold leading-[1.2]"
          >
            At TechsoulStudio, we create brands that are deeply aligned with
            your core purpose. This strategic approach helps build long-term
            brand value and ensures your business is ready for the future.
          </motion.p>

          <div className="pt-10 sm:pt-24 space-y-4">
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#84837e] max-w-lg leading-[1.4]"
            >
              At TechsoulStudio, we specialize in Brand Identity Design &
              Strategy, Digital Design, Graphic Design, Packaging Design, UI
              Design, and Web Design. Our team brings creative excellence and
              strategic thinking across every touchpoint helping businesses
              shape bold, consistent, and future-ready brands.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#84837e] max-w-lg leading-[1.4]"
            >
              We offer end-to-end solutions, from concept to execution, ensuring
              every design aligns with your brand’s purpose and supports
              long-term growth.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link
                href="/services"
                className="text-lg font-bold text-[#84837e] cursor-pointer pt-4 inline-flex items-center group"
              >
                Our Services
                <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.ul
            variants={itemVariants}
            className="grid grid-cols-1 gap-4 sm:pl-10 pt-4"
          >
            {services.map((service, index) => (
              <motion.li
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative flex items-center gap-5 transition-all duration-300 text-[#84837e] text-xl sm:text-2xl font-bold border-b border-[#84837e] pb-1 ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "opacity-25"
                    : "opacity-100"
                }`}
              >
                <Link
                  href={`/services/${slugify(service)}`}
                  className="flex items-center w-full group"
                >
                  <FaArrowRight className="absolute left-0 text-[#84837e] transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="pl-8">{service}</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
