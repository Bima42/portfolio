import { useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import { useLanguage } from '@/hooks/useLanguage';
import type { TimelineData } from './types.ts';
import { TimelineLine } from './TimelineLine';
import { TimelineItem } from './TimelineItem';

interface TimelineContainerProps {
  timelineData: TimelineData;
}

export function TimelineContainer({ timelineData }: TimelineContainerProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ReactLenis root options={{ duration: 1.5 }}>
      <div ref={containerRef} className="relative min-h-screen w-full">
        {/* Page Title */}
        <div className="relative pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-8">
              {t(timelineData.title || 'timeline.title')}
            </h1>
          </div>
        </div>

        {/* Central Timeline Line */}
        <TimelineLine />

        {/* Timeline Items */}
        <div className="relative z-10">
          {timelineData.items.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </ReactLenis>
  );
}