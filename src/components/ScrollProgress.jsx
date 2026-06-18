import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../config/gsap.config';

/**
 * Thin progress bar pinned to the top of the viewport.
 * Driven by ScrollTrigger scrub so it mirrors exact scroll position.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={barRef}
      id="scroll-progress"
      style={{ transformOrigin: 'left center', transform: 'scaleX(0)' }}
    />
  );
}
