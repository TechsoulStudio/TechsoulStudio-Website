import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisWrapper from "@/components/ui/LenisWrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechsoulStudio",
  description: "Branding and Web Design Agency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisWrapper>{children}</LenisWrapper>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}