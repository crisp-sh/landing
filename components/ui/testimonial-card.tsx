"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Define the Author type used by the card and section
export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

// Define the props for the card itself
interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string; // Optional link for the card/author
  className?: string;
}

export function TestimonialCard({ 
  author, 
  text, 
  href, 
  className 
}: TestimonialCardProps) {
  const cardContent = (
    <div
      className={cn(
        "flex w-[300px] flex-col items-start gap-4 rounded-md border border-white/10 bg-white/5 p-6 shadow-lg sm:w-[380px]",
        "backdrop-blur-sm", // Add backdrop blur
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src={author.avatar}
          alt={author.name}
          width={40}
          height={40}
          className="rounded-full object-cover border border-white/20"
          unoptimized // Assuming external URLs like unsplash
        />
        <div className="text-left">
          <p className="text-sm font-semibold text-white/95">{author.name}</p>
          <p className="text-xs text-white/60">{author.handle}</p>
        </div>
      </div>
      <p className="text-sm font-light leading-relaxed text-white/80 text-left">
        {text}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
} 