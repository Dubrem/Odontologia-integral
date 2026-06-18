import { useEffect, useRef, useState } from 'react';
import { gsap } from '../config/gsap.config';

const links = [
  { label: 'Inicio',     href: '#hero' },
  { label: 'Servicios',  href: '#servicios' },
  { label: 'Nosotros',   href: '#estadisticas' },
  { label: 'Equipo',     href: '#equipo' },
  { label: 'Testimonios',href: '#testimonios' },
  { label: 'Contacto',   href: '#contacto' },
];

export default function Navbar() {
  const navRef  = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Fade-in on mount */
  useEffect(() => {
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 0.7, ease: 'power2.out' });
  }, []);

  /* Solid background after 60 px scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={e => handleNav(e, '#hero')} className="flex items-center gap-2">
          <span className="text-2xl">🦷</span>
          <span
            className={`font-bold text-lg tracking-tight transition-colors ${
              scrolled ? 'text-blue-800' : 'text-white'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            DentalQ
            <span className={scrolled ? 'text-cyan-500' : 'text-cyan-300'}>erétaro</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={e => handleNav(e, href)}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                  scrolled ? 'text-slate-700' : 'text-white/90'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contacto"
          onClick={e => handleNav(e, '#contacto')}
          className="hidden md:inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5"
        >
          Agendar cita
        </a>

        {/* Hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-slate-700' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <div className={`w-5 h-0.5 mb-1 transition-all ${scrolled ? 'bg-slate-700' : 'bg-white'}`} />
          <div className={`w-5 h-0.5 mb-1 transition-all ${scrolled ? 'bg-slate-700' : 'bg-white'}`} />
          <div className={`w-5 h-0.5 transition-all ${scrolled ? 'bg-slate-700' : 'bg-white'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 shadow-lg">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={e => handleNav(e, href)}
              className="block py-2.5 text-slate-700 font-medium border-b border-slate-50 last:border-0 hover:text-blue-700"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={e => handleNav(e, '#contacto')}
            className="mt-4 block text-center bg-cyan-500 text-white font-semibold py-2.5 rounded-full"
          >
            Agendar cita
          </a>
        </div>
      )}
    </nav>
  );
}
