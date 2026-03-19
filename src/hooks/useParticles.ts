import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  op: number;
}

export function useParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pWidth = window.innerWidth;
    let pHeight = window.innerHeight;
    canvas.width = pWidth;
    canvas.height = pHeight;
    
    const particlesArray: Particle[] = [];
    for(let i=0; i<40; i++) {
      particlesArray.push({
        x: Math.random() * pWidth,
        y: Math.random() * pHeight,
        r: Math.random() * 1.5 + 0.5,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * -0.5 - 0.1,
        op: Math.random() * 0.3 + 0.1
      });
    }

    let animationId: number;
    const drawParticles = () => {
      ctx.clearRect(0, 0, pWidth, pHeight);
      ctx.fillStyle = '#ffffff';
      
      particlesArray.forEach(p => {
        p.x += p.vx; 
        p.y += p.vy;
        
        if (p.y < -10) { p.y = pHeight + 10; p.x = Math.random() * pWidth; }
        if (p.x < -10) p.x = pWidth + 10;
        if (p.x > pWidth + 10) p.x = -10;
        
        ctx.globalAlpha = p.op;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animationId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    const handleResize = () => {
      pWidth = window.innerWidth;
      pHeight = window.innerHeight;
      canvas.width = pWidth;
      canvas.height = pHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return canvasRef;
}
