import { cn } from "@/lib/utils";
import {
  TestimonialCard,
  type TestimonialAuthor,
} from "@/components/ui/testimonial-card";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const duplicatedTestimonials = [...testimonials, ...testimonials].map(
    (testimonial, i) => ({
      ...testimonial,
      uniqueKey: `${
        testimonial.author.handle ||
        testimonial.author.name?.replace(/\s+/g, "-") ||
        "author"
      }-${i}`,
    })
  );

  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-16 md:py-20",
        className
      )}
    >
      <div className="container mx-auto flex flex-col items-center gap-8 sm:gap-12 md:gap-16 text-center">
        <div className="flex flex-col items-center gap-4 sm:gap-6 px-4">
          <h3 className="mb-10 sm:mb-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 uppercase">
            {title}
          </h3>
          <p className="text-sm sm:text-base md:text-lg max-w-[600px] font-medium text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] md:[--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:60s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {duplicatedTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={`marquee-item-${testimonial.uniqueKey}`}
                  author={testimonial.author}
                  text={testimonial.text}
                  href={testimonial.href}
                />
              ))}
            </div>
            <div
              aria-hidden="true"
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
            >
              {duplicatedTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={`marquee-item-clone-${testimonial.uniqueKey}`}
                  author={testimonial.author}
                  text={testimonial.text}
                  href={testimonial.href}
                />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent sm:w-1/4" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent sm:w-1/4" />
        </div>
      </div>
    </section>
  );
}
