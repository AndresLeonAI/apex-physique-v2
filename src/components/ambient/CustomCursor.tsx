import React from 'react';
import { useCustomCursor } from '../../hooks/useCustomCursor';

export const CustomCursor: React.FC = () => {
  const { mousePos, ringPos, isHovering } = useCustomCursor();

  // Hide on mobile (coarse pointer)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div 
        id="cursor-dot" 
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      <div 
        id="cursor-ring" 
        className={isHovering ? 'hovering' : ''}
        style={{ left: ringPos.x, top: ringPos.y }}
      />
    </>
  );
};



