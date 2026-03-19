import React from 'react';
import { useParticles } from '../../hooks/useParticles';

export const FilmGrain: React.FC = () => (
  <svg className="film-grain" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

export const Vignette: React.FC = () => (
  <div className="vignette"></div>
);

export const ParticlesCanvas: React.FC = () => {
  const canvasRef = useParticles();
  return <canvas id="particles" ref={canvasRef}></canvas>;
};



