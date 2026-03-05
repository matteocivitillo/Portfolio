import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useTranslation } from 'react-i18next';
import { IframePreview } from '../components/IframePreview';
import { HoverVideoPlayer } from '../components/HoverVideoPlayer';
import { PdfPreview } from '../components/PdfPreview';
import usabilityReportPdf from '../../pdf/HYP_Usability_Evaluation_Report.pdf';
import designPdf from '../../pdf/HYP_Design.pdf';
import hciPdf from '../../pdf/HCI_3_assignment.pdf';
import finalReportPdf from '../../pdf/Final Report.pdf';
import hololimbVideo from '../../images/HololimbDemo.mp4';
import codingVirtualWorldsVideo from '../../images/DemoXR.mp4';

// Static metadata: only non-translatable data (images, tags, links)
const categoryMeta: Record<string, { projects: { image: string; iframeUrl?: string; videoUrl?: string; pdfUrl?: string; tags: string[]; github?: string; demo?: string }[] }> = {
  'ricerca': {
    projects: [
      {
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        tags: ['AI Safety', 'LLM', 'Python', 'Academic Research'],
      },
      {
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        tags: ['Extended Reality', 'Cross Reality', 'Phantom Limb Pain'],
      },
    ],
  },
  'full-stack': {
    projects: [
      {
        image: 'https://images.unsplash.com/photo-1721864428830-7417b93831b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMHdlYnNpdGV8ZW58MXx8fHwxNzcxNTU1MTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        iframeUrl: 'https://artendity.vercel.app/',
        tags: ['Svelte', 'Node.js', 'PostgreSQL', 'UI/UX Design'],
        github: 'https://github.com/matteocivitillo/artendity',
        demo: 'https://artendity.vercel.app/',
      },
      {
        image: 'https://images.unsplash.com/photo-1630522790858-50b4ef44944b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzcxNTAyOTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        iframeUrl: 'https://serendipity-delta.vercel.app/',
        tags: ['Node.js', 'JavaScript', 'Python', 'Responsive Design'],
        github: 'https://github.com/matteocivitillo/serendipity',
        demo: 'https://serendipity-delta.vercel.app/',
      },
    ],
  },
  'mobile': {
    projects: [
      {
        image: 'https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHBob25lfGVufDF8fHx8MTc3MTQ4ODk2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        iframeUrl: 'https://matteocivitillo.github.io/flutter-flame-memory/',
        tags: ['Flutter', 'Dart', 'Flame Engine', 'Hive'],
        github: 'https://github.com/matteocivitillo/flutter-flame-memory',
        demo: 'https://matteocivitillo.github.io/flutter-flame-memory/',
      },
      {
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        iframeUrl: 'https://matteocivitillo.github.io/Breakout/',
        tags: ['Flutter', 'Dart', 'Flame Engine', 'Game Dev'],
        github: 'https://github.com/matteocivitillo/Breakout',
        demo: 'https://matteocivitillo.github.io/Breakout/',
      },
    ],
  },
  'xr': {
    projects: [
      {
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGhlYWRzZXR8ZW58MXx8fHwxNzcxNTc5NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        videoUrl: hololimbVideo,
        tags: ['Unity', 'C#', 'Meta Quest 3', 'HCI'],
        github: 'https://github.com/matteocivitillo/AUI-Hololimb',
      },
      {
        image: 'https://images.unsplash.com/photo-1707758967860-19106a5e9ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwc3RhY2slMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzcxNTg1ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        videoUrl: codingVirtualWorldsVideo,
        tags: ['Unity', 'Multiplayer Networking', '3D Modeling'],
        github: 'https://github.com/matteocivitillo/CodingVirtualWorlds',
      },
    ],
  },
  'consultancy': {
    projects: [
      {
        image: '',
        pdfUrl: finalReportPdf,
        tags: ['UX Research', 'Qualitative Analysis', 'Tool Evaluation'],
        github: 'https://github.com/matteocivitillo/Digital-Business-Lab',
      },
    ],
  },
  'ux-oriented': {
    projects: [
      {
        image: '',
        pdfUrl: hciPdf,
        tags: ['Figma Prototyping', 'User Testing', 'Mental-Model UI Analysis'],
        github: 'https://github.com/matteocivitillo/HCI-Course-Projects',
      },
      {
        image: '',
        pdfUrl: usabilityReportPdf,
        tags: ['UX Research', 'Heuristic Evaluation', 'User Testing', 'HCI Analysis'],
      },
      {
        image: '',
        pdfUrl: designPdf,
        tags: ['UI Design', 'Figma Prototyping', 'Information Architecture', 'HCD Approach'],
      },
    ],
  },
};

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  const meta = categoryId ? categoryMeta[categoryId] : null;

  if (!meta || !categoryId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-4xl mb-4 text-gray-900 dark:text-white">{t('category.notFound')}</h1>
          <Link to="/">
            <Button>{t('category.backHome')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryTitle = t(`categories.${categoryId}.title`);
  const categoryDescription = t(`categories.${categoryId}.description`);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 pt-24 pb-20">
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
            {categoryTitle}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            {categoryDescription}
          </p>
        </div>

        {/* Projects List - Alternating Layout */}
        <div className="space-y-24">
          {meta.projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const projectTitle = t(`categories.${categoryId}.projects.${index}.title`);
            const projectLongDesc = t(`categories.${categoryId}.projects.${index}.longDescription`);

            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-12 items-center`}
              >
                {/* Image / Live Preview */}
                <div className="w-full lg:w-1/2">
                  {project.iframeUrl ? (
                    <IframePreview url={project.iframeUrl} title={projectTitle} />
                    ) : project.pdfUrl ? (
                    <PdfPreview
                      pdfUrl={project.pdfUrl}
                      title={projectTitle}
                    />
                    ) : project.videoUrl ? (
                    <HoverVideoPlayer
                      videoUrl={project.videoUrl}
                      posterUrl={project.image}
                      title={projectTitle}
                    />
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                      <img
                        src={project.image}
                        alt={projectTitle}
                        className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h2 className="text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                      {projectTitle}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                      {projectLongDesc}
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
