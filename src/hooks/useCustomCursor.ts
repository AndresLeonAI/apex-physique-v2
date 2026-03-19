import { useState, useEffect } from 'react';

export function useCustomCursor() {
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [ringPos, setRingPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const renderCursor = () => {
      setRingPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15
      }));
      animationId = requestAnimationFrame(renderCursor);
    };
    renderCursor();

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.interactive') || (e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  return { mousePos, ringPos, isHovering };
}
