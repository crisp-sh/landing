"use client";

import { Spotlight } from "../../ui/spotlight-new";
import { Grid } from "./grid";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { HoverButton } from "../../hover-button";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// AI tool logos data
const aiTools = [
  { name: "ChatGPT Plus", logo: "/images/logos/openai.svg", id: "chatgpt", price: "$20/mo", color: "#10a37f" },
  { name: "Claude Pro", logo: "/images/logos/claude-ai-icon.svg", id: "claude", price: "$20/mo", color: "#d97757" },
  { name: "Gemini Pro", logo: "/images/logos/gemini.svg", id: "gemini", price: "$20/mo", color: "#9dafe6" },
  { name: "Grok Premium", logo: "/images/logos/grok_dark.svg", id: "grok", price: "$30/mo", color: "#1a1a1a" },
  { name: "Perplexity Pro", logo: "/images/logos/perplexity_color.svg", id: "perplexity", price: "$20/mo", color: "#1f7d8a" },
  { name: "Meta AI", logo: "/images/logos/meta_color.svg", id: "meta", price: "$30/mo", color: "#0768e0" },
  { name: "DeepSeek", logo: "/images/logos/deepseek.svg", id: "deepseek", price: "$20/mo", color: "#4d6bfe" },
  { name: "Mistral", logo: "/images/logos/mistral-ai_logo.svg", id: "mistral", price: "$15/mo", color: "#ee792f" },
  { name: "DALL-E", logo: "/images/logos/dalle-color.svg", id: "dalle", price: "$20/mo", color: "#51da4b" },
];

// Initial scattered positions for the logos (in percentage of container)
const scatteredPositions = [
  { x: 15, y: 15, rotation: -5 },  // Top left
  { x: 50, y: 12, rotation: 3 },   // Top center
  { x: 85, y: 20, rotation: -2 },  // Top right
  { x: 25, y: 40, rotation: 4 },   // Middle left
  { x: 75, y: 45, rotation: -3 },  // Middle right 
  { x: 10, y: 65, rotation: 2 },   // Bottom left
  { x: 45, y: 70, rotation: -4 },  // Bottom center
  { x: 80, y: 65, rotation: 5 },   // Bottom right
  { x: 35, y: 85, rotation: -1 },  // Extra bottom
];

// Function to calculate grid position
const getGridPosition = (index: number, isMobile: boolean) => {
  // Adjust for mobile - more compact layout
  if (isMobile) {
    const col = index % 2;
    const row = Math.floor(index / 2);
    return {
      x: 25 + (col * 50), // 25%, 75%
      y: 20 + (row * 20)  // More spacing between rows on mobile
    };
  }
  
  // 3-column grid on desktop
  const col = index % 3;
  const row = Math.floor(index / 3);
  return {
    x: 25 + (col * 25), // 25%, 50%, 75%
    y: 30 + (row * 15)  // Less spacing needed on desktop
  };
};

// Extending HTMLDivElement to include animation property
interface PillElement extends HTMLDivElement {
  animation?: gsap.core.Timeline;
}

