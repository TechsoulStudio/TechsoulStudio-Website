"use client";

import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

interface QAItem {
  number: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: QAItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-10 divide-y divide-neutral-300">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <div
            key={index}
            className={`py-5 transition-opacity duration-300 ${
              isDimmed ? "opacity-25" : "opacity-100"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              onClick={() => toggle(index)}
              className="flex justify-between items-start cursor-pointer"
            >
              <div className="w-full flex items-center gap-6 md:w-1/2">
                <span className="text-lg font-mono mt-1 block">
                  {item.number}
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
                  {item.question}
                </h3>
              </div>
              <div className="text-xl mt-1">
                {isOpen ? <FaTimes /> : <FaPlus />}
              </div>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="w-full md:pl-[50%] pr-4 pt-4">
                <p className="text-lg sm:text-lg leading-[1.4]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
