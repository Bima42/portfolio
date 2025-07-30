import { motion } from 'framer-motion';
import type { ContactItem } from '../types';

interface ContactCardProps {
    contact: ContactItem;
    className?: string;
}

export function ContactCard({ contact, className = '' }: ContactCardProps) {
    const { label, value, icon: Icon, href } = contact;

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={className}
        >
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="
          group
          contact-card
          relative
          flex
          flex-col
          items-center
          justify-center
          p-8
          rounded-xl
          border
          dark:bg-background-elevated
          border-foreground/10
          hover:border-primary/20
          backdrop-blur-sm
          transition-all
          duration-300
          ease-out
          shadow-sm
          hover:shadow-lg
          hover:shadow-primary/10
          min-h-[160px]
        "
                aria-label={`Contact via ${label}: ${value}`}
            >
                <div
                    className="
          text-primary
          mb-4
          group-hover:scale-110
          transition-transform
          duration-300
        "
                >
                    <Icon size={32} />
                </div>

                <div className="text-center">
                    <h3
                        className="
            font-medium
            text-foreground
            mb-2
            group-hover:text-primary
            transition-colors
            duration-300
          "
                    >
                        {label}
                    </h3>

                    <p
                        className="
            text-sm
            text-foreground/70
            group-hover:text-foreground/90
            transition-colors
            duration-300
          "
                    >
                        {value}
                    </p>
                </div>
            </a>
        </motion.div>
    );
}
