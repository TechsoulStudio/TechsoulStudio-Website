"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { RiMenu3Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import Link from "next/link";

import Menu from "@/components/helper/Menu";
import VerticalTextLabel from "@/components/VerticalTextLabel";
import { getAllBlogs } from "@/Service/api";

const Footer = dynamic(() => import("@/components/helper/Footer"), {
  ssr: false,
});

type Blog = {
  title: string;
  category: string;
  image?: string;
  slug?: string;
};

const getGridClass = (index: number) => {
  const layoutIndex = index % 9;
  switch (layoutIndex) {
    case 0:
      return "lg:col-span-4 lg:row-span-2";
    case 1:
      return "lg:row-span-2 lg:col-span-2";
    case 2:
      return "lg:col-span-3 lg:row-span-2";
    case 3:
      return "lg:col-span-3 lg:row-span-2";
    case 4:
      return "lg:col-span-2 lg:row-span-2";
    case 5:
      return "lg:col-span-2 lg:row-span-2";
    case 6:
      return "lg:col-span-2 lg:row-span-3";
    case 7:
      return "lg:col-span-4 lg:row-span-3";
    case 8:
      return "lg:col-span-2 lg:row-span-2";
    default:
      return "";
  }
};

export default function Page() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category === selectedCategory)
    : blogs;

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
        <section className="sticky top-0 z-20 w-full bg-[#5a5d59] flex pb-60">
          <div className="px-4 py-10 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-col gap-3 w-full">
            <h1 className="text-lg sm:text-xl md:text-6xl text-[#dad9d6] font-bold leading-tight">
              Journal —
            </h1>

            <div>
              <h2 className="text-lg sm:text-xl md:text-xl text-[#dad9d6] font-bold leading-tight">
                Categories —
              </h2>
              <div className="text-md sm:text-lg mt-4 max-w-xl text-[#999999] font-semibold space-y-2">
                <p
                  className={`cursor-pointer hover:text-[#dad9d6] ${
                    selectedCategory === null ? "text-[#dad9d6]" : ""
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </p>
                <p
                  className={`cursor-pointer hover:text-[#dad9d6] ${
                    selectedCategory === "Studio Updates"
                      ? "text-[#dad9d6]"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory("Studio Updates")}
                >
                  Studio Updates
                </p>
                <div
                  className="relative overflow-visible"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="w-full bg-[#5a5d59] text-[#999999] font-semibold cursor-pointer flex items-center gap-5">
                    <span>{selectedCategory || "Service"}</span>
                    <FaAngleDown className="ml-2 text-sm" />
                  </div>

                  {showDropdown && (
                    <ul className="absolute z-20 w-full bg-[#5a5d59] pt-1 rounded">
                      <li
                        key="all"
                        onClick={() => {
                          setSelectedCategory(null);
                          setShowDropdown(false);
                        }}
                        className="px-4 py-2 hover:bg-[#444744] cursor-pointer"
                      >
                        All
                      </li>
                      {[
                        "Brand Identity Design & Strategy",
                        "Digital Product",
                        "Graphic Design",
                        "Packaging Design",
                        "Website Design",
                        "Content Design and Photography",
                      ].map((service) => (
                        <li
                          key={service}
                          onClick={() => {
                            setSelectedCategory(service);
                            setShowDropdown(false);
                          }}
                          className="px-4 py-2 hover:bg-[#444744] cursor-pointer"
                        >
                          {service}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="relative z-20 bg-[#5a5d59]">
          <motion.section
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="pb-24"
          >
            <div className="px-4 sm:px-8 md:px-12 lg:px-10 grid sm:grid-cols-2 gap-4 lg:grid-cols-6 lg:auto-rows-[350px] auto-rows-[minmax(250px,auto)]">
              {loading && <p className="text-gray-500">Loading blogs...</p>}

              {!loading &&
                filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={index}
                    className={`group relative overflow-hidden cursor-pointer bg-[#5a5d59] ${getGridClass(
                      index
                    )}`}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="block w-full h-full"
                    >
                      <div className="relative w-full overflow-hidden">
                        <Image
                          src={blog.image || "/images/placeholder.jpg"}
                          alt={blog.title}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="hidden sm:absolute sm:inset-0 lg:bg-[#5a5d59]/60 lg:backdrop-blur-sm sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:flex flex-col justify-end p-4 sm:p-6">
                          <h3 className="text-sm sm:text-md md:text-lg font-semibold text-[#dad9d6]">
                            {blog.title}
                          </h3>
                          <p className="text-xs sm:text-md font-bold text-[#dad9d6]">
                            {blog.category}
                          </p>
                        </div>
                      </div>

                      <div className="sm:hidden bg-[#5a5d59] p-4">
                        <h3 className="text-sm font-semibold text-[#dad9d6]">
                          {blog.title}
                        </h3>
                        <p className="text-xs font-bold text-[#dad9d6]">
                          {blog.category}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>

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
