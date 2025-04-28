import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Flex, FlexCol, FlexGroup, FlexRow } from "@/components/ui/flex";
import { HoverButton } from "../hover-button";

export default function AIToolsComparison() {
  const aiTools = [
    { name: "ChatGPT Plus", logo: "/images/logos/openai.svg", price: "$20/mo" },
    {
      name: "Claude Pro",
      logo: "/images/logos/claude-ai-icon.svg",
      price: "$20/mo",
    },
    { name: "Gemini Pro", logo: "/images/logos/gemini.svg", price: "$20/mo" },
    {
      name: "Grok Premium",
      logo: "/images/logos/grok_dark.svg",
      price: "$30/mo",
    },
    {
      name: "Perplexity Pro",
      logo: "/images/logos/perplexity_color.svg",
      price: "$20/mo",
    },
    { name: "Meta AI", logo: "/images/logos/meta_color.svg", price: "$30/mo" },
    { name: "DeepSeek", logo: "/images/logos/deepseek.svg", price: "$20/mo" },
    {
      name: "Mistral",
      logo: "/images/logos/mistral-ai_logo.svg",
      price: "$15/mo",
    },
    {
      name: "DALL-E",
      logo: "/images/logos/dalle-color.svg",
      price: "$20/mo",
    },
  ];

  return (
    <section className="relative border-b border-white/10 py-16 md:py-24">
      <style jsx global>{`
        @keyframes shakeHead {
          0% {
            transform: rotate(0deg) translateX(0) scale(1);
          }
          15% {
            transform: rotate(-2deg) translateX(-2px) scale(1.2);
          }
          30% {
            transform: rotate(2deg) translateX(2px) scale(1.2);
          }
          45% {
            transform: rotate(-2deg) translateX(-2px) scale(1.2);
          }
          60% {
            transform: rotate(2deg) translateX(2px) scale(1.2);
          }
          75% {
            transform: rotate(-2deg) translateX(-2px) scale(1.2);
          }
          90% {
            transform: rotate(0deg) translateX(0) scale(1);
          }
          100% {
            transform: rotate(0deg) translateX(0) scale(1);
          }
        }

        .price-badge {
          transition: all 0.2s ease;
        }

        .tool-card:hover .price-badge {
          animation: shakeHead 1s ease;
        }
      `}</style>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <Flex>
          <FlexGroup
            vertical={true}
            wrap={true}
            gap="4"
            gapX="2"
            gapY="6"
            justify="center"
            align="center"
          >
            <FlexRow>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block bg-purple-900/80 text-white text-sm font-medium px-4 py-1 rounded-full mb-6"
              >
                It&apos;s simple, really
              </motion.span>
            </FlexRow>
            <FlexRow>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="font-manifold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase mb-10"
              >
                Skipping Between Countless AI <br /> Apps is Exhausting
              </motion.h3>
            </FlexRow>
          </FlexGroup>
        </Flex>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 max-w-4xl mx-auto mb-16 text-lg md:text-xl"
        >
          Each AI tool demanding separate logins, fragmented features, and
          different interfaces. The constant juggle leaves you overwhelmed,
          feeling like you&apos;re fighting an uphill battle with tools meant to
          simplify your life.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              viewport={{ once: true }}
              className="tool-card flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors hover:border-white/20 relative"
            >
              {/* Price Badge */}
              <div className="price-badge absolute -top-2 right-2 bg-red-900/85 text-white border border-white/10 text-sm font-medium px-2 py-0.5">
                {tool.price}
              </div>

              <Flex className="w-full">
                <FlexGroup gap="2" align="center" className="w-full">
                  <FlexRow gap="3">
                    <div className="w-8 h-8 relative flex-shrink-0">
                      <Image
                        src={tool.logo}
                        alt={`${tool.name} logo`}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-white font-medium">{tool.name}</span>
                  </FlexRow>
                </FlexGroup>
              </Flex>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 max-w-4xl mx-auto mb-10 text-lg md:text-xl"
        >
          Separately you'd be paying more than{" "}
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-red-400">
            $195/mo
          </span>{" "}
          for all these tools. With Magali's all-in-one AI platform you unlock
          all of them for as little as{" "}
          <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-green-400">
            $19/mo
          </span>
          .
        </motion.p>

        <div className="flex justify-center">
          <Link href="/pricing" passHref>
            <HoverButton>
              Unlock Your Potential →
            </HoverButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
