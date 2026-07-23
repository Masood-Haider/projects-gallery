export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
        {/* Inner pulsing badge */}
        <div className="absolute w-8 h-8 rounded-lg bg-charcoal flex items-center justify-center text-xs font-bold text-gold shadow-md">
          MH
        </div>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-charcoal/50 animate-pulse">
        Loading content...
      </p>
    </div>
  );
}
