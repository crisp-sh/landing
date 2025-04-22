"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { Separator } from '@radix-ui/react-separator';

const BANNER_ID = 'site-banner-closed';
const BANNER_HEIGHT_VAR = '--banner-height';
const BANNER_HEIGHT_PX = '60px'; // Set your desired banner height here

export function ClosableBanner({ icon, bgColor, title, description, className }: { icon: React.ReactNode; bgColor: string; title: string; description: string; className?: string }) {
  const [isOpen, setIsOpen] = useState(true);

  // Check localStorage on initial mount
  useEffect(() => {
    const storedState = localStorage.getItem(BANNER_ID);
    if (storedState === 'true') {
      setIsOpen(false);
    }
  }, []);

  // Update CSS variable and localStorage when state changes
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, BANNER_HEIGHT_PX);
      localStorage.removeItem(BANNER_ID);
    } else {
      document.documentElement.style.setProperty(BANNER_HEIGHT_VAR, '0px');
      localStorage.setItem(BANNER_ID, 'true');
    }
    // Cleanup function to remove variable if component unmounts (optional)
    return () => {
      document.documentElement.style.removeProperty(BANNER_HEIGHT_VAR);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null; // Don't render anything if closed
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[1100] flex h-[60px] items-center justify-between gap-4 px-4 text-black shadow-md transition-transform duration-300 md:px-6 ${bgColor} ${className}`}
      style={{ height: BANNER_HEIGHT_PX }} // Ensure div matches CSS var height
    >
      <div className="flex items-center gap-2">
        {icon}
        <Separator orientation="vertical" className="h-8 my-4" />
        <span className="font-bold text-sm md:text-base">{title}</span>
        <span className="hidden md:inline text-sm">{description}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="text-black hover:bg-black/10"
        aria-label="Dismiss banner"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
} 