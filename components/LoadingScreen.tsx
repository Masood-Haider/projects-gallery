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

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = Math.floor(Math.random() * 18) + 10;
        return Math.min(100, prev + diff);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 300);

      const hideTimer = setTimeout(() => {
        setIsFinished(true);
        sessionStorage.setItem("hasLoadedPortfolio", "true");
      }, 700);

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
      <div className="flex flex-col items-center justify-center">
        {/* Minimalist Morphing Square */}
        <div className="relative w-12 h-12 mb-10">
          <div className="w-full h-full border-2 border-gold/80 animate-morph-square shadow-[0_0_15px_rgba(197,160,89,0.3)]" />
        </div>

        {/* Minimalist Progress Line */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
