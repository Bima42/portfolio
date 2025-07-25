import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { HeroSection, ProjectsSection, type Project } from '../components/home';

export default function Home() {
  const { currentLanguage: language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const projectsRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      title: "E-commerce Platform",
      technologies: ["React", "Node.js", "MongoDB"],
      description: language === 'fr'
        ? "Plateforme complète avec paiements intégrés"
        : "Full-featured platform with integrated payments"
    },
    {
      title: "Data Dashboard",
      technologies: ["Vue.js", "Python", "PostgreSQL"],
      description: language === 'fr'
        ? "Interface de visualisation de données temps réel"
        : "Real-time data visualization interface"
    },
    {
      title: "Mobile App Social",
      technologies: ["React Native", "Firebase"],
      description: language === 'fr'
        ? "Application sociale avec géolocalisation"
        : "Social app with geolocation features"
    }
  ];

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* TODO - Chalk Trail Effect */}
      
      <HeroSection isVisible={isVisible} />
      
      <ProjectsSection 
        ref={projectsRef}
        projects={projects}
        isVisible={projectsVisible}
      />
    </div>
  );
}