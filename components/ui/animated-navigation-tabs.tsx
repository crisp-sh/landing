"use client"; // Add use client directive for hooks

import { motion } from "framer-motion"; // Use framer-motion
import { useState, useEffect } from "react"; // Keep useEffect if needed for internal logic, useState for hover
import { cn } from "@/lib/utils";
import gsap from 'gsap'; // Import gsap
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Import plugin
import ScrollTrigger from 'gsap/ScrollTrigger'; // Import ScrollTrigger

// Register GSAP Plugin (if not already registered globally)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
  gsap.registerPlugin(ScrollTrigger);
}

// Define prop type inline or import if used elsewhere
type TabItem = {
  id: number; // Using index as ID
  tile: string;
  href: string; // Add href for scrolling
};

interface AnimatedNavigationTabsProps {
  items: TabItem[];
  activeTab: TabItem; // Accept active tab as prop
  onSetActive: (item: TabItem) => void; // Accept setter function as prop
  headerOffset?: number; // Allow passing offset
}

export function AnimatedNavigationTabs({
  items,
  activeTab, // Use prop
  onSetActive, // Use prop
  headerOffset = 80, // Default offset
}: AnimatedNavigationTabsProps) {
  // Removed internal active state
  const [isHover, setIsHover] = useState<TabItem | null>(null);

  const handleSetActive = (item: TabItem) => {
    // Set state immediately in parent via prop for responsiveness
    onSetActive(item);

    // Calculate scroll position
    let targetScrollY = 0;
    if (item.href !== '#') {
      const targetId = item.href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetScrollY = targetElement.offsetTop - headerOffset;
      } else {
        console.warn(`Target element with ID "${targetId}" not found.`);
        // Optionally still update state even if scroll fails?
        // onSetActive(item); // Already called above
        return;
      }
    }

    // Animate scroll
    gsap.to(window, {
      scrollTo: { y: targetScrollY, autoKill: true },
      duration: 1, // Keep scroll duration
      ease: 'power3.out',
      // Add onComplete callback
      onComplete: () => {
        // Ensure the correct state is definitely set after scroll completes
        onSetActive(item);
        // Force ScrollTrigger to re-evaluate positions and states
        ScrollTrigger.refresh();
      }
    });
  }

  // Removed <main> wrapper - layout should be handled by parent
  return (
      <div className="relative flex items-center justify-center"> {/* Changed outer element to div and added flex centering */}
        <ul className="flex items-center justify-center"> {/* Kept ul for list semantics */}
          {items.map((item) => (
            <li key={item.id}> {/* Wrap button in li for semantics */}
              <button
                type="button" // Add explicit type
                className={cn(
                  "relative py-2 transition-colors duration-300 hover:text-primary", // Simplified hover base
                  activeTab.id === item.id ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => handleSetActive(item)}
                onMouseEnter={() => setIsHover(item)}
                onMouseLeave={() => setIsHover(null)}
              >
                <div className="relative px-5 py-2"> {/* Adjusted padding */}
                  {item.tile}
                  {isHover?.id === item.id && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-0 bg-primary/10 -z-10" // Use inset-0 and negative z-index
                      style={{
                        borderRadius: 6,
                      }}
                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} // Add transition
                    />
                  )}
                </div>
                {activeTab.id === item.id && (
                  <motion.div
                    layoutId="active-underline" // Changed layoutId slightly for clarity
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} // Add transition
                  />
                )}
                {/* Optional: Separate visual hover underline if needed, currently relies on hover-bg */}
                {/* {isHover?.id === item.id && activeTab.id !== item.id && (
                  <motion.div
                    layoutId="hover-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/50" // Example: dimmer hover underline
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )} */}
              </button>
            </li>
          ))}
        </ul>
      </div>
  );
} 