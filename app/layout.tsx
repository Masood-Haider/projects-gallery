import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConstellationBackground from "@/components/ConstellationBackground";

import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Masood Haider — Project Showcase",
  description:
    "A clean, modern showcase of web applications and full-stack projects.",
  keywords: ["Masood Haider", "projects", "showcase", "developer", "Next.js", "React"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-base text-charcoal antialiased min-h-screen flex flex-col relative">
        <LoadingScreen />
        <ConstellationBackground />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
