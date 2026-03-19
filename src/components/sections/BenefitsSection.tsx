import React from 'react';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';
import { Zap, Droplet, ShieldCheck } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const { ref, revealClass } = useIntersectionReveal();

  const benefits = [
    { icon: <Zap size={40} className="text-gold-metallic" />, title: "Rapid Absorption", text: "Hydrolyzed whey peptides ensure nutrients hit your muscles within 15 minutes." },
    { icon: <Droplet size={40} className="text-gold-metallic" />, title: "Zero Filler", text: "No artificial dyes, no proprietary blends, 100% transparent labeling." },
    { icon: <ShieldCheck size={40} className="text-gold-metallic" />, title: "Lab Tested", text: "Third-party tested for purity, heavy metals, and banned substances." },
  ];

  return (
    <section id="science" ref={ref} style={{ padding: '8rem 4rem', position: 'relative', zIndex: 10 }}>
      <div className={`text-center ${revealClass}`} style={{ marginBottom: '5rem' }}>
        <p className="overline">The Science</p>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: '3.5rem', fontWeight: 500 }}>Uncompromising Quality</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {benefits.map((b, i) => (
          <div key={i} className={`glass-bar interactive ${revealClass}`} style={{
            padding: '3rem 2.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            transitionDelay: `${i * 150}ms`
          }}>
            <div style={{ padding: '1.5rem', background: 'var(--accent-gold-soft)', borderRadius: '50%' }}>
              {b.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{b.title}</h3>
            <p style={{ color: 'var(--concrete-dim)', lineHeight: 1.6, fontSize: '0.9rem' }}>{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};



