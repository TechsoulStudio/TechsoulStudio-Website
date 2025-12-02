"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { getBlogById, updateBlog } from "@/Service/api";
import AnimatedLoader from "@/components/ui/AnimatedLoader";
import toast from "react-hot-toast";

// TIPTAP IMPORTS
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
} from "lucide-react";
import { TextStyle } from "@tiptap/extension-text-style";
import FontSize from "@/components/extensions/FontSizeExtension";
import Link from "@tiptap/extension-link";

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
    content: "", // HTML string
    image: null as File | null,
    imageUrl: "",
    images: [] as File[],
    imageUrls: [] as string[],
  });

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // TIPTAP EDITOR
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      FontSize.configure({ types: ["textStyle"] }),
      Link,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      handleChange("content", html);
    },
  });

  // -------- FETCH BLOG (LOAD OLD DATA) -------- //
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

          const htmlContent = Array.isArray(blog.content)
            ? blog.content.join("") // FIX: API returns array
            : blog.content || "";

          setFormData({
            title: blog.title || "",
            topic: blog.topic || "",
            category: blog.category || "",
            date: blog.date?.split("T")[0] || "",
            content: htmlContent,
            image: null,
            imageUrl: blog.image || "",
            images: [],
            imageUrls: blog.images || [],
          });

          // Load into Tiptap after initialization
          setTimeout(() => {
            editor?.commands.setContent(htmlContent);
          }, 0);
        } else {
          toast.error("❌ Blog not found");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("❌ Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id, router, editor]);

  // Re-fill editor when formData changes
  useEffect(() => {
    if (editor && formData.content) {
      editor.commands.setContent(formData.content);
    }
  }, [editor, formData.content]);

  const handleImageUpload = (file: File) => handleChange("image", file);

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

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = prompt("Enter URL", previousUrl || "https://");

    if (url === null) return; // cancel
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // ---------- SUBMIT ---------- //
  const handleSubmit = async () => {
    if (!formData.title.trim()) return toast.error("⚠️ Title is required");
    if (!formData.topic.trim()) return toast.error("⚠️ Topic is required");
    if (!formData.category.trim())
      return toast.error("⚠️ Category is required");
    if (!formData.date) return toast.error("⚠️ Date is required");

    if (!formData.content.trim()) return toast.error("⚠️ Content is required");

    if (!formData.image && !formData.imageUrl)
      return toast.error("⚠️ Main image is required");

    if (formData.image && formData.image.size > 10 * 1024 * 1024)
      return toast.error("⚠️ Main image must be under 10MB");

    if (formData.images.some((img) => img.size > 10 * 1024 * 1024))
      return toast.error("⚠️ Additional images must be under 10MB");

    const token = localStorage.getItem("adminToken");
    if (!token) return toast.error("⚠️ Login required");

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
    } catch (err) {
      console.error(err);
      toast.error("❌ Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#5a5d59]">
        <AnimatedLoader />
      </div>
    );

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#84837e]">Update Blog</h1>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`bg-[#84837e] hover:bg-[#6b6a65] text-white px-6 py-2 rounded shadow transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* CURRENT IMAGE */}
            {formData.imageUrl && (
              <div>
                <p className="text-sm text-gray-600">Current Main Image:</p>
                <img src={formData.imageUrl} className="h-40 rounded" />
              </div>
            )}

            {/* UPLOAD MAIN IMAGE */}
            <div className="border-2 border-dashed border-[#84837e] rounded-lg p-6 flex flex-col justify-center items-center h-60">
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
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <FiUploadCloud size={40} className="text-[#84837e]" />
                <p className="text-sm text-gray-500">Replace Main Image</p>
                {formData.image && (
                  <p className="text-green-600">{formData.image.name}</p>
                )}
              </label>
            </div>

            {/* EXISTING EXTRA IMAGES */}
            {formData.imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.imageUrls.map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} className="h-20 rounded" />
                    <FiTrash2
                      className="absolute top-1 right-1 text-white bg-black/60 rounded cursor-pointer"
                      onClick={() => removeExistingImage(i)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* UPLOAD NEW EXTRA IMAGES */}
            <div className="border-2 border-dashed border-[#84837e] rounded-lg p-4 text-center">
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
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <FiUploadCloud size={30} className="text-[#84837e]" />
                <p className="text-sm text-gray-500">
                  Upload Additional Images
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

            {/* RICHTEXT EDITOR */}
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>

              {/* TOOLBAR */}
              <div className="flex flex-wrap gap-2 mb-3 p-2 rounded border">
                <button
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <Bold size={18} />
                </button>

                <button
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <Italic size={18} />
                </button>

                <button
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <UnderlineIcon size={18} />
                </button>

                <button
                  onClick={() => setLink()}
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <LinkIcon size={18} />
                </button>

                <select
                  onChange={(e) =>
                    e.target.value === "reset"
                      ? editor?.chain().focus().unsetFontSize().run()
                      : editor
                          ?.chain()
                          .focus()
                          .setFontSize(e.target.value)
                          .run()
                  }
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="">Font Size</option>
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="18px">18px</option>
                  <option value="24px">24px</option>
                  <option value="26px">26px</option>
                  <option value="30px">30px</option>
                  <option value="32px">32px</option>
                  <option value="36px">36px</option>
                  <option value="reset">Reset</option>
                </select>

                <button
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <List size={18} />
                </button>

                <button
                  onClick={() =>
                    editor?.chain().focus().toggleOrderedList().run()
                  }
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <ListOrdered size={18} />
                </button>

                <button
                  onClick={() =>
                    editor?.chain().focus().setTextAlign("left").run()
                  }
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <AlignLeft size={18} />
                </button>

                <button
                  onClick={() =>
                    editor?.chain().focus().setTextAlign("center").run()
                  }
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <AlignCenter size={18} />
                </button>

                <button
                  onClick={() =>
                    editor?.chain().focus().setTextAlign("right").run()
                  }
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <AlignRight size={18} />
                </button>
              </div>

              {/* EDITOR */}
              <div
                className="border rounded p-2 min-h-[250px] cursor-text focus-within:ring-2 focus-within:ring-[#84837e]"
                onClick={() => editor?.chain().focus().run()}
              >
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE INPUTS */}
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
                className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-[#bcbcb4] text-gray-800"
              >
                <option value="">Select a category</option>
                <option value="Brand Identity Design & Strategy">
                  Brand Identity Design & Strategy
                </option>
                <option value="Digital Product">Digital Product</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Packaging Design">Packaging Design</option>
                <option value="Website Design">Website Design</option>
                <option value="Content Design and Photography">
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
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
