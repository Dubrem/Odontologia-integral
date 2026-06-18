import { useEffect, useRef, useState } from 'react';

/**
 * Lazy-loads an image using IntersectionObserver.
 * Returns { imgRef, isLoaded } — apply imgRef to the <img> element
 * and toggle 'loaded' className for the blur-to-clear transition.
 */
export function useLazyImage(src) {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.src = src;
          el.onload = () => setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return { imgRef, isLoaded };
}
