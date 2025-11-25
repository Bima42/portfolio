import { HeroSection } from '@/components/home';
import About from '@/components/about/About.tsx';
import { ProjectsCarousel } from '@/components/projects';
import Contact from '@/components/contact/Contact.tsx';
import { projectsData } from '@/components/projects/data';

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <div className="relative overflow-hidden">
                <HeroSection />
            </div>

            <About />
            <ProjectsCarousel projects={projectsData} />
            <Contact />
        </div>
    );
}
