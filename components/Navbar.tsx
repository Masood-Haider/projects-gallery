"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-charcoal/10 bg-base/60 backdrop-blur-xl max-w-full">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4 w-full">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-charcoal hover:text-charcoal/70 transition-colors"
        >
          Projects Gallery
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium transition-colors hover:text-charcoal",
                pathname === link.href
                  ? "text-gold font-semibold"
                  : "text-charcoal/70 hover:text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hire me button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/about"
            className="rounded-full bg-charcoal px-5 py-2 text-sm font-semibold text-base hover:bg-charcoal-light transition-colors shadow-sm"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-charcoal/70 hover:text-charcoal transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-charcoal/10 bg-base backdrop-blur-2xl px-6 pb-6 pt-5 flex flex-col gap-4 absolute top-full left-0 w-full shadow-xl border-b z-[110]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                "text-base font-medium py-1 transition-colors",
                pathname === link.href ? "text-gold font-semibold" : "text-charcoal/80 hover:text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="mt-2 w-full text-center rounded-full bg-charcoal py-3 text-sm font-semibold text-base hover:bg-charcoal-light transition-colors shadow-sm"
          >
            Hire Me
          </Link>
        </div>
      )}

      {/* Bottom Animated Gold Border Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-charcoal/10 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 h-[1.5px] w-96 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent animate-scan shadow-[0_0_12px_#C5A059]" />
      </div>
    </header>
  );
}
