import { Mail, MapPin, Send, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Map } from "./Map";

export function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log("Form submitted:", formData);
    alert(t("contact.successAlert"));
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      value: "Milano, Italia",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm mb-4">
            {t("contact.badge")}
          </div>
          <h2 className="text-4xl sm:text-5xl text-gray-900 dark:text-white mb-4">
            {t("contact.title")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t("contact.highlight")}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
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
                <a
                  key={index}
                  href={info.href}
                  download={info.download}
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
              ))}
            </div>

            {/* Map Integration */}
            <div className="mt-8 flex-grow flex flex-col min-h-[300px] lg:min-h-0 relative">
               <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                 {t("contact.mapDescription")}
               </h4>
               <div className="flex-grow w-full relative min-h-[250px]">
                 <Map />
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors">
            <h3 className="text-2xl text-gray-900 dark:text-white mb-6">
              {t("contact.formTitle")}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-700 dark:text-gray-200 mb-2"
                >
                  {t("contact.nameLabel")}
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("contact.namePlaceholder")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-700 dark:text-gray-200 mb-2"
                >
                  {t("contact.emailLabel")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("contact.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm text-gray-700 dark:text-gray-200 mb-2"
                >
                  {t("contact.subjectLabel")}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder={t("contact.subjectPlaceholder")}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-700 dark:text-gray-200 mb-2"
                >
                  {t("contact.messageLabel")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("contact.messagePlaceholder")}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
              >
                {t("contact.submitBtn")}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}