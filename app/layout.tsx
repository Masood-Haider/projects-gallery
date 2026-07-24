import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConstellationBackground from "@/components/ConstellationBackground";

import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Projects Gallery — Masood Haider",
  description:
    "A clean, modern showcase of web applications and full-stack projects by Masood Haider.",
  keywords: ["Masood Haider", "Projects Gallery", "showcase", "developer", "Next.js", "React"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
