import { Code2, Palette, Globe, Layers, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ScrollTypewriter } from './ScrollTypewriter';
import { ScrollReveal } from './ScrollReveal';

export function Skills() {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.categories.languages'),
      icon: <Code2 size={24} />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/40',
      skills: ['C/C++', 'C#', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Dart', 'SQL', 'VHDL', 'LaTeX'],
    },
    {
      title: t('skills.categories.frameworks'),
      icon: <Layers size={24} />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/40',
      skills: ['React', 'Node.js', 'Flutter', 'Svelte', 'Vite', 'Supabase'],
    },
    {
      title: t('skills.categories.tools'),
      icon: <Package size={24} />,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/40',
      skills: ['JetBrains (CLion, IntelliJ)', 'VS Code', 'Unity', 'Figma', 'Docker', 'MySQL', 'Git & GitHub', 'Vercel', 'Colab'],
    },
    {
      title: t('skills.categories.design'),
      icon: <Palette size={24} />,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-100 dark:bg-pink-900/40',
      skills: ['Figma', 'User Research', 'User Testing', 'UX/UI Design', 'Wireframing', 'Prototyping'],
    },
    {
      title: t('skills.categories.soft'),
      icon: <Globe size={24} />,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
      skills: [t('skills.soft.english'), t('skills.soft.french'), 'Strategy and Marketing', 'Document Intelligence (genAI)'],
    },
  ];

  const skillsTitle = t('skills.title') + t('skills.highlight');

  return (
    <div className="py-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollTypewriter
            text={skillsTitle}
            highlightText={t('skills.highlight')}
            highlightClassName="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-foreground"
            speed={50}
          />
        </div>

        {/* Premium Bento Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {skillCategories.map((category, index) => {
            const spanClass = index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            return (
              <ScrollReveal key={index} delay={index * 150} direction="up" className={`h-full ${spanClass}`}>
                <div className="group relative h-full p-8 rounded-[2rem] border border-gray-200/50 dark:border-white/5 bg-white/40 dark:bg-card/40 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-card/60 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                  
                  {/* Subtle hover glow background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 ${category.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                        {category.icon}
                      </div>
                      <h3 className="text-2xl font-medium text-foreground tracking-tight">{category.title}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-4 py-2 bg-white/60 dark:bg-muted/80 backdrop-blur-md border border-gray-200/50 dark:border-border/50 text-gray-800 dark:text-foreground rounded-xl text-sm font-medium hover:bg-white dark:hover:bg-muted hover:shadow-md hover:scale-105 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
