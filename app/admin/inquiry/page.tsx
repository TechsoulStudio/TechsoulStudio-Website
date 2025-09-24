"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { FiTrash2, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import {
  fetchInquiriesService,
  deleteInquiryService,
  Inquiry,
} from "@/Service/api";

const InquiryPage = () => {
  const [search, setSearch] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteEmail, setDeleteEmail] = useState<string>("");

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const data = await fetchInquiriesService();
      setInquiries(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error fetching inquiries";
      toast.error(message);
      console.error("fetchInquiries error:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteInquiryService(deleteId);
      toast.success("Inquiry deleted successfully");
      setInquiries((prev) => prev.filter((inq) => inq._id !== deleteId));
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error deleting inquiry";
      toast.error(message);
      console.error("handleDelete error:", error);
    } finally {
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter((q) => {
    const searchLower = search.toLowerCase();
    const formattedDate = q.createdAt
      ? new Date(q.createdAt).toLocaleDateString("en-GB")
      : "";

    return (
      (q.name || "").toLowerCase().includes(searchLower) ||
      (q.business || "").toLowerCase().includes(searchLower) ||
      (q.email || "").toLowerCase().includes(searchLower) ||
      (q.contact || "").toLowerCase().includes(searchLower) ||
      (q.services?.join(", ") || "").toLowerCase().includes(searchLower) ||
      formattedDate.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout>
      <div className="min-h-screen">
        <h1 className="text-3xl font-bold text-[#84837e] mb-4">Inquiry List</h1>

        <div className="flex items-center border-b px-3 py-2 w-80 mb-4">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by Name, Business, Email, Contact or Services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none flex-1 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#84837e] text-[#babbb5]">
              <tr className="border-b">
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Business
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Contact
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Services
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-4 text-center text-gray-500 text-sm"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => {
                  const formattedDate = new Date(
                    inq.createdAt
                  ).toLocaleDateString("en-GB");
                  return (
                    <tr key={inq._id} className="border-b">
                      <td className="py-3 px-4 text-sm">{inq.name}</td>
                      <td className="py-3 px-4 text-sm">{inq.business}</td>
                      <td className="py-3 px-4 text-sm">{inq.email}</td>
                      <td className="py-3 px-4 text-sm">{inq.contact}</td>
                      <td className="py-3 px-4 text-sm">
                        {inq.services.join(", ")}
                      </td>
                      <td className="py-3 px-4 text-sm">{formattedDate}</td>
                      <td className="py-3 px-4 flex items-center gap-3 text-[#84837e]">
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${inq.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MdOutlineMarkEmailRead
                            className="cursor-pointer"
                            size={18}
                          />
                        </a>
                        <FiTrash2
                          className="cursor-pointer"
                          size={18}
                          onClick={() => {
                            setDeleteId(inq._id);
                            setDeleteEmail(inq.email);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-4 text-center text-gray-500 text-sm"
                  >
                    No matching inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#5a5d59] text-[#babbb5] p-6 rounded-xl shadow-lg w-80 text-center">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this inquiry?
              </h2>
              <p className="mb-4 text-sm text-[#d1d2ce]">{deleteEmail}</p>
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
};

export default InquiryPage;
