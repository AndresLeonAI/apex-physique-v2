import { useState, useMemo, useEffect } from 'react';

const DWELL_CENTERS = [0.08, 0.35, 0.62, 0.90]; 
const DWELL_WIDTH = 0.05;
const DWELL_PEAK = 3.5;
const LUT_RESOLUTION = 2000;

export function useScrollDwellEngine(totalFrames: number) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const LERP_FACTOR = 0.08;

  // Build the Dwell LUT exactly as the SOTD script
  const { progressLUT, maxIntegral } = useMemo(() => {
    const lut = [];
    let integral = 0;
    for (let i = 0; i <= LUT_RESOLUTION; i++) {
      let x = i / LUT_RESOLUTION;
      let density = 1; 
      for (let c of DWELL_CENTERS) {
        density += DWELL_PEAK * Math.exp(-Math.pow(x - c, 2) / (2 * Math.pow(DWELL_WIDTH, 2)));
      }
      integral += density;
      lut.push({ x: x, integral: integral });
    }
    return { progressLUT: lut, maxIntegral: integral };
  }, []);

  const remapProgress = (raw: number) => {
    if (raw <= 0) return 0;
    if (raw >= 1) return 1;
    let targetIntegral = raw * maxIntegral;
    
    let low = 0, high = LUT_RESOLUTION;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (progressLUT[mid].integral < targetIntegral) low = mid + 1;
      else if (progressLUT[mid].integral > targetIntegral) high = mid - 1;
      else return progressLUT[mid].x;
    }
    return progressLUT[low] ? progressLUT[low].x : 1;
  };

  useEffect(() => {
    let animationFrameId: number;
    let internalCurrentFrame = 0;

    const tick = () => {
      const seq = document.getElementById('scroll-sequence');
      if (!seq) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }
      
      const rect = seq.getBoundingClientRect();
      let rawProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      if (isNaN(rawProgress)) rawProgress = 0;
      
      const remappedProgress = remapProgress(rawProgress);
      const targetFrame = remappedProgress * (totalFrames - 1);
      
      internalCurrentFrame += (targetFrame - internalCurrentFrame) * LERP_FACTOR;
      
      setCurrentFrame(Math.round(internalCurrentFrame));
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();
    return () => cancelAnimationFrame(animationFrameId);
  }, [totalFrames, progressLUT, maxIntegral]);

  return { currentFrame };
}
