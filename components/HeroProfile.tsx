import Image from 'next/image';

export default function HeroProfile({ yearsOfExperience = 3, projectCount = 2, profilePhoto = "" }) {
  return (
    <div className="relative w-full max-w-sm flex items-center justify-center mx-auto mt-12 md:mt-0">
      {/* Center Profile Card */}
      <div className="relative z-10 w-64 p-6 rounded-3xl bg-base/40 backdrop-blur-2xl border border-base/60 shadow-xl flex flex-col items-center text-center animate-float">
        {/* Avatar */}
        <div className="relative w-40 h-40 rounded-full border-4 border-base shadow-md overflow-hidden bg-base mb-4">
          {profilePhoto ? (
            <Image src={profilePhoto} alt="Profile" fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-charcoal/40">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-20 h-20">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
        </div>


        
        <div className="mt-2 pt-4 border-t border-charcoal/10 w-full flex justify-between">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-charcoal">{yearsOfExperience}+</span>
            <span className="text-xs text-charcoal/70 font-medium">Years Exp</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-charcoal">{projectCount}+</span>
            <span className="text-xs text-charcoal/70 font-medium">Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
