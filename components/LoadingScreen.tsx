"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoadedPortfolio");
    if (hasLoaded) {
      setIsFinished(true);
      return;
    }

    // Smooth continuous progress increment (0% to 100% over ~1.5 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = Math.floor(Math.random() * 4) + 3; // 3% - 6% every 40ms
        return Math.min(100, prev + diff);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 400);

      const hideTimer = setTimeout(() => {
        setIsFinished(true);
        sessionStorage.setItem("hasLoadedPortfolio", "true");
      }, 900);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [progress]);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a0a0c] text-white transition-opacity duration-500 ease-out select-none ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        {/* Minimalist Morphing Square */}
        <div className="relative w-10 h-10 mb-8">
          <div className="w-full h-full border-2 border-gold/80 animate-morph-square shadow-[0_0_15px_rgba(197,160,89,0.25)]" />
        </div>

        {/* Text */}
        <h2 className="text-xs font-semibold tracking-[0.35em] text-white/80 uppercase mb-5 font-sans">
          PROJECT GALLERY
        </h2>

        {/* Smooth Filling Progress Line */}
        <div className="relative w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold/60 via-gold to-amber-300 transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(197,160,89,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
