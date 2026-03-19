import React, { useEffect, useState } from 'react';

interface GlassHeaderProps {
  revealThreshold: number; // Raw progress (0 to 1) when the nav should drop down
}

export const GlassHeader: React.FC<GlassHeaderProps> = ({ revealThreshold }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationId: number;
    const checkScroll = () => {
      const seq = document.getElementById('scroll-sequence');
      if (!seq) {
        setIsVisible(true); // Default to visible if no sequence found
        return;
      }

      const rect = seq.getBoundingClientRect();
      let rawProgress = Math.max(0, -rect.top / (rect.height - window.innerHeight));
      if (isNaN(rawProgress)) rawProgress = 0;

      // if user passed the sequence entirely, rawProgress > 1.
      // We reveal header if rawProgress >= revealThreshold 
      if (rawProgress >= revealThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      animationId = requestAnimationFrame(checkScroll);
    };

    checkScroll();
    return () => cancelAnimationFrame(animationId);
  }, [revealThreshold]);

  return (
    <header className="glass-header" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      padding: '1.5rem 4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      background: 'rgba(5, 5, 5, 0.45)', // very dark translucent
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.15)', // subtle gold stroke
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'auto' : 'none'
    }}>
      <div className="logo" style={{
        fontFamily: 'var(--heading)',
        fontWeight: 900,
        fontSize: '1.2rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--warm-white)'
      }}>
        APEX
      </div>

      <nav style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        {['Formulations', 'Science', 'Reviews'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link interactive" style={{
            color: 'var(--warm-white-dim)',
            textDecoration: 'none',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            transition: 'color 0.3s ease'
          }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-gold)'}
             onMouseOut={e => e.currentTarget.style.color = 'var(--warm-white-dim)'}>
            {item}
          </a>
        ))}
        {/* CTA Button */}
        <a href="#acquire" className="interactive" style={{
          padding: '0.8rem 2rem',
          background: 'transparent',
          color: 'var(--accent-gold)',
          border: '1px solid var(--accent-gold)',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          boxShadow: 'inset 0 0 0 rgba(212, 175, 55, 0)',
        }} onMouseOver={e => {
            e.currentTarget.style.background = 'var(--accent-gold)';
            e.currentTarget.style.color = 'var(--ink)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(212,175,55,0.4)';
          }}
           onMouseOut={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--accent-gold)';
            e.currentTarget.style.boxShadow = 'inset 0 0 0 rgba(212,175,55,0)';
           }}>
          Acquire
        </a>
      </nav>
    </header>
  );
};



