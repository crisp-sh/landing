"use client"; // May not be strictly needed, but safe for potential interactions

import Image from "next/image";
import { motion } from "framer-motion";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import type { TestimonialAuthor } from "@/components/ui/testimonial-card";
import { CollegeLogoSlider } from "@/components/college-logo-slider";

// Assume the screenshot is saved here, adjust path as necessary
const SCREENSHOT_PATH = "/onlyprompt-showcase-1.png";

// Define testimonial data (copied from demo)
const testimonials: Array<{
  author: TestimonialAuthor;
  text: string;
}> = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmaai",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text:
      "Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.",
  },
  {
    author: {
      name: "David Park",
      handle: "@davidtech",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text:
      "The API integration is flawless. We've reduced our development time by 60% since implementing this solution.",
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiaml",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text:
      "Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive.",
  },
];

export default function OnlyPromptPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1 container px-4 md:px-6">
        {/* Page Header - Updated Structure */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} // Animate from top
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-20 md:pt-28 mb-16 md:mb-20" // Adjusted padding/margin
        >
          {/* Flex container for Logo | Text */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* Logo */}
            <Image 
              src="/onlyprompt-logo-colored-dark.svg" 
              alt="OnlyPrompt Logo"
              width={80} // Adjust size as needed for header
              height={80} // Adjust size as needed for header
              className="h-16 w-auto md:h-20" // Responsive height
              priority 
            />
            {/* Divider */}
            <div className="h-16 md:h-20 w-px bg-white/30" />
            {/* Text */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-manifold uppercase text-white">
              ONLYPROMPT
            </h1>
           </div>
        </motion.div>

        {/* College Logo Slider - Add reverse prop */}
        <CollegeLogoSlider className="mb-12 md:mb-16" reverse={true} />

        {/* Content Area */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-16 md:mt-20"> {/* Add margin top */}
          {/* Screenshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 shadow-lg shadow-white/5"
          >
            <Image
              src="/onlyprompt-showcase-1.png"
              alt="OnlyPrompt Showcase Screenshot"
              layout="fill"
              objectFit="cover"
            />

<Image
              src="/onlyprompt-showcase-2.png"
              alt="OnlyPrompt Showcase Screenshot"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-medium text-white/90 font-manifold uppercase">
              Core Features
            </h2>
            <ul className="space-y-4 text-white/80 font-light list-none pl-0">
              {/* Replace with actual features */} 
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1">■</span>
                <div>
                  <h3 className="font-medium text-white/95">Intelligent Context Retention</h3>
                  <p className="text-sm text-white/60">Maintains conversation history and user context across sessions for seamless interaction.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1">■</span>
                <div>
                  <h3 className="font-medium text-white/95">Proactive Task Assistance</h3>
                  <p className="text-sm text-white/60">Anticipates user needs and offers relevant actions or information based on ongoing dialogue.</p>
                </div>
              </li>
               <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1">■</span>
                 <div>
                  <h3 className="font-medium text-white/95">Adaptive Learning Core</h3>
                  <p className="text-sm text-white/60">Continuously refines its understanding and responses based on user interactions and feedback.</p>
                </div>
              </li>
               <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1">■</span>
                 <div>
                  <h3 className="font-medium text-white/95">Secure & Private Architecture</h3>
                  <p className="text-sm text-white/60">Ensures user data confidentiality and operational integrity through robust security protocols.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection
          title="" 
          description=""
          testimonials={testimonials}
        />
      </main>
    </div>
  );
} 