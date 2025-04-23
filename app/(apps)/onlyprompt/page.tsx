"use client";

import { motion } from "framer-motion";
import { Lock, Bot, Brain, Cog, DollarSign, Sparkles } from "lucide-react";
import GridItem from "@/components/ui/grid-item";
import Image from "next/image";
import { CollegeLogoSlider } from "@/components/college-logo-slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Spotlight } from "@/components/ui/spotlight-new";
import SecondaryNavbar from "@/components/secondary-navbar";

// GSAP Imports
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaitlistForm from "@/components/waitlist-form";
import { RetroGrid } from "@/components/ui/retro-grid";

// Add import for the calculator component
import Calculator from "@/components/blocks/calculator";
import { BackgroundPaths } from "@/components/blocks/background-paths";
import { TestimonialsSectionDemo } from "@/components/blocks/testimonials-with-marquee-demo";

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
    <div className="flex-1 font-manifold bg-inherit">
      <SecondaryNavbar />

      <section className="min-h-screen border-b border-white/10 flex items-center pt-16 md:pt-0">
        <div className="bg-black relative overflow-hidden w-full">
          <Spotlight />
          <div className="flex flex-col min-h-screen items-center justify-center gap-y-6 sm:gap-y-8 py-12 sm:py-16 md:py-20">
            <div className="flex flex-col items-center gap-4 md:gap-5">
              <div className="text-sm sm:text-base md:text-lg font-medium text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 pointer-events-none">
                <span className="uppercase font-extralight text-2xl xs:text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-purple-200 to-purple-800 pointer-events-none">
                  introducing
                </span>
                <br />
                <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 my-6 sm:my-8">
                  <Image
                    src="/onlyprompt-logo-colored-dark.svg"
                    alt="OnlyPrompt Logo"
                    width={80}
                    height={80}
                    className="text-5xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl"
                  />
                  <Separator
                    orientation="vertical"
                    className="h-10 sm:h-14 md:h-16 mx-2 sm:mx-3 md:mx-4 bg-transparent"
                  />
                  <h1 className="text-5xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight sm:tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-200 to-gray-400 pointer-events-none">
                    ONLYPROMPT
                  </h1>
                </div>
                {/* <span className="uppercase font-extralight text-2xl xs:text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-purple-200 to-purple-800 pointer-events-none">
                  the {" "} 
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-green-400">
                    ai assistant
                  </span>{" "}
                  built{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-green-400">
                    for you
                  </span>
                </span> */}
              </div>
            </div>
            <div className="w-full max-w-[18rem] sm:max-w-xs md:max-w-sm mx-auto px-4 space-y-5 sm:space-y-6 flex flex-col items-center py-10">
              <WaitlistForm flexDirection="row" />
              <RetroGrid />

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <Avatar className="border-2 border-black w-8 h-8 sm:w-12 sm:h-12">
                      <AvatarImage src="/avatars/two.png" alt="User 1 Avatar" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-black w-8 h-8 sm:w-12 sm:h-12">
                      <AvatarImage
                        src="/avatars/three.png"
                        alt="User 2 Avatar"
                      />
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-black w-8 h-8 sm:w-12 sm:h-12">
                      <AvatarImage src="/avatars/one.png" alt="User 3 Avatar" />
                      <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="font-semibold text-xs sm:text-sm text-gray-400">
                    200+ people already on the waitlist
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl px-4 text-center mt-6 sm:mt-10">
              <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase">
                Trusted By Students and Professionals at Leading Institutions:
              </h3>
              <CollegeLogoSlider />
            </div> */}
          </div>
        </div>
      </section>

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

      <section
        ref={uncannySectionRef}
        id="cost-calculator"
        className="relative py-16 sm:py-20 md:py-24 border-b border-white/10"
      >
        <div className="container mx-auto px-4 md:px-6">
          <Calculator />
        </div>
      </section>

      <section
        id="testimonials"
        className="border-b border-white/10 last:border-b-0"
      >
        <TestimonialsSectionDemo />
      </section>

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
