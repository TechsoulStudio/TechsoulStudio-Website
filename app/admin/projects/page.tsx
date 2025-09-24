"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProjects, deleteProject } from "@/Service/api";
import toast from "react-hot-toast";
import Select from "react-select";

interface Project {
  _id: string;
  title: string;
  category: string;
  year: string;
  services: string[];
  description: string[];
  details: string[];
  image?: string;
  images?: string[];
}

export default function PortfolioPage() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState("");
  const [deleteProjectData, setDeleteProjectData] = useState<Project | null>(
    null
  );
  const router = useRouter();

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

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Failed to fetch projects: " + error.message);
      } else {
        alert("Failed to fetch projects");
      }
    }
  };

  const confirmDelete = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken") || "";
      await deleteProject(id, token);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setDeleteProjectData(null);
      toast.success("🗑️ Project deleted successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("❌ Failed to delete project: " + error.message);
      } else {
        toast.error("❌ Failed to delete project");
      }
    }
    setLoading(false);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/projects/addproject/${id}`);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesService =
      serviceFilter.length === 0 ||
      serviceFilter.some((service) => p.services.includes(service));

    const matchesYear = !yearFilter || p.year === yearFilter;

    return matchesSearch && matchesService && matchesYear;
  });

  const yearOptions = Array.from(new Set(projects.map((p) => p.year)));

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#84837e]">Project List</h1>
          <motion.button
            type="button"
            disabled={loading}
            whileHover={{ transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block overflow-hidden bg-[#84837e] text-white text-lg md:text-xl font-medium px-8 md:px-12 py-3 transition-all duration-300 group shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 800);
              router.push("/admin/projects/addproject");
            }}
          >
            <span className="absolute inset-0 bg-[#9c9b97] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
            <span className="relative z-10">
              {loading ? "Adding..." : "Add Project"}
            </span>
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 grid md:grid-cols-3 gap-6">
            {filteredProjects.length === 0 && (
              <p className="text-gray-500">No projects found.</p>
            )}
            {filteredProjects.map((project) => (
              <div key={project._id} className="overflow-hidden text-[#84837e]">
                <div className="relative h-50" style={{ height: "200px" }}>
                  <Image
                    src={project.image || "https://via.placeholder.com/400x300"}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-xl mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span>{project.year}</span>
                    <span>{project.services.join(", ")}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {project.description?.[0] || "No description"}
                  </p>
                  <div className="flex gap-3 text-gray-500">
                    <FiEdit2
                      className="cursor-pointer hover:text-sky-600"
                      onClick={() => handleEdit(project._id)}
                    />
                    <FiTrash2
                      onClick={() => setDeleteProjectData(project)}
                      className="cursor-pointer hover:text-red-500"
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
                placeholder="Search Projects..."
                className="w-full outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FiFilter className="text-gray-500" />
                <span className="font-semibold text-gray-700">
                  Filter Projects
                </span>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Services
                </label>
                <Select
                  isMulti
                  name="services"
                  options={serviceOptions}
                  value={serviceOptions.filter((opt) =>
                    serviceFilter.includes(opt.value)
                  )}
                  onChange={(selected) =>
                    setServiceFilter(
                      selected ? selected.map((s) => s.value) : []
                    )
                  }
                  placeholder="Select services..."
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
                    singleValue: (base) => ({
                      ...base,
                      color: "#e5e5e5",
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
                  placeholder="Select year..."
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
      </div>

      {deleteProjectData && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#5a5d59] text-[#babbb5] p-6 rounded-xl shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this project?
            </h2>
            <p className="mb-2">
              <strong>Name:</strong> {deleteProjectData.title}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => confirmDelete(deleteProjectData._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setDeleteProjectData(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
