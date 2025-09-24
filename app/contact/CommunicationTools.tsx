"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const tools = [
  {
    icon: "/images/Contact/clickup.svg",
    alt: "ClickUp",
    text: "ClickUp for seamless project management",
  },
  {
    icon: "/images/Contact/microsoft-teams.svg",
    alt: "Microsoft Teams",
    text: "Shared Microsoft Teams channel for daily communication",
  },
  {
    icon: "/images/Contact/meets.svg",
    alt: "Google Meets",
    text: "Weekly or monthly calls scheduled via Google Meets",
  },
  {
    icon: "/images/Contact/whatsapp.svg",
    alt: "WhatsApp",
    text: "We are always available for urgent support",
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

export default function CommunicationTools() {
  return (
    <section className="py-10">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={containerVariants}
      >
        {tools.map((tool, index) => (
          <motion.div
            variants={itemVariants}
            key={index}
            className="flex flex-col gap-5 justify-between items-start h-full p-6 shadow-sm bg-[#bcbcb4] min-h-[180px] sm:min-h-[300px]"
          >
            <Image src={tool.icon} alt={tool.alt} width={40} height={40} />
            <p className="text-lg text-[#84837e]">{tool.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
