"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchPosts, Post } from "@/Service/api";

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
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
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

const SocialMedia: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  return (
    <section className="bg-[#6c706d] text-white w-full">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-8">
          <div className="w-full md:w-[30%]">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#babbb5] leading-tight mb-3">
              Social Media Post —
            </h2>
            <p className="text-sm text-[#babbb5] mb-6">
              Follow us on Social Media to stay updated with our latest
              projects, insights, and design inspirations.
            </p>
          </div>

          <div className="w-full md:w-[70%]">
            <Slider {...sliderSettings}>
              {posts.map((item) => (
                <div key={item._id} className="px-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={400}
                      className="w-full h-[400px] sm:h-[400px] object-cover transition-all duration-300 group-hover:scale-110"
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
