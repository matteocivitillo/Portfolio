import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  /** If true, waits for a parent signal instead of using IntersectionObserver */
  show?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 800,
  direction = 'up',
  show,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If controlled by parent via `show` prop
    if (show !== undefined) {
      if (show) {
        const timeout = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timeout);
      }
      return;
    }

    // Autonomous mode via IntersectionObserver
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timeout = setTimeout(() => setIsVisible(true), delay);
          // Store timeout for cleanup
          (ref.current as any)?._revealTimeout && clearTimeout((ref.current as any)._revealTimeout);
          if (ref.current) (ref.current as any)._revealTimeout = timeout;
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, show]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(40px)';
      case 'left': return 'translateX(-40px)';
      case 'right': return 'translateX(40px)';
      case 'none': return 'none';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getInitialTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1), transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
      }}
    >
      {children}
    </div>
  );
}
