"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { fetchSubscribersService, Subscriber } from "@/Service/api";

const NewsletterPage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSubscribers = async () => {
    try {
      const data = await fetchSubscribersService();
      setSubscribers(data);
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDownload = () => {
    if (!subscribers.length) return;

    setLoading(true);

    const worksheet = XLSX.utils.json_to_sheet(
      subscribers.map((sub, idx) => ({
        "No.": idx + 1,
        Email: sub.email,
        Date: new Date(sub.createdAt).toLocaleString(),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "newsletter_subscribers.xlsx");

    setTimeout(() => setLoading(false), 800);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#84837e]">Newsletter List</h1>
          <motion.button
            type="button"
            disabled={loading || subscribers.length === 0}
            whileHover={{ transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block overflow-hidden bg-[#84837e] text-white text-lg md:text-xl font-medium px-8 md:px-8 py-3 transition-all duration-300 group shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
            onClick={handleDownload}
          >
            <span className="absolute inset-0 bg-[#9c9b97] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
            <span className="relative z-10">
              {loading ? "Downloading..." : "Download Newsletter"}
            </span>
          </motion.button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#84837e] text-[#babbb5]">
              <tr>
                <th className="text-left px-4 py-2 border-b">No.</th>
                <th className="text-left px-4 py-2 border-b">Date</th>
                <th className="text-left px-4 py-2 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, idx) => (
                <tr key={sub._id} className="border-b">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">
                    {new Date(sub.createdAt).toISOString().split("T")[0]}
                  </td>
                  <td className="px-4 py-2">{sub.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsletterPage;
