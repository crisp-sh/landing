"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// AI tool logos data
const aiTools = [
  { name: "ChatGPT Plus", logo: "/images/logos/openai.svg", id: "chatgpt" },
  { name: "Claude Pro", logo: "/images/logos/claude-ai-icon.svg", id: "claude" },
  { name: "Gemini Pro", logo: "/images/logos/gemini.svg", id: "gemini" },
  { name: "Grok Premium", logo: "/images/logos/grok_dark.svg", id: "grok" },
  { name: "Perplexity Pro", logo: "/images/logos/perplexity_color.svg", id: "perplexity" },
  { name: "Meta AI", logo: "/images/logos/meta_color.svg", id: "meta" },
  { name: "DeepSeek", logo: "/images/logos/deepseek.svg", id: "deepseek" },
  { name: "Mistral", logo: "/images/logos/mistral-ai_logo.svg", id: "mistral" },
  { name: "DALL-E", logo: "/images/logos/dalle-color.svg", id: "dalle" },
];

// Initial scattered positions for the logos
const initialPositions = [
  { x: 15, y: 15 },  // Top left
  { x: 50, y: 15 },  // Top center
  { x: 85, y: 15 },  // Top right
  { x: 25, y: 40 },  // Middle left
  { x: 75, y: 40 },  // Middle right 
  { x: 10, y: 65 },  // Bottom left
  { x: 45, y: 65 },  // Bottom center
  { x: 80, y: 65 },  // Bottom right
  { x: 35, y: 85 },  // Extra bottom
];

// Target positions for consolidated 3-column grid
const gridPositions = aiTools.map((_, index) => {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return {
    x: 25 + (col * 25), // 25%, 50%, 75%
    y: 30 + (row * 15)  // Starting at 30% with 15% gaps
  };
});

interface LogoPillsProps {
  className?: string;
}

export function LogoPills({ className }: LogoPillsProps) {
  const { scrollYProgress } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  
  // Animation values that change with scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const gridOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  
  // Mount check to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  return (
    <div className={cn("relative w-full h-full", className)}>
      <style jsx global>{`
        .logo-pill {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #ff2222;
          background: rgba(30, 0, 0, 0.5);
          box-shadow: 0 2px 8px rgba(255, 0, 0, 0.25);
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        
        .logo-pill img {
          width: 16px;
          height: 16px;
          object-fit: contain;
        }
        
        .logo-text {
          color: #ff2222;
          font-weight: bold;
          font-size: 12px;
          text-transform: uppercase;
        }
      `}</style>
      
      {/* Scattered Pills Layer - Fades out on scroll */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{ opacity }}
      >
        {aiTools.map((tool, index) => {
          if (index >= initialPositions.length) return null;
          const position = initialPositions[index];
          const duration = 15 + (index % 3) * 5; // Animation duration (15-25s)
          const delay = index * 1.5; // Staggered delays
          
          return (
            <motion.div
              key={`scattered-${tool.id}`}
              className="logo-pill absolute"
              animate={{
                x: [0, 20, 40, 20, 0],
                y: [0, 10, 0, -10, 0],
                transition: {
                  x: { repeat: Number.POSITIVE_INFINITY, duration, delay },
                  y: { repeat: Number.POSITIVE_INFINITY, duration, delay }
                }
              }}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            >
              <Image
                src={tool.logo}
                alt={tool.name}
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="logo-text">
                {tool.name.split(' ')[0]}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Consolidated Grid Layer - Fades in on scroll */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: gridOpacity, scale }}
      >
        <div className="relative w-4/5 h-4/5">
          {aiTools.map((tool, index) => {
            const position = gridPositions[index];
            
            return (
              <motion.div
                key={`grid-${tool.id}`}
                className="logo-pill absolute"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
              >
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  width={16}
                  height={16}
                  className="object-contain"
                />
                <span className="logo-text">
                  {tool.name.split(' ')[0]}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

