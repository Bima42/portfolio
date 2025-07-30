import { HeroSection} from '@/components/home';
import { motion } from 'framer-motion';
import About from '@/components/about/About.tsx';
import { ProjectsCarousel } from '@/components/projects';
import { TagList } from '@/components/tags';
import Contact from '@/components/contact/Contact.tsx';
import { useContentVisible } from '@/hooks/useContentVisible.ts';
import { Header } from '@/components/header';

export default function Home() {
    const { isContentVisible, animationComplete, handleAnimationEnd } = useContentVisible();

    return (<>
        <Header 
            animationComplete={animationComplete}
            onLogoAnimationComplete={handleAnimationEnd}
        />

        <div className=" min-h-screen bg-background">
            <div className="relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isContentVisible ? 1 : 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <HeroSection />
                </motion.div>

            </div>

            {isContentVisible && (<>
                <About/>
                <ProjectsCarousel numberOfCards={6} />
                <TagList tags={["react", "typescript", "docker"]} size="md" />
                <Contact />
            </>)}

    </div>
    </>);
}