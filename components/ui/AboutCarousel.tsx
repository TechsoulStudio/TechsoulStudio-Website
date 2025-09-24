"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const desktopImages = [
  "/images/About/1.webp",
  "/images/About/3.webp",
  "/images/About/5.webp",
];

const mobileImages = [
  "/images/About/2.webp",
  "/images/About/4.webp",
  "/images/About/6.webp",
];

export default function AboutCarousel() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [navigationReady, setNavigationReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setNavigationReady(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize()
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  return (
    <section className="w-full xl:h-screen flex flex-col-reverse md:flex-row justify-end pt-12 md:pt-20 px-4 md:px-0 py-5">
      <div className="w-full md:w-[30%] flex justify-center md:justify-start pt-6 md:pt-10">
        <div className="flex gap-4 md:gap-6">
          <button
            ref={prevRef}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition cursor-pointer rounded-full"
          >
            <FaArrowLeft className="text-[#babbb5] text-2xl md:text-3xl" />
          </button>
          <button
            ref={nextRef}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition cursor-pointer rounded-full"
          >
            <FaArrowRight className="text-[#babbb5] text-2xl md:text-3xl" />
          </button>
        </div>
      </div>

      <div className="w-full md:w-[70%] h-[60vh] md:h-[50vh] lg:h-[50vh] xl:h-[90%] relative overflow-hidden">
        {navigationReady && (
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            speed={1000}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (
                typeof swiper.params.navigation !== "boolean" &&
                swiper.params.navigation
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            className="w-full h-full"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full relative">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="md:object-cover"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
