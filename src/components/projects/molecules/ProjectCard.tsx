import { motion } from 'framer-motion';
import { cn } from '@/lib/utils.ts';
import type { Project } from '@/components/projects/types.ts';
import { TagList } from '@/components/tags';
import { constants } from '@/constants.ts';
import { useLanguage } from '@/hooks/useLanguage.ts';
import { useTheme } from '@/hooks/useTheme.tsx';

interface ProjectCardProps {
    project: Project;
    isActive?: boolean;
    onExpand?: () => void;
    className?: string;
}

export const ProjectCard = ({
    project,
    isActive,
    onExpand,
    className,
}: ProjectCardProps) => {
    const { t } = useLanguage();
    const { isDark } = useTheme();

    return (
        <motion.div
            className={cn(
                'rounded-2xl border-2 flex-shrink-0 overflow-hidden',
                'glass-background cursor-pointer',
                'relative transition-all duration-300 ease-out border-foreground/20',
                'hover:border-primary',
                'w-full max-w-full md:max-w-none',
                className
            )}
            animate={{
                scale: isActive ? 1 : 0.75,
                opacity: isActive ? 1 : 0.7,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeOut',
            }}
            onClick={() => onExpand && onExpand()}
            whileHover={{
                scale: isActive ? 1.05 : 0.95,
            }}
            style={{
                width: className?.includes('w-full')
                    ? '100%'
                    : constants.PROJECT_CARD_WIDTH,
                height: className?.includes('h-80') ? 320 : 350,
                willChange: 'transform',
            }}
        >
            <div className="p-4 md:p-6 h-full flex flex-col justify-center items-center text-center gap-y-4">
                <div className="w-[90%] h-24 md:h-32 rounded-lg mb-3 md:mb-4 overflow-hidden flex items-center p-2 md:p-4">
                    <img
                        src={
                            isDark && project.darkThumbnail
                                ? project.darkThumbnail
                                : project.lightThumbnail
                        }
                        alt={project.title}
                        className="w-full object-cover"
                        loading="lazy"
                    />
                </div>
                <p className="text-xs md:text-sm text-foreground/60 mb-3 md:mb-4 line-clamp-3">
                    {t(project.shortDescription)}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                    <TagList
                        tags={project.tags.slice(0, 3)}
                        size={'md'}
                        className={'justify-center'}
                    />
                </div>
            </div>
        </motion.div>
    );
};
