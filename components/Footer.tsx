import Link from "next/link";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-base">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: name + copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-charcoal">Masood Haider</p>
          <p className="mt-1 text-xs text-charcoal/40">
            © {year} All rights reserved.
          </p>
        </div>

        {/* Center: Contact */}
        <div className="flex items-center text-sm font-medium text-charcoal/70">
          <a href="mailto:masood.haider.bangash1@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            masood.haider.bangash1@gmail.com
          </a>
        </div>

        {/* Right: social icons */}
        <SocialIcons iconSize={18} />
      </div>
    </footer>
  );
}
