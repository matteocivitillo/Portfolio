import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';
import { ScrollSection } from '../components/ScrollSection';

export function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="transition-colors">
      <Hero />
      <ScrollSection id="about">
        <About />
      </ScrollSection>
      <ScrollSection id="projects">
        <Projects />
      </ScrollSection>
      <ScrollSection id="skills">
        <Skills />
      </ScrollSection>
      <ScrollSection id="contact">
        <Contact />
      </ScrollSection>
    </div>
  );
}
