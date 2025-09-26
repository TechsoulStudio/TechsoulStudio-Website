"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri";
import dynamic from "next/dynamic";

import VerticalTextLabel from "@/components/VerticalTextLabel";
import Menu from "@/components/helper/Menu";
import { getAllBlogs, Blog as APIBlog } from "@/Service/api";

const Footer = dynamic(() => import("@/components/helper/Footer"), {
  ssr: false,
});

export interface Blog extends APIBlog {
  _id: string;
  title: string;
  topic: string;
  category: string;
  date: string;
  keypoints: string[];
  discussionPoints: string[];
  content: string[];
  image: string;
  images?: string[];
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const allBlogs = await getAllBlogs();
        const slugValue = Array.isArray(slug) ? slug[0] : slug;
        const found = allBlogs.find((b) => b.slug === slugValue) || null;
        setBlog(found as Blog | null);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen p-10 text-white">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="min-h-screen p-10 text-white">Blog not found.</div>;
  }

  return (
    <>
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

      <section className="relative w-full sticky top-0 z-20">
        <div className="bg-[#bcbcb4] text-[#81837e] px-4 sm:px-6 md:px-10 lg:px-20 h-[75vh] flex flex-col justify-between">
          <div className="py-8">
            <div
              className="text-base sm:text-lg font-bold cursor-pointer group"
              onClick={() => router.push("/blog")}
            >
              <FaArrowLeft className="inline-block mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </div>
          </div>

          <div className="pb-6 pt-8 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {blog.title} —
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold pt-4 leading-snug">
              {blog.topic}
            </h2>
          </div>

          <div className="pb-6 pt-8 flex gap-10">
            <div>
              <p className="text-base sm:text-lg mt-2">
                <span className="font-semibold">Category — </span>
              </p>{" "}
              <span className="text-base sm:text-lg">{blog.category}</span>
            </div>

            <div>
              <p className="text-base sm:text-lg mt-2">
                <span className="font-semibold">Published — </span>{" "}
              </p>
              <span className="text-base sm:text-lg">
                {blog.date
                  ? new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20">
        <div className="bg-[#5a5d59] text-[#dad9d6] px-4 sm:px-6 md:px-10 lg:px-20 py-10 space-y-14">
          {blog.images?.[0] && (
            <div className="w-full h-[400px] sm:min-h-[110vh] relative overflow-hidden mb-10">
              <Image
                src={blog.images[0]}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div></div>
            <div className="text-base sm:text-lg space-y-4 leading-relaxed">
              {blog.content?.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {blog.images?.slice(1, 3).map(
              (img, i) =>
                img && (
                  <div key={i} className="w-full md:w-1/2">
                    <Image
                      src={img}
                      alt={`${blog.title} image ${i + 2}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )
            )}
          </div>

          <div className="flex flex-col md:flex-row md:flex-wrap gap-5">
            {blog.images?.slice(3, 6).map(
              (img, i) =>
                img && (
                  <div key={i} className="w-full md:w-[31.9%]">
                    <Image
                      src={img}
                      alt={`${blog.title} image ${i + 4}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="text-base sm:text-lg space-y-4 leading-relaxed"></div>
            {blog.images?.[6] && (
              <Image
                src={blog.images[6]}
                alt={`${blog.title} image 7`}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            )}
          </div>
        </div>

        <Footer />

        <div className="lg:flex flex-col items-end fixed right-5 bottom-[100px] z-10">
          <VerticalTextLabel />
        </div>
      </section>
    </>
  );
}
