"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking state
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Attach listeners to window so mouse position is captured anywhere over hero
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Create constellation particles
    const initialRect = canvas.getBoundingClientRect();
    const particleCount = Math.max(Math.floor((initialRect.width * initialRect.height) / 8000), 50);
    const particles: Particle[] = [];
    const colors = ["#C5A059", "#C5A059", "#2C2C2C"]; // Champagne Gold & Dark Charcoal

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * initialRect.width,
        y: Math.random() * initialRect.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 1.8 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Animation Loop
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // Render & Update Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.color === "#C5A059" ? 0.55 : 0.25;
        ctx.fill();

        // Connect particle to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "#C5A059";
            ctx.globalAlpha = (1 - dist / 130) * 0.18;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect particle to mouse cursor
        if (mouse.x > 0 && mouse.y > 0) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = "#C5A059";
            ctx.globalAlpha = (1 - mdist / mouse.radius) * 0.45;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      // Draw explicit central joining point node at mouse position
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#C5A059";
        ctx.globalAlpha = 0.2;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#C5A059";
        ctx.globalAlpha = 0.95;
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={clsx(
        "fixed inset-0 z-0 w-full h-full pointer-events-none transition-opacity duration-500",
        isHome ? "opacity-100" : "opacity-35"
      )}
    />
  );
}
