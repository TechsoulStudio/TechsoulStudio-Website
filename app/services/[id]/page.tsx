"use client";

import { useEffect, useState } from "react";
import { useRouter, notFound } from "next/navigation";
import Image from "next/image";
import { ServicesData } from "@/data/services";
import { FaArrowLeft } from "react-icons/fa6";
import dynamic from "next/dynamic";
import { RiMenu3Fill } from "react-icons/ri";
import Menu from "@/components/helper/Menu";
import { initLenis } from "@/utils/lenis";
import VerticalTextLabel from "@/components/VerticalTextLabel";
import RelatedBlogs from "@/components/RelatedBlogs";
import { getAllBlogs, Blog } from "@/Service/api";

const Footer = dynamic(() => import("@/components/helper/Footer"), {
  ssr: false,
});

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const router = useRouter();

  useEffect(() => {
    params.then((resolved) => setId(resolved.id));
  }, [params]);

  useEffect(() => {
    setIsClient(true);
    const lenis = initLenis();
    return () => {
      lenis?.destroy?.();
    };
  }, []);
  const service = id ? ServicesData.find((s) => s.slug === id) : undefined;

  useEffect(() => {
    if (!service) return;

    const fetchBlogs = async () => {
      try {
        setLoadingBlogs(true);
        const allBlogs = await getAllBlogs();
        const filtered = allBlogs.filter((blog) => {
          if (!blog.category) return false;
          const blogCategory = blog.category
            .replace(/[—–-\s]/g, "")
            .toLowerCase()
            .trim();

          const serviceTitle = service.title
            .replace(/[—–-\s]/g, "")
            .toLowerCase()
            .trim();

          console.log(
            "Matching:",
            blogCategory,
            "===",
            serviceTitle,
            "Result:",
            blogCategory === serviceTitle
          );
          return blogCategory === serviceTitle;
        });

        console.log("Filtered blogs:", filtered);
        setRelatedBlogs(filtered || []);
      } catch (err) {
        console.error("Failed to fetch related blogs:", err);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, [service]);

  if (!id || !isClient) return null;
  if (!service) return notFound();

  return (
    <div className="w-full bg-[#5a5d59] text-[#babbb5]">
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

      <section className="sticky top-0 z-20 w-full">
        <div className="bg-[#bcbcb4] text-[#81837e] px-4 sm:px-6 md:px-8 lg:px-10 pt-10 pb-5 sm:py-16">
          <div
            className="text-lg font-bold cursor-pointer sm:mb-8"
            onClick={() => router.push("/services")}
          >
            <FaArrowLeft className="inline-block transition-transform duration-300 hover:translate-x-1 mr-2" />
            Back to Services
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4" />
            <div className="w-[70%] md:w-[90%]">
              <ul className="grid grid-cols-1 gap-3 pt-2 text-[#81837e] opacity-70 font-bold text-sm leading-[1] sm:hidden">
                {service.services?.map((item, index) => (
                  <li
                    key={index}
                    className="relative pl-2 border-b border-[#84837e] pb-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="hidden sm:grid grid-cols-1 gap-3 pt-2 sm:text-xl font-bold cursor-pointer leading-[1.5]">
                {service.services?.map((item, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative pl-2 group border-b border-[#84837e] pb-2 transition-all duration-300 ${
                      hoveredIndex === null
                        ? "text-[#81837e] opacity-100"
                        : hoveredIndex === index
                        ? "text-[#81837e] font-extrabold opacity-100"
                        : "text-[#81837e] opacity-30"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-left pt-8">
            <h1 className="text-2xl sm:text-4xl font-bold pt-5">
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="relative z-20">
        <div className="w-full bg-[#5a5d59] text-[#babbb5] px-4 sm:px-6 md:px-8 lg:px-10">
          {service.what && service.what.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-start py-10 sm:py-15">
              <div className="space-y-2 sm:pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {service.whatTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:pt-4 space-y-1 sm:text-lg leading-[1.2] sm:leading-[1.4]">
                {service.what.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>
          )}

          {service.imageone && (
            <div className="w-full h-[150px] sm:h-[100vh] relative overflow-hidden">
              <Image
                src={service.imageone}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
              />
            </div>
          )}

          {service.why && service.why.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-start py-10 sm:py-15 border-b md:border-0">
              <div className="space-y-2 sm:pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {service.whyTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:pt-4 space-y-1 sm:text-lg leading-[1.2] sm:leading-[1.4]">
                {service.why.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>
          )}

          {service.keyElements && service.keyElements.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-start py-10 sm:py-15">
              <div className="space-y-2 sm:pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {service.keyElementsTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:pt-4 space-y-1 sm:text-lg pb-10 leading-[1.2] sm:leading-[1.4]">
                {service.keyElements.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>
          )}

          {(service.imagetwo || service.imagethree) && (
            <div className="grid grid-cols-1 gap-4 pt-4 pb-10 sm:flex gap-6">
              {service.imagetwo && (
                <div className="w-full sm:w-[50%] h-[300px] sm:h-[90vh] relative overflow-hidden mb-5 sm:mb-0">
                  <Image
                    src={service.imagetwo}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {service.imagethree && (
                <div className="w-full sm:w-[50%] h-[300px] sm:h-[90vh] relative overflow-hidden">
                  <Image
                    src={service.imagethree}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {service.Importance && service.Importance.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-start sm:py-5 border-b md:border-0">
              <div className="space-y-2 sm:pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {service.ImportanceTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:pt-4 space-y-1 text-lg pb-10 leading-[1.4]">
                {service.Importance.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>
          )}

          {service.Distinct && service.Distinct.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-start py-5 sm:py-15 border-b md:border-0">
              <div className="space-y-2 sm:pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {service.DistinctTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-2 pt-4 space-y-1 text-lg pb-10 leading-[1.4]">
                {service.Distinct.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>
          )}

          {service.help && service.help.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-start py-5 sm:py-15">
              <div className="space-y-2 sm:pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {service.helpTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:pt-4 space-y-1 text-lg pb-10 leading-[1.4]">
                {service.help.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>
          )}

          {(service.imagefour ||
            service.imagefive ||
            service.videofour ||
            service.videofive) && (
            <div className="grid grid-cols-1 gap-4 pt-4 pb-10 sm:flex gap-6">
              {(service.imagefour || service.videofour) && (
                <div className="w-full sm:w-[50%] h-[300px] sm:h-[90vh] relative overflow-hidden mb-5 sm:mb-0">
                  {service.imagefour ? (
                    <Image
                      src={service.imagefour}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={service.videofour}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}

              {(service.imagefive || service.videofive) && (
                <div className="w-full sm:w-[50%] h-[300px] sm:h-[90vh] relative overflow-hidden">
                  {service.imagefive ? (
                    <Image
                      src={service.imagefive}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={service.videofive}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {service.process && service.process.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-start sm:py-10 leading-[1.4]  border-b md:border-0">
              <div className="space-y-2 sm:pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {service.processTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-2 pt-4 text-lg pb-10 leading-[1.2]">
                {service.process.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>
          )}

          {(service.imagesix || service.videosix) && (
            <div className="w-full h-[170px] sm:h-[100vh] relative overflow-hidden">
              {service.imagesix ? (
                <Image
                  src={service.imagesix}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              ) : service.videosix ? (
                <video
                  src={service.videosix}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          )}

          {service.contact && service.contact.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-start sm:py-5 border-b md:border-0">
              <div className="space-y-2 sm:pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {service.contactTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-2 pt-4 space-y-1 text-lg pb-10 leading-[1.4]">
                {service.contact.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>
          )}

          {(service.imageeight || service.imagenine || service.imageten) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 pb-10 sm:flex gap-6">
              {service.imageeight && (
                <div className="w-full sm:w-[32%] h-[300px] sm:h-[70vh] relative overflow-hidden mb-5 sm:mb-0">
                  <Image
                    src={service.imageeight}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {service.imagenine && (
                <div className="w-full sm:w-[32%] h-[300px] sm:h-[70vh] relative overflow-hidden">
                  <Image
                    src={service.imagenine}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {service.imageten && (
                <div className="w-full sm:w-[32%] h-[300px] sm:h-[70vh] relative overflow-hidden">
                  <Image
                    src={service.imageten}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {service.Future && service.Future.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 items-start sm:py-10 leading-[1.4]">
              <div className="space-y-2 pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {service.FutureTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-2 pt-4 space-y-1 text-lg pb-10 leading-[1.4]">
                {service.Future.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </div>
          )}

          {!loadingBlogs && <RelatedBlogs blogs={relatedBlogs} />}
        </div>

        <Footer />

        <div className="sm:flex flex-col items-end fixed right-5 bottom-[100px] z-10">
          <VerticalTextLabel />
        </div>
      </section>
    </div>
  );
}
