/**
 * Centralized GSAP configuration.
 * Import this once in main.jsx — all components inherit the registered plugins.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global defaults — keep durations short on mobile
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8,
});

// ScrollTrigger global settings
ScrollTrigger.config({
  // Snap to nearest pixel to avoid sub-pixel blurring
  ignoreMobileResize: true,
});

/**
 * Reusable reveal preset: fade up from 30px below.
 * Usage: gsap.from(el, REVEAL)
 */
export const REVEAL = {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power2.out',
};

/**
 * Stagger reveal for lists of elements.
 * Usage: gsap.from(els, { ...STAGGER_REVEAL, stagger: STAGGER })
 */
export const STAGGER_REVEAL = {
  opacity: 0,
  y: 40,
  duration: 0.7,
  ease: 'power2.out',
};

export const STAGGER = 0.12;

/**
 * Image scale-in on scroll.
 * Usage: gsap.fromTo(img, IMG_FROM, IMG_TO)
 */
export const IMG_FROM = { scale: 0.95, opacity: 0.7 };
export const IMG_TO   = { scale: 1,    opacity: 1, ease: 'power2.inOut', duration: 1.2 };

/**
 * Build a standard ScrollTrigger config.
 * @param {Element} trigger  — element that drives the animation
 * @param {string}  start    — e.g. "top 80%"
 * @param {boolean} once     — run once or every time
 */
export function buildST(trigger, start = 'top 80%', once = true) {
  return {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: once
        ? 'play none none none'
        : 'play none none reverse',
    },
  };
}

export { gsap, ScrollTrigger };
