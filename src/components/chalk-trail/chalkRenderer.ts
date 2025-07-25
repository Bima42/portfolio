import type { ChalkParticle } from './types';

export class ChalkRenderer {
  private context: CanvasRenderingContext2D;
  private chalkColor: string;
  private fadeSpeed: number;

  constructor(
    context: CanvasRenderingContext2D,
    chalkColor = 'rgba(198, 188, 240, 0.8)',
    fadeSpeed = 0.02
  ) {
    this.context = context;
    this.chalkColor = chalkColor;
    this.fadeSpeed = fadeSpeed;
    this.setupContext();
  }

  private setupContext(): void {
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.imageSmoothingEnabled = true;
  }

  render(particles: ChalkParticle[]): void {
    this.applyCanvasFade();
    
    particles.forEach(particle => {
      this.drawParticle(particle);
    });
  }

  private drawParticle(particle: ChalkParticle): void {
    const { x, y, opacity, size } = particle;

    this.context.save();
    this.context.globalAlpha = Math.max(0, Math.min(1, opacity));

    this.renderChalkTexture(x, y, size);
    this.context.restore();
  }

  private renderChalkTexture(x: number, y: number, size: number): void {
    const layers = 2 + Math.floor(Math.random() * 2);

    for (let i = 0; i < layers; i++) {
      this.context.save();

      // Light offset for slight randomness
      const offsetX = (Math.random() - 0.5) * 3;
      const offsetY = (Math.random() - 0.5) * 3;

      // Variable size
      const layerSize = size + (Math.random() - 0.5) * 1;

      // Variable opacity for each layer
      const layerAlpha = 0.6 + Math.random() * 0.4;
      this.context.globalAlpha *= layerAlpha;

      this.context.fillStyle = this.chalkColor;

      this.context.shadowColor = this.chalkColor;
      this.context.shadowBlur = 1;

      this.context.beginPath();
      this.context.arc(
        x + offsetX,
        y + offsetY,
        layerSize / 2,
        0,
        Math.PI * 2
      );
      this.context.fill();

      this.context.restore();
    }

    if (Math.random() > 0.8) {
      this.addChalkDust(x, y, size);
    }
  }

  private addChalkDust(x: number, y: number, baseSize: number): void {
    const dustCount = 2 + Math.floor(Math.random() * 3);

    for (let i = 0; i < dustCount; i++) {
      this.context.save();

      const dustX = x + (Math.random() - 0.5) * baseSize * 3;
      const dustY = y + (Math.random() - 0.5) * baseSize * 3;
      const dustSize = (baseSize / 3) * (0.5 + Math.random() * 0.5);

      this.context.globalAlpha *= 0.3 + Math.random() * 0.3;
      this.context.fillStyle = this.chalkColor;

      this.context.beginPath();
      this.context.arc(dustX, dustY, dustSize, 0, Math.PI * 2);
      this.context.fill();

      this.context.restore();
    }
  }

  private applyCanvasFade(): void {
    const { width, height } = this.context.canvas;
    
    this.context.save();
    this.context.globalCompositeOperation = 'destination-out';
    this.context.globalAlpha = this.fadeSpeed;
    this.context.fillRect(0, 0, width, height);
    this.context.restore();
  }

  resize(width: number, height: number): void {
    this.context.canvas.width = width;
    this.context.canvas.height = height;
    this.setupContext();
  }

}