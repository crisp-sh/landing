"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(255,255,255,0.3))",
                  "drop-shadow(0 0 2px rgba(255,255,255,0.5))",
                  "drop-shadow(0 0 0px rgba(255,255,255,0.3))",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Image src="/logo.svg" alt="Crisp Logo" width={20} height={20} />
            </motion.div>
            <div className="text-sm font-light text-white/40">
              Copyright {new Date().getFullYear()} crisp.sh. All rights
              reserved.
            </div>
          </div>
          <div className="flex space-x-6 text-xs font-light text-white/40">
            <Link href="/privacy-policy" className="hover:text-white/60">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white/60">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
