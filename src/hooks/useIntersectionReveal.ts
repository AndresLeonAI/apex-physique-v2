import { useEffect, useRef, useState } from 'react';

export function useIntersectionReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el); // Only reveal once
      }
    }, { threshold });

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const revealClass = isVisible ? 'reveal-visible' : 'reveal-hidden';

  return { ref, revealClass };
}
