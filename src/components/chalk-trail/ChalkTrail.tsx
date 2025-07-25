import React from 'react';
import type { ChalkTrailProps } from './types';
import { useChalkAnimation } from '@/hooks/useChalkAnimation.ts';

const DEFAULT_PROPS: Required<ChalkTrailProps> = {
  backgroundColor: '#1a1a1a',
  chalkColor: 'rgba(198, 188, 240, 0.8)', // Primary color
  trailLength: 2000,
  fadeSpeed: 0.02,
  particleSize: 4, // Slightly larger for more visible trails
  spawnRate: 2, // Lower spawn rate for smoother trails
  maxParticles: 800,
  isActive: true
};

export function ChalkTrail(props: ChalkTrailProps = {}) {
  const mergedProps = { ...DEFAULT_PROPS, ...props };
  
  // const { canvasRef, particleCount, isAnimating } = useChalkAnimation(mergedProps);
  const { canvasRef } = useChalkAnimation(mergedProps);

  const canvasStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 10,
    backgroundColor: 'transparent'
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={canvasStyle}
        aria-hidden="true"
        data-testid="chalk-trail-canvas"
      />
      
      {/* DEV DEBUG */}
      {/*{process.env.NODE_ENV === 'development' && (*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      position: 'fixed',*/}
      {/*      top: 10,*/}
      {/*      right: 10,*/}
      {/*      backgroundColor: 'rgba(0, 0, 0, 0.8)',*/}
      {/*      color: 'white',*/}
      {/*      padding: '8px 12px',*/}
      {/*      borderRadius: '4px',*/}
      {/*      fontSize: '11px',*/}
      {/*      fontFamily: 'monospace',*/}
      {/*      zIndex: 9999,*/}
      {/*      pointerEvents: 'none',*/}
      {/*      userSelect: 'none'*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div>Particles: {particleCount}</div>*/}
      {/*    <div>Animating: {isAnimating ? 'Yes' : 'No'}</div>*/}
      {/*    <div>Active: {mergedProps.isActive ? 'Yes' : 'No'}</div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}

export default ChalkTrail;