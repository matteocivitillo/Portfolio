import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundBeamsWithCollision } from './components/ui/background-beams-with-collision';

export function Root() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash-based scroll navigation
    const hash = location.hash.slice(1); // Remove the '#' character
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-transparent text-foreground transition-colors duration-300">
      <BackgroundBeamsWithCollision />
      <Navbar />
      <main className="relative z-10 w-full bg-transparent">
        <Outlet />
      </main>
      <Footer className="relative z-10 bg-transparent" />
    </div>
  );
}
