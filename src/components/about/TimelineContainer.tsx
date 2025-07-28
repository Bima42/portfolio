import { useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import type { TimelineData } from './types.ts';
import { TimelineLine } from './TimelineLine';
import { TimelineItem } from './TimelineItem';

interface TimelineContainerProps {
  timelineData: TimelineData;
}

export function TimelineContainer({ timelineData }: TimelineContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <ReactLenis root options={{ duration: 1.5 }}>
            {/* Le conteneur principal avec position relative */}
            <div ref={containerRef} className="relative w-full top-[-100px]">

                {/* Timeline Line - maintenant en absolute, ne prend plus de place */}
                <TimelineLine />

                {/* Timeline Items - définissent maintenant la vraie hauteur */}
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