import React from 'react';
import { useFrameLoader } from './hooks/useFrameLoader';
import { Loader } from './components/layout/Loader';
import { FilmGrain, Vignette, ParticlesCanvas } from './components/ambient/CinematicEffects';
import { CustomCursor } from './components/ambient/CustomCursor';
import { GlassHeader } from './components/layout/GlassHeader';
import { Footer } from './components/layout/Footer';
import { ScrollSequence } from './components/scroll/ScrollSequence';
import { ChapterMarkers } from './components/scroll/ChapterMarkers';
import { ScrollSection } from './components/scroll/ScrollSection';
import { GlassStatBar } from './components/scroll/GlassStatBar';

import { BenefitsSection } from './components/sections/BenefitsSection';
import { IngredientsSection } from './components/sections/IngredientsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { GallerySection } from './components/sections/GallerySection';
import { NutritionSection } from './components/sections/NutritionSection';
import { CTASection } from './components/sections/CTASection';

const TOTAL_FRAMES = 120; // 0 to 119 => 120 frames

export default function App() {
  const { frames, progress, isLoaded } = useFrameLoader(TOTAL_FRAMES, '/frames/desktop');

  return (
    <>
      <Loader progress={progress} isLoaded={isLoaded} />
      <FilmGrain />
      <Vignette />
      <ParticlesCanvas />
      <CustomCursor />
      
      {/* Appears when user scrolls past the sequence (rawProgress >= 1.0) */}
      <GlassHeader revealThreshold={1.0} />

      <main style={{ position: 'relative' }}>
        {/* HERO SEQUENCE: Scroll-bound pinned canvas and overlay sections */}
        <ScrollSequence totalFrames={TOTAL_FRAMES} frames={frames}>
          <ScrollSection id="sec-1" showAt={0} hideAt={0.25} alignEnd={false}>
            <div className="hero-content" style={{ maxWidth: '42vw', overflow: 'hidden' }}>
              <p className="overline">The Pinnacle</p>
              <h1 className="hero-title">APEX<br/>PHYSIQUE</h1>
              <p className="hero-subtitle">Ultra-Isolate Whey Protein. Formulated for the uncompromising.</p>
            </div>
          </ScrollSection>

          <ScrollSection id="sec-2" showAt={0.25} hideAt={0.5} alignEnd={true}>
            <div style={{ paddingRight: '4rem' }}>
              <GlassStatBar stats={[
                { val: 30, unit: 'g', label: 'Protein / Scoop' },
                { val: 0, unit: 'g', label: 'Sugar / Fillers' },
                { val: 120, unit: 'k', label: 'Calories', isTextLabel: true, textVal: '120' }
              ]} />
            </div>
          </ScrollSection>

          <ScrollSection id="sec-3" showAt={0.5} hideAt={0.8} alignEnd={false}>
            <div style={{ maxWidth: '40vw' }}>
              <p className="overline">Bioavailability</p>
              <h2 className="hero-title" style={{ fontSize: '2.5rem' }}>Maximum<br/><span className="text-gold-metallic">Absorption.</span></h2>
              <p className="hero-subtitle" style={{ fontSize: '1rem', marginTop: '1rem', lineHeight: 1.6 }}>
                Hydrolyzed at the molecular level to ensure rapid delivery of essential amino acids directly to muscle tissue.
              </p>
            </div>
          </ScrollSection>

          <ScrollSection id="sec-4" showAt={0.8} hideAt={1.0} isCentered={true}>
            {/* Minimalist CTA as requested previously */}
            <a href="#acquire" className="btn-gold interactive">Acquire Now</a>
          </ScrollSection>
          
          {/* We assume activeIndex is roughly progress / 0.25 */}
          <ChapterMarkers activeIndex={0} total={4} /> 
        </ScrollSequence>

        {/* BELOW THE FOLD: The standard long-scroll website sections */}
        <div style={{ position: 'relative', zIndex: 10, background: 'var(--ink)' }}>
          <BenefitsSection />
          <IngredientsSection />
          <NutritionSection />
          <TestimonialsSection />
          <GallerySection />
          <CTASection />
          <Footer />
        </div>
      </main>
    </>
  );
}



