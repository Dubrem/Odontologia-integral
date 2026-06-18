import { useEffect, useRef } from 'react';
import { gsap, STAGGER_REVEAL, STAGGER } from '../config/gsap.config';
import { equipo } from '../data';

function MemberCard({ member }) {
  const cardRef = useRef(null);
  const imgRef  = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const img  = imgRef.current;
    if (!card || !img) return;

    /* Slow continuous rotation reset on hover */
    const rotTl = gsap.to(img, {
      rotation: 3,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    /* Hover lift */
    const liftTl = gsap.timeline({ paused: true });
    liftTl.to(card, { y: -8, boxShadow: '0 20px 40px rgba(30,64,175,0.15)', duration: 0.3 });

    card.addEventListener('mouseenter', () => liftTl.play());
    card.addEventListener('mouseleave', () => liftTl.reverse());

    return () => {
      rotTl.kill();
      card.removeEventListener('mouseenter', () => liftTl.play());
      card.removeEventListener('mouseleave', () => liftTl.reverse());
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl p-8 text-center shadow-md"
      style={{ willChange: 'transform' }}
    >
      <div className="relative inline-block mb-5">
        <img
          ref={imgRef}
          src={member.foto}
          alt={member.nombre}
          className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-blue-100"
        />
        <span className="absolute bottom-0 right-0 w-6 h-6 bg-cyan-400 rounded-full border-2 border-white" />
      </div>
      <h3
        className="text-lg font-bold text-slate-900 mb-1"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {member.nombre}
      </h3>
      <p className="text-cyan-600 font-semibold text-sm mb-1">{member.cargo}</p>
      <p className="text-slate-400 text-xs mb-4">{member.cedula}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {member.especialidades.map(esp => (
          <span
            key={esp}
            className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
          >
            {esp}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Equipo() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current.children, {
        ...STAGGER_REVEAL,
        stagger: STAGGER,
        scrollTrigger: {
          trigger: headRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.7,
        stagger: STAGGER,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="equipo" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headRef} className="text-center mb-16">
          <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Nuestros especialistas
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-slate-900"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            El equipo detrás de tu sonrisa
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
            Profesionales certificados con posgrado en sus especialidades y años de experiencia clínica.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipo.map(m => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
