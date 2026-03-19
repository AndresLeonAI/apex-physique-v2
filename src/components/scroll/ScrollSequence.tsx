import React, { useEffect, useRef } from 'react';
import { useScrollDwellEngine } from '../../hooks/useScrollDwellEngine';

interface ScrollSequenceProps {
  totalFrames: number;
  frames: (HTMLImageElement | null)[];
  children: React.ReactNode;
}

export const ScrollSequence: React.FC<ScrollSequenceProps> = ({ totalFrames, frames, children }) => {
  const { currentFrame } = useScrollDwellEngine(totalFrames);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Fixed Dimensions based on generated frames
    canvas.width = 1920;
    canvas.height = 1080;

    const f = Math.round(currentFrame);
    if (!frames[f]) {
      // Fallback to closest loaded frame
      let closest: HTMLImageElement | null = null;
      let minDist = Infinity;
      for (let i = 0; i < frames.length; i++) {
        if (frames[i]) {
          const d = Math.abs(i - f);
          if (d < minDist) { minDist = d; closest = frames[i]; }
        }
      }
      if (closest) ctx.drawImage(closest, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.drawImage(frames[f]!, 0, 0, canvas.width, canvas.height);
    }
  }, [currentFrame, frames]);

  return (
    <div className="scroll-sequence" id="scroll-sequence">
      <div className="sticky-container">
        <canvas id="frame-canvas" ref={canvasRef}></canvas>
        <div className="readability-overlay" id="readability-wash"></div>
        {/* Render child scroll sections securely positioned perfectly over the canvas */}
        {children}
      </div>
    </div>
  );
};



