"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
  as?: React.ElementType
}

export function GlitchText({ children, className, intensity = "low", as: Component = "span" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Random glitch timing
    const triggerGlitch = () => {
      // Determine if we should glitch based on intensity
      const glitchProbability = intensity === "low" ? 0.15 : intensity === "medium" ? 0.25 : 0.35

      if (Math.random() < glitchProbability) {
        setIsGlitching(true)

        // Glitch duration - shorter for low intensity, longer for high
        const glitchDuration =
          intensity === "low"
            ? 150 + Math.random() * 200
            : intensity === "medium"
              ? 200 + Math.random() * 300
              : 250 + Math.random() * 400

        setTimeout(() => {
          setIsGlitching(false)
        }, glitchDuration)
      }

      // Time until next potential glitch
      const nextTrigger =
        intensity === "low"
          ? 3000 + Math.random() * 5000
          : intensity === "medium"
            ? 2000 + Math.random() * 4000
            : 1500 + Math.random() * 3000

      return setTimeout(triggerGlitch, nextTrigger)
    }

    const timerId = triggerGlitch()
    return () => clearTimeout(timerId)
  }, [intensity])

  const glitchClass = cn(
    "glitch-text",
    {
      "glitch-active": isGlitching,
      "glitch-low": intensity === "low",
      "glitch-medium": intensity === "medium",
      "glitch-high": intensity === "high",
    },
    className,
  )

  return <Component className={glitchClass}>{children}</Component>
}
