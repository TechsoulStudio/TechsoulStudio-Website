"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiUploadCloud, FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

import {
  fetchTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/Service/api";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
}

const TeamPage = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [newMember, setNewMember] = useState<{
    name: string;
    role: string;
    imageFile: File | null;
    imagePreview: string;
  }>({ name: "", role: "", imageFile: null, imagePreview: "" });

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken") || ""
      : "";

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const members = await fetchTeamMembers();
      setTeam(members);
    } catch (error) {
      toast.error("⚠️ Failed to load team members");
      console.error("Failed to load team members", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      setNewMember({ ...newMember, imageFile: file, imagePreview: preview });
    }
  };
  const validateTeamMember = (): boolean => {
    if (!newMember.name.trim()) {
      toast.error("⚠️ Name is required");
      return false;
    }
    if (!newMember.role.trim()) {
      toast.error("⚠️ Role is required");
      return false;
    }
    if (!newMember.imageFile && !newMember.imagePreview) {
      toast.error("⚠️ Image is required");
      return false;
    }
    return true;
  };

  const handleSaveMember = async () => {
    if (!validateTeamMember()) return;
    if (!token) {
      toast.error("🔑 You must be logged in to manage team members");
      return;
    }

    const formData = new FormData();
    formData.append("name", newMember.name);
    formData.append("role", newMember.role);
    if (newMember.imageFile) {
      formData.append("image", newMember.imageFile);
    }

    try {
      if (editingMemberId) {
        await updateTeamMember(editingMemberId, formData, token);
        toast.success("✅ Team member updated");
      } else {
        await addTeamMember(formData, token);
        toast.success("🎉 Team member added");
      }
      loadTeam();
      resetForm();
    } catch (error) {
      toast.error("❌ Failed to save team member");
      console.error("Failed to save team member", error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMemberId(member._id);
    setNewMember({
      name: member.name,
      role: member.role,
      imageFile: null,
      imagePreview: member.image,
    });
    setShowModal(true);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
  };

  const confirmDelete = async () => {
    if (!token) {
      toast.error("🔑 You must be logged in to delete a member");
      return;
    }
    if (!deleteId) return;

    try {
      await deleteTeamMember(deleteId, token);
      toast.success("🗑️ Team member deleted");
      loadTeam();
    } catch (error) {
      toast.error("❌ Failed to delete team member");
      console.error("Failed to delete team member", error);
    } finally {
      setDeleteId(null);
      setDeleteName("");
    }
  };

  const resetForm = () => {
    setNewMember({ name: "", role: "", imageFile: null, imagePreview: "" });
    setEditingMemberId(null);
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#84837e]">
            TechsoulStudio Team —
          </h1>
          <motion.button
            type="button"
            className="relative inline-block overflow-hidden bg-[#84837e] text-white text-lg md:text-xl font-medium px-8 md:px-12 py-3 transition-all duration-300 group shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <span className="absolute inset-0 bg-[#9c9b97] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
            <span className="relative z-10">Add Team Member</span>
          </motion.button>
        </div>

        <section className="bg-[#bcbcb4] text-[#84837e] font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
            {team.map((member, index) => (
              <motion.div
                key={member._id}
                className="flex flex-col relative"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 1.0,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                <div className="w-full h-90 relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="mt-4 text-lg text-[#5a5d59] font-semibold">
                  {member.name}
                </h3>
                <p className="text-md text-[#898a85]">{member.role}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="px-2 py-1 text-[#5a5d59] rounded flex items-center gap-1 cursor-pointer"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(member._id, member.name)}
                    className="px-2 py-1 text-[#5a5d59] rounded flex items-center gap-1 cursor-pointer"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#5a5d59] text-[#babbb5] p-6 rounded-xl shadow-lg w-80 text-center">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this team member?
              </h2>
              <p className="mb-4">{deleteName}</p>
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

        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-[#5a5d59] rounded p-6 w-full max-w-md text-[#babbb5]">
              <h2 className="text-xl font-bold mb-4">
                {editingMemberId ? "Edit" : "Add"} Team Member
              </h2>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-200">
                  Upload Image
                </label>
                <div className="border-2 border-dashed border-[#84837e] rounded-lg p-6 text-center shadow-sm h-71 flex items-center justify-center relative overflow-hidden">
                  <input
                    type="file"
                    id="mainImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="mainImage"
                    className="cursor-pointer flex flex-col items-center justify-center gap-2 h-full w-full"
                  >
                    {!newMember.imagePreview ? (
                      <>
                        <FiUploadCloud size={40} className="text-[#84837e]" />
                        <p className="text-sm text-[#84837e]">
                          PNG, JPG or PDF, smaller than 10MB
                        </p>
                        <p className="text-[#84837e]">
                          Click to upload main image
                        </p>
                      </>
                    ) : (
                      <div className="absolute inset-0">
                        <Image
                          src={newMember.imagePreview}
                          alt="Preview"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <input
                type="text"
                placeholder="Name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded"
              />

              <input
                type="text"
                placeholder="Role"
                value={newMember.role}
                onChange={(e) =>
                  setNewMember({ ...newMember, role: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMember}
                  className="px-6 py-2 bg-[#bcbcb4] text-white rounded"
                >
                  {editingMemberId ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TeamPage;
