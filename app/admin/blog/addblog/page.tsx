"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { addBlog } from "@/Service/api";
import toast from "react-hot-toast";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
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

export default function AddBlogPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    category: "",
    date: "",
    // discussionPoints: [] as string[],
    // content: [] as string[],
    content: "",
    image: null as File | null,
    images: [] as File[],
  });

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // const addArrayItem = (field: "content", value: string) => {
  //   if (!value.trim()) return;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: [...prev[field], value],
  //   }));
  //   setErrors((prev) => ({ ...prev, [field]: "" }));
  // };

  // const removeArrayItem = (field: "content", index: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: prev[field].filter((_, i) => i !== index),
  //   }));
  // };

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.topic.trim()) newErrors.topic = "Topic is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.image) newErrors.image = "Main blog image is required";
    if (!formData.content || formData.content.trim() === "")
      newErrors.content = "Content is required";
    // if (formData.discussionPoints.length === 0)
    //   newErrors.discussionPoints = "At least one discussion point is required";

    if (formData.image && formData.image.size > 10 * 1024 * 1024)
      newErrors.image = "Main image must be smaller than 10MB";

    if (formData.images.some((img) => img.size > 10 * 1024 * 1024))
      newErrors.images = "Each additional image must be smaller than 10MB";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- TIPTAP EDITOR ----------
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      FontSize.configure({ types: ["textStyle"] }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor?.getHTML() || "";
      handleChange("content", html);
    },
  });

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("⚠️ Login required");
      return;
    }

    setIsSubmitting(true);

    try {
      const toastId = toast.loading("Publishing blog...");
      const result = await addBlog(formData, token);

      if (result.success) {
        toast.success("🎉 Blog published successfully!", { id: toastId });
        setFormData({
          title: "",
          topic: "",
          category: "",
          date: "",
          // discussionPoints: [],
          content: "",
          image: null,
          images: [],
        });
        setErrors({});
      } else {
        toast.error(`❌ Failed: ${result.message}`, { id: toastId });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("❌ Failed to submit blog: Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
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

  // ---- TOOLBAR BUTTON FUNCTION ---- //
  const format = (cmd: string) => {
    if (!editor) return;

    switch (cmd) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "underline":
        editor.chain().focus().toggleUnderline().run();
        break;
      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "h3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "bullet":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "ordered":
        editor.chain().focus().toggleOrderedList().run();
        break;
      case "left":
        editor.chain().focus().setTextAlign("left").run();
        break;
      case "center":
        editor.chain().focus().setTextAlign("center").run();
        break;
      case "right":
        editor.chain().focus().setTextAlign("right").run();
        break;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#84837e]">Add Blog</h1>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`bg-[#84837e] hover:bg-[#6b6a65] text-white px-6 py-2 rounded shadow transition ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
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
                  PNG, JPG smaller than 10MB
                </p>
                {formData.image ? (
                  <p className="text-green-600 font-medium">
                    {formData.image.name}
                  </p>
                ) : (
                  <p className="text-gray-600">
                    Click to upload main blog image
                  </p>
                )}
              </label>
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
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
                <p className="text-sm text-gray-500">Upload multiple images</p>
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
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>

              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 mb-3 p-2 rounded border">
                <button
                  onClick={() => format("bold")}
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <Bold size={18} />
                </button>

                <button
                  onClick={() => format("italic")}
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <Italic size={18} />
                </button>

                <button
                  onClick={() => format("underline")}
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
                  onClick={() => format("bullet")}
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <List size={18} />
                </button>

                <button
                  onClick={() => format("ordered")}
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <ListOrdered size={18} />
                </button>

                <button
                  onClick={() => format("left")}
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <AlignLeft size={18} />
                </button>

                <button
                  onClick={() => format("center")}
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <AlignCenter size={18} />
                </button>

                <button
                  onClick={() => format("right")}
                  className="p-2 rounded hover:bg-gray-300"
                >
                  <AlignRight size={18} />
                </button>
              </div>

              <div
                className="border rounded p-2 min-h-[250px]"
                onClick={() => editor?.chain().focus().run()}
              >
                <EditorContent editor={editor} />
              </div>

              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content}</p>
              )}
            </div>
            {/* </div> */}
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
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Topic</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => handleChange("topic", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              {errors.topic && (
                <p className="text-red-500 text-sm mt-1">{errors.topic}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-[#bcbcb4] text-gray-800 focus:border-[#84837e] outline-none appearance-none"
              >
                <option value="">Select a category</option>
                <option value="Brand Identity Design & Strategy">
                  Brand Identity Design & Strategy
                </option>
                <option value="Digital Product">Digital Product</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Packaging Design">Packaging Design</option>
                <option value="Website Design">Website Design</option>
                <option value="E-Commerce Store">E-Commerce Store</option>
                <option value="Content Design and Photography">
                  Content Design and Photography
                </option>
                <option value="Studio Updates">Studio Updates</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
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
                {errors.discussionPoints && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.discussionPoints}
                  </p>
                )}
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
