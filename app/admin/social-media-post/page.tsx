"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiUploadCloud, FiEdit, FiTrash2 } from "react-icons/fi";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
  Post,
} from "@/Service/api";
import toast from "react-hot-toast";

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    link: "",
    imageFile: null as File | null,
    imagePreview: "",
  });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken") || ""
      : "";

  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      setNewPost({ ...newPost, imageFile: file, imagePreview: preview });
    }
  };

  const validatePost = (): boolean => {
    if (!newPost.title.trim()) {
      toast.error("⚠️ Title is required");
      return false;
    }
    if (!newPost.link.trim()) {
      toast.error("⚠️ Link is required");
      return false;
    }
    if (!newPost.imageFile && !editingPostId) {
      toast.error("⚠️ Image is required for a new post");
      return false;
    }
    return true;
  };

  const handleSavePost = async () => {
    if (!validatePost()) return;

    const form = new FormData();
    form.append("title", newPost.title);
    form.append("link", newPost.link);

    if (newPost.imageFile) {
      form.append("image", newPost.imageFile);
    } else if (editingPostId) {
      form.append("oldImage", newPost.imagePreview);
    } else {
      toast.error("⚠️ Please upload an image for the new post.");
      return;
    }

    try {
      const toastId = toast.loading(
        editingPostId ? "Updating post..." : "Adding post..."
      );

      if (editingPostId) {
        await updatePost(editingPostId, form, token);
        toast.success("✅ Post updated successfully", { id: toastId });
      } else {
        await addPost(form, token);
        toast.success("🎉 Post added successfully", { id: toastId });
      }

      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
      resetForm();
    } catch (err) {
      toast.error("❌ Failed to save post");
      console.error(err);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPostId(post._id);
    setNewPost({
      title: post.title,
      link: post.link,
      imageFile: null,
      imagePreview: post.image,
    });
    setShowModal(true);
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const toastId = toast.loading("Deleting post...");

    try {
      await deletePost(deleteId, token);
      setPosts((prev) => prev.filter((p) => p._id !== deleteId));
      setDeleteId(null);
      setShowDeleteModal(false);
      toast.success("🗑️ Post deleted successfully", { id: toastId });
    } catch (err) {
      toast.error("❌ Failed to delete post", { id: toastId });
      console.error(err);
    }
  };

  const resetForm = () => {
    setNewPost({ title: "", link: "", imageFile: null, imagePreview: "" });
    setEditingPostId(null);
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#84837e]">
            Social Media Posts —
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
            <span className="relative z-10">Add Post</span>
          </motion.button>
        </div>

        <section className="bg-[#bcbcb4] text-[#84837e] font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
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
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="mt-4 text-lg text-[#5a5d59] font-semibold">
                  {post.title}
                </h3>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-md text-[#898a85] underline"
                >
                  View Post
                </a>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-2 py-1 text-[#5a5d59] rounded flex items-center gap-1 cursor-pointer"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(post._id)}
                    className="px-2 py-1 text-[#5a5d59] rounded flex items-center gap-1 cursor-pointer"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-[#5a5d59] rounded p-6 w-full max-w-md text-[#babbb5]">
              <h2 className="text-xl font-bold mb-4">
                {editingPostId ? "Edit" : "Add"} Post
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
                    {!newPost.imagePreview ? (
                      <>
                        <FiUploadCloud size={40} className="text-[#84837e]" />
                        <p className="text-sm text-[#84837e]">
                          PNG, JPG, smaller than 10MB
                        </p>
                        <p className="text-[#84837e]">
                          Click to upload main image
                        </p>
                      </>
                    ) : (
                      <div className="absolute inset-0">
                        <Image
                          src={newPost.imagePreview}
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
                placeholder="Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="text"
                placeholder="Link"
                value={newPost.link}
                onChange={(e) =>
                  setNewPost({ ...newPost, link: e.target.value })
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
                  onClick={handleSavePost}
                  className="px-6 py-2 bg-[#bcbcb4] text-white rounded"
                >
                  {editingPostId ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#5a5d59] text-[#babbb5] p-6 rounded-xl shadow-lg w-80 text-center">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this post?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
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
};

export default Page;
