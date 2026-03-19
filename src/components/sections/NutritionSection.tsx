import React from 'react';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';

export const NutritionSection: React.FC = () => {
  const { ref, revealClass } = useIntersectionReveal();

  const macros = [
    { label: "Calories", val: "120" },
    { label: "Total Fat", val: "1g" },
    { label: "Cholesterol", val: "5mg" },
    { label: "Total Carbohydrate", val: "1g" },
    { label: "Dietary Fiber", val: "0g" },
    { label: "Total Sugars", val: "0g" },
    { label: "Protein", val: "30g" }
  ];

  return (
    <section id="nutrition" ref={ref} style={{ padding: '8rem 4rem', position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
        
        <div className={`glass-bar ${revealClass}`} style={{ flex: '1 1 400px', padding: '3rem' }}>
          <h3 style={{ fontSize: '2rem', fontFamily: 'var(--heading)', fontWeight: 900, marginBottom: '0.5rem', textTransform: 'uppercase' }}>Nutrition Facts</h3>
          <p style={{ color: 'var(--concrete-dim)', marginBottom: '2rem' }}>1 Scoop (32g) / 30 Servings Per Container</p>
          
          <div style={{ borderTop: '4px solid var(--warm-white)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            {macros.map((m, i) => (
              <div key={i} style={{ 
                display: 'flex', justifyContent: 'space-between', 
                padding: '1rem 0',
                borderBottom: i !== macros.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                fontWeight: m.label === 'Protein' ? 700 : 400,
                color: m.label === 'Protein' ? 'var(--accent-gold)' : 'var(--warm-white)'
              }}>
                <span>{m.label}</span>
                <span>{m.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={revealClass} style={{ flex: '1 1 400px', transitionDelay: '200ms' }}>
          <p className="overline">Pure Yield</p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: '3.5rem', fontWeight: 500, marginBottom: '2rem' }}>Macronutrient<br/>Perfection.</h2>
          <p style={{ color: 'var(--concrete-dim)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem' }}>
            No trace elements. No fillers. Just the essential building blocks required for absolute hypertrophy and sustained muscle protein synthesis.
          </p>
          <a href="#acquire" className="btn-outline interactive">View Full Label</a>
        </div>

      </div>
    </section>
  );
};



