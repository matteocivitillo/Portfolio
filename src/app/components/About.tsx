import { useTranslation } from 'react-i18next';
import { ScrollReveal } from './ScrollReveal';
import { ScrollTypewriter } from './ScrollTypewriter';
import { AnimatedTestimonials, type Testimonial } from '../../components/ui/animated-testimonials';
import laureaImg from '../../images/laurea.jpeg';
import xrImg from '../../images/XR.jpeg';
import testimonial1 from '../../images/Testimonials/IMG20251118164004.jpg';
import testimonial2 from '../../images/Testimonials/IMG20250716211420.jpg';
import testimonial3 from '../../images/Testimonials/IMG20241002185753.jpg';
import testimonial4 from '../../images/Testimonials/IMG20240807205114.jpg';
import testimonial5 from '../../images/Testimonials/IMG-20260101-WA0030.jpg';
import testimonial6 from '../../images/Testimonials/IMG-20251220-WA0028.jpg';
import testimonial7 from '../../images/Testimonials/IMG20230923162542.jpg';
import testimonial8 from '../../images/Testimonials/IMG-20251219-WA0011.jpg';
import testimonial9 from '../../images/Testimonials/IMG-20251016-WA0017.jpg';
import testimonial10 from '../../images/Testimonials/IMG-20241004-WA0053.jpg';

export function About() {
  const { t } = useTranslation();

  const aboutTitle = t('about.title') + t('about.highlight');

  const hobbyTestimonials: Testimonial[] = [
    { quote: t('about.interestsBody'), name: t('about.interestsTitle'), designation: t('about.interestsSubtitle'), src: testimonial1 },
    { quote: t('about.interestsBody'), name: t('about.interestsTitle'), designation: t('about.interestsSubtitle'), src: testimonial2 },
    { quote: t('about.interestsBody'), name: t('about.interestsTitle'), designation: t('about.interestsSubtitle'), src: testimonial3 },
    { quote: t('about.interestsBody'), name: t('about.interestsTitle'), designation: t('about.interestsSubtitle'), src: testimonial4 },
    { quote: t('about.interestsBody'), name: t('about.interestsTitle'), designation: t('about.interestsSubtitle'), src: testimonial5 },
    { quote: t('about.interestsBody'), name: t('about.interestsTitle'), designation: t('about.interestsSubtitle'), src: testimonial6 },
    { quote: t('about.interestsBody'), name: t('about.interestsTitle'), designation: t('about.interestsSubtitle'), src: testimonial7 },
    { quote: t('about.interestsBody'), name: t('about.interestsTitle'), designation: t('about.interestsSubtitle'), src: testimonial8 },
    { quote: t('about.interestsBody'), name: t('about.interestsTitle'), designation: t('about.interestsSubtitle'), src: testimonial9 },
    { quote: t('about.interestsBody'), name: t('about.interestsTitle'), designation: t('about.interestsSubtitle'), src: testimonial10 },
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
          <ScrollTypewriter
            as="h1"
            text={aboutTitle}
            highlightText={t('about.highlight')}
            highlightClassName="font-serif italic bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] pr-2"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight max-w-5xl text-gray-900 dark:text-white"
            speed={50}
          />
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

          {/* Block 2: Right Text */}
          <ScrollReveal delay={300} direction="up" className="flex flex-col justify-center md:pt-32">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              {t('about.sectionJourneyTitle')}
            </h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              <p>{t('about.description1')}</p>
              <p>{t('about.description2')}</p>
            </div>
          </ScrollReveal>

          {/* Block 3: Left Text */}
          <ScrollReveal delay={200} direction="up" className="flex flex-col justify-center order-4 md:order-3 md:pt-32">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              {t('about.sectionApproachTitle')}
            </h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              <p>{t('about.description3')}</p>
              <p>{t('about.description4')}</p>
            </div>
          </ScrollReveal>

          {/* Block 4: Right Image */}
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

        {/* Interests and Hobbies Section */}
        <ScrollReveal delay={150} direction="up" className="w-full mt-8 md:mt-20">
          <AnimatedTestimonials
            testimonials={hobbyTestimonials}
            autoplay={true}
            fixedContent={{
              quote: t('about.interestsBody'),
              name: t('about.interestsTitle'),
              designation: t('about.interestsSubtitle'),
            }}
          />
        </ScrollReveal>

        {/* Decorative separator before continuing to Skills and Contact component (rendered in AboutPage) */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent my-32" />
      </div>
    </div>
  );
}



