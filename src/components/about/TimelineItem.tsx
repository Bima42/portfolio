import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { TimelineItemProps } from './types.ts';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from '@tanstack/react-router';
import { ExternalLink, ChevronRight } from 'lucide-react';

export function TimelineItem({ item, isLeft }: TimelineItemProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.3']
  });

  const cardX = useTransform(scrollYProgress, [0, 0.5, 1], [isLeft ? -100 : 100, 0, isLeft ? 50 : -50]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'experience':
        return 'border-l-4 border-l-primary bg-primary/5';
      case 'education':
        return 'border-l-4 border-l-secondary bg-secondary/5';
      case 'project':
        return 'border-l-4 border-l-primary bg-primary/10';
      case 'personal':
        return 'border-l-4 border-l-secondary bg-secondary/10';
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
      case 'personal':
        return '✨';
      default:
        return '📍';
    }
  };

  return (
    <div ref={ref} className="relative h-[40vh] flex items-center">
      {/* Timeline dot on the central line */}
      <motion.div
        className="absolute left-6 md:left-1/2 top-1/2 md:-translate-x-1/2 -translate-y-1/2 z-20"
        style={{ scale: dotScale }}
      >
        <div className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-xl flex items-center justify-center" />
      </motion.div>

      {/* Timeline card */}
      <motion.div
        className={`absolute ${
          isLeft 
            ? 'left-8 right-4 md:left-16 lg:left-20 md:right-1/2 md:mr-16 lg:mr-20' 
            : 'left-8 right-4 md:right-16 lg:right-20 md:left-1/2 md:ml-16 lg:ml-20'
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
            <span className="text-2xl opacity-60">
              {getTypeIcon(item.type)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            {t(item.title)}
          </h3>

          {/* Location */}
          {item.location && <p className="text-sm text-foreground/70 mb-4 flex items-center">
            📍 {t(item.location)}
          </p>}

          {/* Description */}
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            {t(item.description)}
          </p>

          {(item.link || item.internalLink) && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-foreground/10">
                {/* Button Show More Internal link */}
                {item.internalLink && (
                    <Link
                        to={item.internalLink}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-secondary bg-secondary/10 hover:bg-secondary/20 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    >
                      <span>{t('timeline.showMore')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                )}

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

          {/* Connector line to timeline */}
          {isLeft ? (
              <div className="absolute top-1/2 -translate-y-1/2 w-6 md:w-8 lg:w-12 h-0.5 bg-foreground/20 -right-6 md:-right-8 lg:-right-12" />
          ) : (
            <div className="absolute top-1/2 -translate-y-1/2 w-6 md:w-8 lg:w-12 h-0.5 bg-foreground/20 -left-6 md:-left-8 lg:-left-12" />
          )}
        </div>
      </motion.div>
    </div>
  );
}