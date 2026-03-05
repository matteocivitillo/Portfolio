import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [recentlyClicked, setRecentlyClicked] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { id: 'home', name: t('nav.home'), href: '#home' },
    { id: 'about', name: t('nav.about'), href: '#about' },
    { id: 'projects', name: t('nav.projects'), href: '#projects' },
    { id: 'skills', name: t('nav.skills'), href: '#skills' },
    { id: 'contact', name: t('nav.contact'), href: '#contact' },
  ];

  // Track active section based on scroll
  useEffect(() => {
    if (!isHomePage) return;
    
    const handleScroll = () => {
      // Don't update if user just clicked - wait for scroll to finish
      if (recentlyClicked) return;
      
      const sections = navLinks.map(link => link.id);
      let current = 'home';
      let closestDistance = Infinity;
      
      // Find which section is closest to the top of the viewport
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          
          // Calculate the center of the viewport (approximate scroll position)
          // We want to find the section whose top is closest to the middle of what's visible
          const distanceFromTop = Math.abs(elementTop);
          
          // Prefer sections that are in the upper half of the viewport
          if (elementTop < window.innerHeight && elementTop > -rect.height) {
            if (distanceFromTop < closestDistance) {
              closestDistance = distanceFromTop;
              current = sectionId;
            }
          }
        }
      }
      setActiveTab(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks, isHomePage, recentlyClicked]);

  const handleNavClick = (href: string, id: string) => {
    setIsOpen(false);
    setActiveTab(id);
    setRecentlyClicked(id);
    
    // Reset the recently clicked state after scroll animation completes
    setTimeout(() => setRecentlyClicked(null), 1000);
    
    // If we're not on home page and clicking a hash link, navigate to home with the hash
    if (!isHomePage && href.startsWith('#')) {
      // Navigate to home page with the hash
      window.location.href = window.location.origin + window.location.pathname + href;
    } else if (href.startsWith('#')) {
      // Scroll to element with a small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'it' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-16 pointer-events-auto">
          
          {/* Centered Floating Pill Navigation */}
          <div className="hidden md:flex items-center p-1.5 rounded-full bg-white/70 dark:bg-[#1a1a1a]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-sm transition-colors duration-300">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavClick(link.href, link.id)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeTab === link.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {activeTab === link.id && (
                  <>
                    <motion.div
                      layoutId="nav-active-bg"
                      className="absolute inset-0 bg-gray-100 dark:bg-[#2a2a2a] rounded-full z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                    {/* Top glow indicator mimicking reference image */}
                    <motion.div
                      layoutId="nav-active-indicator"
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-blue-600 dark:bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  </>
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Right side controls (Language & Theme) */}
          <div className="absolute right-0 flex items-center gap-2">
            
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-2 p-1.5 rounded-full bg-white/70 dark:bg-[#1a1a1a]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-sm transition-colors duration-300">
               <button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all cursor-pointer"
                  aria-label="Toggle Language"
                >
                  {i18n.language === 'en' ? 'IT' : 'EN'}
               </button>

               <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all cursor-pointer"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
               </button>
            </div>

            {/* Mobile menu button and controls */}
            <div className="flex md:hidden items-center gap-2 p-1.5 rounded-full bg-white/70 dark:bg-[#1a1a1a]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-sm">
              <button
                 onClick={toggleLanguage}
                 className="px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-full transition-all cursor-pointer"
               >
                 {i18n.language === 'en' ? 'IT' : 'EN'}
              </button>
              <button
                 onClick={toggleTheme}
                 className="p-1.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all cursor-pointer"
               >
                 {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 transition-all cursor-pointer"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-2 p-2 rounded-2xl bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-lg pointer-events-auto transition-colors duration-300"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === link.id
                      ? 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]/50'
                  }`}
                  onClick={() => handleNavClick(link.href, link.id)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}