import React from 'react';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';

export const GallerySection: React.FC = () => {
  const { ref, revealClass } = useIntersectionReveal();

  const frames = [
    '/frames/desktop/frame-0010.webp',
    '/frames/desktop/frame-0035.webp',
    '/frames/desktop/frame-0060.webp',
    '/frames/desktop/frame-0085.webp',
    '/frames/desktop/frame-0105.webp',
    '/frames/desktop/frame-0115.webp',
  ];

  return (
    <section id="gallery" ref={ref} style={{ padding: '8rem 4rem', position: 'relative', zIndex: 10 }}>
       <div className={`text-center ${revealClass}`} style={{ marginBottom: '5rem' }}>
        <p className="overline">The Visuals</p>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: '3rem', fontWeight: 500 }}>Pure Aesthetics</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        gridAutoRows: '400px'
      }}>
        {frames.map((src, i) => (
          <div key={i} className={`interactive ${revealClass}`} style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '4px',
            transitionDelay: `${(i % 3) * 150}ms`
          }}>
            <img src={src} alt={`Gallery ${i}`} style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: 'grayscale(30%) contrast(1.2)'
            }} 
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>
    </section>
  );
};



