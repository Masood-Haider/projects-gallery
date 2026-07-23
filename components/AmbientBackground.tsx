"use client";

import React, { useEffect, useState } from "react";

export default function AmbientBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden bg-base pointer-events-none">
      {/* Top Left Gold Blob */}
      <div className="absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-gold/20 mix-blend-multiply blur-3xl animate-blob" />
      
      {/* Top Right Charcoal Blob */}
      <div className="absolute top-[-5%] right-[-5%] h-[500px] w-[500px] rounded-full bg-charcoal/10 mix-blend-multiply blur-3xl animate-blob [animation-delay:2s]" />
      
      {/* Bottom Center Gold Blob */}
      <div className="absolute bottom-[-10%] left-[20%] h-[400px] w-[600px] rounded-full bg-gold/15 mix-blend-multiply blur-3xl animate-blob [animation-delay:4s]" />
      
      {/* Middle Left Charcoal Blob */}
      <div className="absolute top-[40%] left-[-20%] h-[600px] w-[600px] rounded-full bg-charcoal/5 mix-blend-multiply blur-3xl animate-blob [animation-delay:6s]" />

      {/* Subtle Grid Overlay for texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwIDBMMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzI4MjgyOCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-[0.2]" />
    </div>
  );
}
