"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/helper/Footer";
import { FaArrowRight } from "react-icons/fa6";
import { initLenis } from "@/utils/lenis";
import { RiMenu3Fill } from "react-icons/ri";
import Menu from "@/components/helper/Menu";
import AboutCarousel from "@/components/ui/AboutCarousel";
import AboutIntro from "@/components/AboutIntro";
import VerticalTextLabel from "@/components/VerticalTextLabel";
import SuccessStoriesCarousel from "@/components/SuccessStories";
import ClientsSection from "@/components/ClientsSection";
import TeamSection from "@/components/TeamSection";
import { Variants } from "framer-motion";

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const lenis = initLenis();

    return () => {
      lenis?.destroy?.();
    };
  }, []);

  if (!isClient) return null;
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

  return (
    <main className="w-full bg-[#5a5d59] text-[#babbb5]">
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
      <section className="relative w-full h-screen sticky top-0 z-20">
        <Image
          src="/images/About.jpg"
          alt="About Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
        >
          <h1 className="text-[#dad9d6] text-4xl md:text-6xl font-bold mb-4">
            Branding and Web Design Agency.
          </h1>
          <p className="text-[#dad9d6] text-lg md:text-2xl max-w-xl">
            TechsoulStudio is a branding and web design agency based in Surat,
            India.
          </p>
        </motion.div>
      </section>

      <section className="relative z-20 bg-[#5a5d59] text-[babbb5]">
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 pt-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div className="space-y-2 pt-4" variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                Vision & Philosophy — <br />
                Smarter Design — Empowering Business.
              </h2>
              <p className="text-base sm:text-xl max-w-lg font-semibold pt-4">
                Aligned with our vision?
              </p>
              <div className="text-base sm:text-xl font-bold text-[#babbb5] cursor-pointer group">
                Get in touch
                <FaArrowRight className="inline-block text-[#babbb5] transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </div>
            </motion.div>
            <div className="grid grid-cols-1 gap-4 pt-4 space-y-2 text-lg leading-[1.4]">
              <motion.p variants={itemVariants}>
                We believe great design is more than visuals. it’s about
                creating meaningful connections that help businesses grow. Our
                mission is to support entrepreneurs, startups, and
                forward-thinking leaders with smart, purpose-driven branding and
                web design solutions. From logos and brand identity to modern,
                responsive websites, we craft experiences that inspire, connect,
                and leave a lasting impact in the digital world.
              </motion.p>
              <motion.p variants={itemVariants}>
                With a balance of creativity and strategy, we focus on clarity,
                efficiency, and results. Every project is tailored to your
                business goals, ensuring designs that are not only visually
                compelling but also effective and enduring. Whether you need
                branding, website development, or digital solutions,
                TechsoulStudio is here to help your business thrive with
                confidence and influence.
              </motion.p>
            </div>
          </motion.div>
          <AboutCarousel />
        </div>

        <div className="px-4 sm:px-6 md:px-8 lg:px-10 pt-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="space-y-2 pt-4">
              <motion.h2
                className="text-xl sm:text-2xl font-bold leading-tight"
                variants={itemVariants}
              >
                Process — <br />
                Backed by evidence. Celebrated with results.
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 gap-4 pt-4 space-y-2 text-lg leading-[1.4]">
              <motion.p variants={itemVariants}>
                We believe that creating authentic, distinctive, and enduring
                brands begins with discarding assumptions and superficial
                guesswork. For too long, branding and marketing have leaned on
                intuition and outdated conventions disguised as “creativity,”
                often producing outcomes that feel disconnected from core values
                leaving brands fragmented, inconsistent, and ultimately
                ineffective in the eyes of their audience.
              </motion.p>
              <motion.p variants={itemVariants}>
                Our approach is grounded in evidence-based frameworks, strategic
                clarity, and a deep analytical understanding of the businesses
                we partner with. Through research-driven insights, combined with
                an empathetic and collaborative process, we reveal the
                underlying challenges and contextual truths behind every
                branding and digital initiative. By immersing ourselves in the
                vision, values, and purpose of each client, we craft experiences
                that transcend aesthetics building identities and platforms that
                are both visually resonant and strategically aligned with
                long-term growth.
              </motion.p>
              <motion.p variants={itemVariants}>
                What sets us apart is the unwavering commitment to precision and
                authenticity. Every solution is built not as a quick fix, but as
                a long-term asset scalable, adaptable, and resilient in an
                ever-changing marketplace. By merging creativity with strategy,
                we help brands establish clarity, inspire trust, and strengthen
                their influence, ensuring they remain relevant and impactful for
                years to come.
              </motion.p>
            </div>
          </motion.div>
        </div>
        <AboutIntro />

        <div className="px-4 sm:px-6 md:px-8 lg:px-10 pb-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="space-y-2 pt-4">
              <motion.h2
                className="text-xl sm:text-2xl font-bold leading-tight"
                variants={itemVariants}
              >
                People — <br />
                Strong culture. Optimal creative performance.
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 gap-4 pt-4 space-y-2 text-lg leading-[1.4]">
              <motion.p variants={itemVariants}>
                At TechsoulStudio a collective of visionary designers,
                creative innovators, and strategic thinkers united by a shared
                passion for pushing boundaries. We dismantle traditional design
                silos and outdated processes to craft authentic, distinctive,
                and lasting creative solutions that place both the client and
                end-user at the center.
              </motion.p>
              <motion.p variants={itemVariants}>
                Our culture fuels creativity. By nurturing a bottom-up approach,
                we empower every team member with autonomy and ownership,
                aligning personal growth with organizational success. Free from
                competitive barriers, we encourage open dialogue, critical
                thinking, and honest collaboration. This democratic,
                purpose-driven environment ensures that creativity thrives,
                engagement flourishes, and every project achieves its highest
                potential
              </motion.p>
            </div>
          </motion.div>
        </div>

        <TeamSection />

        <ClientsSection />
        <SuccessStoriesCarousel />
        <Footer />
        <div className="sm:flex flex-col items-end fixed right-5 bottom-[100px] z-10">
          <VerticalTextLabel />
        </div>
      </section>
    </main>
  );
}
