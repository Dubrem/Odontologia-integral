import './index.css';
import ScrollProgress from './components/ScrollProgress';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import Estadisticas  from './components/Estadisticas';
import Servicios     from './components/Servicios';
import Equipo        from './components/Equipo';
import Testimonios   from './components/Testimonios';
import Contacto      from './components/Contacto';
import Footer        from './components/Footer';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Estadisticas />
        <Servicios />
        <Equipo />
        <Testimonios />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
