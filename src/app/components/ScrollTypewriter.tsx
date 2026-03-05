import { useEffect, useRef, useState } from 'react';

interface ScrollTypewriterProps {
  text: string;
  className?: string;
  speed?: number; // default 80ms per char
  delay?: number;
  highlightText?: string;
  highlightClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function ScrollTypewriter({
  text,
  className = '',
  speed = 80,
  delay = 0,
  highlightText,
  highlightClassName = '',
  as: Tag = 'h2',
}: ScrollTypewriterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  // Trigger when element enters viewport
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.7 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Typewriter effect
  useEffect(() => {
    if (!hasStarted) return;

    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const startTyping = () => {
      const typeNext = () => {
        if (cancelled) return;
        charIndex++;
        setDisplayed(text.slice(0, charIndex));
        if (charIndex < text.length) {
          timeoutId = setTimeout(typeNext, speed);
        }
      };
      timeoutId = setTimeout(typeNext, speed);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => { cancelled = true; clearTimeout(timeoutId); };
  }, [hasStarted, text, speed, delay]);

  const renderText = () => {
    if (!highlightText) {
      return displayed;
    }

    const hlStart = text.indexOf(highlightText);
    if (hlStart === -1) return displayed;

    const beforeHighlight = text.slice(0, hlStart);
    const afterHighlightStart = hlStart + highlightText.length;

    if (displayed.length <= hlStart) {
      // Haven't reached highlight yet
      return displayed;
    }

    const highlightTyped = displayed.slice(hlStart, Math.min(displayed.length, afterHighlightStart));
    const afterTyped = displayed.length > afterHighlightStart ? displayed.slice(afterHighlightStart) : '';

    return (
      <>
        {beforeHighlight}
        <span className={highlightClassName}>{highlightTyped}</span>
        {afterTyped}
      </>
    );
  };

  return (
    <div ref={ref}>
      <Tag className={className}>
        {renderText()}
        {hasStarted && displayed.length < text.length && (
          <span className="animate-pulse text-blue-600 dark:text-blue-400 font-light">|</span>
        )}
      </Tag>
    </div>
  );
}
