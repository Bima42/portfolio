import { motion } from 'framer-motion';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { ProjectCard } from './molecules/ProjectCard.tsx';
import { ProjectModal } from './atoms/ProjectModal.tsx';
import { useState, useEffect, useRef, useCallback } from 'react';
import { CarouselProgressDots } from '@/components/projects/atoms/CarouselProgressDots.tsx';
import type { Project } from './types.ts';
import { constants } from '@/constants.ts';
import { useLanguage } from '@/hooks/useLanguage.ts';

function MobileProjectsCarousel({ projects }: { projects: Project[] }) {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    const getCardWidth = () => {
        if (typeof window === 'undefined') return '100%';
        const screenWidth = window.innerWidth;
        return screenWidth > 300
            ? Math.min(constants.PROJECT_CARD_WIDTH, screenWidth - 64)
            : screenWidth - 32;
    };

    const [cardWidth, setCardWidth] = useState<string | number>(getCardWidth());

    useEffect(() => {
        const handleResize = () => {
            setCardWidth(getCardWidth());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <section id="projects">
                <div className="px-4">
                    <h1 className="h1 mb-8">{t('pages.projects.title')}</h1>

                    <div className="flex flex-col pt-8 gap-15 items-center">
                        {projects.map(project => (
                            <div
                                key={project.id}
                                style={{
                                    width: cardWidth,
                                    maxWidth: constants.PROJECT_CARD_WIDTH,
                                }}
                            >
                                <ProjectCard
                                    project={project}
                                    isActive={true}
                                    onExpand={() => setSelectedProject(project)}
                                    className="w-full h-80"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ProjectModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
                isMobile={true}
            />
        </>
    );
}

interface ProjectsCarouselProps {
    projects: Project[];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
    const { t } = useLanguage();
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );
    const activeIndexRef = useRef(0);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < constants.MOBILE_BREAKPOINT);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const { containerRef, translateX, currentIndex } = useHorizontalScroll({
        totalCards: projects.length,
        cardWidth: constants.PROJECT_CARD_WIDTH,
        gap: 40,
    });

    const updateActiveIndex = useCallback((newIndex: number) => {
        if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
        }
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const unsubscribe = currentIndex.on('change', latest => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const newIndex = Math.round(latest);
                updateActiveIndex(newIndex);
            }, 50);
        });

        return () => {
            clearTimeout(timeoutId);
            unsubscribe();
        };
    }, [currentIndex, updateActiveIndex]);

    const handleExpand = useCallback(
        (projectId: string) => {
            const project = projects.find(p => p.id === projectId);
            if (project) {
                setSelectedProject(project);
            }
        },
        [projects]
    );

    const handleClose = useCallback(() => {
        setSelectedProject(null);
    }, []);

    if (isMobile) {
        return <MobileProjectsCarousel projects={projects} />;
    }

    return (
        <>
            <div
                ref={containerRef}
                className="relative"
                style={{ height: '400vh' }}
                id="projects"
            >
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                    <h1 className="h1 mb-8">{t('pages.projects.title')}</h1>

                    <motion.div
                        className="flex gap-10"
                        style={{
                            x: translateX,
                            willChange: 'transform',
                        }}
                    >
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                isActive={activeIndex === index}
                                onExpand={() => handleExpand(project.id)}
                            />
                        ))}
                    </motion.div>

                    <CarouselProgressDots
                        cards={projects.map((_, index) => index)}
                        activeIndex={activeIndex}
                    />
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={handleClose}
            />
        </>
    );
}
