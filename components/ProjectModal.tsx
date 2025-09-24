"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  services?: string[];
  year?: string;
  webUrl?: string;
  description: string[];
  details: string[];
};

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  services,
  webUrl,
  description,
  details,
}: ProjectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-end justify-center">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
        className="bg-[#6a6c69] text-[#dad9d6] w-full max-w-8xl p-8 overflow-y-auto max-h-[90vh] shadow-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-gray-300 cursor-pointer"
        >
          <FaTimes size={20} />
        </button>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col justify-between">
            <div>
              {services && (
                <div className="mb-6">
                  <p className="font-semibold text-2xl mb-1">Services —</p>
                  <ul className="text-lg">
                    {services.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {webUrl && (
                <div className="mb-6">
                  <p className="font-semibold text-2xl mb-1">Website —</p>
                  <Link
                    href={webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg underline hover:text-gray-300"
                  >
                    {webUrl}
                  </Link>
                </div>
              )}
            </div>

            <div className="mb-6 font-bold">
              <p className="font-semibold text-2xl mb-1">
                Start your project —
              </p>
              <Link
                href="/contact"
                className="text-lg font-bold cursor-pointer inline-flex items-center group"
              >
                Lets Chat
                <FaArrowRight className="inline-block text-[#84837e] transition-transform duration-300 group-hover:translate-x-1 ml-2" />
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <p className="leading-[1.2] text-lg">
              For the <span className="font-semibold">{title}</span>{" "}
              <span className="">{services?.join(", ")}</span>, our aim was to
              create an immersive online experience.
            </p>

            {description.map((desc, i) => (
              <p className="leading-[1.2] text-lg" key={i}>
                {desc}
              </p>
            ))}

            <p className="pt-4 font-semibold text-lg">Design Details</p>
            {details.map((detail, i) => (
              <p className="leading-[1.2] text-lg" key={i}>
                {detail}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
