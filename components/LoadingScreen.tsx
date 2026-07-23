"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 2.2 seconds line fill, then start smooth fade out exit
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2200);

    const finishTimer = setTimeout(() => {
      setIsFinished(true);
    }, 2700);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, []);

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

        {/* Title Text */}
        <h2 className="text-xs font-semibold tracking-[0.35em] text-white/80 uppercase mb-6 font-sans">
          PROJECT GALLERY
        </h2>

        {/* 60fps Smooth GPU-Accelerated Filling Line */}
        <div className="relative w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold/50 via-gold to-amber-300 rounded-full animate-line-fill shadow-[0_0_10px_rgba(197,160,89,0.9)]" />
        </div>
      </div>
    </div>
  );
}
