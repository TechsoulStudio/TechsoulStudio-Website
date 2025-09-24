"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { addProject } from "@/Service/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Select from "react-select";

export default function AddProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    year: "",
    services: [] as string[],
    description: [] as string[],
    details: [] as string[],
    image: null as File | null,
    images: [] as File[],
    webUrl: "",
  });

  const serviceOptions = [
    {
      value: "Brand Identity Design & Strategy",
      label: "Brand Identity Design & Strategy",
    },
    { value: "Digital Product", label: "Digital Product" },
    { value: "Graphic Design", label: "Graphic Design" },
    { value: "Packaging Design", label: "Packaging Design" },
    { value: "Website Design", label: "Website Design" },
    { value: "E-commerce", label: "E-commerce" },
    {
      value: "Content Design and Photography",
      label: "Content Design and Photography",
    },
  ];

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const addArrayItem = (
    field: "services" | "description" | "details",
    value: string
  ) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const removeArrayItem = (
    field: "services" | "description" | "details",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Main image must be under 10MB",
      }));
      return;
    }
    handleChange("image", file);
  };

  const handleImagesUpload = (files: FileList) => {
    const tooBig = Array.from(files).some((f) => f.size > 10 * 1024 * 1024);
    if (tooBig) {
      setErrors((prev) => ({
        ...prev,
        images: "Each additional image must be under 10MB",
      }));
      return;
    }
    handleChange("images", [...formData.images, ...Array.from(files)]);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";
    if (!formData.image) newErrors.image = "Main image is required";
    if (formData.services.length === 0)
      newErrors.services = "At least one service is required";
    if (formData.description.length === 0)
      newErrors.description = "At least one description paragraph is required";
    if (formData.details.length === 0)
      newErrors.details = "At least one detail is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast("🔑 Login required", { icon: "🔒" });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addProject(formData, token);

      if (result.success) {
        router.replace("/admin/projects");
        toast.success("✅ " + result.message);
        setFormData({
          title: "",
          category: "",
          year: "",
          services: [],
          description: [],
          details: [],
          image: null,
          images: [],
          webUrl: "",
        });
      } else {
        toast.error("❌ Failed to submit: " + result.message);
      }
    } catch (error) {
      toast.error("🚨 An unexpected error occurred");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#84837e]">Add Project</h1>
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-[#84837e] hover:bg-[#6b6a65] text-white px-6 py-2 rounded shadow transition flex items-center justify-center gap-2 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </button>
            <button
              onClick={() => {
                setFormData({
                  title: "",
                  category: "",
                  year: "",
                  services: [],
                  description: [],
                  details: [],
                  image: null,
                  images: [],
                  webUrl: "",
                });
                setErrors({});
              }}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded shadow transition"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
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
                <p className="text-sm text-gray-500">
                  PNG, JPG or PDF, smaller than 10MB
                </p>
                {formData.image ? (
                  <p className="text-green-600 font-medium">
                    {formData.image.name}
                  </p>
                ) : (
                  <p className="text-gray-600">Click to upload main image</p>
                )}
              </label>
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter project title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none focus:border-[#84837e]"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description Paragraphs
              </label>
              <textarea
                placeholder="Write a paragraph and press Enter to add"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addArrayItem(
                      "description",
                      (e.target as HTMLTextAreaElement).value
                    );
                    (e.target as HTMLTextAreaElement).value = "";
                  }
                }}
                rows={3}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none focus:border-[#84837e]"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
              <div className="mt-2 space-y-2" style={{ color: "#babbb5" }}>
                {formData.description.map((desc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded"
                    style={{ backgroundColor: "#5a5d59" }}
                  >
                    <span>{desc}</span>
                    <FiTrash2
                      className="text-[#babbb5] cursor-pointer"
                      onClick={() => removeArrayItem("description", i)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                placeholder="Enter category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none focus:border-[#84837e]"
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Website URL (optional)
              </label>
              <input
                type="text"
                placeholder="Enter project website URL"
                value={formData.webUrl}
                onChange={(e) => handleChange("webUrl", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none focus:border-[#84837e]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="text"
                placeholder="Enter year"
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none focus:border-[#84837e]"
              />
              {errors.year && (
                <p className="text-red-500 text-sm mt-1">{errors.year}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Services</label>
              <Select
                isMulti
                name="services"
                options={serviceOptions}
                value={serviceOptions.filter((opt) =>
                  formData.services.includes(opt.value)
                )}
                onChange={(selected) =>
                  handleChange(
                    "services",
                    selected ? selected.map((s) => s.value) : []
                  )
                }
                placeholder="Select services..."
                classNamePrefix="select"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "transparent",
                    borderColor: state.isFocused ? "#84837e" : "#d1d5db",
                    boxShadow: "none",
                    "&:hover": { borderColor: "#6b6a65" },
                    borderRadius: "0.5rem",
                    padding: "2px",
                    minHeight: "42px",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#5a5d59",
                    borderRadius: "6px",
                    padding: "2px 6px",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "#babbb5",
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: "#babbb5",
                    ":hover": { backgroundColor: "#84837e", color: "white" },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#2d2d2d",
                    color: "#fff",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#84837e"
                      : "transparent",
                    color: state.isFocused ? "white" : "#e5e5e5",
                    cursor: "pointer",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#a1a1a1",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#e5e5e5",
                  }),
                }}
              />
              {errors.services && (
                <p className="text-red-500 text-sm mt-1">{errors.services}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Details</label>
              <textarea
                placeholder="Type detail & press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addArrayItem(
                      "details",
                      (e.target as HTMLTextAreaElement).value
                    );
                    (e.target as HTMLTextAreaElement).value = "";
                  }
                }}
                rows={3}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none focus:border-[#84837e]"
              />
              {errors.details && (
                <p className="text-red-500 text-sm mt-1">{errors.details}</p>
              )}
              <div className="mt-2 space-y-2" style={{ color: "#babbb5" }}>
                {formData.details.map((det, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded"
                    style={{ backgroundColor: "#5a5d59" }}
                  >
                    <span>{det}</span>
                    <FiTrash2
                      className="text-[#babbb5] cursor-pointer"
                      onClick={() => removeArrayItem("details", i)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Additional Images
              </label>
              <input
                type="file"
                multiple
                onChange={(e) =>
                  e.target.files && handleImagesUpload(e.target.files)
                }
                className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none focus:border-[#84837e]"
              />
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
              <div
                className="mt-3 space-y-2 text-sm"
                style={{ color: "#babbb5" }}
              >
                {formData.images.map((img, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{ backgroundColor: "#5a5d59" }}
                  >
                    <span className="truncate max-w-[80%]">{img.name}</span>
                    <FiTrash2
                      className="cursor-pointer hover:text-red-400"
                      style={{ color: "#babbb5" }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, index) => index !== i),
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
