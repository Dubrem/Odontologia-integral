import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../config/gsap.config';

export default function Hero() {
  const sectionRef  = useRef(null);
  const bgRef       = useRef(null);   // layer 1 — moves at -0.3x (slowest)
  const overlayRef  = useRef(null);   // layer 2 — static
  const titleRef    = useRef(null);   // layer 3 — moves at 0.15x
  const subtitleRef = useRef(null);
  const ctaRef      = useRef(null);
  const badgeRef    = useRef(null);
  const scrollRef   = useRef(null);
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Collect all hero content elements so we can force-clear their opacity on cleanup
    const entranceEls = [
      badgeRef.current,
      ...Array.from(titleRef.current?.children || []),
      subtitleRef.current,
      ...Array.from(ctaRef.current?.children || []),
      scrollRef.current,
    ].filter(Boolean);

    /* ── Entrance sequence ── */
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(titleRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
        '-=0.2')
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4')
      .fromTo(Array.from(ctaRef.current.children),
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.3')
      .fromTo(scrollRef.current,
        { opacity: 0 }, { opacity: 1, duration: 0.5 },
        '-=0.1');

    /* ── ScrollTrigger parallax — set up AFTER entrance so scrub doesn't
         conflict with the opacity entrance tween on the same elements ── */
    const ctx = gsap.context(() => {
      if (!isMobile) {
        // Total entrance duration ≈ 0.3 delay + ~2.5s timeline ≈ 2.8s
        gsap.delayedCall(3, () => {
          // Background moves upward slower → depth illusion
          gsap.to(bgRef.current, {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          // Title drifts slightly up
          gsap.to(titleRef.current, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          // Only subtitle fades; CTA stays to avoid scrub/entrance conflict
          gsap.to(subtitleRef.current, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'center top',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      }
    }, sectionRef);

    return () => {
      tl.kill();
      // Force entrance elements back to visible so HMR re-run doesn't flash opacity:0
      gsap.set(entranceEls, { opacity: 1, y: 0, clearProps: 'transform' });
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Layer 1: Background image ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1920&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* ── Layer 2: Gradient overlay (static) ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,64,175,0.7) 50%, rgba(6,182,212,0.4) 100%)',
        }}
      />

      {/* ── Layer 3: Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">Consultorio #1 en Querétaro · 15 años de experiencia</span>
        </div>

        {/* Title — split into lines for stagger */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
          style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-1px' }}
        >
          <span className="block">Tu sonrisa,</span>
          <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            nuestra pasión
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-xl text-white/80 text-lg md:text-xl leading-relaxed mb-10"
        >
          Atención dental de vanguardia en el corazón de Querétaro. Tecnología de punta,
          sin dolor y con resultados que transforman vidas.
        </p>

        {/* CTA row */}
        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <a
            href="#contacto"
            onClick={e => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1"
          >
            Agendar cita gratis
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#servicios"
            onClick={e => { e.preventDefault(); document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200"
          >
            Ver servicios
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap gap-6">
          {[
            { icon: '✅', text: 'Pacientes sin dolor' },
            { icon: '🏆', text: 'Certificación SSA' },
            { icon: '💳', text: 'Planes de financiamiento' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <span className="text-white/70 text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
