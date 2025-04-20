"use client"

import { useEffect, useRef, useState } from "react"

interface WatchfulEyeProps {
  className?: string
}

export function WatchfulEye({ className }: WatchfulEyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const irisRef = useRef<HTMLDivElement>(null)
  const [blinking, setBlinking] = useState(false)

  // Track mouse position and update iris position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (eyeRef.current && irisRef.current) {
        const eyeRect = eyeRef.current.getBoundingClientRect()
        const eyeCenterX = eyeRect.left + eyeRect.width / 2
        const eyeCenterY = eyeRect.top + eyeRect.height / 2

        // Calculate the distance between mouse and eye center
        const deltaX = e.clientX - eyeCenterX
        const deltaY = e.clientY - eyeCenterY

        // Calculate the offset using the same formula as the example
        const eyeWidth = eyeRect.width
        const eyeHeight = eyeRect.height
        const offsetX = (Math.atan(deltaX * 0.0015) / Math.PI) * eyeWidth
        const offsetY = (Math.atan(deltaY * 0.0015) / Math.PI) * eyeHeight

        // Apply the transformation to the iris
        irisRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setBlinking(true)
        setTimeout(() => setBlinking(false), 150)
      }
    }, 3000)

    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <div
      className={`relative h-12 w-12 rounded-full bg-white border-2 border-black overflow-hidden flex items-center justify-center ${className}`}
      ref={eyeRef}
    >
      <div
        className={`h-4 w-4 rounded-full bg-black transition-all duration-100 ${blinking ? "scale-0" : "scale-100"}`}
        ref={irisRef}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-white float-right"></div>
      </div>
    </div>
  )
}
