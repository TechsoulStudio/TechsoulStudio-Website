'use client';

import Dashboard from "../components/dashboard/Dashboard";

export const metadata = {
  title: "TechsoulStudio",
  description: "TechsoulStudio is a branding and web design agency based in Surat,India.",
}

export default function Home() {
  return (
   <main>
    <Dashboard />
   </main>
  );
}
