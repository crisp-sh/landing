"use client";

import type React from "react";
// Remove imports no longer needed if header/footer are gone
// import Image from "next/image";
// import { Eye } from "lucide-react";
// import { useState } from "react";

// Removed DynamicTimer component if it's not used elsewhere

interface OnlyPromptLayoutProps {
  children: React.ReactNode;
}

export default function OnlyPromptLayout({ children }: OnlyPromptLayoutProps) {
  // Return children directly, possibly wrapped in a fragment or div if needed
  // The root layout (app/layout.tsx) will provide the main nav and footer
  return <>{children}</>;
} 