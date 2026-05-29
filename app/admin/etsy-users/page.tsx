"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { fetchUsersService, User } from "@/Service/api";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await fetchUsersService();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDownload = () => {
    if (!users.length) return;

    setLoading(true);

    const worksheet = XLSX.utils.json_to_sheet(
      users.map((user, idx) => ({
        "No.": idx + 1,
        Name: user.name,
        Mobile: user.mobile,
        Email: user.email,
        "Signup Date": new Date(user.createdAt).toLocaleString(),
      })),
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "all_users.xlsx");

    setTimeout(() => setLoading(false), 800);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#84837e]">Etsy Users List</h1>

          <motion.button
            type="button"
            disabled={loading || users.length === 0}
            whileHover={{ transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block overflow-hidden bg-[#84837e] text-white text-lg md:text-xl font-medium px-8 py-3 transition-all duration-300 group shadow-md hover:shadow-lg disabled:opacity-50"
            onClick={handleDownload}
          >
            <span className="absolute inset-0 bg-[#9c9b97] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
            <span className="relative z-10">
              {loading ? "Downloading..." : "Download Users"}
            </span>
          </motion.button>
        </div>

        <div className="mb-6">
          <p className="text-lg text-[#84837e] font-medium">
            Total Users : {users.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#84837e] text-[#babbb5]">
              <tr>
                <th className="text-left px-4 py-3 border-b">No.</th>
                <th className="text-left px-4 py-3 border-b">Date</th>
                <th className="text-left px-4 py-3 border-b">Name</th>
                <th className="text-left px-4 py-3 border-b">Mobile Number</th>
                <th className="text-left px-4 py-3 border-b">Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="border-b border-black/20">
                  <td className="px-4 py-3">{idx + 1}</td>

                  <td className="px-4 py-3">
                    {new Date(user.createdAt).toISOString().split("T")[0]}
                  </td>

                  <td className="px-4 py-3">{user.name}</td>

                  <td className="px-4 py-3">{user.mobile}</td>
                  <td className="px-4 py-3">{user.email}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
