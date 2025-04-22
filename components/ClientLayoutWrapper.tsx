"use client";

import type React from "react";
import { ViewTransitions } from "next-view-transitions";
import { ReactLenis } from "@studio-freight/react-lenis";
import { Toaster } from "sonner";
import { ClosableBanner } from "./closable-banner";
import { AlertCircle } from "lucide-react";
export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClosableBanner
        icon={<AlertCircle className="h-4 w-4" />}
        bgColor="bg-red-400"
        title="IMPORTANT:" 
        description="This website is satire! We do not condone the actions of the faux corporation portrayed on this website. Privacy is a human right."
        className="font-bold"
      />
      <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
        <ViewTransitions>{children}</ViewTransitions>
      </ReactLenis>
      <Toaster richColors position="bottom-right" />
    </>
  );
} 