import { forwardRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { ProjectCard, type Project } from './ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
  isVisible: boolean;
}

export const ProjectsSection = forwardRef<HTMLElement, ProjectsSectionProps>(
  ({ projects, isVisible }, ref) => {
    const { currentLanguage: language } = useLanguage();

    return (
      <section ref={ref} className="py-3xl bg-background relative">
        <div className="container mx-auto px-lg">
          <h2 className={`text-3xl md:text-4xl font-bold text-center text-foreground mb-2xl transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {language === 'fr' ? 'Projets Récents' : 'Recent Projects'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-lg max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
);