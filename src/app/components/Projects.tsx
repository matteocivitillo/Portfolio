import { Search, Code, Smartphone, Glasses, Briefcase, Palette, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export function Projects() {
  const { t } = useTranslation();

  const categories = [
    {
      id: 'ricerca',
      title: 'Ricerca',
      description: 'Progetti di ricerca e sviluppo che esplorano nuove tecnologie e metodologie',
      icon: <Search size={32} />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/40',
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1762427354251-f008b64dbc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MTU4MTgwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'full-stack',
      title: 'Full-Stack Development',
      description: 'Applicazioni web complete con frontend moderno e backend robusto',
      icon: <Code size={32} />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/40',
      gradient: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1707758967860-19106a5e9ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwc3RhY2slMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzcxNTg1ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      description: 'Applicazioni mobile native e cross-platform per iOS e Android',
      icon: <Smartphone size={32} />,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/40',
      gradient: 'from-green-500 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHBob25lfGVufDF8fHx8MTc3MTQ4ODk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'xr',
      title: 'XR Projects',
      description: 'Progetti di realtà virtuale, aumentata e mista',
      icon: <Glasses size={32} />,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/40',
      gradient: 'from-orange-500 to-red-500',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGhlYWRzZXR8ZW58MXx8fHwxNzcxNTc5NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'consultancy',
      title: 'Consultancy',
      description: 'Progetti di consulenza strategica e implementazione tecnologica',
      icon: <Briefcase size={32} />,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/40',
      gradient: 'from-indigo-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1765020553734-2c050ddb9494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRpbmclMjBtZWV0aW5nfGVufDF8fHx8MTc3MTQ4Nzg2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 'ux-oriented',
      title: 'UX-Oriented',
      description: 'Progetti focalizzati sull\'esperienza utente e design thinking',
      icon: <Palette size={32} />,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-100 dark:bg-pink-900/40',
      gradient: 'from-pink-500 to-rose-500',
      image: 'https://images.unsplash.com/photo-1698434156098-68e834638679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwZXhwZXJpZW5jZSUyMGRlc2lnbiUyMHdpcmVmcmFtZXxlbnwxfHx8fDE3NzE0ODEyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm mb-4">
            Portfolio
          </div>
          <h2 className="text-4xl sm:text-5xl text-gray-900 dark:text-white mb-4">
            {t('projects.title')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t('projects.highlight')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} to={`/progetti/${category.id}`}>
              <Card className="overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-blue-900/20 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                {/* Category Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-lg">
                    <div className={category.color}>
                      {category.icon}
                    </div>
                  </div>
                </div>

                {/* Category Content */}
                <CardContent className="p-6 space-y-4 flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl text-gray-900 dark:text-white">{category.title}</h3>
                    <ArrowRight 
                      className={`${category.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`} 
                      size={20} 
                    />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* View Projects Link */}
                  <div className={`pt-2 mt-auto text-sm ${category.color} font-medium group-hover:underline`}>
                    {t('projects.explore')}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}