import React, { useEffect, useState, useRef } from 'react';

interface Stat {
  val: number;
  unit: string;
  label: string;
  isTextLabel?: boolean;
  textVal?: string;
}

interface GlassStatBarProps {
  stats: Stat[];
}

export const GlassStatBar: React.FC<GlassStatBarProps> = ({ stats }) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        
        stats.forEach((stat, idx) => {
          if (stat.isTextLabel) return;
          let cur = 0;
          const tgt = stat.val;
          const step = Math.max(1, Math.ceil(tgt / 20));
          
          const iv = setInterval(() => {
            cur += step;
            if (cur >= tgt) {
              cur = tgt;
              clearInterval(iv);
            }
            setAnimatedValues(prev => {
              const next = [...prev];
              next[idx] = cur;
              return next;
            });
          }, 40);
        });
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stats, hasAnimated]);

  return (
    <div className="glass-bar interactive" ref={ref}>
      {stats.map((stat, i) => (
        <div className="stat-item" key={i}>
          <div className="stat-val">
            {stat.isTextLabel ? stat.textVal : animatedValues[i]}
            <span>{stat.unit}</span>
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};



