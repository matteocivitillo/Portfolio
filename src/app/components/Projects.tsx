import { useTranslation } from 'react-i18next';
import { ScrollTypewriter } from './ScrollTypewriter';
import { Carousel, Card } from './ui/apple-cards-carousel';

const categoriesData = [
  {
    id: 'ricerca',
    category: 'Research',
    src: 'https://images.unsplash.com/photo-1762427354251-f008b64dbc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MTU4MTgwOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'full-stack',
    category: 'Full-Stack',
    src: 'https://images.unsplash.com/photo-1707758967860-19106a5e9ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwc3RhY2slMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzcxNTg1ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'mobile',
    category: 'Mobile',
    src: 'https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHBob25lfGVufDF8fHx8MTc3MTQ4ODk2OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'xr',
    category: 'XR',
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

  const cards = categoriesData.map((cat) => (
    <Card
      key={cat.id}
      card={{
        src: cat.src,
        title: t(`carousel.${cat.id}`),
        category: cat.category,
        href: `/progetti/${cat.id}`,
      }}
    />
  ));

  return (
    <div className="py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <ScrollTypewriter
            text={projectsTitle}
            highlightText={t('projects.highlight')}
            highlightClassName="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-foreground"
            speed={50}
          />
        </div>

        {/* Apple Cards Carousel */}
        <Carousel items={cards} />
      </div>
    </div>
  );
}