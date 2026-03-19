import React from 'react';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';

export const IngredientsSection: React.FC = () => {
  const { ref, revealClass } = useIntersectionReveal();

  return (
    <section id="formulations" ref={ref} style={{ padding: '8rem 4rem', position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
        
        <div className={revealClass} style={{ flex: '1 1 400px' }}>
          <p className="overline">Formulations</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '3.5rem', fontWeight: 500, marginBottom: '2rem' }}>
            Precision<br/><span className="text-gold-metallic">Engineering</span>
          </h2>
          <p style={{ color: 'var(--concrete-dim)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '3rem', maxWidth: '500px' }}>
            Every scoop is precisely calibrated. We source only grass-fed, pasture-raised whey protein isolate, yielding maximum bioavailability and zero gastric distress.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['100% Isolate (Cross-Flow Microfiltered)', '5.5g Naturally Occurring BCAAs', 'Digestive Enzyme Matrix (Protease & Lactase)'].map((l, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--warm-white)', fontWeight: 500 }}>
                <div style={{ width: '6px', height: '6px', background: 'var(--accent-gold)', borderRadius: '50%' }}></div>
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${revealClass} interactive`} style={{
          flex: '1 1 400px', 
          height: '600px',
          background: 'linear-gradient(rgba(10,10,10,0.2), rgba(10,10,10,0.8)), url(/frames/desktop/frame-0050.webp) center/cover',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '3rem',
          transitionDelay: '300ms',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
        }}>
          <div>
             <h3 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>The Matrix</h3>
             <p style={{ color: 'var(--concrete)' }}>View full laboratory breakdown.</p>
          </div>
        </div>

      </div>
    </section>
  );
};



