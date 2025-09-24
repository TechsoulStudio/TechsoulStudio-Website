"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Blog, getAllBlogs, deleteBlog } from "@/Service/api";
import toast from "react-hot-toast";
import Select from "react-select";

export default function BlogPage() {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        toast.error("❌ Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;

    const toastId = toast.loading("Deleting blog...");
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Token not found. Please login.");

      await deleteBlog(deleteId, token);
      setBlogs((prev) => prev.filter((b) => b._id !== deleteId));
      setDeleteId(null);
      toast.success("🗑️ Blog deleted successfully!", { id: toastId });
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to delete blog";
      toast.error(`❌ ${message}`, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/blog/addblog/${id}`);
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || b.category === categoryFilter;
    const blogYear = new Date(b.date).getFullYear().toString();
    const matchesYear = !yearFilter || blogYear === yearFilter;
    return matchesSearch && matchesCategory && matchesYear;
  });

  const yearOptions = Array.from(
    new Set(blogs.map((b) => new Date(b.date).getFullYear().toString()))
  );

  const categoryOptions = [
    "Brand Identity Design & Strategy",
    "Digital Product",
    "Graphic Design",
    "Packaging Design",
    "Website Design",
    "E-commerce",
    "Content Design & Photography",
    "Studio Updates",
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#84837e]">Blog List</h1>
          <motion.button
            type="button"
            disabled={loading}
            whileHover={{ transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block overflow-hidden bg-[#84837e] text-white text-lg md:text-xl font-medium px-8 md:px-12 py-3 transition-all duration-300 group shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
            onClick={() => router.push("/admin/blog/addblog")}
          >
            <span className="absolute inset-0 bg-[#9c9b97] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
            <span className="relative z-10">Add Blog</span>
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 grid md:grid-cols-3 gap-6">
            {loading && <p className="text-gray-500">Loading blogs...</p>}
            {!loading && filteredBlogs.length === 0 && (
              <p className="text-gray-500">No blogs found.</p>
            )}
            {!loading &&
              filteredBlogs.map((blog) => (
                <div key={blog._id} className="overflow-hidden text-[#84837e]">
                  <div className="relative h-50" style={{ height: "200px" }}>
                    <Image
                      src={blog.image || "https://via.placeholder.com/400x300"}
                      alt={blog.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl mb-2">{blog.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                      <span>{blog.category}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {blog.topic || blog.content?.[0] || "No description"}
                    </p>
                    <div className="flex gap-3 text-gray-500">
                      <FiEdit2
                        className="cursor-pointer hover:text-sky-600"
                        onClick={() => handleEdit(blog._id)}
                      />
                      <FiTrash2
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => setDeleteId(blog._id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="w-full lg:w-72 flex-shrink-0 p-4 h-fit">
            <div className="flex items-center border-b border-[#84837e] px-3 py-2 mb-4">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Blogs..."
                className="w-full outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FiFilter className="text-gray-500" />
                <span className="font-semibold text-gray-700">
                  Filter Blogs
                </span>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-500">Category</label>
                <Select
                  isClearable
                  name="category"
                  options={[
                    { value: "", label: "All" },
                    ...categoryOptions.map((cat) => ({
                      value: cat,
                      label: cat,
                    })),
                  ]}
                  value={
                    categoryFilter
                      ? { value: categoryFilter, label: categoryFilter }
                      : { value: "", label: "All" }
                  }
                  onChange={(selected) =>
                    setCategoryFilter(selected ? selected.value : "")
                  }
                  placeholder="Choose category..."
                  classNamePrefix="select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: `1px solid ${
                        state.isFocused ? "#84837e" : "#84837e"
                      }`,
                      boxShadow: "none",
                      borderRadius: 0,
                      paddingBottom: "2px",
                      minHeight: "36px",
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      padding: "0 0 0 4px",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#2d2d2d",
                      color: "#fff",
                      borderRadius: "0.5rem",
                      marginTop: "2px",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#84837e"
                        : "transparent",
                      color: state.isFocused ? "white" : "#e5e5e5",
                      cursor: "pointer",
                      padding: "6px 10px",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#a1a1a1",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#a1a1a1",
                      padding: "0 4px",
                    }),
                    indicatorSeparator: () => ({ display: "none" }),
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-500">Year</label>
                <Select
                  isClearable
                  name="year"
                  options={[
                    { value: "", label: "All" },
                    ...yearOptions.map((year) => ({
                      value: year,
                      label: year,
                    })),
                  ]}
                  value={
                    yearFilter
                      ? { value: yearFilter, label: yearFilter }
                      : { value: "", label: "All" }
                  }
                  onChange={(selected) =>
                    setYearFilter(selected ? selected.value : "")
                  }
                  placeholder="Choose year..."
                  classNamePrefix="select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: `1px solid ${
                        state.isFocused ? "#84837e" : "#84837e"
                      }`,
                      boxShadow: "none",
                      borderRadius: 0,
                      paddingBottom: "2px",
                      minHeight: "36px",
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      padding: "0 0 0 4px",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#2d2d2d",
                      color: "#fff",
                      borderRadius: "0.5rem",
                      marginTop: "2px",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#84837e"
                        : "transparent",
                      color: state.isFocused ? "white" : "#e5e5e5",
                      cursor: "pointer",
                      padding: "6px 10px",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#a1a1a1",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#a1a1a1",
                      padding: "0 4px",
                    }),
                    indicatorSeparator: () => ({ display: "none" }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#5a5d59] text-[#babbb5] p-6 rounded-xl shadow-lg w-80 text-center">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this blog?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
