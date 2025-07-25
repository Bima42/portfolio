import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChalkTrailProps } from '../components/chalk-trail/types.ts';
import { ParticleSystem } from '../components/chalk-trail/particleSystem.ts';
import { ChalkRenderer } from '../components/chalk-trail/chalkRenderer.ts';

interface UseChalkAnimationReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  particleCount: number;
  isAnimating: boolean;
}

export function useChalkAnimation(props: ChalkTrailProps): UseChalkAnimationReturn {
  const {
    chalkColor = 'rgba(198, 188, 240, 0.8)',
    trailLength = 2000,
    fadeSpeed = 0.02,
    particleSize = 4,
    spawnRate = 16,
    maxParticles = 800,
    isActive = true
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const rendererRef = useRef<ChalkRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isActiveRef = useRef(isActive);
  
  const [particleCount, setParticleCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const lastMoveTime = useRef(0);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  const animate = useCallback(() => {
    const particleSystem = particleSystemRef.current;
    const renderer = rendererRef.current;

    if (!particleSystem || !renderer) return;

    particleSystem.updateParticles();

    const particles = particleSystem.getParticles();
    renderer.render(particles);

    setParticleCount(particles.length);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) return;
    
    setIsAnimating(true);
    animate();
  }, [animate]);

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsAnimating(false);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const now = Date.now();
    
    if (now - lastMoveTime.current < 8) return;
    
    const x = event.clientX;
    const y = event.clientY + window.pageYOffset;
    
    lastMoveTime.current = now;

    if (isActiveRef.current && particleSystemRef.current) {
      particleSystemRef.current.spawnParticles(x, y);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
  }, []);

  const handleMouseLeave = useCallback(() => {
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !rendererRef.current) return;

    const newWidth = window.innerWidth;
    const newHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight);
    
    rendererRef.current.resize(newWidth, newHeight);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Dimensionnement pour couvrir toute la page scrollable
    canvas.width = window.innerWidth;
    canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);

    particleSystemRef.current = new ParticleSystem(
      maxParticles,
      spawnRate,
      trailLength,
      particleSize
    );

    rendererRef.current = new ChalkRenderer(
      context,
      chalkColor,
      fadeSpeed
    );

    console.log('Chalk animation initialized');
  }, []); // Une seule fois

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      startAnimation();
    } else {
      stopAnimation();
    }

    return () => {
      stopAnimation();
    };
  }, [isActive, startAnimation, stopAnimation]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        stopAnimation();
      } else if (isActiveRef.current) {
        startAnimation();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    if (mediaQuery.matches) {
      stopAnimation();
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [startAnimation, stopAnimation]);

  return {
    canvasRef,
    particleCount,
    isAnimating
  };
}