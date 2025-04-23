"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react"; // Using Scale icon

const FairPricingBlock = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      className="py-16 sm:py-20 md:py-24 bg-background border-b border-border/60"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
            className="flex-shrink-0 p-3 bg-primary/10 rounded-full"
          >
            <Scale className="h-8 w-8 md:h-10 md:w-10 text-primary" />
          </motion.div>
          <div className="flex-grow">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold mb-3 text-foreground"
            >
              Our Mission: Fair Pricing for AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base sm:text-lg text-muted-foreground"
            >
              AI conversation shouldn't cost more than it should. OnlyPrompt charges you the real price, based on your actual usage.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FairPricingBlock; 