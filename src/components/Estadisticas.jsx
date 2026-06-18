import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../config/gsap.config';
import { estadisticas } from '../data';

export default function Estadisticas() {
  const sectionRef = useRef(null);
  const numsRef    = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Reveal the whole section with clip-path expand */
      gsap.from(sectionRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      /* Count-up animation for each stat */
      numsRef.current.forEach((el, i) => {
        if (!el) return;
        const stat = estadisticas[i];
        const obj  = { val: 0 };

        gsap.to(obj, {
          val: stat.valor,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate() {
            el.textContent = Math.round(obj.val) + stat.sufijo;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="estadisticas"
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-blue-800 to-blue-900"
      style={{ clipPath: 'inset(0 0% 0 0)' }} // reset after animation
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {estadisticas.map((s, i) => (
            <div key={s.id} className="text-center">
              <p
                ref={el => (numsRef.current[i] = el)}
                className="stat-number text-5xl md:text-6xl font-extrabold text-white mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                0{s.sufijo}
              </p>
              <p className="text-blue-200 text-sm md:text-base font-medium">{s.etiqueta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
