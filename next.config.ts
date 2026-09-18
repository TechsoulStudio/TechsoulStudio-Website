import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ["res.cloudinary.com", "via.placeholder.com"],
  },
};

export default nextConfig;
