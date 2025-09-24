"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarDemo } from "./SidebarDemo";
import AnimatedLoader from "@/components/ui/AnimatedLoader";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.replace("/login");
    } else {
      setCheckingAuth(false);
      // router.replace("/admin/dashboard");
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#5a5d59]">
        <AnimatedLoader />
      </div>
    );
  }

  return (
    <div className="flex bg-[#5a5d59] min-h-screen">
      <div className="sticky top-0 h-screen flex-shrink-0">
        <SidebarDemo />
      </div>

      <main className="flex-1 overflow-auto p-4 m-4 bg-[#bcbcb4]">
        {children}
      </main>
    </div>
  );
}
