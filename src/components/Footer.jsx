export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🦷</span>
              <span className="font-bold text-xl" style={{ fontFamily: 'Poppins' }}>
                DentalQ<span className="text-cyan-400">erétaro</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Más de 15 años transformando sonrisas en Querétaro con tecnología de vanguardia
              y un equipo de especialistas certificados.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { label: 'Facebook', href: '#', icon: 'f' },
                { label: 'Instagram', href: '#', icon: 'ig' },
                { label: 'TikTok', href: '#', icon: 'tt' },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-slate-800 hover:bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">Servicios</p>
            <ul className="space-y-2">
              {['Ortodoncia','Implantes','Blanqueamiento','Endodoncia','Odontopediatría'].map(s => (
                <li key={s}>
                  <a href="#servicios" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-widest text-slate-400 mb-4">Contacto</p>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>📍 Av. Constituyentes 500, Querétaro</li>
              <li>📞 (442) 123-4567</li>
              <li>📧 contacto@dentalqueretaro.mx</li>
              <li>🕐 Lun–Vie 8–20 h · Sáb 9–14 h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {year} DentalQuerétaro. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {['Aviso de privacidad','Términos de uso'].map(l => (
              <a key={l} href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
