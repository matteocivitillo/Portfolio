import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { cn } from "@/app/components/ui/utils";
import { motion } from "motion/react";
import { Link } from "react-router";

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

export type CardType = {
  src: string;
  title: string;
  category: string;
  href: string;
};

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeftFn = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRightFn = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX);
    setScrollStart(carouselRef.current?.scrollLeft ?? 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const delta = e.pageX - startX;
    if (Math.abs(delta) > 5) setHasDragged(true);
    carouselRef.current.scrollLeft = scrollStart - delta;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.touches[0].pageX);
    setScrollStart(carouselRef.current?.scrollLeft ?? 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const delta = e.touches[0].pageX - startX;
    if (Math.abs(delta) > 5) setHasDragged(true);
    carouselRef.current.scrollLeft = scrollStart - delta;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "flex w-full overflow-x-scroll overscroll-x-auto py-10 [scrollbar-width:none] md:py-20",
          isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth"
        )}
        ref={carouselRef}
        onScroll={checkScrollability}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={cn(
            "flex flex-row justify-start gap-4 pl-4",
            "mx-auto max-w-7xl",
          )}
        >
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                },
              }}
              key={"card" + index}
              className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
            >
              {/* Pass hasDragged so card can prevent click after drag */}
              {React.cloneElement(item, { hasDragged } as any)}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mr-10 flex justify-end gap-2">
        <button
          className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
          onClick={scrollLeftFn}
          disabled={!canScrollLeft}
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
        <button
          className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
          onClick={scrollRightFn}
          disabled={!canScrollRight}
        >
          <IconArrowNarrowRight className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export const Card = ({
  card,
  hasDragged,
}: {
  card: CardType;
  hasDragged?: boolean;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
    }
  };

  return (
    <Link
      to={card.href}
      onClick={handleClick}
      className="block"
      draggable={false}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900",
          "shadow-lg hover:shadow-2xl transition-shadow duration-300 select-none"
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <p className="text-left font-sans text-sm font-medium text-white md:text-base">
            {card.category}
          </p>
          <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
            {card.title}
          </p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 object-cover"
        />
      </motion.div>
    </Link>
  );
};

const BlurImage = ({
  src,
  className,
  alt,
}: {
  src: string;
  className?: string;
  alt: string;
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      loading="lazy"
      decoding="async"
      draggable={false}
      alt={alt}
    />
  );
};
