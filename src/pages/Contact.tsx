import { useLanguage } from '../hooks/useLanguage'

export default function Contact() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-background pt-3xl">
      <div className="container mx-auto px-lg py-2xl max-w-container-lg">
        <h1 className="text-4xl font-bold text-foreground">{t('pages.contact.title')}</h1>
      </div>
    </div>
  )
}