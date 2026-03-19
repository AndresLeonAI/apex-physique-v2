import React from 'react';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { ref, revealClass } = useIntersectionReveal();

  const reviews = [
    { name: "Marcus T.", role: "Pro Athlete", text: "The cleanest protein I've ever consumed. Period. No bloating, mixes instantly, and the vanilla flavor is phenomenal." },
    { name: "Sarah J.", role: "Crossfit Coach", text: "Apex literally changed my recovery game. I recommend it to all my clients who need clean macros." },
    { name: "David L.", role: "Bodybuilder", text: "Finally a brand that doesn't hide behind proprietary blends. The 30g hit exactly when I need it post-workout." }
  ];

  return (
    <section id="reviews" ref={ref} style={{ padding: '8rem 4rem', position: 'relative', zIndex: 10, background: 'var(--charcoal)' }}>
       <div className={`text-center ${revealClass}`} style={{ marginBottom: '5rem' }}>
        <p className="overline">The Vanguard</p>
        <h2 style={{ fontFamily: 'var(--display)', fontSize: '3rem', fontWeight: 500 }}>Athlete Verified</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {reviews.map((r, i) => (
          <div key={i} className={`glass-bar interactive ${revealClass}`} style={{
            padding: '3rem 2.5rem',
            transitionDelay: `${i * 150}ms`,
            background: 'var(--ink)'
          }}>
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
              {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />)}
            </div>
            <p style={{ color: 'var(--concrete)', lineHeight: 1.8, fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '2rem' }}>"{r.text}"</p>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--concrete-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{r.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};



