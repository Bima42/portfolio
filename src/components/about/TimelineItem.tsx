import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { TimelineItemProps } from './types.ts';
import { useLanguage } from '@/hooks/useLanguage';
import { ExternalLink } from 'lucide-react';
import { Logo } from '@/components/header';

export function TimelineItem({ item, isLeft }: TimelineItemProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Track screen size for animation logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 1.2', 'end 0.3']
  });

  // Responsive animation logic - Fixed mobile animation
  const cardX = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      isMobile
          ? [100, 0, 0] // Mobile: from right to center, stay at center
          : [isLeft ? -100 : 100, 0, isLeft ? 50 : -50] // Desktop: alternating
  );

  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'experience':
        return 'border-l-4 border-l-primary bg-primary/5';
      case 'education':
      case 'project':
        return 'border-l-4 border-l-primary bg-primary/10';
      default:
        return 'border-l-4 border-l-foreground/50 bg-foreground/5';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'experience':
        return '💼';
      case 'education':
        return '🎓';
      case 'project':
        return '🚀';
      case 'travel':
        return '✈️';
      default:
        return '📍';
    }
  };

  return (
      <div ref={ref} className="relative h-[40vh] flex items-center">
        {/* Timeline dot */}
        <motion.div
            className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 md:left-1/2 z-20"
            style={{ scale: dotScale }}
        >
          <div className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-xl flex items-center justify-center" />
        </motion.div>

        {/* Timeline card  */}
        <motion.div
            className={`absolute ${
                // Mobile positioning: proper spacing from timeline
                'left-12 right-4 ' +
                // Desktop positioning: alternating sides
                (isLeft
                    ? 'md:left-16 lg:left-20 md:right-1/2 md:mr-16 lg:mr-20'
                    : 'md:right-16 lg:right-20 md:left-1/2 md:ml-16 lg:ml-20')
            }`}
            style={{
              x: cardX,
              opacity: cardOpacity
            }}
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div
              className={`p-6 md:p-8 rounded-2xl backdrop-blur-md bg-background/90 border border-foreground/10 shadow-xl ${getTypeStyles(item.type)}`}
          >
            {/* Date badge */}
            <div className="flex items-center justify-between mb-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
              {item.date}
            </span>
              {item.icon ? (<Logo src={item.icon} alt={"card-logo"} logoHeight={"h-6"} />) :
                  (<span className="text-2xl opacity-60">
                {getTypeIcon(item.type)}
              </span>)}
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
              {t(item.title)}
            </h3>

            {/* Location */}
            {item.location && <p className="text-xs text-foreground/70 mb-4 flex items-center">
              {t(item.location)}
            </p>}

            {/* Description */}
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
              {t(item.description, {
                break: <br />,
              })}
            </p>

            {(item.link) && (
                <div className="mt-6 pt-4 border-t border-foreground/10">
                  {/* Button Discover External link */}
                  {item.link && (
                      <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <span>{t('timeline.discover')}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                  )}
                </div>
            )}

            {/* Connector line */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-0.5 bg-foreground/20 -left-4 ${
                isLeft
                    ? 'md:w-8 lg:w-12 md:-right-8 lg:-right-12 md:left-auto'
                    : 'md:w-8 lg:w-12 md:-left-8 lg:-left-12'
            }`} />
          </div>
        </motion.div>
      </div>
  );
}