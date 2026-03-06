import { Award, Code, Lightbulb, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from './ScrollReveal';
import laureaImg from '../../images/laurea.jpeg';
import xrImg from '../../images/XR.jpeg';

export function About() {
  const { t } = useTranslation();

  const stats = [
    { icon: <Code size={24} />, value: '15+', label: t('about.stats.projects') },
    { icon: <Users size={24} />, value: '3', label: t('about.stats.universities') },
    { icon: <Award size={24} />, value: '2', label: t('about.stats.paper') },
    { icon: <Lightbulb size={24} />, value: '∞', label: t('about.stats.curiosity') },
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <ScrollReveal delay={100} direction="up" className="w-full flex flex-col items-center text-center mb-32">
          {/* Small Badge */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-white shadow-[0_0_10px_rgba(37,99,235,0.5)] dark:shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <span className="text-xs tracking-[0.2em] font-medium text-gray-500 dark:text-gray-400 uppercase">
              About Me
            </span>
          </div>
          
          {/* Glowing Hero Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight max-w-5xl text-gray-900 dark:text-white">
            {t('about.title')}
            <span className="font-serif italic bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] pr-2">
              {t('about.highlight')}
            </span>
          </h1>
        </ScrollReveal>

        {/* Masonry Layout Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-32">
          
          {/* Block 1: Left Image */}
          <ScrollReveal delay={200} direction="up">
            <div className="w-full rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-white/5 aspect-[4/5] shadow-xl dark:shadow-2xl relative group">
              <img 
                src={laureaImg}
                alt="Matteo Laurea"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </ScrollReveal>

          {/* Block 2: Right Text (aligned to center/bottom of left image visually on desktop) */}
          <ScrollReveal delay={300} direction="up" className="flex flex-col justify-center md:pt-32">
             <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
               My background and journey.
             </h2>
             <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
               <p>{t('about.description1')}</p>
               <p>{t('about.description2')}</p>
             </div>
          </ScrollReveal>

          {/* Block 3: Left Text (below image 1) */}
          <ScrollReveal delay={200} direction="up" className="flex flex-col justify-center order-4 md:order-3 md:pt-32">
             <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
               Bridging logic and design.
             </h2>
             <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
               <p>
                 I believe that the best digital experiences sit at the intersection of robust engineering and human-centered design. 
                 By understanding how people think, I aim to create intuitive interfaces that solve real problems.
               </p>
               <p>
                 When I'm not coding or designing, I'm usually exploring new technologies, refining my portfolio, or diving deep into user experience research.
               </p>
             </div>
             
             {/* Stats integration within the text block area for flow */}
             <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
                {stats.slice(0, 2).map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-3xl font-medium text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
             </div>
          </ScrollReveal>

          {/* Block 4: Right Image (staggered below first text) */}
          <ScrollReveal delay={300} direction="up" className="order-3 md:order-4">
            <div className="w-full rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-white/5 aspect-[3/4] md:aspect-[4/5] shadow-xl dark:shadow-2xl relative group">
              <img 
                src={xrImg}
                alt="Matteo XR"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </ScrollReveal>

        </div>
        
        {/* Decorative separator before continuing to Skills and Contact component (rendered in AboutPage) */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent my-32" />

      </div>
    </div>
  );
}
