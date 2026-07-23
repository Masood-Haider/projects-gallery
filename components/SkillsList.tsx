"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function SkillsList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const topCometRef = useRef<HTMLDivElement>(null);
  const bottomCometRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animation for the entire section
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        }
      }
    );

    // Traveling Scanning Comets
    const sweepWidth = typeof window !== "undefined" ? window.innerWidth + 400 : 1600;
    gsap.fromTo(topCometRef.current,
      { x: -400 },
      { x: sweepWidth, duration: 5, ease: "none", repeat: -1 }
    );
    
    gsap.fromTo(bottomCometRef.current,
      { x: sweepWidth },
      { x: -400, duration: 5, ease: "none", repeat: -1 }
    );

    // Parallax scrolling for Row 1
    gsap.to(row1Ref.current, {
      x: "-20vw", // Shift left significantly
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Parallax scrolling for Row 2 (opposite direction)
    gsap.to(row2Ref.current, {
      x: "20vw", // Shift right significantly
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
  }, { scope: containerRef });

  const row1 = [
    {
      name: "React",
      icon: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 mb-3 fill-current">
          <circle cx="0" cy="0" r="2.05" />
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
    {
      name: "Next.js",
      icon: (
        <svg viewBox="0 0 128 128" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.7 41.8h6.8v22.6h-6.8V41.8z" />
        </svg>
      )
    },
    {
      name: "TypeScript",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-5H6V9h8v2h-3v5zm5 0h-2v-5h-3V9h8v2h-3v5z"/>
        </svg>
      )
    },
    {
      name: "Tailwind CSS",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      )
    },
    {
      name: "Node.js",
      icon: (
        <svg viewBox="0 0 128 128" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M109.1 40L65.5 14.8c-1-.6-2.1-.6-3.1 0L18.9 40c-1 .6-1.6 1.6-1.6 2.7v50.4c0 1.1.6 2.1 1.6 2.7l43.5 25.1c1 .6 2.1 .6 3.1 0l43.5-25.1c1-.6 1.6-1.6 1.6-2.7V42.7c.1-1.1-.5-2.1-1.5-2.7zM66.4 105.4c-12.7 0-20.9-5.1-24.8-15.1l7.3-3.1c2.4 6.6 7.4 10.4 17.1 10.4 8.7 0 13.9-3.9 13.9-10.4 0-6.9-5.7-9.5-17.7-12.4-14.8-3.6-22.3-9.5-22.3-19.9 0-11 9.4-18.4 22.1-18.4 10.8 0 18.5 4 22.8 12.8l-7.2 3.8c-2.8-6.1-7.9-8.9-15.5-8.9-8.1 0-13.6 4.3-13.6 10.2 0 6.1 4.5 8.7 16.4 11.6 15.6 3.8 23.6 9.8 23.6 20.6.1 10.9-8.9 18.8-22.1 18.8z"/>
        </svg>
      )
    },
    {
      name: "HTML5",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
        </svg>
      )
    }
  ];

  const row2 = [
    {
      name: "PostgreSQL",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 20a9 9 0 119-9 9 9 0 01-9 9zm2-14h-4v2h4zm0 4h-4v2h4zm0 4h-4v2h4z" />
        </svg>
      )
    },
    {
      name: "MongoDB",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M12 2c0 0-5 5.5-5 11 0 4 3 6.5 5 8.5 2-2 5-4.5 5-8.5 0-5.5-5-11-5-11zm0 18c-1.5-1.5-3-3.5-3-6 0-3.5 2.5-7.5 3-8 5 5 5 9.5 5 11-1 1-3.5 4-5 3z" />
        </svg>
      )
    },
    {
      name: "Git",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M23.546 10.93L13.067.452a1.44 1.44 0 00-2.037 0L8.761 2.72l3.351 3.35a2.535 2.535 0 013.14 1.196c.21.433.275.92.188 1.393l3.208 3.208a2.535 2.535 0 011.663 3.655 2.535 2.535 0 01-3.655 1.663 2.535 2.535 0 01-2.946-4.004l-3.076-3.077v4.613a2.535 2.535 0 011.042 3.882 2.535 2.535 0 01-3.626-3.528 2.535 2.535 0 01.385-2.002V6.637a2.535 2.535 0 01-1.393-3.606L1.139 12.966a1.44 1.44 0 000 2.037l10.479 10.478a1.44 1.44 0 002.037 0l9.89-9.89a1.44 1.44 0 000-2.036V10.93z" />
        </svg>
      )
    },
    {
      name: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
        </svg>
      )
    },
    {
      name: "Figma",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M8 2h4.5a4 4 0 010 8H8V2zm0 8h4.5a4 4 0 010 8H8v-8zm0 8a4 4 0 000 8h4.5v-8H8zm8-8a4 4 0 100-8h-4.5v8H16zm0 8a4 4 0 100-8h-4.5v8H16z" />
        </svg>
      )
    },
    {
      name: "Vercel",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mb-3">
          <path d="M24 22.525H0l12-21.05 12 21.05z" />
        </svg>
      )
    }
  ];

  return (
    <div ref={containerRef} className="w-full max-w-full overflow-hidden px-0 md:px-0 py-10 sm:py-20 relative bg-base">
      
      {/* Top Premium Border Track with Scanning Comet */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-charcoal/10 overflow-hidden">
        <div ref={topCometRef} className="absolute top-0 left-0 h-[2px] w-96 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-100 shadow-[0_0_12px_#C5A059]" />
      </div>

      {/* Subtle Top Inner Shadow for Depth */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-charcoal/[0.02] to-transparent z-10" />

      {/* Left/Right Fade Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-base to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-base to-transparent z-10" />

      {/* Row 1: Normal Marquee */}
      <div ref={row1Ref} className="flex mb-12 w-[200%] md:w-[200%] hover:[&>div]:[animation-play-state:paused]">
        <div className="flex w-full animate-marquee gap-10 md:gap-20 items-center justify-around">
          {[...row1, ...row1, ...row1].map((skill, i) => (
            <div 
              key={`${skill.name}-${i}`} 
              className="flex flex-col items-center justify-center text-charcoal/30 hover:text-gold transition-all duration-500 w-32 cursor-default group"
            >
              <div className="group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-sm">
                {skill.icon}
              </div>
              <span className="text-sm font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div ref={row2Ref} className="flex w-[200%] md:w-[200%] hover:[&>div]:[animation-play-state:paused]">
        <div className="flex w-full animate-marquee-reverse gap-10 md:gap-20 items-center justify-around">
          {[...row2, ...row2, ...row2].map((skill, i) => (
            <div 
              key={`${skill.name}-${i}`} 
              className="flex flex-col items-center justify-center text-charcoal/30 hover:text-gold transition-all duration-500 w-32 cursor-default group"
            >
              <div className="group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-sm">
                {skill.icon}
              </div>
              <span className="text-sm font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Subtle Inner Shadow for Depth */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-charcoal/[0.02] to-transparent z-10" />

      {/* Bottom Premium Border Track with Reverse Scanning Comet */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-charcoal/10 overflow-hidden">
        <div ref={bottomCometRef} className="absolute top-0 left-0 h-[2px] w-96 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-100 shadow-[0_0_12px_#C5A059]" />
      </div>

    </div>
  );
}
