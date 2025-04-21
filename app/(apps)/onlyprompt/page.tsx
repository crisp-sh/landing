"use client";

import { motion } from "framer-motion";
import {
  Lock,
  BrainCircuit,
  Bot,
  ShieldCheck,
  Box,
  Settings,
  Sparkles,
  Search,
  Mail,
} from "lucide-react";
import { HoverButton } from "@/components/hover-button";
import { HoverGlitchText } from "@/components/hover-glitch-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import GridItem from "@/components/ui/grid-item";
import Image from "next/image";
import { BackgroundCells } from "@/components/ui/background-cells";
import { CollegeLogoSlider } from "@/components/college-logo-slider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function OnlyPromptPage() {
  return (
    <div className="flex-1 font-manifold">
      <section className="min-h-screen">
        <BackgroundCells className="bg-black">
          <div className="flex flex-col h-full items-center justify-between gap-y-8 sm:gap-y-12 pb-12 md:pb-16">
            <div className="flex flex-col items-center gap-4 md:gap-6">
              <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 pointer-events-none">
                <br />
                <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mt-10">
                  <Image
                    src="/onlyprompt-logo-colored-dark.svg"
                    alt="OnlyPrompt Logo"
                    width={100}
                    height={100}
                    className="w-16 sm:w-20 md:w-24"
                  />
                  <Separator orientation="vertical" className="h-16 sm:h-20 md:h-24 mx-2 sm:mx-4 md:mx-6 bg-transparent" />
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-200 to-gray-400 pointer-events-none">
                    ONLYPROMPT
                  </h1>
                </div>
              </h1>
            </div>
            <div className="w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto px-4 space-y-6 sm:space-y-8 flex flex-col items-center">
              <div className="space-y-6 text-center">
                <h2 className="text-3xl sm:text-2xl font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400">
                  Join the waitlist
                </h2>
              </div>
              <form className="w-full max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="waitlist-subscribe"
                      className="peer ps-9 h-10 sm:h-12"
                      placeholder="hi@yourcompany.com"
                      type="email"
                      aria-label="Email"
                      required
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      <Mail size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <HoverButton type="submit" className="w-full uppercase h-12 font-extralight">
                  join us
                </HoverButton>
              </form>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <Avatar className="border-2 border-black w-8 h-8 sm:w-12 sm:h-12">
                      <AvatarImage src="https://picsum.photos/seed/user13/100" alt="User 1 Avatar" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-black w-8 h-8 sm:w-12 sm:h-12">
                      <AvatarImage src="https://picsum.photos/seed/user4/100" alt="User 2 Avatar" />
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-black w-8 h-8 sm:w-12 sm:h-12">
                      <AvatarImage src="https://picsum.photos/seed/user31/100" alt="User 3 Avatar" />
                      <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="font-semibold text-xs sm:text-sm text-gray-400">200+ people on the waitlist</span>
                </div>
              </div>
            </div>
            <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl px-4 text-center">
              <h3 className="mb-4 lg:text-2xl md:text-xl sm:text-lg font-normal text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase">
                Trusted By Students and Professionals at Leading Institutions:
              </h3>
              <CollegeLogoSlider reverse={true} title="" />
            </div>
          </div>
          <Spotlight />

        </BackgroundCells>
      </section>
      
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24  border-white/10">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl">
              Experience the{" "}
              <HoverGlitchText intensity="low">Uncanny</HoverGlitchText>{" "}
              Intelligence.
            </h2>
            <p className="text-lg text-white/70">
              Observe the precision and security in every interaction.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-sm border border-white/10 bg-gray-900/50 p-4 shadow-lg shadow-red-500/10"
          >
            <p className="text-sm text-white/50">
              [Chat Interface Snippet / GIF Placeholder]
            </p>
          </motion.div>
        </div>
      </section>

      <section
        id="features"
        className="px-4 md:px-6 py-16 md:py-24 bg-black/70  border-white/10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-medium tracking-tight md:text-4xl">
            Core Capabilities
          </h2>
          {/* <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"> */}
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
              area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
              icon={<Box className="h-4 w-4" />}
              title="Do things the right way"
              description="Running out of copy so I'll write anything."
            />
            <GridItem
              area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
              icon={<Settings className="h-4 w-4" />}
              title="The best AI code editor ever."
              description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
            />
            <GridItem
              area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
              icon={<Lock className="h-4 w-4" />}
              title="You should buy Aceternity UI Pro"
              description="It's the best money you'll ever spend"
            />
            <GridItem
              area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
              icon={<Sparkles className="h-4 w-4" />}
              title="This card is also built by Cursor"
              description="I'm not even kidding. Ask my mom if you don't believe me."
            />
            <GridItem
              area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
              icon={<Search className="h-4 w-4" />}
              title="Coming soon on Aceternity UI"
              description="I'm writing the code as I record this, no shit."
            />
          </ul>
          {/* </div> */}
        </div>
      </section>

      <section
        id="security"
        className="container mx-auto max-w-3xl px-4 md:px-6 py-16 md:py-24  border-white/10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl">
            Why OnlyPrompt?
          </h2>
          <p className="mb-8 text-lg text-white/70">
            AI with integrity; designed for those who can't risk leaks.
          </p>
          <ul className="mb-8 space-y-2 text-left font-light text-white/80 list-inside list-['-_'] marker:text-red-500">
            <li> Uncompromising Security Measures</li>
            <li> Verifiable Operational Integrity</li>
            <li> Designed for Sensitive Environments</li>
            <li> Proactive Threat grayization</li>
          </ul>
          <p className="text-xl font-medium italic text-red-300">
            It's not just smart. It's{" "}
            <HoverGlitchText intensity="high" className="not-italic">
              always watching
            </HoverGlitchText>
            .
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <h2 className="mb-12 text-center text-3xl font-medium tracking-tight md:text-4xl">
          Endorsements
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="rounded-sm border border-white/10 bg-white/5 p-6 shadow-md"
            >
              <p className="mb-4 font-light italic text-white/80">
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
