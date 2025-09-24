"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { RiMenu3Fill } from "react-icons/ri";
import Link from "next/link";

import Menu from "@/components/helper/Menu";
import VerticalTextLabel from "@/components/VerticalTextLabel";
import { fetchProjects, Project } from "@/Service/api";
import AnimatedLoader from "@/components/ui/AnimatedLoader";

const Footer = dynamic(() => import("@/components/helper/Footer"), {
  ssr: false,
});

const getGridClass = (index: number) => {
  const layoutIndex = index % 7;
  switch (layoutIndex) {
    case 0:
      return "sm:row-span-2 sm:col-span-2 lg:col-span-1";
    case 1:
      return "sm:row-span-2 sm:col-span-2";
    case 4:
      return "sm:row-span-2 sm:col-span-2 lg:col-span-1";
    case 5:
      return "sm:col-span-2 sm:row-span-2";
    default:
      return "";
  }
};

export default function ProjectsPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string>("All");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const services = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.services && Array.isArray(p.services)) {
        p.services.forEach((s) => set.add(s));
      } else if (p.category) {
        set.add(p.category);
      }
    });
    return ["All", ...Array.from(set)];
  }, [projects]);

  const filteredProjects =
    selectedService === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.services?.includes(selectedService) ||
            p.category === selectedService
        );

  return (
    <>
      <div className="relative z-20 bg-[#5a5d59] text-[#babbb5]">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setOpenMenu(true)}
            className="px-4 py-4 text-white cursor-pointer"
          >
            <RiMenu3Fill size={36} className="text-[#dad9d6]" />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>
        {openMenu && <Menu onClose={() => setOpenMenu(false)} />}

        <section className="sticky top-0 z-20 w-full bg-[#5a5d59] flex flex-col pb-10">
          <div className="sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-10 mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#dad9d6] leading-tight max-w-4xl pt-8"
            >
              Projects —
            </motion.h1>
          </div>

          <div className="px-4 sm:px-6 md:px-8 lg:px-10 pb-6">
            <h2 className="text-[#dad9d6] font-semibold mb-3 text-2xl">
              Services —
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((colIndex) => (
                <ul key={colIndex} className="flex flex-col gap-1">
                  {services
                    .slice(colIndex * 4, colIndex * 4 + 4)
                    .map((service) => (
                      <li
                        key={service}
                        onClick={() => setSelectedService(service)}
                        className={`cursor-pointer transition text-sm sm:text-xl px-2 ${
                          selectedService === service
                            ? "text-[#dad9d6] font-bold"
                            : "text-[#babbb5] hover:text-[#dad9d6]"
                        }`}
                      >
                        {service}
                      </li>
                    ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        <div className="relative z-20 bg-[#5a5d59]">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="pt-8 pb-24"
          >
            {loading ? (
              <div className="">
                <AnimatedLoader />
              </div>
            ) : (
              <div className="px-4 sm:px-8 md:px-12 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(250px,auto)] sm:auto-rows-[250px] xl:auto-rows-[350px] gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    className={`group relative overflow-hidden cursor-pointer sm:shadow-md bg-[#5a5d59] ${getGridClass(
                      index
                    )}`}
                    initial={{ opacity: 0, y: 60, scale: 1.1 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 2,
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.2,
                    }}
                    viewport={{ once: true, amount: 0.05 }}
                  >
                    <Link
                      href={`/project/${project.slug}`}
                      className="block w-full h-full"
                    >
                      <div className="relative w-full h-[450px] sm:h-full overflow-hidden">
                        <Image
                          src={project.image || "/images/projects/card.jpg"}
                          alt={project.title}
                          width={800}
                          height={600}
                          priority={index < 3}
                          loading={index < 3 ? "eager" : "lazy"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="hidden sm:absolute sm:inset-0 lg:bg-[#5a5d59]/60 lg:backdrop-blur-sm sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:flex flex-col justify-end p-4 sm:p-6">
                          <p className="text-xs sm:text-sm md:text-md font-bold text-[#dad9d6]">
                            {project.category}
                          </p>
                          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#dad9d6]">
                            {project.title} —
                          </h3>
                        </div>
                      </div>

                      <div className="sm:hidden bg-[#5a5d59] p-4">
                        <p className="text-xs font-bold text-[#dad9d6]">
                          {project.category}
                        </p>
                        <h3 className="text-sm font-semibold text-[#dad9d6]">
                          {project.title}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="sm:flex flex-col items-end fixed right-5 bottom-[100px] z-10">
              <VerticalTextLabel />
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </>
  );
}
