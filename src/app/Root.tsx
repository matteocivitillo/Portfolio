import { Outlet } from 'react-router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundBeamsWithCollision } from './components/ui/background-beams-with-collision';

export function Root() {
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
