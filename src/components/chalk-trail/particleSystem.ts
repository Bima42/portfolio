import type { ChalkParticle } from './types';

export class ParticleSystem {
  private particles: ChalkParticle[] = [];
  private maxParticles: number;
  private spawnRate: number;
  private trailLength: number;
  private particleSize: number;
  private lastSpawnTime = 0;

  constructor(
    maxParticles = 800,
    spawnRate = 16,
    trailLength = 2000,
    particleSize = 4
  ) {
    this.maxParticles = maxParticles;
    this.spawnRate = spawnRate;
    this.trailLength = trailLength;
    this.particleSize = particleSize;
  }

  spawnParticles(x: number, y: number): void {
    const now = Date.now();
    
    if (now - this.lastSpawnTime < this.spawnRate) {
      return;
    }

    if (this.particles.length >= this.maxParticles) {
      return;
    }

    const particleCount = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(this.createParticle(x, y, now));
    }

    this.lastSpawnTime = now;
  }

  private createParticle(x: number, y: number, timestamp: number): ChalkParticle {
    const jitterX = (Math.random() - 0.5) * 6;
    const jitterY = (Math.random() - 0.5) * 6;
    
    return {
      x: x + jitterX,
      y: y + jitterY,
      opacity: 0.7 + Math.random() * 0.3,
      size: this.particleSize + (Math.random() - 0.5) * 2,
      createdAt: timestamp
    };
  }

  updateParticles(): void {
    const now = Date.now();

    // Update particles
    this.particles = this.particles
      .map(particle => {
        const age = now - particle.createdAt;
        const lifeRatio = age / this.trailLength;
        
        // Progressively fade out
        particle.opacity = (1 - lifeRatio) * (0.7 + Math.random() * 0.3);
        
        return particle;
      })
      .filter(particle => {
        const age = now - particle.createdAt;
        return age < this.trailLength && particle.opacity > 0;
      });
  }

  getParticles(): ChalkParticle[] {
    return this.particles;
  }
}