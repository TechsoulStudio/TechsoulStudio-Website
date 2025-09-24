"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Create", "Design", "Develop", "Build", "Deliver", "Dominate"];
const leftWord = "We";
const rightWord = "For you";

export default function AnimatedLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="
      flex flex-col items-center justify-center gap-2
      md:flex-row
      md:gap-6
      text-[#999999] font-medium px-4 py-2 font-bold
      max-w-[1200px] mx-auto select-none w-full
      text-[clamp(1.5rem,2.5vw,2.4rem)]
    ">
      {/* Left word */}
      <span className="flex-shrink-0 font-bold">{leftWord}</span>

      {/* Animated word */}
      <div className="
        relative flex justify-center items-center
        w-full max-w-[30ch] h-50 font-bold
      ">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="
              text-center
              whitespace-nowrap
            "
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="flex-shrink-0 font-bold">{rightWord}</span>
    </div>
  );
}
