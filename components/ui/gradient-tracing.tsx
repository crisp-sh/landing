"use client";

import type React from "react";
import { useId } from "react";
import { motion } from "framer-motion";

// import Image from "next/image" // Removed unused import

interface GradientTracingProps {
  width: number; // Target width on screen
  height: number; // Target height on screen
  svgWidth?: number; // Original SVG width (for viewBox)
  svgHeight?: number; // Original SVG height (for viewBox)
  baseColor?: string;
  fillColor?: string;
  gradientColors?: [string, string, string];
  animationDuration?: number;
  strokeWidth?: number;
  path: string | string[]; // Use the original, unscaled path data
  className?: string;
}

export const GradientTracing: React.FC<GradientTracingProps> = ({
  width,
  height,
  svgWidth, // Receive original SVG width
  svgHeight, // Receive original SVG height
  baseColor = "rgba(255, 255, 255, 0.1)",
  fillColor = "none",
  gradientColors = ["#ffffff00", "#ffffff", "#ffffff00"],
  animationDuration = 3,
  strokeWidth = 1,
  path, // Receive original path
  className,
}) => {
  // Use React's useId hook for stable, unique IDs across server/client
  const uniqueId = useId();
  const gradientId = `pulse-${uniqueId}`;

  // Unify path if it's an array
  const unifiedPath = Array.isArray(path) ? path.join(" ") : path;

  const viewBox =
    svgWidth && svgHeight
      ? `0 0 ${svgWidth} ${svgHeight}`
      : `0 0 ${width} ${height}`;

  // Calculate scaling factors for motion animation if viewBox is used
  const scaleX = svgWidth ? width / svgWidth : 1;
  const scaleY = svgHeight ? height / svgHeight : 1;
  // Adjust animation coordinates based on viewBox scaling - simpler approach: let SVG handle it.
  // We might need to adjust the gradient definition if it looks wrong.
  // For linear gradients, userSpaceOnUse with original coordinates often works better.

  return (
    <div className={className} style={{ width, height }}>
      <svg
        width={width} // Set display dimensions
        height={height}
        viewBox={viewBox} // Set coordinate system to original SVG dimensions
        fill={fillColor}
        preserveAspectRatio="xMidYMid meet" // Changed from "none" to maintain aspect ratio
        style={{ display: "block" }}
        aria-hidden="true"
      >
        <title>Gradient Trace Animation</title>

        {/* Render single base path with unified data */}
        <path
          d={unifiedPath} // Use unified path data
          stroke={baseColor}
          strokeWidth={strokeWidth} // Use prop directly
          vectorEffect="non-scaling-stroke"
        />

        {/* Render single gradient path with unified data */}
        <path
          d={unifiedPath} // Use unified path data
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth} // Use prop directly
          vectorEffect="non-scaling-stroke"
        />

        <defs>
          {/* Use original coordinates for gradient if viewBox is set */}
          <motion.linearGradient
            animate={{
              // Animate using original coordinate system if viewBox is present
              x1: [`-${svgWidth || width}`, `${svgWidth || width}`],
              x2: ["0", `${(svgWidth || width) * 2}`],
            }}
            transition={{
              duration: animationDuration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            id={gradientId}
            gradientUnits="userSpaceOnUse" // Reverted back to userSpaceOnUse
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" offset="0.1" />
            <stop stopColor={gradientColors[1]} stopOpacity="1" offset="0.5" />
            <stop stopColor={gradientColors[2]} stopOpacity="0" offset="0.9" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
};
