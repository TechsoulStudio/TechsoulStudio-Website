"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type Review = {
  name: string;
  role: string;
  quote: string;
};

export default function SuccessStoriesCarousel() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const reviews: Review[] = [
    {
      name: "Divya",
      role: "Mental Health Coach",
      quote:
        "I had the pleasure of working with Smit Bhanderi on a recent project and I could not have asked for a better experience. From the start, he brought genuine creativity, warmth and professionalism that made the whole process smooth and enjoyable. What impressed me most was how proactive he is. Smit does not just wait for instructions but takes initiative, shares thoughtful ideas and thinks ahead in ways that truly elevate the work. It gave me a lot of confidence knowing the project was always moving forward with clarity. I also really valued his generosity with both time and ideas. He was open, patient and always willing to refine until things felt right. It is clear that they genuinely care about creating something meaningful rather than just finishing a task. Thanks to Smit, I now have a brand identity that feels authentic and aligned with my vision. I am deeply grateful for his efforts and hope I get the chance to work with them again in the future.",
    },
    {
      name: "CA Naimish Sarkheliya",
      role: "CEO, AccuLedger KPO",
      quote:
        "It’s been a great experience working with Smit Bhanderi, who designed and manages our website at Acculedger KPO. He understood our vision really well and turned it into a professional, easy-to-use, and impactful website. What I appreciate most is his reliability and proactive approach whenever we need changes or updates, he’s quick to respond and always comes up with practical solutions. Thanks to his efforts, our website genuinely reflects who we are as a firm. I’m happy to recommend Smit to anyone looking for a dependable and skilled web developer.",
    },
    {
      name: "Karose Jewels",
      role: "Company",
      quote: "Good Job Smith...... I Show on Instagram and Facebook.",
    },
    {
      name: "Kacie lee",
      role: "Owner of kacieleebodywork",
      quote:
        "Smit did an amazing job on my flyer work and website. clean, modern, and exactly what I wanted!",
    },
    {
      name: "Pinal Vadadoriya",
      role: "Founder of Pinal&co",
      quote:
        "As the founder of a PINAL&CO, I’ve worked with Smit on our Jewelry Brand For branding, Website Design, ECommerce store(Etsy), Graphics and Social Media, and Digital marketing and the results were unbelievable!We started from 0 and in a short time, our revenue grew by 400% . Smit’s smart strategies and client-first mindset made the whole journey smooth and successful.",
    },
    {
      name: "Lokesh Chandran",
      role: "Owner at PC Builders Inc",
      quote: "I worked with Smit for brand identity design and trademark updation, and I must say it was a wonderful experience. He was very helpful throughout the process and communicated politely and professionally. Language was never a barrier he clearly understood all our requirements and delivered exactly what we needed. I truly appreciate his support and would highly recommend him for anyone looking for reliable and creative brand solutions",
    },
  ];

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <section className="bg-[#6c706d] text-[#babbb5] font-sans pb-10 sm:pb-50">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 lg:gap-16">
          <div className="md:w-1/3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#babbb5] leading-snug mb-4">
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
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer pb-10"
              >
                <FaArrowLeft className="text-[#81837e] text-2xl md:text-3xl" />
              </button>

              <button
                ref={nextRef}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer pb-10"
              >
                <FaArrowRight className="text-[#81837e] text-2xl md:text-3xl" />
              </button>
            </div>

            {swiperReady && (
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

                      <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                        “{story.quote}”
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
