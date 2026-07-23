import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center bg-base">
      <p className="text-8xl font-extrabold text-charcoal/5">404</p>
      <h1 className="mt-4 text-3xl font-bold text-charcoal">Page not found</h1>
      <p className="mt-3 text-charcoal/60 max-w-xs">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-base hover:bg-charcoal-light transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
