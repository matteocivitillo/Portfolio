import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useTranslation } from 'react-i18next';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const categoryData: Record<string, { title: string; description: string; projects: Project[] }> = {
  'ricerca': {
    title: 'Ricerca',
    description: 'Progetti di ricerca e sviluppo che esplorano nuove tecnologie e metodologie',
    projects: [
      {
        title: 'LLM Guardrails Research',
        description: 'Ricerca su safety guardrails per Large Language Models',
        longDescription: 'In collaborazione con i professori Matteo Camilli e Giovanni Quattrocchi al Politecnico di Milano. Il progetto esplora lo sviluppo e l\'implementazione di meccanismi di sicurezza per mitigare i rischi e promuovere un deployment responsabile dell\'Intelligenza Artificiale, con un paper accademico attualmente in fase di stesura.',
        image: 'https://images.unsplash.com/photo-1762427354251-f008b64dbc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MTU4MTgwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['AI Safety', 'LLM', 'Python', 'Academic Research'],
      },
      {
        title: 'SynergyAI',
        description: 'Piattaforma AI-powered per partnership aziendali',
        longDescription: 'Startup pre-seed sviluppata nel corso di High-Tech Entrepreneurship al Politecnico di Milano. Il progetto mira a facilitare le partnership B2B tramite matchmaking basato su intelligenza artificiale per l\'esplorazione di opportunità di mercato.',
        image: 'https://images.unsplash.com/photo-1765020553734-2c050ddb9494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRpbmclMjBtZWV0aW5nfGVufDF8fHx8MTc3MTQ4Nzg2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Business Strategy', 'AI Matchmaking', 'Lean Startup'],
      },
    ],
  },
  'full-stack': {
    title: 'Full-Stack Development',
    description: 'Applicazioni web complete con frontend moderno e backend robusto',
    projects: [
      {
        title: 'Artendity',
        description: 'Applicazione web iterattiva per scoprire la propria "Art DNA"',
        longDescription: 'Sviluppato per il corso Design of WWW Services. Artendity permette agli utenti di eseguire un quiz visivo per scoprire le proprie preferenze artistiche, ricevendo raccomandazioni personalizzate e navigando una galleria interattiva.',
        image: 'https://images.unsplash.com/photo-1721864428830-7417b93831b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMHdlYnNpdGV8ZW58MXx8fHwxNzcxNTU1MTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Svelte', 'Node.js', 'PostgreSQL', 'UI/UX Design'],
        github: 'https://github.com/matteocivitillo/artendity',
      },
      {
        title: 'Yoga Website',
        description: 'Sito web interattivo dedicato allo Yoga',
        longDescription: 'Costruito per il corso Hypermedia Applications, questo sito web combina un\'architettura full-stack con contenuti multimediali interattivi, offrendo un\'esperienza utente ottimizzata e focus sul design responsivo.',
        image: 'https://images.unsplash.com/photo-1630522790858-50b4ef44944b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzcxNTAyOTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Node.js', 'JavaScript', 'Python', 'Responsive Design'],
        github: 'https://github.com/matteocivitillo/hypermedia_applications',
      },
    ],
  },
  'mobile': {
    title: 'Mobile Development',
    description: 'Applicazioni mobile native e cross-platform per iOS e Android',
    projects: [
      {
        title: 'Flutter Flame Memory Game',
        description: 'Memory card game cross-platform alimentato da motore Flame',
        longDescription: 'Un gioco di memoria device-agnostic sviluppato in Flutter, con interfacce responsive. Offre una progressione dei livelli persistente utilizzando Hive e adotta un robusto approccio di state management.',
        image: 'https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHBob25lfGVufDF8fHx8MTc3MTQ4ODk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Flutter', 'Dart', 'Flame Engine', 'Hive'],
        github: 'https://github.com/matteocivitillo/flutter-flame-memory',
      }
    ],
  },
  'xr': {
    title: 'XR Projects',
    description: 'Progetti di realtà virtuale, aumentata e mista',
    projects: [
      {
        title: 'Hololimb',
        description: 'App XR per la riabilitazione attraverso l\'illusione visiva',
        longDescription: 'In collaborazione con i3lab (Polimi), Hololimb è un\'app per Meta Quest 3 mirata a ridurre il dolore da arto fantasma (PLP), simulando un arto virtuale a supporto della terapia di riabilitazione del paziente.',
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGhlYWRzZXR8ZW58MXx8fHwxNzcxNTc5NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Unity', 'C#', 'Meta Quest 3', 'HCI'],
        github: 'https://github.com/matteocivitillo/AUI-Hololimb',
      },
      {
        title: 'CodingVirtualWorlds',
        description: 'Programmazione e simulazione di mondi interattivi in VR',
        longDescription: 'Progetto per il corso Coding Virtual Worlds: design e implementazione di molteplici ambienti VR interattivi per Meta Quest 3, culminato nello sviluppo di un gioco multiplayer in rete.',
        image: 'https://images.unsplash.com/photo-1707758967860-19106a5e9ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwc3RhY2slMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzcxNTg1ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Unity', 'Multiplayer Networking', '3D Modeling'],
        github: 'https://github.com/matteocivitillo/CodingVirtualWorlds',
      },
    ],
  },
  'consultancy': {
    title: 'Consultancy',
    description: 'Progetti di consulenza strategica e implementazione tecnologica',
    projects: [
      {
        title: 'HR Consulting - SACE S.p.A.',
        description: 'Valutazione UX ed engagement degli strumenti HR',
        longDescription: 'Progetto di team per conto dell\'agenzia italiana SACE, volto a valutare l\'usabilità e adozione degli strumenti HR interni come Workday e Coursera. Include analisi qualitativa attraverso interviste mirate.',
        image: 'https://images.unsplash.com/photo-1765020553734-2c050ddb9494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRpbmclMjBtZWV0aW5nfGVufDF8fHx8MTc3MTQ4Nzg2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['UX Research', 'Qualitative Analysis', 'Tool Evaluation'],
        github: 'https://github.com/matteocivitillo/Digital-Business-Lab',
      }
    ],
  },
  'ux-oriented': {
    title: 'UX-Oriented',
    description: 'Progetti focalizzati sull\'esperienza utente e design thinking',
    projects: [
      {
        title: 'HCI Research & Prototyping',
        description: 'Design e analisi di sistemi interattivi',
        longDescription: 'Sviluppo di tre progetti in ottica Human-Computer Interaction seguendo l\'approccio HCD (ISO 9241-210), che includono analisi di modelli mentali e progettazione di prototipi ad alta fedeltà con test degli utenti.',
        image: 'https://images.unsplash.com/photo-1698434156098-68e834638679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwZXhwZXJpZW5jZSUyMGRlc2lnbiUyMHdpcmVmcmFtZXxlbnwxfHx8fDE3NzE0ODEyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Figma Prototyping', 'User Testing', 'Mental-Model UI Analysis'],
      }
    ],
  },
};

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? categoryData[categoryId] : null;
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="text-center">
          <h1 className="text-4xl mb-4 text-gray-900 dark:text-white">{t('category.notFound')}</h1>
          <Link to="/">
            <Button>{t('category.backHome')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <a href="/#projects">
          <Button variant="ghost" className="mb-8 group text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t('category.backBtn')}
          </Button>
        </a>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl sm:text-6xl text-gray-900 dark:text-white mb-4">
            {category.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            {category.description}
          </p>
        </div>

        {/* Projects List - Alternating Layout */}
        <div className="space-y-24">
          {category.projects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h2 className="text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                      {project.title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  {(project.github || project.demo) && (
                    <div className="flex gap-4 pt-4">
                      {project.github && (
                        <a href={project.github}>
                          <Button variant="outline" className="gap-2 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
                            <Github size={18} />
                            {t('category.codeBtn')}
                          </Button>
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo}>
                          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                            <ExternalLink size={18} />
                            {t('category.demoBtn')}
                          </Button>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
