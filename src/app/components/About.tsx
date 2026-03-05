import { Award, Code, Lightbulb, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollTypewriter } from './ScrollTypewriter';
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

  const aboutTitle = t('about.title') + t('about.highlight');

  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Centered typewriter title */}
        <div className="text-center mb-20">
          <ScrollTypewriter
            text={aboutTitle}
            highlightText={t('about.highlight')}
            highlightClassName="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-foreground"
            speed={50}
          />
        </div>

        {/* Stats (left) + Images (right) – 50/50 split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Stats grid – left half */}
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 gap-12">
              {stats.map((stat, index) => (
                <ScrollReveal key={index} delay={300 + index * 200}>
                  <div className="space-y-3">
                    <div className="text-blue-600 dark:text-blue-400">{stat.icon}</div>
                    <div className="text-5xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-base text-muted-foreground">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* 2 Images – right half, taller with original proportions */}
          <div className="grid grid-cols-2 gap-6">
            <ScrollReveal delay={400} direction="right">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={laureaImg}
                  alt="Laurea"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={600} direction="right">
              <div className="rounded-2xl overflow-hidden shadow-lg mt-10">
                <img
                  src={xrImg}
                  alt="XR Experience"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
}
