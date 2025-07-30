import { motion } from 'framer-motion';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { ProjectCard } from './atoms/ProjectCard.tsx';
import { useState, useEffect, useMemo, useRef } from 'react';
import { CarouselProgressDots } from '@/components/projects/atoms/CarouselProgressDots.tsx';

function MobileProjectsCarousel({ className, cards }: { cards: number[], className?: string }) {
  return (
      <section className={`py-20 ${className}`}>
        <div className="px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Projets
          </h2>
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4">
              {cards.map((index) => (
                  <div key={index} className="flex-shrink-0">
                    <ProjectCard
                        index={index}
                        isActive={false}
                        className="w-72 h-64"
                    />
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

interface ProjectsCarouselProps {
  numberOfCards?: number;
  className?: string;
}

export function ProjectsCarousel({ numberOfCards = 5, className }: ProjectsCarouselProps) {
  const [isMobile, setIsMobile] = useState(false);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // TODO: Change how we detect mobile devices
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const { containerRef, translateX, currentIndex } = useHorizontalScroll({
    totalCards: numberOfCards,
    cardWidth: 384, // w-96 = 384px
    gap: 40
  });

  useEffect(() => {
    let rafId: number;
    const unsubscribe = currentIndex.on('change', (latest) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const newIndex = Math.round(latest);
        if (newIndex !== activeIndexRef.current) {
          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);
        }
      });
    });
    
    return () => {
      cancelAnimationFrame(rafId);
      unsubscribe();
    };
  }, [currentIndex]);

  const cards = useMemo(() =>
    Array.from({ length: numberOfCards }, (_, index) => index),
    [numberOfCards]
  );

  if (isMobile) {
    return (<MobileProjectsCarousel cards={cards} className={className} />);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: '400vh' }} id="projects">
      {/* Sticky container with cards */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-4xl font-bold mb-12 text-foreground">
          Projets
        </h2>
        
        <motion.div 
          className="flex gap-10"
          style={{ 
            x: translateX,
            willChange: 'transform'
          }}
        >
          {cards.map((index) => (
            <ProjectCard 
              key={index}
              index={index}
              isActive={activeIndex === index}
            />
          ))}
        </motion.div>
        
        <CarouselProgressDots cards={cards} activeIndex={activeIndex}/>
      </div>
    </div>
  );
}