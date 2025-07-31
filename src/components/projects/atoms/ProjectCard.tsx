import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.ts';
import { memo } from 'react';
import type { Project } from '@/components/projects/types.ts';
import { TagList } from '@/components/tags';

interface ProjectCardProps {
    project: Project;
    isActive?: boolean;
    onExpand?: () => void;
    className?: string;
}

export const ProjectCard = memo(function ProjectCard({
    project,
    isActive,
    onExpand,
    className,
}: ProjectCardProps) {
    return (
        <motion.div
            className={cn(
                'rounded-2xl border-2 flex-shrink-0 overflow-hidden',
                'bg-background-elevated/80 backdrop-blur-sm cursor-pointer',
                'relative transition-colors duration-200',
                isActive && 'border-primary shadow-lg',
                !isActive && 'border-foreground/20',
                className
            )}
            animate={{
                scale: isActive ? 1.05 : 0.9,
                opacity: isActive ? 1 : 0.7,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeOut',
            }}
            onClick={() => onExpand && onExpand()}
            whileHover={{
                scale: isActive ? 1.08 : 0.95,
            }}
            style={{
                width: 384,
                height: 320,
                willChange: 'transform',
            }}
        >
            <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="w-full h-32 rounded-lg mb-4 overflow-hidden">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {project.title}
                </h3>
                <p className="text-sm text-foreground/60 mb-4 line-clamp-3">
                    {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                    <TagList tags={project.tags.slice(0, 3)} size={'sm'} />
                </div>
            </div>
        </motion.div>
    );
});
