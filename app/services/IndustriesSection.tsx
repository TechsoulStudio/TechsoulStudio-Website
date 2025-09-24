"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";

const industries = [
  { name: "Retail", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371119/1_exxu8s.jpg" },
  { name: "Finance", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371120/2_jym6mj.jpg" },
  { name: "Healthcare", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371120/3_i4repx.jpg" },
  { name: "Technology", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371119/4_vn3omp.jpg" },
  { name: "eCommerce", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371122/5_aol7sk.jpg" },
  { name: "Beauty + Wellness", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371120/6_ghmi7z.jpg" },
  { name: "Manufacturing", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371122/7_qyaylj.jpg" },
  { name: "Renewables", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371120/8_n052mz.jpg" },
  { name: "Hospitality", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371123/9_pawbqd.jpg" },
  { name: "Education", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371119/10_ndcnxy.jpg" },
  { name: "F&B", image: "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371119/11_z0vztt.jpg" },
];

export default function IndustriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const direction = activeIndex > prevIndex ? 1 : -1;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setPrevIndex(activeIndex);
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, isMobile]);

  const handleMouseEnter = (index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
  };

  const handleClick = () => {
    window.location.href = "/contact";
  };

  return (
    <section className="text-[#dad9d6]">
      <Head>
        {industries.map((item, i) => (
          <link key={i} rel="preload" as="image" href={item.image} />
        ))}
      </Head>

      <div className="text-lg sm:text-xl md:text-2xl font-semibold py-4">
        Industries we (like to) work in
      </div>

      <div className="flex flex-col md:flex-row gap-10 pt-10">
        <div className="w-full md:w-2/5 relative">
          <div className="w-full aspect-[4/5] overflow-hidden relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={industries[activeIndex].image}
                initial={{ x: 100 * direction, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100 * direction, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-full h-full"
              >
                <Image
                  src={industries[activeIndex].image}
                  alt={industries[activeIndex].name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="block md:hidden text-center text-2xl font-semibold mt-4">
            {industries[activeIndex].name}
          </div>
        </div>

        <div className="hidden md:flex md:w-3/5 flex-col justify-center space-y-6 pl-10 sm:pl-20 relative">
          <div className="space-y-3">
            {industries.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`relative text-xl sm:text-3xl md:text-4xl font-semibold cursor-pointer transition-all duration-200 ${
                  activeIndex === index ? "text-white" : "text-white/30"
                }`}
              >
                {item.name}
                {activeIndex === index && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 h-1 w-20 bg-white rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{
              transition: { duration: 0.4 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="w-35 md:w-50 relative inline-block overflow-hidden bg-[#bcbcb4] text-[#84837e] text-xl md:text-2xl font-medium px-6 md:px-8 py-4 rounded-full transition-all duration-300 group mt-8 text-center"
          >
            <span className="absolute inset-0 bg-[#d0d0d0] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
            <span className="relative z-10">Let’s Talk</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
