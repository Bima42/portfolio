import { motion } from 'framer-motion';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { ProjectCard } from './atoms/ProjectCard.tsx';
import { ProjectModal } from './atoms/ProjectModal.tsx';
import { useState, useEffect, useRef, useCallback } from 'react';
import { CarouselProgressDots } from '@/components/projects/atoms/CarouselProgressDots.tsx';
import type { Project } from './types.ts';
import { constants } from '@/constants.ts';

function MobileProjectsCarousel({
    className,
    projects,
}: {
    projects: Project[];
    className?: string;
}) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    return (
        <>
            <section className={`py-20 ${className}`}>
                <div className="px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                        Projets
                    </h2>
                    <div className="overflow-x-auto">
                        <div className="flex gap-6 pb-4">
                            {projects.map(project => (
                                <div key={project.id} className="flex-shrink-0">
                                    <ProjectCard
                                        project={project}
                                        isActive={false}
                                        onExpand={() =>
                                            setSelectedProject(project)
                                        }
                                        className="w-72 h-64"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <ProjectModal
                project={selectedProject}
                isOpen={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
}

interface ProjectsCarouselProps {
    projects: Project[];
}

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
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
                    <h2 className="text-4xl font-bold mb-12 text-foreground">
                        Projets
                    </h2>

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
