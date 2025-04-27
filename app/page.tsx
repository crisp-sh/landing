"use client";
import { motion } from "framer-motion";
import { ArrowRight, Check, Eye, Loader2, Shield, Zap } from "lucide-react";
// import Link from "next/link";
import Image from "next/image";
import { HoverGlitchText } from "@/components/hover-glitch-text";
// import { EerieNav } from "@/components/eerie-nav";
import { HoverButton } from "@/components/hover-button";
import dynamic from "next/dynamic";
import type React from "react";
import { useState, useCallback, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactingEyeball } from "@/components/ui/reacting-eyeball";
// import { AnimatedLogo } from "@/components/ui/animated-logo";
import { GradientTracing } from "@/components/ui/gradient-tracing";
import { LOGO_SVG_PATHS } from "@/lib/constants";
import AIToolsComparison from "@/components/blocks/ai-tools-comparison";

// Transition Imports
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "@/utils/transitions";

// GSAP Imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { Banner1 } from "@/components/banner-one";
import WaitlistForm from "@/components/waitlist-form";
import PromptingIsAllYouNeed from "@/components/blocks/prompting";

const PixelCanvas = dynamic(
  () => import("@/components/ui/pixel-canvas").then((mod) => mod.PixelCanvas),
  { ssr: false }
);

export default function Home() {
  const isMobile = useIsMobile();
  const router = useTransitionRouter(); // Get the transition router
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showSuccessCheck, setShowSuccessCheck] = useState(false);

  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  // GSAP Animation Hook
  useGSAP(
    () => {
      if (!h1Ref.current || !spanRef.current) return;

      // Split the text into lines
      const splitH1 = new SplitType(h1Ref.current, {
        types: "lines",
        lineClass: "line",
      });
      const splitSpan = new SplitType(spanRef.current, {
        types: "lines",
        lineClass: "line",
      });

      // Manually wrap inner content using for...of
      if (splitH1.lines) {
        // Check if lines exist
        for (const line of splitH1.lines) {
          const span = document.createElement("span");
          span.style.display = "block";
          span.style.overflow = "hidden";
          span.innerHTML = line.innerHTML;
          line.innerHTML = "";
          line.appendChild(span);
        }
      }
      if (splitSpan.lines) {
        // Check if lines exist
        for (const line of splitSpan.lines) {
          const span = document.createElement("span");
          span.style.display = "block";
          span.style.overflow = "hidden";
          span.innerHTML = line.innerHTML;
          line.innerHTML = "";
          line.appendChild(span);
        }
      }

      // Select the inner spans
      const h1InnerSpans = h1Ref.current.querySelectorAll(".line > span");
      const spanInnerSpans = spanRef.current.querySelectorAll(".line > span");

      // Set initial state
      gsap.set(h1InnerSpans, { y: "110%" });
      gsap.set(spanInnerSpans, { y: "110%" });

      // Animate in
      gsap.to(h1InnerSpans, {
        y: "0%",
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5, // Optional delay after initial motion.div animation
      });
      gsap.to(spanInnerSpans, {
        y: "0%",
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.7, // Slightly later delay
      });

      // Cleanup function
      return () => {
        splitH1.revert();
        splitSpan.revert();
      };
    },
    { scope: containerRef }
  ); // Scope the animation to the container

  const handleJoinInitiative = useCallback(() => {
    console.log("handleJoinInitiative called (using startViewTransition)"); // Log 1

    // Check if browser supports View Transitions
    if (!document.startViewTransition) {
      console.log("View Transitions not supported, navigating directly."); // Log 2
      // Fallback for browsers without support
      router.push("/onlyprompt");
      return;
    }

    console.log("Starting View Transition..."); // Log 3
    // Wrap navigation and animation call in startViewTransition
    document.startViewTransition(() => {
      console.log("Inside startViewTransition callback"); // Log 4
      router.push("/onlyprompt");
      // Manually trigger the animation function alongside navigation
      slideInOut();
    });
  }, [router]); // Dependencies: router only

  const handleSubscribe = useCallback(async () => {
    if (isSubscribing) return;
    setIsSubscribing(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubscribing(false);
    setShowSuccessCheck(true);

    setTimeout(() => {
      setShowSuccessCheck(false);
    }, 500);
  }, [isSubscribing]);

  return (
    <div className="flex-1 font-manifold">
        <section
          className="mx-auto h-screen pt-16 border-white/10 z-[5000] border-b"
        >
          <PromptingIsAllYouNeed />
        </section>
        <section
          ref={containerRef}
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/95 to-black" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="mx-auto mb-12 flex justify-center">
                <div className="relative h-32 w-32 md:h-40 md:w-40">
                  <GradientTracing
                    width={isMobile ? 128 : 160}
                    height={isMobile ? 128 : 160}
                    svgWidth={1357}
                    svgHeight={1287}
                    path={LOGO_SVG_PATHS}
                    strokeWidth={2}
                    gradientColors={["#F1C40F80", "#F1C40F", "#E67E2280"]}
                    baseColor="#44444440"
                    fillColor="#ffffff"
                  />
                </div>
              </div>

              <h1
                ref={h1Ref}
                className="mb-6 text-4xl font-light tracking-tight sm:text-5xl md:text-6xl"
              >
                <span className="block">
                  <h1 className="font-regular uppercase font-manifold">
                    We built a system that works
                  </h1>
                </span>
              </h1>
              <div className="mt-24">
                <HoverButton onClick={handleJoinInitiative}>
                  <span className="uppercase">LEARN MORE ABOUT ONLYPROMPT</span>
                </HoverButton>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </section>

        <section className="relative py-16 border-b border-white/10 mx-auto">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mx-auto mb-16 max-w-2xl text-center"
            >
              <h2 className="text-3xl font-light tracking-tight">
                Our Methodology
              </h2>
              <p className="mt-4 text-white/60">
                Precision. Efficiency. Control. The three pillars of our
                operational framework.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Eye,
                  title: "PRECISION",
                  description:
                    "Build with purpose. Build with precision.",
                  color: "#471548",
                },
                {
                  icon: Zap,
                  title: "EFFICIENCY",
                  description:
                    "Factor in the human element. Build with efficiency.",
                  color: "#154822",
                },
                {
                  icon: Shield,
                  title: "CONTROL",
                  description:
                    "Privacy is a human right. Build with control.",
                  color: "#481515",
                },
              ].map((feature) => {
                const pixelColors = [
                  `${feature.color}1A`,
                  `${feature.color}80`,
                  feature.color,
                ];

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-sm border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-[var(--hover-border-color)]"
                    style={
                      {
                        "--hover-border-color": feature.color,
                      } as React.CSSProperties
                    }
                  >
                    <PixelCanvas
                      gap={6}
                      speed={30}
                      colors={pixelColors}
                      variant="default"
                      className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <div className="relative z-10">
                      <feature.icon className="mb-4 h-6 w-6 text-white/80" />
                      <h3 className="mb-2 text-xl font-light">
                        <HoverGlitchText intensity="low" as="span">
                          {feature.title}
                        </HoverGlitchText>
                      </h3>
                      <p className="text-sm font-extralight leading-relaxed text-white/60">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>      
        </section>

        <AIToolsComparison />

        <section className="relative pb-16">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <WaitlistForm flexDirection={""} />
                <p className="mt-4 text-xs font-extralight text-white/40">
                  By subscribing, you consent to our data collection protocols.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
    </div>
  );
}
