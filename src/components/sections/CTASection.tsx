import React from 'react';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';

export const CTASection: React.FC = () => {
  const { ref, revealClass } = useIntersectionReveal();

  return (
    <section id="acquire" ref={ref} style={{ 
      padding: '12rem 4rem', 
      position: 'relative', 
      zIndex: 10,
      background: 'linear-gradient(to top, var(--charcoal), var(--ink))',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div className={revealClass} style={{ maxWidth: '800px' }}>
        <p className="overline" style={{ color: 'var(--warm-white)' }}>The Pinnacle of Performance</p>
        <h2 style={{ 
          fontFamily: 'var(--heading)', 
          fontSize: 'clamp(3rem, 6vw, 5rem)', 
          fontWeight: 900, 
          textTransform: 'uppercase',
          lineHeight: 1.1,
          marginBottom: '3rem'
        }}>
          Join the<br/><span className="text-gold-metallic">Elite.</span>
        </h2>
        
        <a href="#" className="btn-gold interactive" style={{ fontSize: '1.2rem', padding: '1.5rem 5rem' }}>
          Acquire Now
        </a>
        <p style={{ marginTop: '2rem', color: 'var(--stone)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>FREE INTERNATIONAL SHIPPING ON ALL ORDERS OVER $150.</p>
      </div>
    </section>
  );
};



