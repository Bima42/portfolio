import { ContactGrid } from '@/components/contact/index.ts';
import { useLanguage } from '@/hooks/useLanguage.ts';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center bg-background">
      <div className="flex flex-col container mx-auto px-6 py-16 gap-y-12">
        <h1 className="text-5xl font-bold text-foreground mb-8 text-center">{t('pages.contact.title')}</h1>
        <ContactGrid />
      </div>
    </div>
  );
}