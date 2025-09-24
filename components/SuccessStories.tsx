"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { fetchReviews, Review } from "@/Service/api";

export default function SuccessStoriesCarousel() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setSwiperReady(true);

    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    loadReviews();
  }, []);

  return (
    <section className="bg-[#6c706d] text-[#babbb5] font-sans pb-10 sm:pb-50">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 lg:gap-16">
          <div className="md:w-1/3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#babbb5] leading-snug sm:leading-snug mb-4">
              Success Stories —
            </h2>
            <p className="text-sm sm:text-lg leading-relaxed">
              Discover how we helped founders, CEOs, and product leaders elevate
              their brands and websites to the next level.
            </p>
          </div>

          <div className="md:w-2/3 relative w-full">
            <div className="absolute top-0 right-0 z-10 flex gap-4 md:gap-6 p-4">
              <button
                ref={prevRef}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition cursor-pointer pb-10"
              >
                <FaArrowLeft className="text-[#81837e] text-2xl md:text-3xl" />
              </button>
              <button
                ref={nextRef}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition cursor-pointer pb-10"
              >
                <FaArrowRight className="text-[#81837e] text-2xl md:text-3xl" />
              </button>
            </div>

            {swiperReady && reviews.length > 0 && (
              <Swiper
                modules={[Autoplay, Navigation]}
                slidesPerView={1}
                loop={true}
                speed={800}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                className="pb-10"
              >
                {reviews.map((story, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col px-6 sm:px-8">
                      <div className="mb-4 flex items-start justify-between w-full border-b border-[#babbb5] pb-2">
                        <div>
                          <h4 className="font-semibold text-base sm:text-lg text-[#e0e0d8]">
                            {story.name}
                          </h4>
                          <p className="text-sm sm:text-base md:text-lg text-[#81837e]">
                            {story.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                        “{story.quote}”
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {swiperReady && reviews.length === 0 && (
              <p className="text-[#babbb5] text-center mt-4">
                No success stories available.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
