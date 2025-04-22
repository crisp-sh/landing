"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Bot,
  Brain,
  Cog,
  DollarSign,
} from "lucide-react";
import { HoverGlitchText } from "@/components/hover-glitch-text";
import GridItem from "@/components/ui/grid-item";
import Image from "next/image";
import { CollegeLogoSlider } from "@/components/college-logo-slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Spotlight } from "@/components/ui/spotlight-new";

// GSAP Imports
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaitlistForm from "@/components/waitlist-form";
import { RetroGrid } from "@/components/ui/retro-grid";


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
    <div className="flex-1 font-manifold">
      <section className="min-h-screen border-b border-white/10">
        <div className="bg-black relative overflow-hidden">
          <div className="flex flex-col min-h-screen items-center justify-evenly gap-y-8 sm:gap-y-12 py-12 md:py-16">
            <div className="flex flex-col items-center gap-4 md:gap-6">
              <div className="text-lg sm:text-xl md:text-2xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 pointer-events-none">
                <br />
                <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mt-10">
                  <Image
                    src="/onlyprompt-logo-colored-dark.svg"
                    alt="OnlyPrompt Logo"
                    width={100}
                    height={100}
                    className="w-16 sm:w-20 md:w-24"
                  />
                  <Separator
                    orientation="vertical"
                    className="h-16 sm:h-20 md:h-24 mx-2 sm:mx-4 md:mx-6 bg-transparent"
                  />
                  <div className="relativepointer-events-none">
                    <Spotlight />
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-200 to-gray-400 pointer-events-none">
                    ONLYPROMPT
                  </h1>
                </div>
              </div>
            </div>
            <div className="w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto px-4 space-y-6 sm:space-y-8 flex flex-col items-center">
              <WaitlistForm />
              <RetroGrid />

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <Avatar className="border-2 border-black w-8 h-8 sm:w-12 sm:h-12">
                      <AvatarImage
                        src="/avatars/two.png"
                        alt="User 1 Avatar"
                      />
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
                      <AvatarImage
                        src="/avatars/one.png"
                        alt="User 3 Avatar"
                      />
                      <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="font-semibold text-xs sm:text-sm text-gray-400">
                    200+ people already on the waitlist
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl px-4 text-center">
              <h3 className="mb-4 lg:text-2xl md:text-xl sm:text-lg font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase">
                Trusted By Students and Professionals at Leading Institutions:
              </h3>
              <CollegeLogoSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section
        ref={uncannySectionRef}
        className="relative h-screen border-white/10"
      >

      </section>

      <section
        ref={capabilitiesSectionRef}
        id="features"
        className="px-4 md:px-6 py-16 md:py-24 bg-black/70 h-screen"
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="mb-12 lg:text-3xl md:text-2xl sm:text-xl font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase">
              Experience Uncanny Intelligence.
            </h3>
          </motion.div>
          {/* <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"> */}
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
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
          {/* </div> */}
        </div>
      </section>

      <section
        ref={whySectionRef}
        id="security"
        className="container mx-auto max-w-3xl px-4 md:px-6 py-16 md:py-24 border-b border-white/10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2
            ref={whyH2Ref}
            className="mb-4 text-3xl font-medium tracking-tight md:text-4xl"
          >
            Why OnlyPrompt?
          </h2>
          <p ref={whyP1Ref} className="mb-8 text-lg text-white/70">
            AI with integrity; designed for those who can't risk leaks.
          </p>
          <ul
            ref={whyUlRef}
            className="mb-8 space-y-2 text-left font-light text-white/80 list-inside list-['-_'] marker:text-red-500"
          >
            <li> Uncompromising Security Measures</li>
            <li> Verifiable Operational Integrity</li>
            <li> Designed for Sensitive Environments</li>
            <li> Proactive Threat grayization</li>
          </ul>
          <p ref={whyP2Ref} className="text-xl font-medium italic text-red-300">
            It's not just smart. It's{" "}
            <HoverGlitchText intensity="high" className="not-italic">
              always watching
            </HoverGlitchText>
            .
          </p>
        </motion.div>
      </section>

      <section
        ref={endorsementsSectionRef}
        className="container mx-auto px-4 md:px-6 py-16 md:py-24 border-b border-white/10"
      >
        <h2
          ref={endorsementsH2Ref}
          className="mb-12 text-center text-3xl font-medium tracking-tight md:text-4xl"
        >
          Endorsements
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              ref={(el) => {
                endorsementContainerRefs.current[i - 1] = el;
              }}
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="rounded-sm border border-white/10 bg-white/5 p-6 shadow-md"
            >
              <p
                ref={(el) => {
                  endorsementRefs.current[i - 1] = el;
                }}
                className="mb-4 font-light italic text-white/80"
              >
                "Quote placeholder {i} - This AI is incredibly secure and
                intuitive. A game-changer for our research."
              </p>
              <p className="text-right text-sm font-semibold text-white/90">
                - [Name {i}], [Title/Institution {i}]
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
