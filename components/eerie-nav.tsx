"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WatchfulEye } from "./watchful-eye";
import { HoverGlitchText } from "./hover-glitch-text";
import Image from "next/image";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { slideInOut } from "@/utils/transitions";
import { X } from "lucide-react";
import { Separator } from "./ui/separator";

interface EerieNavProps {
  logo: string;
}

export function EerieNav({ logo }: EerieNavProps) {
  const [currentTime, setCurrentTime] = useState("");
  const router = useTransitionRouter();
  const pathname = usePathname();

  // Determine secondary logo based on pathname
  let secondaryLogo: string | null = null;
  let secondaryLogoAlt: string | null = null;

  if (pathname === "/onlyprompt") {
    secondaryLogo = "/onlyprompt-logo-colored-dark.svg";
    secondaryLogoAlt = "OnlyPrompt Logo";
  }
  // Add more conditions here for other pages if needed
  // else if (pathname === '/some-other-page') { ... }

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log("Logo clicked");
    if (!document.startViewTransition) {
      router.push("/");
      return;
    }
    document.startViewTransition(() => {
      router.push("/");
      slideInOut();
    });
  };

  return (
    <header className="fixed left-0 right-0 top-[var(--banner-height,0px)] z-[1000] w-full border-b border-white/10 bg-black/80 backdrop-blur-sm transition-all duration-300">
      <div className="container relative flex h-16 items-center justify-between">
        {/* Logo and company name */}
        <div className="flex flex-row items-center gap-2">
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
              <a href="/" onClick={handleLogoClick}>
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Logo"
                  width={80}
                  height={80}
                  className="h-full w-full"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* Conditionally render separator and secondary logo */}
          {secondaryLogo && (
            <>
              <span className="select-none text-2xl font-light text-white/50 mx-1 leading-none flex items-center">
                {/* <X className="w-4 h-4 rotate-45" /> */}
                <Separator orientation="vertical" className="h-6 w-px mx-1" />
              </span>
              {/* Secondary logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="relative h-8 w-8 md:h-10 md:w-10"
              >
                <motion.div
                  animate={{
                    filter: [
                      "drop-shadow(0 0 0px rgba(64, 61, 82,0.3))",
                      "drop-shadow(0 0 3px rgba(64, 61, 82,0.7))",
                      "drop-shadow(0 0 0px rgba(64, 61, 82,0.3))",
                    ],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <a href="/onlyprompt">
                    <Image
                      src={secondaryLogo}
                      alt={secondaryLogoAlt || "Secondary Logo"}
                      width={40}
                      height={40}
                      className="h-1/2 w-auto opacity-75"
                    />
                  </a>
                </motion.div>
              </motion.div>
            </>
          )}
        </div>

        {/* Centered watchful eye */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <WatchfulEye className="mx-auto" />
        </div>

        {/* Fixed-width time display */}
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-white/30" />
          <div className="font-mono text-xs font-light tracking-wider text-white/50 tabular-nums">
            {currentTime}
          </div>
        </div>

        {/* Decorative elements */}
        {/* <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-1/4 h-3 w-px bg-white/10" />
        <div className="absolute bottom-0 right-1/4 h-3 w-px bg-white/10" /> */}
      </div>
    </header>
  );
}
