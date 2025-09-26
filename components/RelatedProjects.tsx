"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ProjectType = {
  slug: string;
  title: string;
  image?: string | StaticImageData;
  category: string;
  services?: string[];
};

type Props = {
  currentSlug: string;
  allProjects: ProjectType[];
  currentServices?: string[];
};

const sliderSettings = (projectsLength: number) => ({
  dots: false,
  arrows: false,
  infinite: projectsLength > 3,
  speed: 600,
  slidesToShow: projectsLength >= 3 ? 3 : projectsLength,
  slidesToScroll: 1,
  autoplay: projectsLength > 3,
  autoplaySpeed: 2500,
  centerMode: projectsLength >= 3,
  centerPadding: "2px",
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
      settings: {
        slidesToShow: projectsLength >= 2 ? 2 : 1,
        centerMode: projectsLength >= 2,
        centerPadding: "10px",
      },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1, centerMode: false, centerPadding: "0" },
    },
  ],
});

export default function RelatedProjects({
  currentSlug,
  allProjects,
  currentServices = [],
}: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const relatedProjects = allProjects
    .filter(
      (p) =>
        p.slug !== currentSlug &&
        p.services?.some((s) => currentServices.includes(s))
    )
    .slice(0, 5);

  if (!relatedProjects.length || !mounted) return null;

  return (
    <section className="text-white w-full">
      <div className="py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-8">
          <div className="w-full md:w-[30%]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#babbb5] leading-tight mb-3">
              Related Projects —
            </h2>
            <p className="text-sm text-[#babbb5] mb-6">
              Discover projects that share similar services or themes,
              handpicked to inspire and inform your journey.
            </p>
          </div>

          <div className="w-full md:w-[70%]">
            <Slider {...sliderSettings(relatedProjects.length)}>
              {relatedProjects.map((project) => (
                <div key={project.slug} className="px-2">
                  <div
                    className="relative group overflow-hidden cursor-pointer transition-all duration-300 hover:opacity-90"
                    onClick={() => router.push(`/project/${project.slug}`)}
                  >
                    <div className="relative h-[250px] sm:h-[280px] md:h-[250px] w-full">
                      <Image
                        src={
                          typeof project.image === "string" && project.image
                            ? project.image
                            : "/placeholder.jpg"
                        }
                        alt={project.title || "Project"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#dad9d6] line-clamp-2">
                          {project.title} —
                        </h3>
                        <div className="flex flex-wrap text-sm sm:text-base text-[#babbb5] mt-2 gap-2">
                          {project.services?.slice(0, 3).map((service, i) => (
                            <span key={i}>{service}</span>
                          ))}
                        </div>
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
