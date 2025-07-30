import { TimelineContainer } from '@/components/about/index.ts';
import { timelineData } from '@/data/timelineData.ts';

export default function About() {
    return (
        <div className={'bg-background'}>
            <div className="w-full">
                <TimelineContainer timelineData={timelineData} />
            </div>
        </div>
    );
}
