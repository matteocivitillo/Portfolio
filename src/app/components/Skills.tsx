import { Code2, Palette, Globe, Layers, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Skills() {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: 'Linguaggi di Programmazione',
      icon: <Code2 size={24} />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/40',
      skills: ['C/C++', 'C#', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Dart', 'SQL', 'VHDL', 'LaTeX'],
    },
    {
      title: 'Framework & Librerie',
      icon: <Layers size={24} />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/40',
      skills: ['React', 'Node.js', 'Flutter', 'Svelte', 'Vite', 'Supabase'],
    },
    {
      title: 'IDE & Strumenti (Software)',
      icon: <Package size={24} />,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/40',
      skills: ['JetBrains (CLion, IntelliJ)', 'VS Code', 'Unity', 'Figma', 'Docker', 'MySQL', 'Git & GitHub', 'Vercel', 'Colab'],
    },
    {
      title: 'Design & Prototipazione',
      icon: <Palette size={24} />,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-100 dark:bg-pink-900/40',
      skills: ['Figma', 'User Research', 'User Testing', 'UX/UI Design', 'Wireframing', 'Prototyping'],
    },
    {
      title: 'Soft Skills & Certificazioni',
      icon: <Globe size={24} />,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
      skills: ['TOEIC C1 (Inglese)', 'Francese Base', 'Strategy and Marketing', 'Document Intelligence (genAI)'],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm mb-4">
            {t('nav.skills')}
          </div>
          <h2 className="text-4xl sm:text-5xl text-gray-900 dark:text-white mb-4">
            {t('skills.title')}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {t('skills.highlight')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-purple-900/20 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg ${category.bgColor} ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl text-gray-900 dark:text-white">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}