"use client";

// import Image, { StaticImageData } from "next/image";
import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

type ProjectType = {
  title: string;
  category: string;
  image: string;
  className?: string;
  slug: string;
};

const First = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758366031/uzddnrt10imbuis0wmq2.jpg";
const Second = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758364879/gp0uutt9jectuumvdemf.jpg";
const Third = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758363675/mk1crmzdafdgosdlqz3d.jpg";
const Fourth = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758362941/cuq0nhiqt2lpnluhh5rh.jpg";
const Fifth = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758361555/jbumwcnedyqkscx7opoq.jpg";
const Six = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758354417/x8gwlxzittwlyfnb1hgf.jpg";
const Seventh = "https://res.cloudinary.com/dkwwt6plu/image/upload/v1758358745/oyg6shtduwubw4vsvegl.jpg";

const projects: ProjectType[] = [
  {
    title: "Arkisto —",
    category: "Home & Lifestyle",
    image: First,
    className: "lg:row-span-2",
    slug: "arkisto",
  },
  {
    title: "Le Havre Restaurants —",
    category: "Food & Restaurants",
    image: Second,
    className: "lg:row-span-2 lg:col-span-2",
    slug: "le-havre-restaurants",
  },
  {
    title: "Supertone Training Club —",
    category: "Sports Club",
    image: Third,
    slug: "supertone-training-club",
  },
  {
    title: "Utah City Tourism —",
    category: "United States (Government Project)",
    image: Fourth,
    slug: "utah-city-tourism",
  },
  {
    title: "MAKA Motors —",
    category: "Electric Vehicles / Sustainable Mobility",
    image: Fifth,
    className: "lg:row-span-2",
    slug: "maka-motors",
  },
  {
    title: "Amus Tcha —",
    category: "Japanese Tea & Lifestyle",
    image: Six,
    className: "lg:col-span-2 lg:row-span-2",
    slug: "amus-tcha",
  },
  {
    title: "Sachet —",
    category: "Home & Lifestyle / Minimalist Design Objects",
    image: Seventh,
    slug: "sachet",
  },
];

export default function ProjectSection() {
  return (
    <section id="project overflow-x: hidden">
      <motion.section
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-[#5a5d59] py-16"
      >
        <div className="px-4 sm:px-8 md:px-12 lg:px-10 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-md sm:text-md md:text-lg font-bold text-[#dad9d6]"
            >
              Key Projects —
            </motion.h2>

            <Link href="/project">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-md sm:text-md md:text-lg font-bold text-[#dad9d6] cursor-pointer flex items-center group"
              >
                View All
                <FaArrowRight className="inline-block text-[#dad9d6] transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </motion.h2>
            </Link>
          </div>
        </div>

        <div className="px-4 sm:px-8 md:px-12 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[350px] sm:auto-rows-[250px] xl:auto-rows-[350px] gap-6">
          {projects.map((project, index) => {
          
            const fromY = index < 3 ? 80 : 60;
            const delay = index * 0.15;

            return (
              <motion.div
                key={index}
                className={`group relative cursor-pointer md:shadow-md transform-gpu ${
                  project.className || ""
                }`}
                initial={{ opacity: 0, y: fromY, scale: 1.1 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: delay,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Link
                  href={`/project/${project.slug}`}
                  className="block w-full h-full"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 mt-12 md:mt-0"
                    />

                    <div className="hidden lg:flex absolute inset-0 bg-[#5a5d59]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-end p-6">
                      <p className="text-md font-bold text-[#dad9d6]">
                        {project.category}
                      </p>
                      <h3 className="text-lg font-semibold text-[#dad9d6]">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>

                <div className="lg:hidden mt-3">
                  <p className="text-xs font-bold text-[#dad9d6]">
                    {project.category}
                  </p>
                  <h3 className="text-sm font-semibold text-[#dad9d6] line-clamp-2">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </section>
  );
}
