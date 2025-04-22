"use client";

import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

const collegeLogos = [
  { src: "/college/berkeley.png", alt: "UC Berkeley Logo" },
  { src: "/college/uga.png", alt: "University of Georgia Logo" },
  { src: "/college/caltech.svg", alt: "Caltech Logo" },
  { src: "/college/duke.png", alt: "Duke University Logo" },
  { src: "/college/gatech.svg", alt: "Georgia Tech Logo" },
  { src: "/college/usaf.svg", alt: "US Air Force Academy Logo" },
  { src: "/college/yale.svg", alt: "Yale University Logo" },
  { src: "/college/fsi.png", alt: "Foreign Service Institute Logo" },
  { src: "/college/dos.png", alt: "Department of State Logo" },
];

interface CollegeLogoSliderProps {
  title?: string;
  className?: string;
  duration?: number;
  gap?: number;
  reverse?: boolean;
}

export function CollegeLogoSlider({
  title = "",
  className,
  duration = 13, // Slower default duration for logos -> Faster now
  gap = 64, // More gap between logos
  reverse = false,
}: CollegeLogoSliderProps) {
  return (
    <div className={cn("relative w-full py-8 md:py-12", className)}>
      {title && (
        <h3 className="text-center text-base mx-4 md:text-lg text-white/60 mb-8 md:mb-12 font-light uppercase tracking-wider">
          {title}
        </h3>
      )}
      
      <InfiniteSlider
        gap={gap}
        duration={duration}
        reverse={reverse}
        className="max-w-screen-lg mx-auto" // Constrain width slightly
      >
        {collegeLogos.map((logo, index) => (
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={120} // Adjust size as needed
            height={50} // Adjust size as needed
            className="object-contain h-10 md:h-12 w-auto flex-shrink-0 brightness-0 invert filter transition-opacity duration-300"
            unoptimized // Useful if logos are SVGs or already optimized
          />
        ))}
      </InfiniteSlider>
      {/* Optional: Add gradient fades if needed */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
} 