"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRightToBracket, FaEnvelope } from "react-icons/fa6";
import Image from "next/image";

import {
  fetchProjects,
  fetchPosts,
  getAllBlogs,
  fetchTeamMembers,
  fetchSubscribersService,
  fetchInquiriesService,
} from "@/Service/api";
import Link from "next/link";

export default function AdminHome() {
  const router = useRouter();

  const [counts, setCounts] = useState({
    projects: 0,
    blogs: 0,
    posts: 0,
    team: 0,
  });

  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const [newsletterSubscribers, setNewsletterSubscribers] = useState<
    { email: string; createdAt: string }[]
  >([]);
  const [userInquiries, setUserInquiries] = useState<
    {
      name: string;
      email: string;
      contact: string;
      message?: string;
      createdAt: string;
    }[]
  >([]);

  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [loadingInquiries, setLoadingInquiries] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const projects = await fetchProjects();
        const blogs = await getAllBlogs();
        const posts = await fetchPosts();
        const team = await fetchTeamMembers();

        setCounts({
          projects: projects.length,
          blogs: blogs.length,
          posts: posts.length,
          team: team.length,
        });
      } catch (err) {
        console.error("Error fetching dashboard counts:", err);
      }
    };

    const loadSubscribersAndInquiries = async () => {
      try {
        const subscribers = await fetchSubscribersService();
        const inquiries = await fetchInquiriesService();

        setNewsletterSubscribers(subscribers);
        setUserInquiries(inquiries);
      } catch (err) {
        console.error("Error fetching subscribers or inquiries:", err);
      } finally {
        setLoadingSubscribers(false);
        setLoadingInquiries(false);
      }
    };

    loadCounts();
    loadSubscribersAndInquiries();
  }, []);

  const stats = [
    {
      id: 1,
      title: "Projects",
      value: counts.projects,
      icon: (
        <Image
          src="/icone/clipboard-gear.png"
          alt="Projects"
          width={60}
          height={60}
        />
      ),
      button: "Add Project +",
      addlink: "/admin/projects/addproject",
      link: "/admin/projects",
    },
    {
      id: 2,
      title: "Blogs",
      value: counts.blogs,
      icon: <Image src="/icone/blog.png" alt="Blogs" width={60} height={60} />,
      button: "Add Blog +",
      addlink: "/admin/blog/addblog",
      link: "/admin/blog",
    },
    {
      id: 3,
      title: "Social Media Post",
      value: counts.posts,
      icon: <Image src="/icone/post.png" alt="Posts" width={60} height={60} />,
      button: "Add Social Media Post +",
      addlink: "/admin/social-media-post",
      link: "/admin/social-media-post",
    },
    {
      id: 4,
      title: "Team",
      value: counts.team,
      icon: (
        <Image
          src="/icone/conversation.png"
          alt="Team"
          width={60}
          height={60}
        />
      ),
      button: "Add Team +",
      addlink: "/admin/team",
      link: "/admin/team",
    },
  ];

  const handleClick = (id: number, link: string) => {
    setLoadingIds((prev) => [...prev, id]);
    setTimeout(() => {
      setLoadingIds((prev) => prev.filter((item) => item !== id));
      router.push(link);
    }, 800);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ duration: 0.3 }}
            className="relative shadow-md hover:shadow-2xl p-5 py-8 flex flex-col justify-between border border-[#84837e]"
          >
            <div className="flex items-center space-x-4">
              <div className="text-[#babbb5]">{stat.icon}</div>
              <div className="flex flex-col pl-3">
                <h2 className="text-3xl font-bold">{stat.value}</h2>
                <p className="text-gray-500 text-lg">{stat.title}</p>
              </div>
            </div>
            <div
              className="absolute bottom-4 right-4 p-3 bg-[#84837e] rounded-full text-[#babbb5] cursor-pointer hover:bg-[#9c9b97] transition-colors"
              onClick={() => router.push(stat.link)}
            >
              <FaArrowRightToBracket className="text-xl" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => {
          const loading = loadingIds.includes(stat.id);
          return (
            <motion.button
              key={stat.id}
              type="button"
              disabled={loading}
              whileHover={{ transition: { duration: 0.4 } }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-block overflow-hidden bg-[#84837e] text-white text-lg md:text-lg font-medium px-8 md:px-12 py-3 transition-all duration-300 group shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
              onClick={() => handleClick(stat.id, stat.addlink)}
            >
              <span className="absolute inset-0 bg-[#9c9b97] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
              <span className="relative z-10">
                {loading ? "Adding..." : stat.button}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#84837e] rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#babbb5]">
              Newsletter Subscribers
            </h2>
            <Link href="/admin/subscriber">
              <button className="text-[#babbb5] text-sm hover:underline cursor-pointer">
                View all
              </button>
            </Link>
          </div>
          <div className="space-y-2">
            {loadingSubscribers ? (
              <p className="text-[#babbb5]">Loading...</p>
            ) : newsletterSubscribers.length === 0 ? (
              <p className="text-[#babbb5]">No subscribers yet.</p>
            ) : (
              // Latest 5 subscribers
              [...newsletterSubscribers]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 5)
                .map((subscriber, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-5 p-3 bg-[#bcbcb4] text-[#84837e] rounded"
                  >
                    <div className="">
                      <FaEnvelope className="text-[#84837e] text-lg" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{subscriber.email}</span>
                      <span className="text-sm text-gray-500">
                        Date:{" "}
                        {new Date(subscriber.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="bg-[#84837e] rounded-lg shadow p-4 overflow-x-auto lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#babbb5]">
              User Inquiries
            </h2>
            <Link href="/admin/inquiry">
              <button className="text-[#babbb5] text-sm hover:underline cursor-pointer">
                View all
              </button>
            </Link>
          </div>
          {loadingInquiries ? (
            <p className="text-[#babbb5]">Loading...</p>
          ) : userInquiries.length === 0 ? (
            <p className="text-[#babbb5]">No inquiries yet.</p>
          ) : (
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-[#bcbcb4] text-[#84837e]">
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Mobile</th>
                  <th className="px-3 py-2">Message</th>
                  <th className="px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {userInquiries.map((inquiry, index) => (
                  <tr key={index} className="text-[#babbb5] border-b">
                    <td className="px-3 py-2">{inquiry.name}</td>
                    <td className="px-3 py-2">{inquiry.email}</td>
                    <td className="px-3 py-2">{inquiry.contact}</td>
                    <td className="px-3 py-2">{inquiry.message || "-"}</td>
                    <td className="px-3 py-2">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
