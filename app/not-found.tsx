"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const NotFound = () => {
  const [color, setColor] = useState("#00FFFF");
  const sliderRef = useRef<HTMLDivElement>(null);
  const [thumbLeft, setThumbLeft] = useState(50);

  const getColorFromPosition = (percent: number) => {
    const hue = (percent / 100) * 360;
    return `hsl(${hue}, 100%, 50%)`;
  };
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!sliderRef.current) return;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    let percent = ((e.clientX - left) / width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setThumbLeft(percent);
    setColor(getColorFromPosition(percent));
  };

  const startDrag = () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopDrag);
  };

  useEffect(() => {
    return () => stopDrag();
  }, []);

  const renderBlock = () => (
    <div
      className="w-6 h-6 sm:w-8 sm:h-8 m-0.5 rounded-md"
      style={{ backgroundColor: color }}
    />
  );

  const renderDigit = (blocks: number[][]) => (
    <div className="grid grid-cols-4 gap-1">
      {blocks.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`}>
            {cell ? renderBlock() : <div className="w-6 h-6 sm:w-8 sm:h-8" />}
          </div>
        ))
      )}
    </div>
  );

  const digit4 = [
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ];

  const digit0 = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ];

  return (
    <div className="min-h-screen bg-[#5a5d59] flex flex-col items-center justify-center text-center p-4">
      <div className="pb-5 text-[#babbb5]">
        <h1 className="text-xl sm:text-4xl text-[#dad9d6] font-bold pt-2">
          Looking for something?
        </h1>
        <p>
          We can’t find this page. But we can help you Branding and Web Design
          Agency.
        </p>
      </div>
      <div className="flex items-center justify-center gap-6 mb-12">
        {renderDigit(digit4)}
        {renderDigit(digit0)}
        {renderDigit(digit4)}
      </div>

      <div className="w-full max-w-md mt-4 px-4">
        <div
          className="relative h-1 rounded-full cursor-pointer"
          ref={sliderRef}
          onMouseDown={startDrag}
          style={{
            background:
              "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
          }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-3 border-white shadow"
            style={{
              left: `calc(${thumbLeft}% - 1rem)`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
      <motion.button
        whileHover={{
          rotate: [0, -3, 3, -3, 3, 0],
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="relative inline-block overflow-hidden bg-[#bcbcb4] text-[#84837e] text-xl md:text-3xl font-medium px-6 md:px-10 py-4 md:py-6 rounded-full transition-all duration-300 group mt-10"
      >
        <span className="absolute inset-0 bg-[#d0d0d0] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
        <span className="relative z-10">Goback Home</span>
      </motion.button>
    </div>
  );
};

export default NotFound;
