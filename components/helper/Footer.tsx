"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import { subscribeNewsletter } from "@/Service/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required.";
    if (!email.includes("@")) return "Email must contain '@'.";
    if (!email.includes(".")) return "Email must contain '.'.";
    if (!isValidEmail(email)) return "Please enter a valid email.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      const data = await subscribeNewsletter(email);

      if (data.success) {
        alert(`Subscribed successfully with: ${email}`);
        setEmail("");
      } else {
        alert(data.message || "Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <motion.footer
      ref={footerRef}
      initial={{ opacity: 0, y: -100, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="w-full bg-[#bcbcb4] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#84837e]">
            Starting a new project?
          </p>
          <Link
            href="/contact"
            className="text-lg font-bold text-[#84837e] cursor-pointer sm:pt-4 inline-flex items-center group"
          >
            Get in touch
            <FaArrowRight className="inline-block text-[#84837e] transition-transform duration-300 group-hover:translate-x-1 ml-2" />
          </Link>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 sm:mt-24 flex items-center gap-3 w-full max-w-sm border-b border-[#999999]"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(validateEmail(e.target.value));
          }}
          placeholder="Subscribe"
          autoComplete="off"
          className={`flex-1 p-2 bg-transparent placeholder-[#999999] focus:outline-none font-semibold border-b ${
            error ? "border-[#999999]" : "border-transparent"
          } text-[#84837e]`}
          aria-label="Email address"
        />
        <button
          type="submit"
          aria-label="Submit email"
          className="flex items-center justify-center"
        >
          <FaArrowRight className="text-[#84837e] transition-transform duration-300 hover:translate-x-1" />
        </button>
      </form>

      {error && (
        <p className="text-[#84837e] mt-1 text-sm font-medium">{error}</p>
      )}

      <div className="sm:mt-14 flex flex-col md:flex-row justify-between gap-6 sm:gap-12">
        <div className="md:w-1/4 text-[#84837e] pt-10 hidden md:block">
          <p>
            TechsoulStudio would like to acknowledge the Traditional Custodians
            of the land on which we work and live. We pay our respects to Elders
            past, present and future.
          </p>
        </div>

        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10 text-[#84837e] pt-16 md:pt-8">
          <div>
            <h3 className="pb-3 font-bold">Address</h3>
            <a
              href="https://www.google.com/maps?q=217,+Dhara+Trade+Center,+Mahadev+Chowk,+Opp.+Dhara+Arcade,+Maruti+Nandan+Society,+Mota+Varachha,+Surat,+Gujarat+394101"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <p>
                217, Dhara Trade Center, Mahadev Chowk, Opp. Dhara Arcade,
                Maruti Nandan Society, Mota Varachha, Surat, Gujarat 394101
              </p>
            </a>
          </div>

          <div>
            <h3 className="pb-3 font-bold">Contact</h3>
            <a href="tel:+918485956850" className="block cursor-pointer">
              <p>T: (+91) 84859 56850</p>
            </a>
            <a
              href="mailto:info@techsoulstudio.com"
              className="block cursor-pointer"
            >
              <p>E: info@techsoulstudio.com</p>
            </a>
          </div>

          <div>
            <h3 className="pb-3 font-bold">Socials</h3>
            <div className="flex flex-wrap gap-x-8">
              <div className="space-y-1">
                <p className="group">
                  <a
                    href="https://www.instagram.com/techsoulstudio"
                    target="_blank"
                  >
                    Instagram
                    <FaArrowRight className="inline-block text-[#84837e] transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                  </a>
                </p>
                <p className="group">
                  <a
                    href="https://in.pinterest.com/techsoulstudio"
                    target="_blank"
                  >
                    Pinterest
                    <FaArrowRight className="inline-block text-[#84837e] transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                  </a>
                </p>
              </div>
              <div className="space-y-1">
                <p className="group">
                  <a
                    href="https://www.linkedin.com/company/techsoulstudio"
                    target="_blank"
                  >
                    LinkedIn
                    <FaArrowRight className="inline-block text-[#84837e] transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                  </a>
                </p>
                <p className="group">
                  <a href="https://dribbble.com/SmitBhanderi3" target="_blank">
                    Dribbble
                    <FaArrowRight className="inline-block text-[#84837e] transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
