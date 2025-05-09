"use client";

import { motion } from "framer-motion";
import { Lock, Bot, Brain, Cog, DollarSign } from "lucide-react";
import GridItem from "@/components/ui/grid-item";
// import Image from "next/image";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
// import { Spotlight } from "@/components/ui/spotlight-new";
import SecondaryNavbar from "@/components/secondary-navbar";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaitlistForm from "@/components/waitlist-form";
import { RetroGrid } from "@/components/ui/retro-grid";
import { useIsMobile } from "@/hooks/use-mobile";

import Calculator from "@/components/blocks/calculator";
import WhyOnlyPromptBlock from "@/components/blocks/why-onlyprompt-block";
import { BackgroundPaths } from "@/components/blocks/background-paths";
import { TestimonialsSectionDemo } from "@/components/blocks/testimonials-with-marquee-demo";
// import FairPricingBlock from "@/components/blocks/fair-pricing-block";
// import RealCostBlock from "@/components/blocks/real-cost-block";
// import { TextEffect } from "@/components/ui/text-effect";
import { Flex, FlexCol, FlexGroup, FlexRow } from "@/components/ui/flex";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
// import FutureOfAI from "@/components/blocks/future-of-ai";
import AIToolsComparison from "@/components/blocks/ai-tools-comparison";
import { MainHero } from "@/components/blocks/main-hero";

gsap.registerPlugin(ScrollTrigger);

// Helper function for GSAP animation
const applyLineReveal = (elements: Array<HTMLElement | null>) => {
  if (elements.some((el) => !el)) return () => {};

  const splits = elements.map((el) =>
    el ? new SplitType(el, { types: "lines", lineClass: "line" }) : null
  );

  for (const split of splits) {
    if (!split || !split.lines) continue;
    for (const line of split.lines) {
      const span = document.createElement("span");
      span.style.display = "block";
      span.style.overflow = "hidden";
      span.innerHTML = line.innerHTML;
      line.innerHTML = "";
      line.appendChild(span);
    }
  }

  const allInnerSpans = elements.flatMap((el) =>
    el ? Array.from(el.querySelectorAll(".line > span")) : []
  );

  gsap.set(allInnerSpans, { y: "110%" });

  gsap.to(allInnerSpans, {
    y: "0%",
    duration: 0.8,
    stagger: 0.07,
    ease: "power3.out",
    delay: 0.2,
  });

  return () => {
    for (const split of splits) {
      split?.revert();
    }
  };
};

