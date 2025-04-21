"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
}

const MAX_TRAIL_PARTICLES = 15;
const TRAIL_FADE_DURATION_MS = 400;

export function EerieCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);

  // Raw mouse position motion values
  const mvX = useMotionValue(-100);
  const mvY = useMotionValue(-100);

  // Smoothed (spring) position values for the beacon
  const springConfig = { damping: 30, stiffness: 500 };
  const springX = useSpring(mvX, springConfig);
  const springY = useSpring(mvY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      mvX.set(currentX);
      mvY.set(currentY);

      // Check for hoverable element
      const element = document.elementFromPoint(currentX, currentY);
      const hoverable = element?.closest('[data-cursor-hoverable="true"]');
      const currentlyHovering = Boolean(hoverable);
      
      // Only update state if it changed
      if (currentlyHovering !== isHovering) {
           setIsHovering(currentlyHovering);
      }
     

      // Add trail particle if hovering
      if (currentlyHovering) {
        const newParticle: TrailParticle = {
          id: Date.now(), // Simple unique ID
          x: currentX,
          y: currentY,
        };
        setTrailParticles((prev) => {
          const updated = [...prev, newParticle];
          // Limit the number of particles
          return updated.slice(-MAX_TRAIL_PARTICLES);
        });

        // Schedule removal of the particle after animation
        setTimeout(() => {
          setTrailParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, TRAIL_FADE_DURATION_MS);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseLeave = () => {
      mvX.set(-100);
      mvY.set(-100);
      setIsHovering(false); // Ensure hover state is off
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mvX, mvY, isHovering]); // Include isHovering in deps to avoid stale closure

  // Cursor offsets (half the size)
  const beaconSizeOffset = 10; // h-5 w-5 -> 20px / 2
  const crosshairSizeOffset = 8; // h-4 w-4 -> 16px / 2
  const trailSizeOffset = 3; // h-1.5 w-1.5 -> 6px / 2

  // Adjust pulse based on hover
  const beaconScale = isHovering ? [2.0, 2.5, 2.0] : [1, 1.4, 1];
  const beaconOpacity = isHovering ? [0.7, 1.0, 0.7] : [0.6, 0.9, 0.6];
  const pulseDuration = isHovering ? 0.5 : 1.5;

  return (
    <>
      {/* Trail Particles */}
      <AnimatePresence>
        {trailParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed top-0 left-0 z-[9997] h-1.5 w-1.5 rounded-full bg-red-500/80 pointer-events-none blur-[1px]"
            initial={{ 
                opacity: 1, 
                scale: 1,
                x: particle.x - trailSizeOffset,
                y: particle.y - trailSizeOffset,
            }}
            animate={{ 
                opacity: 0,
                scale: 0, 
            }}
            exit={{ opacity: 0, scale: 0 }} // Ensure exit animation triggers
            transition={{ duration: TRAIL_FADE_DURATION_MS / 1000, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Crosshair (Precise Position) - Adjusted z-index */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] h-4 w-4 pointer-events-none"
        style={{
          x: mvX, // Use raw motion value
          y: mvY,
          translateX: "-50%", // Center the crosshair
          translateY: "-50%",
        }}
      >
        {/* Simple CSS crosshair */}
        <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/80" />
        <div className="absolute left-1/2 top-0 w-px h-full -translate-x-1/2 bg-white/80" />
      </motion.div>

      {/* Beacon (Smoothed Position & Enhanced Pulse) */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] h-5 w-5 rounded-full bg-red-600/60 pointer-events-none shadow-md shadow-red-500/50 blur-[1px]"
        style={{
          x: springX, // Use smoothed spring value
          y: springY,
          translateX: "-50%", // Center the beacon
          translateY: "-50%",
        }}
        animate={{
          scale: beaconScale,
          opacity: beaconOpacity,
        }}
        transition={{
          scale: { duration: pulseDuration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          opacity: { duration: pulseDuration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />
    </>
  );
} 