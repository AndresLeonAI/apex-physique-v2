import React from 'react';

interface ChapterMarkersProps {
  activeIndex: number;
  total: number;
}

export const ChapterMarkers: React.FC<ChapterMarkersProps> = ({ activeIndex, total }) => {
  return (
    <div className="chapter-markers">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`marker ${activeIndex === i ? 'active' : ''}`}></div>
      ))}
    </div>
  );
};



