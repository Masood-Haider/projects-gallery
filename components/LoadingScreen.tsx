"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const statusMessages = [
    "Initializing showcase...",
    "Loading creative assets...",
    "Preparing portfolio experience...",
    "Welcome",
  ];

  useEffect(() => {
    // Check if user already saw initial loader in this session
    const hasLoaded = sessionStorage.getItem("hasLoadedPortfolio");

    if (hasLoaded) {
      setIsFinished(true);
      return;
    }

    // Progress timer simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment for realistic feel
        const diff = Math.floor(Math.random() * 15) + 8;
        return Math.min(100, prev + diff);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 35) setStatusIndex(0);
    else if (progress < 70) setStatusIndex(1);
    else if (progress < 100) setStatusIndex(2);
    else setStatusIndex(3);

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
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0d0e12] text-white transition-all duration-700 ease-out select-none ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none filter blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-gold/20 via-charcoal/30 to-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px] pointer-events-none animate-blob" />

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        
        {/* Animated Rings & Logo Monogram */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer glowing orbital ring 1 */}
          <div className="absolute w-28 h-28 rounded-full border border-gold/20 animate-spin-slow" />
          {/* Outer dashed orbital ring 2 */}
          <div className="absolute w-32 h-32 rounded-full border border-dashed border-gold/30 animate-spin-reverse-slow" />
          
          {/* Pulsing aura */}
          <div className="absolute w-24 h-24 rounded-full bg-gold/10 blur-md animate-ping" />

          {/* Monogram Badge */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-[#1a1b22] to-[#121319] border border-gold/40 shadow-2xl shadow-gold/20 flex items-center justify-center group overflow-hidden">
            {/* Shimmer light effect across logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full animate-scan" />
            
            <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-gold via-amber-200 to-amber-400 bg-clip-text text-transparent drop-shadow-md">
              MH
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-xl font-bold tracking-[0.25em] text-white/90 uppercase font-sans">
          Masood Haider
        </h1>
        <p className="mt-1 text-xs tracking-widest text-gold/70 font-semibold uppercase">
          Portfolio Showcase
        </p>

        {/* Progress Bar Container */}
        <div className="w-full mt-8 flex flex-col items-center">
          <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-gold via-amber-400 to-yellow-300 rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(197,160,89,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Counter and Status */}
          <div className="w-full mt-3 flex items-center justify-between text-xs text-white/60 font-mono">
            <span className="text-gold/90 font-medium transition-all duration-300">
              {statusMessages[statusIndex]}
            </span>
            <span className="font-bold text-white tracking-wider">
              {progress}%
            </span>
          </div>
        </div>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
        Designed &amp; Developed
      </div>
    </div>
  );
}
