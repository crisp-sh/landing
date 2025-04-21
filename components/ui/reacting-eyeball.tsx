"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReactingEyeballProps {
  className?: string;
  eyeImageUrl?: string;
}

const DEFAULT_EYE_IMAGE = 
  "https://www.dropbox.com/scl/fi/nhnkno9iy2hg40fi9gzly/Eyeball_2x.png?rlkey=ari4mw597pxu7pp2b2a0uiznf&dl=1";

export function ReactingEyeball({
  className,
  eyeImageUrl = DEFAULT_EYE_IMAGE,
}: ReactingEyeballProps) {
  const eyeballRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  // Motion values for direct mouse position - Initialize to 0
  // eslint-disable-next-line @typescript-eslint/no-base-to-string -- Linter seems confused here
  const mouseX = useMotionValue(0);
  // eslint-disable-next-line @typescript-eslint/no-base-to-string -- Linter seems confused here
  const mouseY = useMotionValue(0);

  // Motion values for the eye parts transforms (to apply smoothing or direct calculation)
  const eyeTranslateX = useMotionValue(0);
  const eyeTranslateY = useMotionValue(0);
  const eyeRotateX = useMotionValue(0);
  const eyeRotateY = useMotionValue(0);

  // State for blink trigger (forces re-render/animation restart)
  const [blinkKey, setBlinkKey] = useState(0);

  // --- Set Initial Mouse Position --- 
  useEffect(() => {
    // Set initial position based on window size once component mounts client-side
    if (typeof window !== 'undefined') {
        mouseX.set(window.innerWidth / 2);
        mouseY.set(window.innerHeight / 2);
    }
  }, [mouseX, mouseY]); // Run once on mount

  // --- Mouse Tracking Effect --- 
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // --- Eye Calculation & Transform Effect --- 
  useEffect(() => {
    const updateEye = (time: number) => {
      if (previousTimeRef.current !== undefined) {
         // If needed: const deltaTime = time - previousTimeRef.current;
      }
      previousTimeRef.current = time;

      if (eyeballRef.current) {
        const eyeballRect = eyeballRef.current.getBoundingClientRect();
        const eyeCenterX = eyeballRect.left + eyeballRect.width / 2;
        const eyeCenterY = eyeballRect.top + eyeballRect.height / 2;

        const currentMouseX = mouseX.get();
        const currentMouseY = mouseY.get();

        const angle = Math.atan2(currentMouseY - eyeCenterY, currentMouseX - eyeCenterX);
        
        // Simplified distance check or keep max distance
        const maxDistance = 18; 
        const eyeX = Math.cos(angle) * maxDistance;
        const eyeY = Math.sin(angle) * maxDistance;

        const maxRotation = 15;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const rotateY = ((currentMouseX / viewportWidth) * 2 - 1) * maxRotation;
        const rotateX = ((currentMouseY / viewportHeight) * 2 - 1) * -maxRotation;
        
        // Update motion values directly
        eyeTranslateX.set(eyeX);
        eyeTranslateY.set(eyeY);
        eyeRotateX.set(rotateX);
        eyeRotateY.set(rotateY);
      }
      
      requestRef.current = requestAnimationFrame(updateEye);
    }

    requestRef.current = requestAnimationFrame(updateEye);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  // We include motion values here, although they are refs, 
  // to be explicit about dependencies for the calculation logic.
  }, [mouseX, mouseY, eyeTranslateX, eyeTranslateY, eyeRotateX, eyeRotateY]); 

  // --- Random Blink Effect --- 
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    function scheduleBlink() {
      const nextBlink = 2000 + Math.random() * 4000;
      blinkTimeout = setTimeout(() => {
        setBlinkKey(prev => prev + 1); // Trigger re-render/animation
        scheduleBlink();
      }, nextBlink);
    }
    scheduleBlink(); // Start the first blink timeout
    return () => clearTimeout(blinkTimeout); // Cleanup timeout on unmount
  }, []);

 // --- Random Movement Effect (Simplified) --- 
 useEffect(() => {
    // Simplified: Let Framer Motion handle transitions smoothly.
    // The main tracking effect already provides movement.
    // Adding random direct transform sets might conflict with smooth tracking.
    // If more jitter is desired, could introduce small random offsets to target 
    // motion values with useSpring for smoothing.
 }, []);

  return (
    <div className={cn("eyeball-container", className)} ref={eyeballRef}>
      <div className="eyeball">
        <motion.div 
          className="eye-parts-container"
          style={{
            translateX: eyeTranslateX,
            translateY: eyeTranslateY,
            rotateX: eyeRotateX,
            rotateY: eyeRotateY,
            // Ensure transform-style is applied if needed (added to CSS)
          }}
        >
          <div 
            className="realistic-eye" 
            style={{ backgroundImage: `url('${eyeImageUrl}')` }}
          />
        </motion.div>
      </div>
      {/* Eyelids use CSS animation, trigger restart with key */}
      <motion.div key={`top-lid-${blinkKey}`} className="eyelid" />
      <motion.div key={`bottom-lid-${blinkKey}`} className="eyelid bottom-eyelid" />
    </div>
  );
} 