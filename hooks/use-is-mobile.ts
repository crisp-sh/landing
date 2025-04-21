"use client"; // This hook needs client-side APIs

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768; // Common breakpoint for mobile (tablets often > 768px)

export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState(false); // Default to false initially

  useEffect(() => {
    // Check if window is defined (for SSR/build)
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    // Handler to update state based on query match
    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    // Set the initial state
    handleResize();

    // Add listener for changes in media query match state
    // Using addEventListener for modern browsers
    try {
      mediaQuery.addEventListener("change", handleResize);
    } catch (e) {
      // Fallback for older browsers (less common now)
      mediaQuery.addListener(handleResize);
    }

    // Cleanup function to remove the listener
    return () => {
      try {
        mediaQuery.removeEventListener("change", handleResize);
      } catch (e) {
        // Fallback for older browsers
        mediaQuery.removeListener(handleResize);
      }
    };
  }, [breakpoint]); // Re-run effect if breakpoint changes

  return isMobile;
} 