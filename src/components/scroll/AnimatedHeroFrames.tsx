import React, { useEffect, useRef, useState } from 'react';
import { useScrollDwellEngine } from '../../hooks/useScrollDwellEngine';
import { ChapterMarkers } from './ChapterMarkers';

interface AnimatedHeroFramesProps {
  totalFrames: number;
  frames: (HTMLImageElement | null)[];
}

const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

const AnimatedCounter: React.FC<{ target: number }> = ({ target }) => {
  const [val, setVal] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated || target === 0) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasAnimated(true);
        let startTimestamp: number | null = null;
        const duration = 2500; // 2.5 seconds luxury build-up

        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = easeOutExpo(progress);
          setVal(Math.floor(easeProgress * target));
          
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setVal(target);
          }
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, target]);

  return <div ref={ref} className="stat-val stat-counter">{val}<span>g</span></div>;
};

// Exact replica of the original Vanilla HTML Sections with identical timings!
export const AnimatedHeroFrames: React.FC<AnimatedHeroFramesProps> = ({ totalFrames, frames }) => {
  const { currentFrame } = useScrollDwellEngine(totalFrames);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);

  const [rawProgress, setRawProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const f = Math.round(currentFrame);
    if (!frames[f]) {
      let closest: HTMLImageElement | null = null;
      let minDist = Infinity;
      for (let i = 0; i < frames.length; i++) {
        if (frames[i]) {
          const d = Math.abs(i - f);
          if (d < minDist) { minDist = d; closest = frames[i]; }
        }
      }
      if (closest) ctx.drawImage(closest, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.drawImage(frames[f]!, 0, 0, canvas.width, canvas.height);
    }
  }, [currentFrame, frames]);

  // Sync scroll progress down to the sections exactly like the original tick()
  useEffect(() => {
    let animationId: number;
    const tick = () => {
      if (seqRef.current) {
        const rect = seqRef.current.getBoundingClientRect();
        let raw = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        if (isNaN(raw)) raw = 0;
        setRawProgress(raw);
      }
      animationId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Section visible togglers (exact timings: 0.0-0.18, 0.25-0.45, 0.52-0.72, 0.80-1.0)
  const isSec1 = rawProgress >= 0.0 && rawProgress <= 0.18;
  const isSec2 = rawProgress >= 0.25 && rawProgress <= 0.45;
  const isSec3 = rawProgress >= 0.52 && rawProgress <= 0.72;
  const isSec4 = rawProgress >= 0.80 && rawProgress <= 1.0;

  // Parallax transform replica -> (rawProgress * 150) % 20
  const parallaxTransform = `translateY(${-(rawProgress * 150) % 20}px)`;

  // Determine active marker
  let activeIndex = 0;
  if (isSec2) activeIndex = 1;
  else if (isSec3) activeIndex = 2;
  else if (isSec4) activeIndex = 3;

  return (
    <div className="scroll-sequence" id="scroll-sequence" ref={seqRef}>
      <div className="sticky-container">
        <canvas id="frame-canvas" ref={canvasRef}></canvas>
        <div className="readability-overlay" id="readability-wash"></div>
        
        {/* Section 1: Hero */}
        <div id="sec-1" className={`scroll-section ${isSec1 ? 'visible' : ''}`} style={{ transform: isSec1 ? parallaxTransform : 'translateY(30px)' }}>
          <div className="hero-content">
            <div className="overline text-gold-metallic">APEX Formulation</div>
            <h1 className="hero-title">Unleash Your<br/><span className="text-gold-metallic">Potential</span></h1>
            <p className="hero-subtitle">Ultra-Isolate Whey Protein engineered for elite performance.</p>
          </div>
          
          <div className="glass-bar interactive">
            <div className="stat-item">
              <AnimatedCounter target={30} />
              <div className="stat-label">Pure Protein</div>
            </div>
            <div className="stat-item">
              <AnimatedCounter target={0} />
              <div className="stat-label">Added Sugar</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">Fast</div>
              <div className="stat-label">Absorption Rate</div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div id="sec-2" className={`scroll-section ${isSec2 ? 'visible' : ''}`} style={{ transform: isSec2 ? parallaxTransform : 'translateY(30px)' }}>
          <div className="overline text-gold-metallic">The Taste of Luxury</div>
          <h2 className="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>Natural<br/>Vanilla Bean</h2>
          <p className="hero-subtitle" style={{ marginBottom: 0 }}>Sourced directly from Madagascar.<br/>A delicate, sophisticated profile without chemical aftertastes.</p>
        </div>

        {/* Section 3 */}
        <div id="sec-3" className={`scroll-section ${isSec3 ? 'visible' : ''}`} style={{ transform: isSec3 ? parallaxTransform : 'translateY(30px)' }}>
          <div className="overline text-gold-metallic">SOTD Engineering</div>
          <h2 className="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>Matte Rubber<br/><span className="text-gold-metallic">Finish</span></h2>
          <div className="spec-grid interactive">
            <div className="spec-item">
              <h3 className="stat-val" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Airtight Seal</h3>
              <p className="stat-label" style={{ color: 'var(--concrete)' }}>Preserves absolute freshness and prevents degradation.</p>
            </div>
            <div className="spec-item">
              <h3 className="stat-val" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Ergonomic Grip</h3>
              <p className="stat-label" style={{ color: 'var(--concrete)' }}>Designed for the modern athlete's lifestyle.</p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div id="sec-4" className={`scroll-section ${isSec4 ? 'visible' : ''}`} style={{ transform: isSec4 ? parallaxTransform : 'translateY(30px)' }}>
          <a href="#acquire" className="btn-gold interactive">Acquire Now</a>
        </div>
      </div>

      <ChapterMarkers activeIndex={activeIndex} total={4} />
    </div>
  );
};
