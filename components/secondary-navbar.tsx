"use client";

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedNavigationTabs } from '@/components/ui/animated-navigation-tabs';

interface NavLink {
  href: string;
  label: string;
}

type TabItem = { id: number; tile: string; href: string; };

const navLinksData: NavLink[] = [
  { href: '#', label: 'INTRO' },
  { href: '#mission', label: 'MISSION' },
  { href: '#features', label: 'FEATURES' },
  { href: '#cost-calculator', label: 'PRICING' },
  { href: '#testimonials', label: 'FEEDBACK' },
  { href: '#waitlist-2', label: 'WAITLIST' },
];

const tabItems: TabItem[] = navLinksData.map((link, index) => ({
  id: index,
  tile: link.label,
  href: link.href,
}));

const SecondaryNavbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabItem>(tabItems[0]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleMobileLinkClick = (href: string) => {
    let targetScrollY = 0;
    const headerOffset = 80;
    if (href !== '#') {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetScrollY = targetElement.offsetTop - headerOffset;
      }
    }
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });

    const clickedItem = tabItems.find(item => item.href === href);
    if (clickedItem) {
      setActiveTab(clickedItem);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-16 z-50 h-12 w-full border-b border-white/10 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-full items-center justify-between">

        <div className="hidden md:flex -ml-4">
          <AnimatedNavigationTabs
            items={tabItems}
            activeTab={activeTab}
            onSetActive={setActiveTab}
            headerOffset={80}
          />
        </div>

        <div className="md:hidden -ml-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-[45] text-gray-300 w-full focus:bg-transparent active:bg-transparent focus-visible:ring-1 focus-visible:ring-offset-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <ChevronRight className="h-5 w-5 rotate-90" /> : <ChevronRight className="h-5 w-5" />}
              <span className="ml-2 text-sm font-medium">Menu</span>
            </Button>
          </div>
        </div>

        <div className="hidden md:flex flex-1" />

      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 w-full z-40 border-b border-white/10 bg-black/90 backdrop-blur-md shadow-lg will-change-transform will-change-opacity"
          >
            <div className="flex flex-col space-y-2 py-2 px-4">
              {navLinksData.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleMobileLinkClick(link.href)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default SecondaryNavbar;