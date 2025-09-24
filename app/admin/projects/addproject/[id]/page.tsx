"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { addProject, updateProject, fetchProjectById } from "@/Service/api";
import toast from "react-hot-toast";
import Select from "react-select";

export default function AddProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string | undefined;
  const isEditMode = Boolean(projectId);

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    // client: "",
    year: "",
    services: [] as string[],
    description: [] as string[],
    details: [] as string[],
    image: null as File | null,
    images: [] as File[],
    webUrl: "",
  });

  useEffect(() => {
    const loadProjectData = async () => {
      if (!isEditMode || !projectId) return;

      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      setLoading(true);
      try {
        const project = await fetchProjectById(projectId, token);
        setFormData({
          title: project.title || "",
          category: project.category || "",
          // client: project.client || "",
          year: project.year || "",
          services: project.services || [],
          description: project.description || [],
          details: project.details || [],
          image: null,
          images: [],
          webUrl: project.webUrl || "",
        });
      } catch (error) {
        console.error("Failed to load project:", error);
        alert("Could not load project details.");
        router.push("/admin/projects");
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, [isEditMode, projectId, router]);

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => setFormData((prev) => ({ ...prev, [field]: value }));

  const addArrayItem = (
    field: "services" | "description" | "details",
    value: string
  ) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
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
    handleChange("image", file);
  };

  const handleImagesUpload = (files: FileList) => {
    handleChange("images", [...formData.images, ...Array.from(files)]);
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast.error("⚠️ Title is required");
      return false;
    }
    if (!formData.category.trim()) {
      toast.error("⚠️ Category is required");
      return false;
    }
    if (!formData.year.trim()) {
      toast.error("⚠️ Year is required");
      return false;
    }
    if (!formData.image) {
      toast.error("⚠️ Main image is required");
      return false;
    }
    if (formData.services.length === 0) {
      toast.error("⚠️ Add at least one service");
      return false;
    }
    if (formData.description.length === 0) {
      toast.error("⚠️ Add at least one description paragraph");
      return false;
    }
    if (formData.details.length === 0) {
      toast.error("⚠️ Add at least one detail");
      return false;
    }

    return true;
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
      let result;
      if (isEditMode) {
        result = await updateProject(projectId!, formData, token);
      } else {
        result = await addProject(formData, token);
      }

      if (result?.success) {
        toast.success(
          isEditMode ? "✅ Project updated" : "🎉 Project published"
        );
        router.replace("/admin/projects");
        router.refresh();
      } else {
        toast.error("❌ " + (result?.message || "Failed to save project"));
      }
    } catch (error) {
      console.error(error);
      toast.error("🚨 Unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">Loading project...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#84837e]">
            {isEditMode ? "Edit Project" : "Add Project"}
          </h1>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-[#84837e] hover:bg-[#6b6a65] text-white px-6 py-2 rounded shadow transition flex items-center justify-center gap-2 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Publishing..."
                : isEditMode
                ? "Update"
                : "Publish"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
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
                  PNG, JPG or PDF, smaller than 15MB
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

            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter project title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none focus:border-[#84837e]"
              />
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
              <div className="mt-2 space-y-2" style={{ color: "#babbb5" }}>
                {formData.description.map((desc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded"
                    style={{ backgroundColor: "#5a5d59" }}
                  >
                    <span>{desc}</span>
                    <FiTrash2
                      className="cursor-pointer"
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Website URL (optional)
              </label>
              <input
                type="text"
                placeholder="https://example.com"
                value={formData.webUrl}
                onChange={(e) => handleChange("webUrl", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full outline-none focus:border-[#84837e]"
              />
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
              <div className="mt-2 space-y-2" style={{ color: "#babbb5" }}>
                {formData.details.map((det, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded"
                    style={{ backgroundColor: "#5a5d59" }}
                  >
                    <span>{det}</span>
                    <FiTrash2
                      className="cursor-pointer"
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
