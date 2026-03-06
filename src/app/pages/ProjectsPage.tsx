import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Projects } from '../components/Projects';
import { ScrollSection } from '../components/ScrollSection';

export function ProjectsPage() {
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
      <ScrollSection id="projects">
        <Projects />
      </ScrollSection>
    </div>
  );
}
