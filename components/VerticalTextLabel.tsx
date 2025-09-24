"use client";
import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

const VerticalTextLabel = () => {
  const { scrollY } = useScroll();

  const translateY = useTransform(scrollY, [0, 300], [0, -190]);
  const colorMix = useTransform(scrollY, [0, 300], [0, 1]);

  const color = useMotionTemplate`rgb(
    ${useTransform(colorMix, [0, 1], [218, 132])}, 
    ${useTransform(colorMix, [0, 1], [217, 131])}, 
    ${useTransform(colorMix, [0, 1], [214, 126])}
  )`;

  return (
    <Link href="/">
      <motion.div
        style={{ translateY, color }}
        className="fixed right-5 top-1/2 -translate-y-1/2 text-2xl sm:text-4xl font-bold [writing-mode:vertical-rl] rotate-180 leading-tight z-50 cursor-pointer hover:opacity-80 transition-opacity"
      >
        TechsoulStudio
      </motion.div>
    </Link>
  );
};

export default VerticalTextLabel;
