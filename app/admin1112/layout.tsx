import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Project Showcase",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Admin top bar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-bold tracking-wide text-charcoal">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M13 2.05v3.03c5.05.5 9 4.76 9 9.92s-3.95 9.42-9 9.92v3.03c6.73-.52 12-6.17 12-12.95S19.73 2.57 13 2.05zM11 2.05v3.03C5.95 5.58 2 9.84 2 15s3.95 9.42 9 9.92v3.03C4.27 27.43-1 21.78-1 15S4.27 2.57 11 2.05z" /></svg>
              Project Showcase Admin
            </div>
            <span className="rounded-full bg-gray-100 border border-gray-200 px-2 py-0.5 text-xs text-gray-500">
              Private
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1.5"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Public site
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
