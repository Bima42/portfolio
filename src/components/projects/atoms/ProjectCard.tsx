import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.ts';
import { memo } from 'react';

interface ProjectCardProps {
  index: number;
  isActive?: boolean;
  className?: string;
}

export const ProjectCard = memo(function ProjectCard({ index, isActive, className }: ProjectCardProps) {
  return (
    <motion.div
      className={cn(
        'w-96 h-80 rounded-2xl border-2 flex-shrink-0',
        'bg-background-elevated/80 backdrop-blur-sm',
        'flex items-center justify-center',
        isActive && 'border-primary shadow-2xl shadow-primary/20',
        !isActive && 'border-foreground/20',
        className
      )}
      initial={false}
      animate={{
        scale: isActive ? 1.1 : 0.85,
        opacity: isActive ? 1 : 0.6,
        y: isActive ? -10 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
      whileHover={{
        scale: isActive ? 1.15 : 0.9
      }}
      style={{
        willChange: 'transform, opacity'
      }}
    >
      <div className="text-center">
        <h3 className={cn(
          'text-2xl font-bold mb-2 text-foreground',
          isActive && 'text-primary'
        )}>
          Projet {index + 1}
        </h3>
        <p className="text-foreground/60">Carte de test</p>
      </div>
    </motion.div>
  );
});