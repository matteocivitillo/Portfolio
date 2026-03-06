import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';
import { ScrollSection } from '../components/ScrollSection';

export function AboutPage() {
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
    <div className="transition-colors pt-16">
      <ScrollSection id="about">
        <About />
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
