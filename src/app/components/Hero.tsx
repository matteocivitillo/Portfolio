import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

export function Hero() {
  const { t } = useTranslation();

  // Phases:
  // 0 = typing title (centered)
  // 1 = typing subtitle (centered)
  // 2 = reveal buttons and socials
  const [phase, setPhase] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedSubtitle, setDisplayedSubtitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [revealStep, setRevealStep] = useState(0);

  const fullTitle = `${t('hero.greeting')} Matteo Civitillo`;
  const fullSubtitle = t('hero.role');
  const greetingPart = t('hero.greeting') + ' ';

  // Typewriter engine
  const typeText = useCallback((
    text: string,
    setter: (val: string) => void,
    onComplete: () => void,
    speed: number,
    pauseAfter?: string
  ) => {
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const typeNextChar = () => {
      if (cancelled) return;
      charIndex++;
      setter(text.slice(0, charIndex));
      if (charIndex >= text.length) { onComplete(); return; }
      if (pauseAfter && text.slice(0, charIndex) === pauseAfter) {
        timeoutId = setTimeout(typeNextChar, 1500);
      } else {
        timeoutId = setTimeout(typeNextChar, speed);
      }
    };
    timeoutId = setTimeout(typeNextChar, speed);
    return () => { cancelled = true; clearTimeout(timeoutId); };
  }, []);

  // Phase 0: Type title
  useEffect(() => {
    if (phase !== 0) return;
    const commaIndex = fullTitle.indexOf(',');
    const pauseAfter = commaIndex !== -1 ? fullTitle.slice(0, commaIndex + 1) : undefined;
    return typeText(fullTitle, setDisplayedTitle, () => {
      setTimeout(() => setPhase(1), 2000);
    }, 120, pauseAfter);
  }, [phase, fullTitle, typeText]);

  // Phase 1: Type subtitle
  useEffect(() => {
    if (phase !== 1) return;
    return typeText(fullSubtitle, setDisplayedSubtitle, () => {
      setShowCursor(false);
      setTimeout(() => setPhase(2), 600);
    }, 40);
  }, [phase, fullSubtitle, typeText]);

  // Phase 2: Sequential reveal
  useEffect(() => {
    if (phase !== 2) return;
    const delays = [0, 700, 1400];
    const timeouts = delays.map((delay, i) =>
      setTimeout(() => setRevealStep(i + 1), delay)
    );
    return () => timeouts.forEach(clearTimeout);
  }, [phase]);

  const renderTitle = (text: string) => {
    if (text.length <= greetingPart.length) {
      return <span className="text-foreground">{text}</span>;
    }
    const nameTyped = text.slice(greetingPart.length);
    return (
      <>
        <span className="text-foreground">{greetingPart}</span>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          {nameTyped}
        </span>
      </>
    );
  };

  const Cursor = () => (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      className="text-blue-600 dark:text-blue-400 font-light"
    >|</motion.span>
  );

  return (
    <section id="home">
      <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 relative z-10 w-full flex items-center justify-center">

        {/* Everything centered — single column, no photo */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto gap-6">

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight">
            {phase >= 2 ? renderTitle(fullTitle) : renderTitle(displayedTitle)}
            {phase === 0 && showCursor && <Cursor />}
          </h1>

          {/* Subtitle */}
          {phase >= 1 && (
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl">
              {phase >= 2 ? fullSubtitle : displayedSubtitle}
              {phase === 1 && showCursor && <Cursor />}
            </p>
          )}

          {/* CTA Buttons */}
          {phase >= 2 && revealStep >= 1 && (
            <motion.div
              className="flex flex-wrap gap-4 justify-center pt-4"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link to="/about">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                  {t('hero.contactBtn')}
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="dark:border-border dark:text-foreground dark:hover:bg-muted group">
                  {t('hero.projectsBtn')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Social Links */}
          {phase >= 2 && revealStep >= 2 && (
            <motion.div
              className="flex gap-4 pt-2"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <a href="https://github.com/matteocivitillo" target="_blank" rel="noreferrer"
                className="p-3 rounded-full bg-muted dark:hover:bg-primary dark:hover:text-primary-foreground hover:bg-primary hover:text-primary-foreground text-foreground transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/matteo-civitillo-5473bb316/" target="_blank" rel="noreferrer"
                className="p-3 rounded-full bg-muted dark:hover:bg-primary dark:hover:text-primary-foreground hover:bg-primary hover:text-primary-foreground text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:matteo.civitillo.work@gmail.com"
                className="p-3 rounded-full bg-muted dark:hover:bg-primary dark:hover:text-primary-foreground hover:bg-primary hover:text-primary-foreground text-foreground transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
