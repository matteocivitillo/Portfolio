import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Full-screen section that fades in when entering and fades out when leaving the viewport.
 * Uses scroll position to calculate opacity based on how centered the section is.
 */
export function ScrollSection({ children, id, className = '' }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Calculate how much of the section is in view
      // When fully centered: opacity = 1
      // When sliding out top or bottom: opacity fades toward 0

      // Section center relative to viewport
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;

      // Distance from center (0 = perfectly centered)
      const distFromCenter = Math.abs(sectionCenter - viewportCenter);

      // Normalize: 0 distance = fully visible, > section height = faded
      const fadeZone = rect.height * 0.6; // Start fading when 60% off-center
      const normalizedDist = Math.max(0, distFromCenter - fadeZone) / (rect.height * 0.4);

      const newOpacity = Math.max(0, Math.min(1, 1 - normalizedDist));
      setOpacity(newOpacity);
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`min-h-[80vh] flex items-center ${className}`}
      style={{
        opacity,
        transition: 'opacity 0.1s ease-out',
      }}
    >
      <div className="w-full">
        {children}
      </div>
    </section>
  );
}
