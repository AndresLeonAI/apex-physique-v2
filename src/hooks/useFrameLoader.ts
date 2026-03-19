import { useState, useEffect } from 'react';

export function useFrameLoader(totalFrames: number, frameDir: string) {
  const [frames, setFrames] = useState<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const pad = (num: number, size: number) => {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  };

  useEffect(() => {
    let loadedCount = 0;
    const loadedFrames = new Array(totalFrames).fill(null);
    
    // Prioritize skipping every 10th frame, then fill rest
    const indices: number[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      if (i === 1 || i % 10 === 0) indices.unshift(i);
      else indices.push(i);
    }
    
    const loadNext = (idxList: number[]) => {
      if (idxList.length === 0) return;
      
      const i = idxList.shift()!;
      const img = new Image();
      img.src = `${frameDir}/frame-${pad(i, 4)}.webp`;
      
      img.onload = () => {
        loadedFrames[i - 1] = img;
        loadedCount++;
        
        const pct = Math.floor((loadedCount / totalFrames) * 100);
        setProgress(pct);
        setFrames([...loadedFrames]);
        
        // Unblock UI quickly when the first frame lands
        if (loadedCount === 1) {
          setTimeout(() => setIsLoaded(true), 300);
        }
        
        loadNext(idxList);
      };
      
      img.onerror = () => loadNext(idxList); // Silently skip 404s
    };
    
    // Spawn 4 concurrent load streams for performance
    for (let j = 0; j < 4; j++) loadNext(indices);
    
  }, [totalFrames, frameDir]);

  return { frames, progress, isLoaded };
}
