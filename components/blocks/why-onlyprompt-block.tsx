"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // Using a check icon for bullets

const WhyOnlyPromptBlock = () => {
  // Animation variants for the main section entrance
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Bullet point items
  const listItems = [
    "Stop overpaying for AI chats; costs should match your usage.",
    "No monthly fees. Just pay for what you use—down to the token.",
    "Pricing is transparent. See exactly where every cent goes.",
  ];

  return (
    // Section container with animation trigger
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% is in view
      variants={sectionVariants}
      className="py-16 sm:py-20 md:py-24 bg-background border-b border-border/60" // Theme-aware background and border
    >
      <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          Why OnlyPrompt?
        </h2>
        {/* Bullet point list */}
        <ul className="space-y-4 text-left max-w-xl mx-auto">
          {listItems.map((item, index) => (
            // Animate each list item individually
            <motion.li
              key={item}
              custom={index}
              initial={{ opacity: 0, x: -20 }} // Start off-screen left
              whileInView={{ opacity: 1, x: 0 }} // Animate into place
              viewport={{ once: true, amount: 0.5 }} // Trigger when 50% is in view
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }} // Staggered delay
              className="flex items-start space-x-3"
            >
              <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-primary" /> {/* Use theme primary color for icon */}
              <span className="text-base sm:text-lg text-muted-foreground"> {/* Use theme muted color for text */}
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default WhyOnlyPromptBlock; 