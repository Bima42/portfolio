import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

interface HeroButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function HeroButton({ href, children, className = '' }: HeroButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={className}
    >
      <Link
        to={href}
        className="
          group
          relative
          block
          px-4
          py-8
          rounded-xl
          border
          dark:bg-background-elevated
          border-foreground/10
          hover:from-primary/5
          hover:to-primary/10
          hover:border-primary/20
          backdrop-blur-sm
          transition-all
          duration-300
          ease-out
          shadow-sm
          hover:shadow-md
          hover:shadow-primary/5
          hover:-translate-y-0.5
        "
      >
        <div className="
          text-center
          text-sm
          font-medium
          text-foreground/80
          group-hover:text-primary
          transition-colors
          duration-300
        ">
          {children}
        </div>
      </Link>
    </motion.div>
  );
}