import { Mail, MapPin, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

import { ScrollTypewriter } from './ScrollTypewriter';
import { ScrollReveal } from './ScrollReveal';
import { PixelatedCanvas } from "./ui/pixelated-canvas";
import pictureImg from '../../images/picture2.jpeg';

export function Contact() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: t("contact.email"),
      value: "matteo.civitillo.work@gmail.com",
      href: "mailto:matteo.civitillo.work@gmail.com",
    },
    {
      icon: <FileText size={24} />,
      label: t("contact.cv"),
      value: t("contact.downloadCv"),
      href: "/cv.pdf",
      download: true,
    },
    {
      icon: <MapPin size={24} />,
      label: t("contact.location"),
      value: t("contact.locationValue"),
      href: "#",
    },
  ];

  const contactTitle = t("contact.title") + " " + t("contact.highlight");

  return (
    <div className="py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-20">
          <ScrollTypewriter
            text={contactTitle}
            highlightText={t("contact.highlight")}
            highlightClassName="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white"
            speed={50}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <ScrollReveal delay={200}>
            <div className="space-y-8 flex flex-col">
              <div>
                <h3 className="text-2xl text-gray-900 dark:text-white mb-4">
                  {t("contact.infoTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {t("contact.infoDesc")}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <ScrollReveal key={index} delay={400 + index * 150}>
                    <a
                      href={info.href}
                      download={(info as any).download}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-md transition-all duration-300"
                    >
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-lg">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          {info.label}
                        </div>
                        <div className="text-gray-900 dark:text-white">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  </ScrollReveal>
                ))}
              </div>


            </div>
          </ScrollReveal>

          {/* Pixelated Canvas Photo */}
          {/* Pixelated Canvas Photo — desktop only (>= 1024px) */}
          <ScrollReveal delay={300} direction="right">
            <div className="hidden lg:flex items-center justify-center">
              <PixelatedCanvas
                src={pictureImg}
                width={500}
                height={600}
                cellSize={5}
                dotScale={0.85}
                shape="circle"
                backgroundColor="#ffffff"
                grayscale={true}
                halftone={true}
                contrastBoost={2.2}
                interactive={true}
                distortionStrength={12}
                distortionRadius={120}
                distortionMode="repel"
                jitterStrength={6}
                responsive={true}
                dropoutStrength={0.1}
                fadeOnLeave={true}
                fadeSpeed={0.04}
                className="rounded-2xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}