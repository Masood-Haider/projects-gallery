export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-charcoal/10 bg-base overflow-hidden">
      {/* Top Animated Gold Border Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-charcoal/10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 h-[1.5px] w-96 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent animate-scan-reverse shadow-[0_0_12px_#C5A059]" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Email icon + Name */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:masood.haider.bangash1@gmail.com"
            aria-label="Send Email"
            title="Send Email"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-charcoal/10 text-charcoal/70 hover:text-gold hover:border-gold/40 hover:bg-gold/5 transition-all shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <p className="text-sm font-semibold text-charcoal">Masood Haider</p>
        </div>

        {/* Right: Copyright */}
        <div className="text-center md:text-right">
          <p className="text-xs text-charcoal/40">
            © {year} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
