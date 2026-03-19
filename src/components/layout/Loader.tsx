import React from 'react';

interface LoaderProps {
  progress: number;
  isLoaded: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ progress, isLoaded }) => {
  return (
    <div id="loader" className={isLoaded ? 'hidden' : ''} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'var(--ink)', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.8s ease, filter 0.8s ease',
      opacity: isLoaded ? 0 : 1,
      filter: isLoaded ? 'blur(10px)' : 'none',
      pointerEvents: isLoaded ? 'none' : 'auto'
    }}>
      <div className="loader-brand" style={{
        fontFamily: 'var(--heading)', fontWeight: 900, fontSize: '2rem',
        letterSpacing: '0.25em', color: 'var(--warm-white)', textTransform: 'uppercase', marginBottom: '2rem'
      }}>
        APEX PHYSIQUE
      </div>
      <div className="progress-track" style={{
        width: '140px', height: '1px', background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden'
      }}>
        <div className="progress-fill" style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--pure-gold-deep), var(--pure-gold-light))',
          transition: 'width 0.2s ease-out'
        }}></div>
      </div>
      <div className="progress-text" style={{
        marginTop: '1rem', fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--concrete-dim)', fontWeight: 500
      }}>
        LOADING {progress}%
      </div>
    </div>
  );
};



