import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      padding: '8rem 4rem 4rem',
      background: 'var(--ink)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--heading)',
          fontWeight: 900,
          fontSize: '3rem',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: 'var(--concrete-dim)'
        }}>APEX PHYSIQUE</h2>
        <p style={{
          fontFamily: 'var(--display)',
          fontSize: '1rem',
          fontStyle: 'italic',
          color: 'var(--stone)',
          marginTop: '1rem'
        }}>Unleash Your Potential</p>
      </div>

      <div style={{
        display: 'flex',
        gap: '2rem',
        width: '100%',
        justifyContent: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '3rem'
      }}>
        <a href="#" className="interactive" style={{ color: 'var(--concrete-dim)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>TERMS</a>
        <a href="#" className="interactive" style={{ color: 'var(--concrete-dim)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>PRIVACY</a>
        <a href="#" className="interactive" style={{ color: 'var(--concrete-dim)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>CONTACT</a>
      </div>
      
      <p style={{ fontSize: '0.7rem', color: 'var(--stone)', letterSpacing: '0.1em' }}>
        © {new Date().getFullYear()} APEX PHYSIQUE. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};



