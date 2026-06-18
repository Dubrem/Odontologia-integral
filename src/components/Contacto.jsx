import { useEffect, useRef, useState } from 'react';
import { gsap, STAGGER_REVEAL, STAGGER } from '../config/gsap.config';

const INFO = [
  { icon: '📍', label: 'Dirección', value: 'Av. Constituyentes 500, Col. Cimatario, Querétaro, Qro.' },
  { icon: '📞', label: 'Teléfono',  value: '(442) 123-4567' },
  { icon: '📧', label: 'Email',     value: 'contacto@dentalqueretaro.mx' },
  { icon: '🕐', label: 'Horario',   value: 'Lun–Vie 8–20 h · Sáb 9–14 h' },
];

export default function Contacto() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', mensaje: '', servicio: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, {
        ...STAGGER_REVEAL,
        stagger: STAGGER,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from(rightRef.current, {
        opacity: 0, x: 40, duration: 0.9, ease: 'power2.out',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.nombre.trim())    e.nombre    = 'Nombre requerido';
    if (!/^\d{10}$/.test(form.telefono.replace(/\D/g, ''))) e.telefono = 'Teléfono inválido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))    e.email    = 'Email inválido';
    if (!form.servicio)         e.servicio  = 'Selecciona un servicio';
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSent(true);
    // Here you'd send to a real API
  };

  const field = (id, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        value={form[id]}
        onChange={e => { setForm(f => ({ ...f, [id]: e.target.value })); setErrors(errs => ({ ...errs, [id]: '' })); }}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
          errors[id] ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200'
        }`}
      />
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <section id="contacto" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: info */}
          <div ref={leftRef}>
            <span className="inline-block text-cyan-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Contáctanos
            </span>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Agenda tu cita hoy
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Primera consulta de diagnóstico completamente gratis. Sin compromisos, sin esperas.
            </p>

            <div className="space-y-6">
              {INFO.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
                    <p className="text-slate-800 font-medium mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/524421234567"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3.5 rounded-full transition-all shadow-lg hover:shadow-green-400/30 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Right: form */}
          <div
            ref={rightRef}
            className="bg-slate-50 rounded-3xl p-8 shadow-md border border-slate-100"
          >
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Poppins' }}>
                  ¡Solicitud enviada!
                </h3>
                <p className="text-slate-500">Te contactaremos en menos de 24 horas para confirmar tu cita.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h3 className="text-xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Poppins' }}>
                  Formulario de cita
                </h3>

                {field('nombre',   'Nombre completo', 'text', 'Ej. María García')}
                {field('telefono', 'Teléfono',         'tel',  '(442) 000-0000')}
                {field('email',    'Correo electrónico','email','correo@ejemplo.com')}

                {/* Service select */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Servicio de interés</label>
                  <select
                    value={form.servicio}
                    onChange={e => { setForm(f => ({ ...f, servicio: e.target.value })); setErrors(errs => ({ ...errs, servicio: '' })); }}
                    className={`w-full border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.servicio ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200'
                    }`}
                  >
                    <option value="">Selecciona un servicio...</option>
                    {['Ortodoncia','Implantes','Blanqueamiento','Endodoncia','Odontopediatría','Estética Dental','Consulta general'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.servicio && <p className="text-red-500 text-xs mt-1">{errors.servicio}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje (opcional)</label>
                  <textarea
                    rows={3}
                    value={form.mensaje}
                    onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                    placeholder="¿Alguna duda o comentario?"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-800/30 hover:-translate-y-0.5 text-base"
                >
                  Solicitar cita gratuita →
                </button>
                <p className="text-center text-slate-400 text-xs">
                  Al enviar aceptas nuestra política de privacidad. Sin spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
