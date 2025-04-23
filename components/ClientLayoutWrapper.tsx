"use client";

import type React from "react";
import { ViewTransitions } from "next-view-transitions";
import { ReactLenis } from "@studio-freight/react-lenis";
import { Toaster } from "sonner";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactLenis root options={{ lerp: 0.1, smoothWheel: false }}>
        <ViewTransitions>{children}</ViewTransitions>
      </ReactLenis>
      <Toaster richColors position="bottom-right" />
    </>
  );
} 