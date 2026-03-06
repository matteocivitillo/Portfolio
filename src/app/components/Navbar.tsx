import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';

export function Navbar() {
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();

  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { id: 'home', name: t('nav.home'), to: '/' },
    { id: 'about', name: t('nav.about'), to: '/about' },
    { id: 'projects', name: t('nav.projects'), to: '/projects' },
  ];

  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '') {
      setActiveTab('home');
    } else if (path.includes('projects') || path.includes('progetti')) {
      setActiveTab('projects');
    } else if (path.includes('about')) {
      setActiveTab('about');
    } else {
      setActiveTab('');
    }
  }, [location.pathname]);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'it' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between md:justify-center h-16 pointer-events-auto">
          {/* Floating Pill Navigation (always expanded) */}
          <div className="flex items-center p-1 sm:p-1.5 rounded-full bg-white/70 dark:bg-[#1a1a1a]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-sm transition-colors duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-2.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
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
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                    <motion.div
                      layoutId="nav-active-indicator"
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-[3px] rounded-full bg-blue-600 dark:bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  </>
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 md:absolute md:right-0">
            <div className="flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-full bg-white/70 dark:bg-[#1a1a1a]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-sm transition-colors duration-300">
              <button
                onClick={toggleLanguage}
                className="px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-all cursor-pointer"
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
          </div>
        </div>
      </div>
    </nav>
  );
}

