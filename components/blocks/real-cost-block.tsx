"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

const RealCostBlock = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Simplified data for visual representation (adjust scale/max as needed)
  const otherCost = 20;
  const onlyPromptCost = 2;
  const maxCost = 25; // For scaling the bars

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      className="py-16 sm:py-20 md:py-24 bg-background border-b border-border/60"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
        >
          The Real Cost of Chatbots
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Monthly Cost Comparison</h3>
            <p className="text-muted-foreground">Estimated cost for ~2000 messages:</p>
            <div className="space-y-3 pt-2">
              {/* "Others" Bar */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">Typical Chatbot</span>
                  <span className="text-sm font-semibold text-foreground">$20</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <motion.div
                    className="bg-destructive h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(otherCost / maxCost) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  />
                </div>
              </div>
              {/* "OnlyPrompt" Bar */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-primary">OnlyPrompt</span>
                  <span className="text-sm font-semibold text-primary">~$2</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <motion.div
                    className="bg-primary h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(onlyPromptCost / maxCost) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center md:text-left">
            <p className="text-lg sm:text-xl text-muted-foreground italic mb-4">
              Most chatbots charge a flat fee, no matter your usage.
              With OnlyPrompt, you pay only for the tokens you use.
            </p>
            <p className="text-lg sm:text-xl font-semibold text-foreground flex items-center justify-center md:justify-start">
              <Coffee className="h-5 w-5 mr-2 text-primary" />
              AI chat shouldn't cost more than your coffee.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default RealCostBlock; 