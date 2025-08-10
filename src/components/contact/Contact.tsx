import { ContactGrid } from '@/components/contact/index.ts';
import { useLanguage } from '@/hooks/useLanguage.ts';

export default function Contact() {
    const { t } = useLanguage();

    return (
        <div
            className="min-h-screen flex items-center bg-background"
            id="contact"
        >
            <div className="flex flex-col w-full px-6 py-16">
                <h1 className="h1">{t('pages.contact.title')}</h1>
                <ContactGrid />
            </div>
        </div>
    );
}
