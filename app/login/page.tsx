"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/Service/api";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const fireConfetti = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginAdmin(email.trim(), password);

      if (result.success && result.token) {
        localStorage.setItem("adminToken", result.token);
        toast.success("✅ Login successful!");
        setTimeout(() => {
          toast.success("Welcome to Techsoulstudio!");
        }, 500);

        fireConfetti();

        router.push("/admin/dashboard");
      } else {
        toast.error(result.message || "❌ Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4e524d] to-[#7d8079] px-4">
      <div className="grid md:grid-cols-2 w-full max-w-5xl bg-[#d7d7cf] shadow-xl rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="p-10 flex flex-col justify-center min-h-[600px] relative">
          <button
            onClick={() => router.back()}
            className="absolute top-6 left-6 flex items-center text-[#84837e] hover:text-gray-800 cursor-pointer"
          >
            <FiArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back</span>
          </button>

          <h1 className="text-3xl font-bold text-[#84837e] mt-10">
            Techsoulstudio
          </h1>
          <h2 className="mt-6 text-xl font-semibold text-gray-900">
            Welcome Back 👋
          </h2>
          <p className="text-gray-600 mb-8">
            Please log in to your account to continue.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#84837e] focus:ring-2 focus:ring-[#84837e] transition"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-lg px-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-[#84837e] focus:ring-2 focus:ring-[#84837e] transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-[#84837e] focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{
                rotate: [0, -3, 3, -3, 3, 0],
                transition: { duration: 0.4 },
              }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-block overflow-hidden bg-[#84837e] text-white text-lg md:text-xl font-medium px-8 md:px-12 py-3 rounded-full transition-all duration-300 group mt-10 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
            >
              <span className="absolute inset-0 bg-[#9c9b97] -skew-x-[30deg] -left-full transition-transform duration-500 group-hover:translate-x-full z-0" />
              <span className="relative z-10">
                {loading ? "Logging in..." : "Log In"}
              </span>
            </motion.button>
          </form>
        </div>
        <div className="relative hidden md:block">
          <Image
            src="/images/About/1.png"
            alt="Login Illustration"
            width={700}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#84837e]/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
