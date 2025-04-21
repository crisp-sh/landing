"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { WatchfulEye } from "./watchful-eye"
import Image from "next/image"
import Link from "next/link"

interface AppNavProps {
  logo: string
}

export function AppNav({ logo }: AppNavProps) {
  const [currentTime, setCurrentTime] = useState("")
  const [isGlitching, setIsGlitching] = useState(false)

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  // Random glitching effect for the entire nav
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.9
      if (shouldGlitch) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 150)
      }
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full border-b border-white/10 bg-black/80 backdrop-blur-sm transition-all duration-300 ${
        isGlitching ? "translate-x-[1px]" : ""
      }`}
    >
      <div className="container relative flex h-16 items-center justify-between z-50">
        {/* Logo and company name */}
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative h-8 w-8 md:h-10 md:w-10"
          >
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(255,255,255,0.3))",
                  "drop-shadow(0 0 3px rgba(255,255,255,0.7))",
                  "drop-shadow(0 0 0px rgba(255,255,255,0.3))",
                ],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Link href="/">
              <Image
                src={logo || "/placeholder.svg"}
                alt="Logo"
                width={80}
                height={80}
                className="h-full w-full"
              />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Centered watchful eye */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <WatchfulEye className="mx-auto" />
        </div>

        {/* Fixed-width time display */}
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-white/30" />
          <div className="font-mono text-xs font-light tracking-wider text-white/50 tabular-nums">{currentTime}</div>
        </div>

        {/* Decorative elements */}
        {/* <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" /> */}
        {/* <div className="absolute bottom-0 left-1/4 h-3 w-px bg-white/10" /> */}
        {/* <div className="absolute bottom-0 right-1/4 h-3 w-px bg-white/10" /> */}
      </div>
    </header>
  )
}
