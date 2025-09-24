"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Blog } from "@/Service/api";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

interface RelatedBlogsProps {
  blogs: Blog[];
}

export default function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  const router = useRouter();

  if (!blogs || blogs.length === 0) return null;

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: blogs.length > 3,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: blogs.length > 3,
    autoplaySpeed: 2500,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center gap-2 mt-6">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-[#babbb5] opacity-50 hover:opacity-100 transition duration-300" />
    ),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="text-white w-full">
      <div className="py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-8">
          {/* Left Section */}
          <div className="w-full md:w-[30%]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#babbb5] leading-tight mb-3">
              Related Blog Posts —
            </h2>
            <p className="text-sm text-[#babbb5] mb-6">
              Explore articles and insights connected to this topic, handpicked
              to deepen your understanding and keep you informed.
            </p>
          </div>

          <div className="w-full md:w-[70%]">
            <Slider {...sliderSettings}>
              {blogs.map((blog) => (
                <div key={blog.slug} className="px-2">
                  <div
                    className="relative group overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:opacity-90"
                    onClick={() => router.push(`/blog/${blog.slug}`)}
                  >
                    <div className="relative h-[250px] sm:h-[280px] md:h-[220px] w-full">
                      <Image
                        src={blog.image as string}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-4 sm:p-6 bg-[#5f625f] flex flex-col justify-between h-[200px]">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#dad9d6] line-clamp-2">
                          {blog.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-[#babbb5] line-clamp-3 mt-2">
                        {blog.topic}
                      </p>
                      <div className="flex justify-end items-center gap-2 mt-4">
                        <h3 className="text-right text-sm sm:text-base">Read more</h3>
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
