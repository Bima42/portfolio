import { ContactCard } from '../atoms';
import { contactData } from '../data';

interface ContactGridProps {
    className?: string;
}

export function ContactGrid({ className = '' }: ContactGridProps) {
    return (
        <div
            className={`
              grid
              grid-cols-1
              md:grid-cols-3
              gap-10
              md:gap-12
              mx-auto
              ${className}
    `}
        >
            {contactData.map(contact => (
                <ContactCard key={contact.id} contact={contact} />
            ))}
        </div>
    );
}
