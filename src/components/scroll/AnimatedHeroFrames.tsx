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
        <div id="sec-1" className={`scroll-section flex flex-col justify-start md:justify-center items-center md:items-start text-center md:text-left px-4 pt-24 md:pt-0 md:pl-24 ${isSec1 ? 'visible' : ''}`} style={{ transform: isSec1 ? parallaxTransform : 'translateY(30px)' }}>
          <div className="hero-content responsive-hero-content z-20 w-full" style={{ paddingBottom: '2rem' }}>
            <div className="overline text-gold-metallic">APEX Formulation</div>
            <h1 className="hero-title pt-4 pb-4">Unleash Your<br/><span className="text-gold-metallic">Potential</span></h1>
            <p className="hero-subtitle mx-auto md:mx-0 max-w-[90%]">Ultra-Isolate Whey Protein engineered for elite performance.</p>
          </div>
          
          <div className="glass-bar interactive shrink-0 mx-auto md:mx-0 mt-auto md:mt-0 mb-8 md:mb-0 w-[90%] md:w-auto flex justify-around">
            <div className="stat-item flex flex-col items-center">
              <AnimatedCounter target={30} />
              <div className="stat-label">Pure Protein</div>
            </div>
            <div className="stat-item flex flex-col items-center">
              <AnimatedCounter target={0} />
              <div className="stat-label">Added Sugar</div>
            </div>
            <div className="stat-item flex flex-col items-center">
              <div className="stat-val stat-counter">Fast</div>
              <div className="stat-label">Absorption Rate</div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div id="sec-2" className={`scroll-section flex flex-col justify-start md:justify-center items-center md:items-end text-center md:text-right px-4 pt-24 md:pt-0 md:pr-24 ${isSec2 ? 'visible' : ''}`} style={{ transform: isSec2 ? parallaxTransform : 'translateY(30px)', width: '100%' }}>
          <div className="z-20 w-full max-w-[95%]">
            <div className="overline text-gold-metallic">The Taste of Luxury</div>
            <h2 className="hero-title py-4" style={{ fontSize: 'var(--fluid-h2)' }}>Natural<br/>Vanilla Bean</h2>
            <p className="hero-subtitle mx-auto md:mx-0 max-w-[90%] md:max-w-[400px]">Sourced directly from Madagascar.<br/>A delicate, sophisticated profile without chemical aftertastes.</p>
          </div>
        </div>

        {/* Section 3 */}
        <div id="sec-3" className={`scroll-section flex flex-col justify-between items-center w-full px-4 py-12 md:p-24 ${isSec3 ? 'visible' : ''}`} style={{ transform: isSec3 ? parallaxTransform : 'translateY(30px)' }}>
          <div className="text-center md:text-left md:self-start z-20">
            <div className="overline text-gold-metallic">SOTD Engineering</div>
            <h2 className="hero-title py-2" style={{ fontSize: 'var(--fluid-h2)' }}>Matte Rubber<br/><span className="text-gold-metallic">Finish</span></h2>
          </div>
          
          <div className="spec-grid flex flex-col md:flex-row justify-between w-full md:mt-12 gap-4 md:gap-0">
            <div className="spec-item interactive glass-feature max-w-[90%] md:max-w-sm mx-auto md:mx-0 text-center md:text-left" style={{ transform: `translateY(${(rawProgress - 0.5) * 50}px)` }}>
              <h3 className="stat-val" style={{ fontSize: 'var(--fluid-h3)', marginBottom: '0.5rem' }}>Airtight Seal</h3>
              <p className="stat-label" style={{ color: 'var(--concrete)' }}>Preserves absolute freshness and prevents degradation.</p>
            </div>
            <div className="spec-item interactive glass-feature max-w-[90%] md:max-w-sm mx-auto md:mx-0 text-center md:text-left md:mt-48" style={{ transform: `translateY(${-(rawProgress - 0.5) * 50}px)` }}>
              <h3 className="stat-val" style={{ fontSize: 'var(--fluid-h3)', marginBottom: '0.5rem' }}>Ergonomic Grip</h3>
              <p className="stat-label" style={{ color: 'var(--concrete)' }}>Designed for the modern athlete's lifestyle.</p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div id="sec-4" className={`scroll-section flex justify-center md:justify-end items-end md:items-center px-4 md:px-24 pb-24 md:pb-0 w-full ${isSec4 ? 'visible' : ''}`} style={{ transform: isSec4 ? parallaxTransform : 'translateY(30px)' }}>
          <a href="#acquire" className="btn-gold interactive mb-[10vh] md:mb-0 w-full md:w-auto text-center" style={{ padding: '1.5rem 3rem', fontSize: '1.2rem', letterSpacing: '0.15em' }}>ACQUIRE NOW</a>
        </div>
      </div>

      <ChapterMarkers activeIndex={activeIndex} total={4} />
    </div>
  );
};