export default function OnlyPromptPage() {
  // Refs for animations
  const uncannySectionRef = useRef<HTMLDivElement>(null);
  const uncannyH2Ref = useRef<HTMLHeadingElement>(null);
  const uncannyPRef = useRef<HTMLParagraphElement>(null);

  const capabilitiesSectionRef = useRef<HTMLDivElement>(null);
  const capabilitiesH2Ref = useRef<HTMLHeadingElement>(null);

  const whySectionRef = useRef<HTMLDivElement>(null);
  const whyH2Ref = useRef<HTMLHeadingElement>(null);
  const whyP1Ref = useRef<HTMLParagraphElement>(null);
  const whyUlRef = useRef<HTMLUListElement>(null);
  const whyP2Ref = useRef<HTMLParagraphElement>(null);

  const endorsementsSectionRef = useRef<HTMLDivElement>(null);
  const endorsementsH2Ref = useRef<HTMLHeadingElement>(null);
  const endorsementRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const endorsementContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if mobile
  const isMobile = useIsMobile();

  // Apply animations using hooks scoped to sections
  useGSAP(() => applyLineReveal([uncannyH2Ref.current, uncannyPRef.current]), {
    scope: uncannySectionRef,
  });
  useGSAP(() => applyLineReveal([capabilitiesH2Ref.current]), {
    scope: capabilitiesSectionRef,
  });
  useGSAP(
    () =>
      applyLineReveal([
        whyH2Ref.current,
        whyP1Ref.current,
        whyUlRef.current,
        whyP2Ref.current,
      ]),
    { scope: whySectionRef }
  );
  useGSAP(() => applyLineReveal([endorsementsH2Ref.current]), {
    scope: endorsementsSectionRef,
  });
  useGSAP(() => {
    for (let i = 0; i < endorsementRefs.current.length; i++) {
      const pRef = endorsementRefs.current[i];
      const container = endorsementContainerRefs.current[i];
      if (pRef && container) {
        const split = new SplitType(pRef, {
          types: "lines",
          lineClass: "line",
        });
        if (!split.lines) continue;
        for (const line of split.lines) {
          const span = document.createElement("span");
          span.style.display = "block";
          span.style.overflow = "hidden";
          span.innerHTML = line.innerHTML;
          line.innerHTML = "";
          line.appendChild(span);
        }
        const innerSpans = pRef.querySelectorAll(".line > span");
        gsap.set(innerSpans, { y: "110%" });
        gsap.to(innerSpans, {
          scrollTrigger: { trigger: container, start: "top 80%" },
          y: "0%",
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.1,
        });
      }
    }
  });

  return (
    <div className="font-manifold bg-inherit">
      <SecondaryNavbar />
      <ScrollIndicator />
      
      {/* Main Hero */}
      {/* <section className="border-b border-white/10 flex items-center md:items-start"> */}
        <MainHero />
      {/* </section> */}

      {/* AI Tools Comparison */}
      {/* <section
        id="mission"
        className="bg-black text-white py-16 sm:py-20 md:py-24 border-b border-white/10"
      >
        <AIToolsComparison />
      </section> */}

      {/* Features */}
      <section
        ref={capabilitiesSectionRef}
        id="features"
        className="relative flex flex-col items-center justify-center px-4 md:px-6 py-16 sm:py-20 md:py-24 bg-neutral-950/70 min-h-screen border-b border-white/10 overflow-hidden"
      >
        <BackgroundPaths opacity={0.2} />
        <div className="relative z-10 w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="mb-10 sm:mb-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase">
              Intelligence at your fingertips
            </h3>
          </motion.div>
          <ul className="relative z-10 grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
              area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
              icon={<DollarSign className="h-4 w-4" />}
              title="Won't Break the Bank"
              description="Don't spend more than you need to. We charge for token usage instead of a monthly subscription."
            />
            <GridItem
              area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
              icon={<Cog className="h-4 w-4" />}
              title="Fully Customizable"
              description="Preloaded with a range of custom assistants, but you can also create and fine-tune your own."
            />
            <GridItem
              area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
              icon={<Lock className="h-4 w-4" />}
              title="Privacy-First Approach"
              description="Your data is yours. We don't sell it, and we don't use it to train our models. We're also GDPR and CCPA compliant."
            />
            <GridItem
              area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
              icon={<Brain className="h-4 w-4" />}
              title="Improved Memory"
              description="Increased memory across long conversations by using custom context-aware caching. Not only does this make the AI more helpful, but it also makes it faster and more efficient ($)."
            />
            <GridItem
              area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
              icon={<Bot className="h-4 w-4" />}
              title="On the Cutting Edge"
              description="Leverage the fastest and greatest AI models from OpenAI, Anthropic, Mistral, NVIDIA, and Google, updated daily."
            />
          </ul>
        </div>
      </section>

      {/* Cost Calculator */}
      <section
        ref={uncannySectionRef}
        id="cost-calculator"
        className="relative py-16 sm:py-20 md:py-24 border-b border-white/10"
      >
        <div className="container mx-auto px-4 md:px-6">
          <Calculator />
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="border-b border-white/10 last:border-b-0"
      >
        <TestimonialsSectionDemo />
      </section>

      {/* Waitlist */}
      <section
        id="waitlist-2"
        className="min-h-screen h-screen border-b border-white/10 flex items-center"
      >
        <div className="w-full max-w-[18rem] sm:max-w-xs md:max-w-sm mx-auto px-4 space-y-5 sm:space-y-6 flex flex-col items-center">
          <WaitlistForm flexDirection="col" />
        </div>
      </section>
    </div>
  );
}
