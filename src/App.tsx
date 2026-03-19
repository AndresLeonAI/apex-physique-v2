import React from 'react';
import { useFrameLoader } from './hooks/useFrameLoader';
import { Loader } from './components/layout/Loader';
import { FilmGrain, Vignette, ParticlesCanvas } from './components/ambient/CinematicEffects';
import { CustomCursor } from './components/ambient/CustomCursor';
import { GlassHeader } from './components/layout/GlassHeader';
import { Footer } from './components/layout/Footer';
import { AnimatedHeroFrames } from './components/scroll/AnimatedHeroFrames';

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
        {/* HERO SEQUENCE: Scroll-bound pinned canvas and overlay sections */}
        <AnimatedHeroFrames totalFrames={TOTAL_FRAMES} frames={frames} />

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



