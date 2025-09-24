"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { getBlogById, updateBlog } from "@/Service/api";
import AnimatedLoader from "@/components/ui/AnimatedLoader";
import toast from "react-hot-toast";

export default function UpdateBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    category: "",
    date: "",
    // discussionPoints: [] as string[],
    content: [] as string[],
    image: null as File | null,
    imageUrl: "",
    images: [] as File[],
    imageUrls: [] as string[],
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          toast.error("⚠️ Login required");
          router.push("/admin/login");
          return;
        }
        const result = await getBlogById(id as string, token);

        if (result.success) {
          const blog = result.data;
          setFormData({
            title: blog.title,
            topic: blog.topic,
            category: blog.category,
            date: blog.date?.split("T")[0] || "",
            // discussionPoints: blog.discussionPoints || [],
            content: blog.content || [],
            image: null,
            imageUrl: blog.image || "",
            images: [],
            imageUrls: blog.images || [],
          });
        } else {
          toast.error("❌ Blog not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        toast.error("❌ Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id, router]);

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (
    field: "content",
    value: string
  ) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
  };

  const removeArrayItem = (
    field: "content",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (file: File) => {
    handleChange("image", file);
  };

  const handleMultipleImagesUpload = (files: FileList) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...Array.from(files)],
    }));
  };

  const removeMultipleImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    // 🔹 Required fields
    if (!formData.title.trim()) {
      toast.error("⚠️ Title is required");
      return;
    }
    if (!formData.topic.trim()) {
      toast.error("⚠️ Topic is required");
      return;
    }
    if (!formData.category) {
      toast.error("⚠️ Category is required");
      return;
    }
    if (!formData.date) {
      toast.error("⚠️ Date is required");
      return;
    }

    // 🔹 Ensure blog has a main image (either existing or newly uploaded)
    if (!formData.image && !formData.imageUrl) {
      toast.error("⚠️ Main blog image is required");
      return;
    }

    // 🔹 Ensure content paragraphs exist
    if (formData.content.length === 0) {
      toast.error("⚠️ At least one content paragraph is required");
      return;
    }

    // 🔹 File size validation (10MB max per image)
    if (formData.image && formData.image.size > 10 * 1024 * 1024) {
      toast.error("⚠️ Main image must be smaller than 10MB");
      return;
    }
    if (formData.images.some((img) => img.size > 10 * 1024 * 1024)) {
      toast.error("⚠️ Each additional image must be smaller than 10MB");
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("⚠️ Login required");
      return;
    }

    setIsSubmitting(true);

    try {
      const toastId = toast.loading("Updating blog...");

      const result = await updateBlog(id as string, formData, token);

      if (result.success) {
        toast.success("✅ Blog updated successfully", { id: toastId });
        router.push("/admin/blog");
      } else {
        toast.error(`❌ Failed: ${result.message}`, { id: toastId });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("❌ Failed to update blog: Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#5a5d59]">
        <AnimatedLoader />;
      </div>
    );

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#84837e]">Update Blog</h1>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`bg-[#84837e] hover:bg-[#6b6a65] text-white px-6 py-2 rounded shadow transition ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {formData.imageUrl && (
              <div className="mb-2">
                <p className="text-sm text-gray-600">Current Main Image:</p>
                <img
                  src={formData.imageUrl}
                  alt="main"
                  className="h-40 rounded"
                />
              </div>
            )}
            <div className="border-2 border-dashed border-[#84837e] rounded-lg p-6 text-center shadow-sm h-60">
              <input
                type="file"
                id="mainImage"
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
              />
              <label
                htmlFor="mainImage"
                className="cursor-pointer flex flex-col items-center justify-center gap-2 h-full"
              >
                <FiUploadCloud size={40} className="text-[#84837e]" />
                <p className="text-sm text-gray-500">Replace main image</p>
                {formData.image ? (
                  <p className="text-green-600 font-medium">
                    {formData.image.name}
                  </p>
                ) : (
                  <p className="text-gray-600">
                    Click to upload new main image
                  </p>
                )}
              </label>
            </div>
            {formData.imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.imageUrls.map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} alt="extra" className="h-20 rounded" />
                    <FiTrash2
                      className="absolute top-1 right-1 text-white bg-black/50 rounded cursor-pointer"
                      onClick={() => removeExistingImage(i)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="border-2 border-dashed border-[#84837e] rounded-lg p-4 text-center shadow-sm">
              <input
                type="file"
                id="multipleImages"
                multiple
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleMultipleImagesUpload(e.target.files)
                }
              />
              <label
                htmlFor="multipleImages"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <FiUploadCloud size={30} className="text-[#84837e]" />
                <p className="text-sm text-gray-500">
                  Upload new additional images
                </p>
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.images.map((img, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-[#5a5d59] text-white px-2 py-1 rounded"
                  >
                    <span>{img.name}</span>
                    <FiTrash2
                      className="ml-1 cursor-pointer"
                      onClick={() => removeMultipleImage(i)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                placeholder="Write a paragraph and press Enter to add"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addArrayItem(
                      "content",
                      (e.target as HTMLTextAreaElement).value
                    );
                    (e.target as HTMLTextAreaElement).value = "";
                  }
                }}
                rows={3}
                className="border border-gray-300 h-50 rounded-lg px-4 py-2 w-full outline-none focus:border-[#84837e]"
              />
              <div className="mt-2 space-y-2">
                {formData.content.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-[#5a5d59] text-white px-3 py-2 rounded"
                  >
                    <span>{p}</span>
                    <FiTrash2
                      className="cursor-pointer"
                      onClick={() => removeArrayItem("content", i)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Topic</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => handleChange("topic", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-[#bcbcb4] text-gray-800 focus:border-[#84837e] outline-none appearance-none"
              >
                <option value="" className="bg-[#bcbcb4] text-gray-800">
                  Select a category
                </option>
                <option
                  value="Brand Identity Design & Strategy"
                  className="bg-[#bcbcb4] text-gray-800"
                >
                  Brand Identity Design & Strategy
                </option>
                <option
                  value="Digital Product"
                  className="bg-[#bcbcb4] text-gray-800"
                >
                  Digital Product
                </option>
                <option
                  value="Graphic Design"
                  className="bg-[#bcbcb4] text-gray-800"
                >
                  Graphic Design
                </option>
                <option
                  value="Packaging Design"
                  className="bg-[#bcbcb4] text-gray-800"
                >
                  Packaging Design
                </option>
                <option
                  value="Website Design"
                  className="bg-[#bcbcb4] text-gray-800"
                >
                  Website Design
                </option>
                <option
                  value="Content Design and Photography"
                  className="bg-[#bcbcb4] text-gray-800"
                >
                  Content Design and Photography
                </option>
                <option value="Studio Updates">Studio Updates</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium mb-1">
                Discussion Points
              </label>
              <input
                type="text"
                placeholder="Type & press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addArrayItem(
                      "discussionPoints",
                      (e.target as HTMLInputElement).value
                    );
                    (e.target as HTMLInputElement).value = "";
                  }
                }}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              <div className="mt-2 space-y-2">
                {formData.discussionPoints.map((dp, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-[#5a5d59] text-white px-3 py-2 rounded"
                  >
                    <span>{dp}</span>
                    <FiTrash2
                      className="cursor-pointer"
                      onClick={() => removeArrayItem("discussionPoints", i)}
                    />
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
