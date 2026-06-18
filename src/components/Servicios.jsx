import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, STAGGER_REVEAL, STAGGER, IMG_FROM, IMG_TO } from '../config/gsap.config';
import { services } from '../data';
import { useLazyImage } from '../hooks/useLazyImage';

function ServiceCard({ service, cardRef }) {
  const { imgRef, isLoaded } = useLazyImage(service.imagen);
  const imgWrapRef = useRef(null);

  // Per-card hover timeline
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(card.querySelector('.card-img'), { scale: 1.08, duration: 0.4, ease: 'power2.out' })
      .to(card.querySelector('.card-overlay'), { opacity: 0.7, duration: 0.3 }, 0)
      .to(card.querySelector('.card-body'), { y: -4, duration: 0.3 }, 0);

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());
    return () => {
      card.removeEventListener('mouseenter', () => tl.play());
      card.removeEventListener('mouseleave', () => tl.reverse());
    };
  }, [cardRef]);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white"
      style={{ minHeight: 340 }}
    >
      {/* Image wrapper with scroll scale */}
      <div ref={imgWrapRef} className="overflow-hidden h-48">
        <img
          ref={imgRef}
          alt={service.nombre}
          className={`card-img w-full h-full object-cover ${isLoaded ? 'loaded' : 'img-lazy'}`}
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        />
        <div
          className="card-overlay absolute inset-0 opacity-0"
          style={{ background: `linear-gradient(135deg, ${service.color}CC, transparent)` }}
        />
      </div>

      {/* Card body */}
      <div className="card-body p-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
          style={{ background: service.color + '20' }}
        >
          {service.icono}
        </div>
        <h3
          className="text-lg font-bold text-slate-900 mb-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {service.nombre}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">{service.descripcion}</p>
        <div
          className="mt-4 text-sm font-semibold flex items-center gap-1"
          style={{ color: service.color }}
        >
          Conocer más
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Servicios() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const cardRefs    = useRef(services.map(() => ({ current: null })));
  // rebuild refs array stably
  const getCardRef  = i => {
    if (!cardRefs.current[i]) cardRefs.current[i] = { current: null };
    return cardRefs.current[i];
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading reveal */
      gsap.from(headingRef.current.children, {
        ...STAGGER_REVEAL,
        stagger: STAGGER,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      /* Cards stagger reveal */
      const cards = cardRefs.current.map(r => r.current).filter(Boolean);
      gsap.from(cards, {
        ...STAGGER_REVEAL,
        y: 50,
        stagger: STAGGER,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      /* Scale image on scroll for each card */
      cards.forEach(card => {
        const img = card.querySelector('.card-img');
        if (!img) return;
        gsap.fromTo(img, IMG_FROM, {
          ...IMG_TO,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Lo que ofrecemos
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-slate-900"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Nuestros servicios
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
            Soluciones dentales completas con tecnología de vanguardia para cada etapa de tu vida.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              cardRef={getCardRef(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
