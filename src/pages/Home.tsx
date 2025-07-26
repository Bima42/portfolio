import { HeroSection} from '@/components/home';

export default function Home() {

  return (
    <div className="relative overflow-hidden">
      {/* Chalk Trail Effect */}
      {/*<ChalkTrail*/}
      {/*  chalkColor="rgba(198, 188, 240, 0.8)"*/}
      {/*  trailLength={2500}*/}
      {/*  fadeSpeed={0.015}*/}
      {/*  particleSize={5}*/}
      {/*  spawnRate={12}*/}
      {/*  maxParticles={600}*/}
      {/*  isActive={true}*/}
      {/*/>*/}
      
      <HeroSection />

    </div>
  );
}