import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Alex Rivera",
      handle: "@RiveraAlex",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Honestly wasn't sure what to expect, but this has significantly sped up my research workflow. Context awareness is way better than other tools I've tried.",
    // Removed href
  },
  {
    author: {
      name: "Jordan Lee",
      handle: "@jlee_dev",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face"
    },
    text: "As a solo developer, having reliable AI assistance is crucial. The custom assistant feature is a game-changer for my specific coding needs.",
    // Removed href
  },
  {
    author: {
      name: "Morgan Adebayo",
      handle: "@morganadebayo",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Impressed by the privacy focus. Needed a tool I could trust with sensitive project data, and this fits the bill perfectly.",
    // Removed href
  },
   {
    author: {
      name: "Casey Smith",
      handle: "@casey_smith1",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
    },
    text: "The cost model is much fairer than subscriptions, especially since my usage varies. Paying for actual tokens used makes way more sense.",
    // Removed href
  },
   {
    author: {
      name: "Samira Khan",
      handle: "@sammykhan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "It just... works. Integrates smoothly, understands complex prompts, and doesn't hallucinate nearly as much as others. Solid tool.",
    // Removed href
  }
]

export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="COMMUNITY FEEDBACK"
      description="Read what they're saying about OnlyPrompt:"
      testimonials={testimonials}
    />
  )
} 