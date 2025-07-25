import { useLanguage } from '../../hooks/useLanguage';

export interface Project {
  title: string;
  technologies: string[];
  description: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

export function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const { currentLanguage: language } = useLanguage();

  return (
    <div
      className={`group bg-gradient-to-br from-primary/10 to-secondary/5 dark:from-primary/5 dark:to-secondary/10 
        p-xl rounded-2xl border border-primary/20 hover:border-primary/40 
        transition-all duration-300 hover:transform hover:scale-105 hover:rotate-1
        hover:shadow-lg hover:shadow-primary/10 cursor-pointer
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{
        transitionDelay: isVisible ? `${index * 200}ms` : '0ms'
      }}
    >
      <div className="mb-lg">
        <h3 className="text-xl font-bold text-foreground mb-md group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-sm mb-md">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-sm py-xs text-xs font-medium bg-primary/20 text-primary rounded-md
                group-hover:bg-primary/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors">
          {project.description}
        </p>
      </div>

      <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform">
        <span className="text-sm font-medium">
          {language === 'fr' ? 'Voir le projet' : 'View project'}
        </span>
        <svg
          className="w-4 h-4 ml-sm"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}