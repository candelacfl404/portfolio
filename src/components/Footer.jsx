import React from 'react';
import { ArrowUp } from 'lucide-react';
import KineticGearClock from './KineticGearClock';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ personal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-name">{personal.name}</span>
            <span className="footer-role font-mono">{personal.role}</span>
          </div>

          <nav className="footer-nav" aria-label="Enlaces del pie de página">
            <a href="#hero">Inicio</a>
            <a href="#about">Sobre mí</a>
            <a href="#projects">Proyectos</a>
            <a href="#contact">Contacto</a>
          </nav>

          <button 
            type="button"
            onClick={scrollToTop} 
            className="footer-back-to-top"
            id="footer-scroll-top-btn"
            aria-label="Volver al inicio de la página"
          >
            <span>Subir</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>

        {/* Monumental Kinetic Gear Clock Module */}
        <KineticGearClock />

        <div className="footer-bottom">
          <p className="footer-copyright font-mono">
            &copy; {CURRENT_YEAR} {personal.name} &bull; {personal.location}
          </p>
        </div>

      </div>
    </footer>
  );
}
