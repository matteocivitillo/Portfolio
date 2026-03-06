import { useTranslation } from 'react-i18next';
import { ScrollTypewriter } from './ScrollTypewriter';
import { ScrollReveal } from './ScrollReveal';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const categoriesData = [
  {
    id: 'ricerca',
    category: 'Research',
    src: 'https://images.unsplash.com/photo-1762427354251-f008b64dbc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MTU4MTgwOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'full-stack',
    category: 'Full-Stack Development',
    src: 'https://images.unsplash.com/photo-1707758967860-19106a5e9ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwc3RhY2slMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzcxNTg1ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'mobile',
    category: 'Mobile Development',
    src: 'https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHBob25lfGVufDF8fHx8MTc3MTQ4ODk2OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'xr',
    category: 'XR Projects',
    src: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGhlYWRzZXR8ZW58MXx8fHwxNzcxNTc5NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'consultancy',
    category: 'Consultancy',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXN8ZW58MHx8fHwxNjk5OTk5OTk5&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'ux-oriented',
    category: 'UX-Oriented',
    src: 'https://images.unsplash.com/photo-1698434156098-68e834638679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwZXhwZXJpZW5jZSUyMGRlc2lnbiUyMHdpcmVmcmFtZXxlbnwxfHx8fDE3NzE0ODEyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function Projects() {
  const { t } = useTranslation();
  const projectsTitle = t('projects.title') + t('projects.highlight');

  return (
    /* Modificato: aggiunto relative, overflow-hidden e uno sfondo neutro */
    <div className="relative py-16 lg:py-32 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      
      {/* BACKGROUND DECORATIONS: Essenziali per l'effetto vetro */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-white shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <span className="text-xs tracking-[0.2em] font-medium text-gray-500 dark:text-gray-400 uppercase">
              {t('nav.projects')}
            </span>
          </div>
          <ScrollTypewriter
            text={projectsTitle}
            highlightText={t('projects.highlight')}
            highlightClassName="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-foreground"
            speed={50}
          />
        </div>

        {/* Vertical Card List */}
        <div className="w-full flex flex-col gap-12 sm:gap-16">
          {categoriesData.map((cat, index) => (
            <ScrollReveal key={cat.id} delay={index * 150} direction="up">
              <Link to={`/progetti/${cat.id}`} className="block group">
                {/* MODIFICHE EFFETTUATE QUI:
                   - bg-white/25 (come richiesto)
                   - backdrop-blur-3xl (sfocatura molto più intensa per il look desiderato)
                   - shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] (ombra come richiesto)
                   - border-white/20 (bordo sottile come richiesto)
                */}
                <div className="relative overflow-hidden rounded-[32px] 
                                bg-white/25 dark:bg-white/5 
                                backdrop-blur-3xl 
                                p-6 sm:p-10 
                                border border-white/20 dark:border-white/10 
                                shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
                                transition-all duration-500 
                                hover:bg-white/35 dark:hover:bg-white/10">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-8 sm:mb-12 relative z-10 w-full text-left">
                    <div className="flex flex-col max-w-2xl px-2">
                       <h3 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                         {t(`carousel.${cat.id}`)}
                       </h3>
                       <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 font-medium">
                         {t(`categories.${cat.id}.description`)}
                       </p>
                    </div>
                    <div className="p-3 rounded-full bg-slate-900/5 dark:bg-white/5 text-slate-900 dark:text-white transition-transform group-hover:translate-x-1 hidden sm:flex">
                         <ArrowRight size={24} />
                    </div>
                  </div>

                  {/* Card Image Wrapper */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 mx-auto">
                    <img
                      src={cat.src}
                      alt={cat.category}
                      className="object-cover object-center w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