export default function MainHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(PillElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const pricingTextRef = useRef<HTMLParagraphElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // GSAP animations setup
  useGSAP(() => {
    if (!containerRef.current || pillRefs.current.length === 0) return;
    
    // Clear any existing ScrollTriggers to avoid conflicts
    const allTriggers = ScrollTrigger.getAll();
    for (const trigger of allTriggers) {
      trigger.kill();
    }
    
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    
    // Initial setup - ensure elements are in the right state for animation start
    // Setup for pills - initially just logos with no border or background
    for (const [index, pill] of pillRefs.current.entries()) {
      if (!pill || index >= scatteredPositions.length) continue;
      
      const toolColor = aiTools[index]?.color || "#ff2222";
      
      gsap.set(pill, {
        opacity: 1,
        rotation: scatteredPositions[index].rotation,
        left: `${scatteredPositions[index].x}%`,
        top: `${scatteredPositions[index].y}%`,
        backgroundColor: `${toolColor}33`, // Make much more transparent (33 = 20% opacity)
        border: `2px solid ${toolColor}`,
        borderRadius: "16px", // Pill shape
        padding: "4px 12px", // Add padding for text
        width: "auto", // Let it expand for the text
        height: isMobile ? "30px" : "36px",
        scale: 1,
        zIndex: 10,
      });
      
      // Set initial state for logos and text inside pills
      const logoImg = pill.querySelector('.logo-image');
      const logoText = pill.querySelector('.logo-text');
      const priceEl = pill.querySelector('.pill-price');
      
      if (logoImg && logoText && priceEl) {
        gsap.set(logoImg, { 
          opacity: 1,
          width: isMobile ? "20px" : "24px",
          height: isMobile ? "20px" : "24px",
          maxWidth: isMobile ? "20px" : "24px",
          maxHeight: isMobile ? "20px" : "24px",
          position: "static"
        });
        gsap.set(logoText, { opacity: 1, display: "block" }); // Show the text
        gsap.set(priceEl, { opacity: 0, display: "none" });
      }
      
      // Create bobbing animation for each pill with offset timing
      // Use a random seed for more natural motion
      const randomDelay = index * 0.2 + Math.random() * 0.5;
      const floatAmplitude = isMobile ? 10 : 15; // Smaller amplitude on mobile
      
      // Create repeating bobbing animation for each pill
      const bobbingAnimation = gsap.timeline({ repeat: -1, yoyo: true })
        .to(pill, {
          y: `-=${floatAmplitude}`, 
          duration: 1.5 + Math.random() * 0.5,
          ease: "sine.inOut",
        })
        .to(pill, {
          y: `+=${floatAmplitude}`, 
          duration: 1.5 + Math.random() * 0.5,
          ease: "sine.inOut",
        });
      
      // Offset each pill's animation
      bobbingAnimation.seek(randomDelay);
      
      // Store the animation so we can kill it later
      pill.animation = bobbingAnimation;
    }
    
    // Hide badges initially
    for (const badge of badgeRefs.current) {
      if (badge) gsap.set(badge, { opacity: 0 });
    }
    
    // Hide cards container initially
    gsap.set(cardContainerRef.current, {
      opacity: 0,
      visibility: "visible",
    });
    
    // Hide grid container but keep it in the flow
    gsap.set(gridContainerRef.current, {
      visibility: "visible",
      opacity: 0,
    });
    
    // Hide heading, tagline, description
    gsap.set([taglineRef.current, headingRef.current, descriptionRef.current, pricingTextRef.current, ctaButtonRef.current], {
      opacity: 0,
      y: 20,
    });
    
    // Make sure the intro text is visible at the start
    gsap.set(introTextRef.current, {
      opacity: 1,
      y: 0,
    });
    
    // Create the scroll trigger animation with 4 main steps
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: isMobile ? "+=230%" : "+=250%", // Increased scroll distance for more leeway, especially on desktop
        pin: true,
        scrub: 1, // Smoother scrub for more fluid motion
        anticipatePin: 1,
        markers: false, // Set to true for debugging
        onEnter: () => {
          // Stop bobbing animations as soon as scrolling starts
          for (const [index, pill] of pillRefs.current.entries()) {
            if (!pill?.animation) continue;
            
            const toolColor = aiTools[index]?.color || "#ff2222";
            
            // Kill the bobbing animation
            pill.animation.kill();
            
            // Reset any y position changes from the bobbing
            gsap.set(pill, { 
              y: 0,
              visibility: "visible" // Ensure pills are visible when scrolling starts
            });
            
            // We don't need to add background and border since they're already there
            // Just fine-tune any transitions needed when scrolling starts
            gsap.to(pill, {
              // Subtle adjustments for the transition effect
              backgroundColor: `${toolColor}66`, // Slightly more opaque during transition (40%)
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(pill, {
                  scale: 1,
                  duration: 0.2
                });
              }
            });
            
            // Make sure the text is fully visible (in case it wasn't)
            const logoText = pill.querySelector('.logo-text');
            if (logoText) {
              gsap.to(logoText, {
                opacity: 1,
                display: "block",
                duration: 0.3
              });
            }
          }
        },
        onLeaveBack: () => {
          // First fade out all UI elements except pills
          gsap.to(cardContainerRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(cardContainerRef.current, { y: 0 });
            }
          });
          
          gsap.to(gridContainerRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in"
          });
          
          gsap.to([pricingTextRef.current, ctaButtonRef.current], {
            opacity: 0, 
            y: 15,
            duration: 0.2
          });
          
          // Reset badges opacity
          for (const badge of badgeRefs.current) {
            if (badge) gsap.to(badge, { opacity: 0, duration: 0.2 });
          }
          
          // For each pill, animate in sequence:
          // 1. Move to center stack
          // 2. Animate to scattered position
          // 3. Start bobbing
          
          // First, stack all pills in center with a brief duration
          for (const [index, pill] of pillRefs.current.entries()) {
            if (!pill) continue;
            
            const toolColor = aiTools[index]?.color || "#ff2222";
            
            // Kill any existing animations
            if (pill.animation) {
              pill.animation.kill();
            }
            
            // Reset any previous transforms and prepare for stack animation
            gsap.set(pill, {
              opacity: 1,
              scale: 0.9,
              rotation: 0,
              backgroundColor: `${toolColor}33`,
              border: `2px solid ${toolColor}`,
              borderRadius: "16px",
              padding: "4px 12px",
              width: "auto", 
              height: isMobile ? "30px" : "36px",
              zIndex: 10,
              visibility: "visible" // Ensure pills are visible when scrolling back up
            });
            
            // Move all pills to center
            gsap.to(pill, {
              left: "50%",
              top: "50%",
              x: -50,  // Offset to center
              y: -50 + (index * 10), // Stack with slight vertical offset
              duration: 0.3,
              ease: "power2.inOut",
              onComplete: () => {
                // Then animate to final scattered position
                gsap.to(pill, {
                  left: `${scatteredPositions[index].x}%`,
                  top: `${scatteredPositions[index].y}%`,
                  x: 0,
                  y: 0,
                  rotation: scatteredPositions[index].rotation,
                  scale: 1,
                  duration: 0.6,
                  ease: "back.out(1.2)",
                  delay: 0.05,
                  onComplete: () => {
                    // Start bobbing animation after reaching position
                    const randomDelay = index * 0.2 + Math.random() * 0.5;
                    const floatAmplitude = isMobile ? 10 : 15;
                    
                    pill.animation = gsap.timeline({ repeat: -1, yoyo: true })
                      .to(pill, {
                        y: `-=${floatAmplitude}`,
                        duration: 1.5 + Math.random() * 0.5,
                        ease: "sine.inOut",
                      })
                      .to(pill, {
                        y: `+=${floatAmplitude}`,
                        duration: 1.5 + Math.random() * 0.5,
                        ease: "sine.inOut",
                      });
                    
                    pill.animation.seek(randomDelay);
                  }
                });
              }
            });
            
            // Ensure text is visible in the pills
            const logoImg = pill.querySelector('.logo-image');
            const logoText = pill.querySelector('.logo-text');
            const priceEl = pill.querySelector('.pill-price');
            
            if (logoImg && logoText && priceEl) {
              gsap.to(logoImg, { 
                opacity: 1,
                display: "block",
                width: isMobile ? "20px" : "24px",
                height: isMobile ? "20px" : "24px",
                maxWidth: isMobile ? "20px" : "24px",
                maxHeight: isMobile ? "20px" : "24px",
                duration: 0.3
              });
              
              gsap.to(logoText, {
                opacity: 1,
                display: "block",
                duration: 0.3
              });
              
              gsap.to(priceEl, {
                opacity: 0,
                display: "none",
                duration: 0.2
              });
            }
          }
          
          // Reset intro text
          gsap.to(introTextRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            delay: 0.3 // Longer delay to ensure animations have started
          });
        }
      }
    });
    
    // STEP 1: Fade out intro text (0-15% of scroll progress)
    tl.to(introTextRef.current, {
      y: -30,
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.15
    }, 0);
    
    // STEP 2: Fade in grid container with header and description (15-30% of scroll progress)
    tl.to(gridContainerRef.current, {
      opacity: 1,
      duration: 0.15,
      ease: "power1.inOut"
    }, 0.15);
    
    // Hide all pills when the header starts to appear
    for (const pill of pillRefs.current) {
      if (!pill) continue;
      tl.to(pill, {
        opacity: 0,
        duration: 0.1,
      }, 0.15);
    }
    
    // Reveal tagline, heading, description in sequence
    tl.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      ease: "power2.out"
    }, 0.18);
    
    tl.to(headingRef.current, {
      opacity: 1, 
      y: 0,
      duration: 0.1,
      ease: "power2.out"
    }, 0.22);
    
    tl.to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      ease: "power2.out"
    }, 0.26);
    
    // STEP 3: Show card grid and prepare for pill transformation (30-40% of scroll progress)
    tl.to(cardContainerRef.current, {
      opacity: 1,
      duration: 0.2,
      ease: "power2.inOut",
    }, 0.35);
    
    // After cards appear, bring in the pills from random directions with animation
    for (const [index, pill] of pillRefs.current.entries()) {
      if (!pill || index >= aiTools.length) continue;
      
      // Create larger random offsets for more dramatic movement (-80px to +80px)
      const randomX = (Math.random() * 160 - 80);
      const randomY = (Math.random() * 160 - 80);
      const randomRotation = Math.random() * 40 - 20; // Random rotation between -20 and +20 degrees
      
      // Set initial state with offset
      tl.set(pill, {
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        opacity: 0,
        scale: 0.8 // Start slightly smaller
      }, 0.37);
      
      // Animate to final position with increasing opacity
      tl.to(pill, {
        x: 0,
        y: 0,
        rotation: scatteredPositions[index].rotation, // Return to scattered rotation
        opacity: 1,
        scale: 1,
        duration: 0.5, // Slightly longer for smoother animation
        ease: "back.out(1.2)", // Add a slight bounce
        delay: index * 0.04 // Slightly more staggered
      }, 0.4);
    }
    
    // Calculate final positions for each pill
    const finalPositions: { [key: number]: { x: number, y: number, width: number, height: number } } = {};
    
    const calculatePositions = () => {
      // Ensure the card container is visible for measurements
      gsap.set(cardContainerRef.current, { visibility: "visible" });
      
      for (const [index, pill] of pillRefs.current.entries()) {
        if (!pill || !badgeRefs.current[index]) continue;
        
        const badge = badgeRefs.current[index];
        if (!badge) continue;
        
        // Get the positions for precise animation
        const badgeRect = badge.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        
        if (!containerRect) continue;
        
        // Calculate the exact position to move to
        finalPositions[index] = {
          x: badgeRect.left - containerRect.left,
          y: badgeRect.top - containerRect.top,
          width: badgeRect.width,
          height: badgeRect.height
        };
      }
    };
    
    // Run this after a short delay to ensure DOM is fully rendered
    setTimeout(calculatePositions, 100);
    
    // STEP 4: Transform pills directly to their final positions (40-80% of scroll)
    for (const [index, pill] of pillRefs.current.entries()) {
      if (!pill || index >= aiTools.length) continue;
      
      const toolColor = aiTools[index]?.color || "#ff2222";
      
      // Create a sub-timeline for each pill's transformation
      const pillTimeline = gsap.timeline();
      
      // First rotate to 0 and start transformation (40-60% of scroll)
      tl.to(pill, {
        rotation: 0,
        backgroundColor: `${toolColor}cc`, // More opaque version for badge
        borderRadius: "4px",
        duration: 0.15,
        ease: "power2.inOut",
        opacity: 0.5, // Set to half opacity during transition
        zIndex: 20, // Medium z-index during transformation
      }, 0.4 + (index * 0.01));
      
      // Change content from logo to price
      const logoImg = pill.querySelector('.logo-image');
      const logoText = pill.querySelector('.logo-text');
      const priceEl = pill.querySelector('.pill-price');
      
      if (logoImg && logoText && priceEl) {
        tl.to(logoImg, { 
          opacity: 0, 
          display: "none",
          duration: 0.1,
          ease: "power1.in"
        }, 0.45 + (index * 0.01));
        
        tl.to(priceEl, { 
          opacity: 0.5, // Half opacity to match the pill
          display: "block",
          width: "100%",
          textAlign: "center", 
          duration: 0.1,
          ease: "power1.out"
        }, 0.47 + (index * 0.01));
      }
      
      // Move directly to final positions (60-70% of scroll)
      tl.add(() => {
        // Skip if positions weren't calculated
        if (!finalPositions[index]) {
          calculatePositions(); // Try again
          return;
        }
        
        const pos = finalPositions[index];
        
        // Animate the pill to the exact badge position
        gsap.to(pill, {
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: `${pos.width}px`,
          height: `${pos.height}px`,
          padding: "2px 8px",
          duration: 0.3,
          ease: "power2.inOut",
          opacity: 1, // Full opacity for final position
          zIndex: 50, // Highest z-index for final position
        });
      }, 0.6);
    }
    
    // Fade in badges, fade out pills (70-80% of scroll)
    for (const [index, badge] of badgeRefs.current.entries()) {
      if (!badge) continue;
      
      tl.to(badge, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      }, 0.7 + (index * 0.01));
    }
    
    for (const [index, pill] of pillRefs.current.entries()) {
      if (!pill) continue;
      
      tl.to(pill, {
        opacity: 0,
        visibility: "hidden", // Completely hide the pill, not just transparent
        duration: 0.1,
        ease: "power2.out",
      }, 0.7 + (index * 0.01)); // Start at the same time as badges appear
    }
    
    // NEW ENDING ANIMATION (80-100% of scroll progress)
    
    // First fade out current content (80-85% of scroll progress)
    tl.to([taglineRef.current, headingRef.current, descriptionRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.15,
      ease: "power2.in",
      stagger: 0.03,
    }, 0.8);
    
    // Fade in pricing text ABOVE the card grid
    tl.fromTo(pricingTextRef.current, 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 
      0.9
    );
    
    // Fade in CTA button
    tl.fromTo(ctaButtonRef.current, 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, 
      0.95
    );
    
    // Keep card container in fixed position (no vertical movement)
    tl.to(cardContainerRef.current, {
      y: 0, // Remove the downward shift
      duration: 0.3,
      ease: "power2.inOut",
    }, 0.85);
    
    // Add empty animation steps for scrolling leeway
    tl.to({}, { duration: 0.4 }, 1.2); // Empty step just for leeway
    
    // Handle resize event
    const handleResize = () => {
      // Recalculate positions
      calculatePositions();
      // Refresh scroll trigger
      ScrollTrigger.refresh(true);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      // Cleanup all animations
      for (const pill of pillRefs.current) {
        if (pill?.animation) {
          pill.animation.kill();
        }
      }
      // Cleanup scroll triggers
      const triggers = ScrollTrigger.getAll();
      for (const trigger of triggers) {
        trigger.kill();
      }
    };
  }, [isMounted]);
  
  // Mount check to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  return (
    <div 
      ref={containerRef}
      className="bg-black relative overflow-hidden w-full min-h-screen"
    >
      {/* Logo Pill Styles */}
      <style jsx global>{`
        .logo-pill {
          position: absolute;
          transform-origin: center center;
          z-index: 10;
          opacity: 0;
          color: white;
          transition: background-color 0.3s ease;
          padding: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        
        .logo-image {
          object-fit: contain;
          width: 40px !important;
          height: 40px !important;
          position: static !important;
          display: block;
          filter: none;
        }
        
        .logo-text {
          font-weight: bold;
          font-size: 12px;
          text-transform: uppercase;
          margin-left: 6px;
          opacity: 0;
          white-space: nowrap;
        }
        
        .pill-price {
          opacity: 0;
          font-weight: 600;
          font-size: 12px;
          display: none;
          position: absolute;
          text-align: center;
          width: 100%;
          left: 0;
        }
        
        .price-badge {
          position: absolute;
          top: -8px;
          right: 8px;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 12px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
          z-index: 5;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        /* Center flex helper */
        .flex-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        /* Adding shake animation */
        @keyframes shakeHead {
          0% {
            transform: rotate(0deg) translateX(0) scale(1);
          }
          15% {
            transform: rotate(-2deg) translateX(-2px) scale(1.2);
          }
          30% {
            transform: rotate(2deg) translateX(2px) scale(1.2);
          }
          45% {
            transform: rotate(-2deg) translateX(-2px) scale(1.2);
          }
          60% {
            transform: rotate(2deg) translateX(2px) scale(1.2);
          }
          75% {
            transform: rotate(-2deg) translateX(-2px) scale(1.2);
          }
          90% {
            transform: rotate(0deg) translateX(0) scale(1);
          }
          100% {
            transform: rotate(0deg) translateX(0) scale(1);
          }
        }

        .tool-card:hover .price-badge {
          animation: shakeHead 1s ease;
        }

        .pricing-section {
          margin-top: auto;
          padding-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
      `}</style>
      
      {/* Background elements */}
      <div ref={gridRef}>
        <Grid />
        <Spotlight />
      </div>
      
      {/* Main content - Initial Hero */}
      <div className="flex flex-row min-h-screen items-center justify-center relative z-10">
        <div ref={heroContentRef} className="flex flex-col items-center pt-16 md:pt-20">
          <div 
            ref={introTextRef}
            className="text-sm sm:text-base md:text-lg font-medium text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 pointer-events-none"
          >
            <span className="uppercase font-extralight text-2xl xs:text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-purple-200 to-purple-800 pointer-events-none">
              Introducing your unfair advantage
            </span>
            <br />
            <span className="uppercase font-extralight text-2xl xs:text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-purple-200 to-purple-800 pointer-events-none">
              All the AI in One Place
            </span>
            <br />
            <div className="flex flex-row gap-2 sm:gap-3 my-6 sm:my-8">
              <h3 
                className="text-5xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight sm:tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-200 to-gray-400 pointer-events-none"
              >
                ONLYPROMPT
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logo Pills Container - Initial Floating Pills */}
      <div ref={logoContainerRef} className="absolute inset-0 z-10 pointer-events-none">
        {aiTools.map((tool, index) => {
          if (index >= scatteredPositions.length) return null;
          
          const setPillRef = (el: HTMLDivElement | null) => {
            pillRefs.current[index] = el as PillElement | null;
          };
          
          return (
            <div
              key={tool.id}
              ref={setPillRef}
              className="logo-pill flex-center"
              style={{
                left: `${scatteredPositions[index].x}%`,
                top: `${scatteredPositions[index].y}%`,
                transform: `rotate(${scatteredPositions[index].rotation}deg)`,
                zIndex: 10,
              }}
            >
              <Image
                src={tool.logo}
                alt={tool.name}
                width={40}
                height={40}
                className="logo-image"
                priority={true}
              />
              <span className="logo-text">
                {tool.name.split(' ')[0]}
              </span>
              <div className="pill-price">{tool.price}</div>
            </div>
          );
        })}
      </div>
      
      {/* Comparison Section - Appears on scroll */}
      <div 
        ref={gridContainerRef} 
        className="absolute inset-0 z-30 opacity-0 invisible"
        style={{ visibility: "hidden" }}
      >
        <div className="container mx-auto px-4 md:px-6 pt-28 md:pt-36 relative z-10 min-h-screen flex flex-col">
          {/* Top Section with Heading and Cards */}
          <div>
            {/* Tagline */}
            <div className="text-center mb-4 md:mb-6">
              <span 
                ref={taglineRef}
                className="inline-block bg-purple-900/80 text-white text-xs md:text-sm font-medium px-3 py-1 opacity-0 transform translate-y-8"
              >
                It&apos;s simple, really
              </span>
            </div>
            
            {/* Heading */}
            <h3
              ref={headingRef}
              className="font-manifold text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase mb-6 md:mb-10 opacity-0 transform translate-y-8"
            >
              Skipping Between Countless AI <br className="hidden md:block" /> Apps is Exhausting
            </h3>
            
            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-center text-gray-400 max-w-4xl mx-auto mb-8 md:mb-16 text-sm md:text-lg opacity-0 transform translate-y-8"
            >
              Each AI tool demanding separate logins, fragmented features, and
              different interfaces. The constant juggle leaves you overwhelmed,
              feeling like you&apos;re fighting an uphill battle with tools meant to
              simplify your life.
            </p>
            
            {/* Flexible container for content positioning */}
            <div className="flex flex-col items-center">
              {/* Tool Cards Grid */}
              <div 
                ref={cardContainerRef}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 mb-8 opacity-0 w-full max-w-4xl mx-auto transition-all duration-500"
              >
                {aiTools.map((tool, index) => {
                  const setCardRef = (el: HTMLDivElement | null) => {
                    cardRefs.current[index] = el;
                  };
                  
                  const setBadgeRef = (el: HTMLDivElement | null) => {
                    badgeRefs.current[index] = el;
                  };
                  
                  return (
                    <div
                      key={tool.id}
                      ref={setCardRef}
                      className="tool-card flex items-center gap-3 bg-black/40 border border-white/10 p-4 hover:bg-white/10 transition-colors hover:border-white/20 relative"
                    >
                      {/* Price Badge */}
                      <div 
                        ref={setBadgeRef}
                        className="price-badge"
                        style={{ backgroundColor: `${tool.color}cc` }}
                      >
                        {tool.price}
                      </div>

                      <div className="w-full flex items-center gap-3">
                        <div className="w-6 h-6 relative flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={tool.logo}
                            alt={`${tool.name} logo`}
                            width={24}
                            height={24}
                            className="object-contain"
                            priority={true}
                          />
                        </div>
                        <span className="text-white text-sm font-medium">{tool.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Pricing Text and CTA - Will appear above the tool columns */}
              <div className="flex flex-col items-center w-full max-w-3xl mx-auto mb-12">
                <p
                  ref={pricingTextRef}
                  className="text-center text-gray-200 mb-6 text-lg sm:text-xl md:text-2xl font-medium opacity-0 transform translate-y-8"
                >
                  Separately you&apos;d be paying more than{" "}
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-red-400">
                    $195/mo
                  </span>{" "}
                  for all these tools. With OnlyPrompt&apos;s all-in-one AI platform you unlock
                  all of them for as little as{" "}
                  <span className="font-bold text-7xl bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-green-400">
                    $5
                  </span>
                  .
                </p>
                
                {/* CTA Button */}
                <div 
                  ref={ctaButtonRef}
                  className="flex justify-center opacity-0 transform translate-y-8"
                >
                  <Link href="/pricing" passHref>
                    <HoverButton className="text-base md:text-lg py-3 px-8 font-semibold">
                      Unlock Your Potential →
                    </HoverButton>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Extra spacing div to ensure enough scroll room */}
            <div className="h-32 md:h-64" />
          </div>
        </div>
      </div>
    </div>
  );
}
