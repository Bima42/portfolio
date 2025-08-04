import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.ts';
import { memo } from 'react';
import type { Project } from '@/components/projects/types.ts';
import { TagList } from '@/components/tags';
import { constants } from '@/constants.ts';
import { useLanguage } from '@/hooks/useLanguage.ts';

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
    const { t } = useLanguage();
    return (
        <motion.div
            className={cn(
                'rounded-2xl border-2 flex-shrink-0 overflow-hidden',
                'bg-background-elevated/80 backdrop-blur-sm cursor-pointer',
                'relative transition-all duration-300 ease-out border-foreground/20',
                'hover:border-primary',
                className
            )}
            animate={{
                scale: isActive ? 1.05 : 0.75,
                opacity: isActive ? 1 : 0.7,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeOut',
            }}
            onClick={() => onExpand && onExpand()}
            whileHover={{
                scale: isActive ? 1.1 : 0.95,
            }}
            style={{
                width: constants.PROJECT_CARD_WIDTH,
                height: 350,
                willChange: 'transform',
            }}
        >
            <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                <div className="w-full h-32 rounded-lg mb-4 overflow-hidden flex items-center">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full object-cover"
                        loading="lazy"
                    />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground ">
                    {t(project.title)}
                </h3>
                <p className="text-sm text-foreground/60 mb-4 line-clamp-3">
                    {t(project.shortDescription)}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                    <TagList tags={project.tags.slice(0, 3)} size={'md'} />
                </div>
            </div>
        </motion.div>
    );
});
