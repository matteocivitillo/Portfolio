import { Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com/matteocivitillo', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/matteo-civitillo/', label: 'LinkedIn' },
    { icon: <Mail size={20} />, href: 'mailto:matteo.civitillo.work@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: t('nav.home'), href: '/#home' },
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.projects'), href: '/#projects' },
    { name: t('nav.skills'), href: '/#skills' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Matteo Civitillo</h3>
            <p className="text-gray-400">
              {t('footer.brandDesc')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="p-2 bg-gray-800 dark:bg-gray-900 rounded-full hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4 font-semibold">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg mb-4 font-semibold">{t('footer.newsletter')}</h4>
            <p className="text-gray-400 mb-4">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                className="flex-1 px-4 py-2 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-800 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 dark:border-gray-900 text-center text-gray-400">
          <p>© {currentYear} Matteo Civitillo. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
