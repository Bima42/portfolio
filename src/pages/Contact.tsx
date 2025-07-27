import { ContactGrid } from '@/components/contact';

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center bg-background">
      <div className="container mx-auto px-6 py-16">
        <ContactGrid />
      </div>
    </div>
  );
}