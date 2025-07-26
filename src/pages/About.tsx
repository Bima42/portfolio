import { TimelineContainer } from '@/components/about'
import { timelineData } from '@/data/timelineData.ts';

export default function About() {
  return (
      <div className={"pt-7xl min-h-screen bg-background"}>
        <div className="w-full">
          <TimelineContainer timelineData={timelineData} />
        </div>
      </div>
  );
}