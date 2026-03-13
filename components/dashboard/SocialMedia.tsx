"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

type Post = {
  id: number;
  title: string;
  image: string;
  link: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "Instagram Post 1",
    image: "/images/SocialMedia/1.jpg",
    link: "https://www.instagram.com/p/DO8gdFUk--N/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 2,
    title: "Instagram Post 2",
    image: "/images/SocialMedia/2.jpg",
    link: "https://www.instagram.com/p/DO57wUakhj7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 3,
    title: "Instagram Post 3",
    image: "/images/SocialMedia/3.jpg",
    link: "https://www.instagram.com/p/DO02PXPk92h/?utm_source=ig_web_copy_link",
  },
  {
    id: 4,
    title: "Instagram Post 4",
    image: "/images/SocialMedia/4.jpg",
    link: "https://www.instagram.com/p/DO57wUakhj7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 5,
    title: "Instagram Post 5",
    image: "/images/SocialMedia/5.jpg",
    link: "https://www.instagram.com/p/DPBlBp3E-Fh/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 6,
    title: "Instagram Post 6",
    image: "/images/SocialMedia/6.jpg",
    link: "https://www.instagram.com/p/DO_I6Smkwtr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

const SocialMedia: React.FC = () => {
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
                <div key={item.id} className="px-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto object-contain transition-all duration-300"
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Image
                        src="/icone/instagram.png"
                        alt="Instagram"
                        width={70}
                        height={70}
                        className="object-contain transform transition-transform duration-2000 group-hover:scale-180"
                      />
                    </div>

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