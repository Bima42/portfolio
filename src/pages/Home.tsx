import { HeroSection} from '@/components/home';
import { useEffect, useState } from 'react';
import LogoAnimation from '@/components/home/LogoAnimation.tsx';

export default function Home() {
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setShowAnimation(false), 2000);
        return () => clearTimeout(timeout);
    }, []);

    if (showAnimation) return <LogoAnimation />;

  return (
    <div className="relative overflow-hidden">
      <HeroSection />

    </div>
  );
}