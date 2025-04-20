"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface HoverGlitchTextProps {
  children: React.ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
  as?: React.ElementType
}

export function HoverGlitchText({
  children,
  className,
  intensity = "medium",
  as: Component = "span",
}: HoverGlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    setIsGlitching(true)
  }

  const handleMouseLeave = () => {
    // Add a small delay before stopping the glitch effect
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false)
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const glitchClass = cn(
    "hover-glitch-text",
    {
      "hover-glitch-active": isGlitching,
      "hover-glitch-low": intensity === "low",
      "hover-glitch-medium": intensity === "medium",
      "hover-glitch-high": intensity === "high",
    },
    className,
  )

  return (
    <Component className={glitchClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </Component>
  )
}
