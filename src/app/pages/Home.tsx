import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';

export function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Remove the '#' to get the element ID
      const elementId = hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        // use setTimeout to ensure it scrolls after the layout paints
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
