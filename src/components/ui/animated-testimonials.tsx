"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  fixedContent,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  fixedContent?: Pick<Testimonial, "quote" | "name" | "designation">;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;
  const content = fixedContent ?? testimonials[active];

  return (
    <div className="w-full py-6">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:items-center">
        <div>
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-visible bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-white/5 shadow-xl dark:shadow-2xl">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={content.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-[2rem] object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-center md:pl-8 lg:pl-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">{content.name}</h3>
            <motion.p className="mt-6 text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              {content.quote.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </div>

          <div className="flex gap-4 pt-8">
            <button
              onClick={handlePrev}
              className="group/button flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-[#1a1a1a]/80"
              aria-label="Previous image"
            >
              <IconArrowLeft className="h-5 w-5 text-gray-700 transition-transform duration-300 group-hover/button:rotate-12 dark:text-gray-300" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-[#1a1a1a]/80"
              aria-label="Next image"
            >
              <IconArrowRight className="h-5 w-5 text-gray-700 transition-transform duration-300 group-hover/button:-rotate-12 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};






