"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
// import Image from "next/image";

// const awards = [
//   { src: "/images/services/ScheduleMeeting/1.svg", alt: "Awwwards" },
//   { src: "/images/services/ScheduleMeeting/2.svg", alt: "CSSDA" },
//   { src: "/images/services/ScheduleMeeting/3.svg", alt: "FWA" },
//   { src: "/images/services/ScheduleMeeting/4.svg", alt: "Red Dot" },
//   { src: "/images/services/ScheduleMeeting/5.svg", alt: "Site Inspire" },
//   { src: "/images/services/ScheduleMeeting/6.svg", alt: "Another Award" },
//   { src: "/images/services/ScheduleMeeting/7.svg", alt: "Finalist" },
// ];

// const allAwards = [...awards, ...awards];

export default function ScheduleMeeting() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/scheduleMeeting");
  };

  return (
    <section className="w-full px-4 md:px-8 py-20 text-center text-[#1c1c1e] overflow-hidden font-aeonik">
      <p className="text-sm md:text-lg text-[#dad9d6] tracking-widest font-medium mb-4 md:mb-6">
        Ordinary is yesterday. Extraordinary starts now.
      </p>

      <motion.button
        whileHover={{
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="relative inline-block overflow-hidden bg-[#bcbcb4] text-[#84837e] text-xl md:text-3xl font-medium px-6 md:px-10 py-4 md:py-6 rounded-full transition-all duration-300 group"
      >
        <span className="absolute inset-0 bg-[#d0d0d0] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
        <span className="relative z-10">Schedule a meeting</span>
      </motion.button>

      <div className="mt-12 md:mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-sm md:text-lg text-[#dad9d6] mb-4 md:mb-6">
            Client trust
          </h3>
        </motion.div>

        {/* <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-6 md:gap-10 px-2 md:px-4">
            {allAwards.map((award, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex justify-center items-center"
              >
                <Image
                  src={award.src}
                  alt={award.alt}
                  width={80}
                  height={30}
                  className="grayscale hover:grayscale-0 transition w-auto h-10 md:h-12"
                />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
