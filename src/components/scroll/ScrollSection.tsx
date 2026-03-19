import React, { useEffect, useState } from 'react';

interface ScrollSectionProps {
  id: string;
  showAt: number;
  hideAt: number;
  alignEnd?: boolean;
  isCentered?: boolean;
  children: React.ReactNode;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({ id, showAt, hideAt, alignEnd, isCentered, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    let animationId: number;
    const checkScroll = () => {
      const seq = document.getElementById('scroll-sequence');
      if (!seq) {
        animationId = requestAnimationFrame(checkScroll);
        return;
      }
      const rect = seq.getBoundingClientRect();
      let rawProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      if (isNaN(rawProgress)) rawProgress = 0;

      if (rawProgress >= showAt && rawProgress <= hideAt) {
        setIsVisible(true);
        setParallax((rawProgress * 150) % 20);
      } else {
        setIsVisible(false);
      }
      animationId = requestAnimationFrame(checkScroll);
    };

    checkScroll();
    return () => cancelAnimationFrame(animationId);
  }, [showAt, hideAt]);

  const classes = ['scroll-section', isVisible ? 'visible' : ''].filter(Boolean).join(' ');
  const styles: React.CSSProperties = {
    transform: isVisible ? `translateY(${-parallax}px)` : 'translateY(30px)',
  };

  if (alignEnd) {
    styles.alignItems = 'flex-end';
    styles.textAlign = 'right';
  }
  
  if (isCentered) {
    styles.alignItems = 'center';
    styles.textAlign = 'center';
    styles.justifyContent = 'flex-end';
    styles.paddingBottom = '8vh';
  }

  return (
    <div id={id} className={classes} style={styles}>
      {children}
    </div>
  );
};



