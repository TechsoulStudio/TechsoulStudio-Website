"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { FiEdit2, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  fetchReviews,
  addReviewAPI,
  updateReviewAPI,
  deleteReviewAPI,
  Review,
} from "@/Service/api";
import toast from "react-hot-toast";
import Select from "react-select";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const uniqueRoles = Array.from(new Set(reviews.map((r) => r.role)));
  const [selectedRole, setSelectedRole] = useState("");
  const [newReview, setNewReview] = useState<Review>({
    name: "",
    role: "",
    quote: "",
  });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken") || ""
      : "";

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (err) {
        toast.error("⚠️ Failed to fetch reviews");
        console.error("Failed to fetch reviews:", err);
      }
    };
    loadReviews();
  }, []);

  const validateReview = (): boolean => {
    if (!newReview.name.trim()) {
      toast.error("⚠️ Name is required");
      return false;
    }
    if (!newReview.role.trim()) {
      toast.error("⚠️ Role is required");
      return false;
    }
    if (!newReview.quote.trim()) {
      toast.error("⚠️ Quote is required");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateReview()) return;

    if (!token) {
      toast.error("🔑 You must be logged in to manage reviews");
      return;
    }

    try {
      let res;
      if (editingIndex !== null && reviews[editingIndex]._id) {
        res = await updateReviewAPI(
          reviews[editingIndex]._id,
          newReview,
          token
        );
      } else {
        res = await addReviewAPI(newReview, token);
      }

      if (res.success) {
        const updatedReviews = await fetchReviews();
        setReviews(updatedReviews);
        setShowModal(false);
        setNewReview({ name: "", role: "", quote: "" });
        setEditingIndex(null);
        toast.success(
          editingIndex !== null ? "✅ Review updated" : "🎉 Review added"
        );
      } else {
        toast.error(res.message || "❌ Failed to save review");
      }
    } catch (err) {
      toast.error("❌ Error saving review");
      console.error("Error saving review:", err);
    }
  };

  const confirmDelete = async () => {
    if (deleteIndex === null) return;

    try {
      const reviewId = reviews[deleteIndex]._id;
      if (reviewId) {
        const res = await deleteReviewAPI(reviewId, token);
        if (res.success) {
          const updatedReviews = await fetchReviews();
          setReviews(updatedReviews);
          toast.success("🗑️ Review deleted");
        } else {
          toast.error(res.message || "❌ Failed to delete review");
        }
      }
    } catch (err) {
      toast.error("❌ Error deleting review");
      console.error("Error deleting review:", err);
    } finally {
      setDeleteIndex(null);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewReview(reviews[index]);
    setShowModal(true);
  };

  const filteredReviews = reviews.filter(
    (r) =>
      (r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.quote.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedRole ? r.role === selectedRole : true)
  );

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#84837e]">
            Success Stories —
          </h1>
          <motion.button
            type="button"
            whileHover={{ transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block overflow-hidden bg-[#84837e] text-white text-lg md:text-xl font-medium px-8 md:px-12 py-3 transition-all duration-300 group shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => {
              setNewReview({ name: "", role: "", quote: "" });
              setEditingIndex(null);
              setShowModal(true);
            }}
          >
            <span className="absolute inset-0 bg-[#9c9b97] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
            <span className="relative z-10">Add Review</span>
          </motion.button>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 grid md:grid-cols-2 gap-6">
            {filteredReviews.length === 0 && (
              <p className="text-[#84837e]">No reviews found.</p>
            )}
            {filteredReviews.map((review, index) => (
              <div
                key={index}
                className="shadow border border-[#84837e] rounded-lg p-4 flex flex-col justify-between text-[#84837e]"
              >
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-sm mb-2">{review.role}</p>
                  <p className="text-sm">{review.quote}</p>
                </div>
                <div className="flex gap-3 mt-3 text-[#84837e]">
                  <FiEdit2
                    className="cursor-pointer"
                    onClick={() => handleEdit(index)}
                  />
                  <FiTrash2
                    className="cursor-pointer"
                    onClick={() => setDeleteIndex(index)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-72 flex-shrink-0 p-4 h-fit">
            <div className="flex items-center border-b border-[#84837e] px-3 py-2 mb-4">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Reviews..."
                className="w-full outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FiFilter className="text-gray-500" />
                <span className="font-semibold text-gray-700">
                  Filter Reviews
                </span>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-500">Role</label>
                <Select
                  isClearable
                  name="role"
                  options={[
                    { value: "", label: "All Roles" },
                    ...uniqueRoles.map((role) => ({
                      value: role,
                      label: role,
                    })),
                  ]}
                  value={
                    selectedRole
                      ? { value: selectedRole, label: selectedRole }
                      : { value: "", label: "All Roles" }
                  }
                  onChange={(selected) =>
                    setSelectedRole(selected ? selected.value : "")
                  }
                  placeholder="Choose a role..."
                  classNamePrefix="select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: `1px solid ${
                        state.isFocused ? "#84837e" : "#d1d5db"
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

        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-[#5a5d59] rounded p-6 w-full max-w-md text-[#babbb5] shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                {editingIndex !== null ? "Edit" : "Add"} Review
              </h2>
              <input
                type="text"
                placeholder="Name"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="text"
                placeholder="Role"
                value={newReview.role}
                onChange={(e) =>
                  setNewReview({ ...newReview, role: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded"
              />
              <textarea
                placeholder="Quote"
                value={newReview.quote}
                onChange={(e) =>
                  setNewReview({ ...newReview, quote: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded h-42"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[#84837e] text-white rounded"
                >
                  {editingIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteIndex !== null && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#5a5d59] text-[#babbb5] p-6 rounded-xl shadow-lg w-80 text-center">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this review?
              </h2>
              <p className="mb-4">{reviews[deleteIndex]?.name}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteIndex(null)}
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
