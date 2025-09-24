"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useRef } from "react";

const textVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const imageVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};


export default function AboutIntro() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#5a5d59] text-[#babbb5] py-16 px-4 sm:px-6 md:px-8 lg:px-10"
    >
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="max-w-3xl">
          <motion.h2
            variants={textVariant}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold leading-tight mb-8"
          >
            Our agency started <br /> back in <span>2023</span>
          </motion.h2>

          <motion.div
            variants={imageVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full overflow-hidden"
          >
            <Image
              src="/images/About.webp"
              alt="Teamwork"
              width={600}
              height={300}
              className="w-150 h-[500px] sm:h-160 object-cover opacity-70"
            />
          </motion.div>
        </div>

        <div className="sm:pt-26">
          <motion.p
            custom={1}
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6 text-lg leading-[1.4]"
          >
            Welcome to TechsoulStudio, where quality isn’t merely a benchmark.
            it’s our foundational ethos. Anchored in a vision of transformative
            digital experiences, we champion the potency of exceptional design
            to mold the future.
          </motion.p>

          <motion.p
            custom={2}
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10 text-lg leading-[1.4]"
          >
            Our path is defined by an unwavering dedication to providing
            top-tier UI/UX solutions, skillfully bringing visions to life with
            precision and creativity. Bolstered by a diverse portfolio and a
            track record of collaborative success with large teams, we’ve
            established ourselves as synonymous with quality, turning each
            project into a journey of exploration, innovation, and excellence.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 gap-6 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: 3, label: "Years Experience", suffix: "+" },
              { number: 100, label: "Projects Done", suffix: "+" },
              { number: 50, label: "Satisfied Clients", suffix: "+" },
              { number: 3000, label: "Crafting Designing", suffix: "+" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                custom={index + 3}
                variants={textVariant}
              >
                <h3 className="text-4xl sm:text-5xl font-bold">
                  {item.number}
                  {item.suffix}
                </h3>
                <p className="text-md sm:text-lg">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
