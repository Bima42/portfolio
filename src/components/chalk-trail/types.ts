export interface ChalkParticle {
  x: number;
  y: number;
  opacity: number;
  size: number;
  createdAt: number;
}

export interface ChalkTrailProps {
  backgroundColor?: string;
  chalkColor?: string;
  trailLength?: number;
  fadeSpeed?: number;
  particleSize?: number;
  spawnRate?: number;
  maxParticles?: number;
  isActive?: boolean;
}