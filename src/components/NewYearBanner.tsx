"use client";

import dynamic from "next/dynamic";
import erabaduAnimation from '../../public/assets/red-birds.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function NewYearBanner() {
  return (
    <div className="relative w-full bg-gradient-to-r from-red-950/40 via-red-900/30 to-red-950/40 backdrop-blur-md border-b border-red-500/20 overflow-hidden flex items-center justify-center py-2 z-[999999] h-10 md:h-12">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[35%] w-[150vw] md:w-[110vw] min-w-[1200px] pointer-events-none opacity-80 z-0">
        <Lottie 
          animationData={erabaduAnimation} 
          loop={true} 
          autoplay={true} 
        />
      </div>

      <div className="z-10 text-center px-12">
        <span className="text-[#FFD700] text-xs md:text-sm font-semibold tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">
          Happy Sinhala & Tamil New Year!
        </span>
      </div>

    </div>
  );
}