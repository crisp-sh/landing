"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function ScrollIndicator() {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hide the indicator if user has scrolled down even a little bit
    if (latest > 50) {
      setIsHidden(true);
    } else {
      setIsHidden(false); // Show again if scrolled back to top
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isHidden ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      aria-hidden="true" // Hide from accessibility tree as it's decorative
    >
      <motion.svg
        width="24"
        height="32" // Keeping height/viewBox same for now
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Scroll down indicator</title>
        {/* Optional: Outline like a mouse */}
        
        <rect 
          x="4" y="4" width="16" height="24" rx="8" 
          stroke="currentColor" strokeWidth="1.5" 
          className="text-white/50"
        /> 
       
        {/* Animated Line Segment - Shifted Down Slightly */}
        <motion.line
          x1="12"
          x2="12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-white/30"
          // Shifted initial y values down by 1
          initial={{ y1: 7, y2: 9 }} 
          animate={{
            // Shifted keyframes down by 1
            y1: [7, 7, 13, 13, 7],   
            y2: [9, 17, 17, 17, 9] 
          }}
          transition={{
            duration: 1.5, 
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.4, 0.8, 0.9, 1] 
          }}
        />
      </motion.svg>
    </motion.div>
  );
} 