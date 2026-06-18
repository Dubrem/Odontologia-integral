import { useEffect, useRef } from 'react';
import { gsap, STAGGER } from '../config/gsap.config';
import { testimonios } from '../data';

function Stars({ n }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonios() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        opacity: 0, y: 30, duration: 0.7, stagger: STAGGER,
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      /* Staggered fade-in for cards, each from a slightly different y */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 40 + i * 10,
          duration: 0.8,
          ease: 'power2.out',
          // delayedCall-style stagger via delay
          delay: i * 0.13,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonios" ref={sectionRef} className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headRef} className="text-center mb-16">
          <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Lo que dicen nuestros pacientes
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-slate-900"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Historias de éxito
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonios.map((t, i) => (
            <div
              key={t.id}
              ref={el => (cardsRef.current[i] = el)}
              className="bg-white rounded-2xl p-8 shadow-md relative overflow-hidden"
            >
              {/* Quote mark */}
              <div
                className="absolute top-4 right-6 text-8xl font-serif leading-none select-none"
                style={{ color: '#EFF6FF' }}
              >
                "
              </div>

              <Stars n={t.estrellas} />
              <p className="text-slate-700 leading-relaxed text-base mb-6 relative z-10">
                "{t.texto}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.foto}
                  alt={t.autor}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.autor}</p>
                  <p className="text-slate-400 text-xs">{t.ciudad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
