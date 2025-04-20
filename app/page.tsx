"use client";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Shield, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HoverGlitchText } from "@/components/hover-glitch-text";
import { EerieNav } from "@/components/eerie-nav";
import { HoverButton } from "@/components/hover-button";
import { PixelCanvas } from "@/components/ui/pixel-canvas";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1 pt-16">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/95 to-black" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="mx-auto mb-12 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="relative h-32 w-32 md:h-40 md:w-40"
                >
                  <motion.div
                    animate={{
                      filter: [
                        "drop-shadow(0 0 0px rgba(255,255,255,0.3))",
                        "drop-shadow(0 0 8px rgba(255,255,255,0.7))",
                        "drop-shadow(0 0 0px rgba(255,255,255,0.3))",
                      ],
                      rotate: [0, 0.5, 0, -0.5, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src="/logo.svg"
                      alt="Crisp Logo"
                      width={320}
                      height={320}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                </motion.div>
              </div>

              <h1 className="mb-6 text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">
                  <h1 className="font-regular uppercase font-manifold">
                    We don't just observe.
                  </h1>
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                  className="mt-2 block font-regular font-manifold uppercase"
                >
                  We{" "}
                  <HoverGlitchText
                    intensity="high"
                    as="span"
                    className="font-bold uppercase font-manifold"
                  >
                    control
                  </HoverGlitchText>
                  .
                </motion.span>
              </h1>
              <p className="mx-auto mt-8 max-w-xl text-lg font-extralight font-manifold leading-relaxed text-white/70">
                Optimizing human potential through proprietary algorithms and
                data-driven insights. Your future is our business.
              </p>
              <div className="mt-10">
                <HoverButton>
                  <span className="uppercase">
                    Join the initiative
                  </span>
                </HoverButton>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </section>

        <section className="py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mx-auto mb-16 max-w-2xl text-center"
            >
              <h2 className="text-3xl font-light tracking-tight">
                <HoverGlitchText intensity="high" as="span" className="font-medium uppercase">
                  Our Methodology
                </HoverGlitchText>
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
                    "Continuous monitoring systems that analyze behavioral patterns with unprecedented accuracy.",
                  color: "#481515",
                },
                {
                  icon: Zap,
                  title: "EFFICIENCY",
                  description:
                    "Proprietary algorithms that enhance productivity through subtle psychological adjustments.",
                  color: "#481515",
                },
                {
                  icon: Shield,
                  title: "CONTROL",
                  description:
                    "Preemptive security measures that neutralize threats before they materialize.",
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

        <section className="relative py-24">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-light tracking-tight">
                  <HoverGlitchText intensity="medium" as="span" className="font-medium uppercase">
                    Join Our Network
                  </HoverGlitchText>
                </h2>
                <p className="mt-4 text-white/60">
                  Become part of the system. Enhance your potential. Surrender
                  to efficiency.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <form className="flex flex-col items-center space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full max-w-md rounded-none border border-white/20 bg-black/50 px-4 py-2 text-white placeholder-white/40 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                  />
                  <HoverButton className="w-full max-w-md">
                    <span className="font-medium font-manifold uppercase">Subscribe</span>
                    <ArrowRight className="ml-2 h-4 w-4 inline-block transition-transform duration-300 group-hover:translate-x-1" />
                  </HoverButton>
                </form>
                <p className="mt-4 text-xs font-extralight text-white/40">
                  By subscribing, you consent to our data collection protocols.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
