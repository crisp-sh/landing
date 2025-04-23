"use client";

import { useState, useEffect } from 'react';
import type { FC, MouseEvent } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '#', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#cost-calculator', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#waitlist-2', label: 'Join the waitlist' }, // Adjusted label
];

const SecondaryNavbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Scroll Handler will go here ---
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    let targetScrollY = 0;
    const headerOffset = 80; // Default offset, adjust if needed

    if (href !== '#') {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
         targetScrollY = targetElement.offsetTop - headerOffset;
      } else {
        console.warn(`Target element with ID "${targetId}" not found.`);
        return;
      }
    }

    gsap.to(window, {
      scrollTo: { y: targetScrollY, autoKill: true },
      duration: 1,
      ease: 'power3.out',
    });

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // --- Effect to close menu on resize ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) { // 768px = md breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    // Lower z-index
    <nav className="sticky top-16 z-50 h-12 w-full border-b border-white/10 bg-black/80 backdrop-blur-sm"> {/* Adjust top-16 */}
      <div className="container mx-auto flex h-full items-center justify-between">

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button Wrapper */}
        <div className="md:hidden -ml-4">
             <div className="flex items-center">
                {/* Ensure button is clickable above dropdown bg */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  // Add relative positioning needed for z-index to work reliably on buttons/inline elements
                  className="relative z-[45] text-gray-300 hover:text-white hover:bg-gray-700 focus:bg-transparent active:bg-transparent focus-visible:ring-1 focus-visible:ring-offset-1"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  <span className="ml-2 text-sm font-medium">Menu</span>
                </Button>
             </div>
        </div>

         {/* Spacer */}
         <div className="hidden md:flex flex-1" />

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            // Animate y and opacity
            initial={{ opacity: 0, y: "-10%" }} // Start slightly above
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
             // Add will-change properties
            className="md:hidden absolute top-full left-0 w-full z-40 border-b border-white/10 bg-black/90 backdrop-blur-md shadow-lg will-change-transform will-change-opacity"
          >
            {/* Inner padding */}            
            <div className="flex flex-col space-y-2 py-2 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SecondaryNavbar; 