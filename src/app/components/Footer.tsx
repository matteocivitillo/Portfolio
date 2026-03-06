import { useTranslation } from 'react-i18next';

export function Footer({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <footer className={`bg-muted text-foreground transition-colors duration-300 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-muted-foreground text-sm">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
