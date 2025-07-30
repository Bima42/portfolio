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
            <div ref={containerRef} className="relative w-full top-[-100px] overflow-x-hidden">
                {/* Div to push a bit the content to bottom*/}
                <div className="h-[15vh]" />

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