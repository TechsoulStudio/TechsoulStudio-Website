"use client";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { RiMenu3Fill } from "react-icons/ri";
import Menu from "@/components/helper/Menu";
import { initLenis } from "@/utils/lenis";
import Accordion from "@/components/ui/Accordion";
import { Variants } from "framer-motion";

const Footer = dynamic(() => import("@/components/helper/Footer"), {
  ssr: false,
});

const First = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758710311/branding_xg5svd.png";
const Second = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371577/2_kf3k77.svg";
const Third = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371576/3_amw37o.svg";
const Fourth = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371576/4_unjxc0.svg";
const Fifth = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371578/5_d13zb3.svg";
const Six = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371576/6_iay3uo.svg";
const Seven = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758371579/7_gvbpe3.svg";
import VerticalTextLabel from "@/components/VerticalTextLabel";
import ScheduleMeeting from "@/components/ScheduleMeeting";
import IndustriesSection from "./IndustriesSection";
import SuccessStoriesCarousel from "@/components/SuccessStories";

type Services = {
  title: string;
  id: string;
  image: string | StaticImageData;
  className?: string;
};

const ServicesData: Services[] = [
  {
    title: "Brand Identity Design & Strategy",
    id: "brand-identity-design-and-strategy",
    image: First,
    className: "lg:col-span-3 lg:row-span-3",
  },
  {
    title: "Digital Product",
    id: "digital-product",
    image: Second,
    className: "lg:col-span-1 lg:row-span-2",
  },
  {
    title: "Graphic Design",
    id: "graphic-design",
    image: Third,
    className: "lg:col-span-1 lg:row-span-2",
  },
  {
    title: "Packaging Design",
    id: "packaging-design",
    image: Fourth,
    className: "lg:col-span-2 lg:row-span-3 lg:col-start-1",
  },
  {
    title: "Website Design",
    id: "website-design",
    image: Fifth,
    className: "lg:col-span-3 lg:row-span-3",
  },
  {
    title: "E-commerce",
    id: "e-commerce-store",
    image: Six,
    className: "lg:col-span-3 lg:row-span-4 lg:col-start-1",
  },
  {
    title: "Content Design & Photography",
    id: "content-design-and-photography",
    image: Seven,
    className: "lg:col-span-2 lg:row-span-4 ",
  },
];

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

const models = [
  {
    number: "01",
    question: "Project-Based Collaboration",
    answer:
      "For businesses with specific goals, we deliver high-priority solutions like branding, websites, or apps. Designed with precision, executed seamlessly, and delivered on time.",
  },
  {
    number: "02",
    question: "Retainer Partnership",
    answer:
      "Your brand deserves constant attention. With our retainer model, we become your priority partner, ensuring consistent care and sustained growth every step of the way.",
  },
  {
    number: "03",
    question: "Dedicated Teams",
    answer:
      "When scaling is your focus, we provide a fully committed, expert team that works exclusively on your projects, delivering results that match your ambitions.",
  },
  {
    number: "04",
    question: "Consulting and Strategy",
    answer:
      "Bold moves need clear direction. Our tailored strategies and expert guidance provide actionable plans to turn your vision into reality with confidence.",
  },
  {
    number: "05",
    question: "Agency Partnerships",
    answer:
      "As your trusted partner, we offer white-label solutions that prioritize your brand’s success. Seamless execution, complete confidentiality, and your clients will never know we’re behind the scenes.",
  },
];

export default function Page() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const lenis = initLenis();
    return () => {
      lenis?.destroy?.();
    };
  }, []);
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

  if (!isClient) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#5a5d59]">
      <main className="flex-grow pb-16 relative">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setOpenMenu(true)}
            className="px-4 py-6 text-white cursor-pointer"
          >
            <RiMenu3Fill size={36} className="text-[#dad9d6]" />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        {openMenu && <Menu onClose={() => setOpenMenu(false)} />}

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <section className="sticky top-0 z-20 w-full bg-[#5a5d59] flex">
            <div className="sm:pb-80 px-4 sm:px-6 md:px-8 lg:px-10 mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#dad9d6] leading-tight max-w-4xl pt-8"
              >
                Services —
              </motion.h1>
            </div>
          </section>

          <div className="relative z-20 bg-[#5a5d59]">
            <div className="grid gap-4 px-4 sm:px-8 md:px-12 lg:px-10 lg:grid-cols-5 xl:auto-rows-[200px]">
              {ServicesData.map((project, index) => (
                <motion.div
                  key={index}
                  className={`group relative cursor-pointer flex flex-col ${
                    project.className || ""
                  }`}
                  initial={{ opacity: 0, y: 60, scale: 1.1 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.2,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  onClick={() => router.push(`/services/${project.id}`)}
                >
                  <div className="h-full w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      title={project.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-2 pt-2 pb-4 pl-1">
                    <h3 className="text-md md:text-lg font-semibold text-[#dad9d6]">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="sm:flex flex-col items-end fixed right-5 bottom-[100px] z-10">
              <VerticalTextLabel />
            </div>
            <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-8 text-[#dad9d6] pt-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-lg sm:text-xl md:text-2xl font-semibold sm:py-4"
                >
                  How we work.
                </motion.h1>
                <motion.div variants={itemVariants} className="px-3 sm:px-8">
                  <Accordion items={work} />
                </motion.div>
              </motion.div>

              <ScheduleMeeting />
              <IndustriesSection />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="pt-14"
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-lg sm:text-xl md:text-2xl font-semibold sm:py-4"
                >
                  Collaboration models.
                </motion.h1>
                <motion.div variants={itemVariants} className="px-3 sm:px-8">
                  <Accordion items={models} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      <SuccessStoriesCarousel />
      <Footer />
    </div>
  );
}
