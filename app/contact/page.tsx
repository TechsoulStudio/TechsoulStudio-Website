"use client";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import Menu from "@/components/helper/Menu";
import { RiMenu3Fill } from "react-icons/ri";
import dynamic from "next/dynamic";
import VerticalTextLabel from "@/components/VerticalTextLabel";
import CommunicationTools from "./CommunicationTools";

const Footer = dynamic(() => import("@/components/helper/Footer"), {
  ssr: false,
});

export default function ContactPage() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <main className="bg-[#5a5d59] text-white min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpenMenu(true)}
          className="px-4 py-4 text-white cursor-pointer"
        >
          <RiMenu3Fill size={36} className="text-[#dad9d6]" />
          <span className="sr-only">Open Menu</span>
        </button>
      </div>

      {openMenu && <Menu onClose={() => setOpenMenu(false)} />}

      <div className="px-4 py-10 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h1 className="text-4xl sm:text-6xl text-[#81837e] font-bold">
          Starting a new project?
        </h1>
        <h2 className="text-4xl sm:text-6xl text-[#dad9d6] font-bold pt-2">
          Get in touch.
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div className="pt-5 w-full lg:w-[85%] xl:w-[100%] 2xl:w-[100%]">
            <ContactForm />
          </div>
        </div>
        <div className="pt-20">
          <h2 className="text-lg sm:text-xl md:text-2xl text-[#dad9d6] font-bold pt-2">
            What to expect
          </h2>
          <CommunicationTools />
        </div>
      </div>

      <Footer />

      <div className="hidden sm:flex flex-col items-end fixed right-5 bottom-[100px] z-10">
        <VerticalTextLabel />
      </div>
    </main>
  );
}
