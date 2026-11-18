import React from 'react';
import './About.css';

export default function About({ skills, softSkills = [] }) {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">01 // Sobre mí</span>
          <h2 className="section-title" id="about-title">Enfoque &amp; Stack Técnico</h2>
          <p className="section-subtitle">
            Desarrollo soluciones completas priorizando código limpio, rendimiento y experiencias de usuario excepcionales.
          </p>
        </div>

        {/* Content Layout */}
        <div className="about-grid">
          
          {/* Narrative Column */}
          <div className="about-narrative">
            <div className="about-narrative-top">
              <h3 className="about-subheading">Diseño de software con propósito</h3>
              <p className="about-paragraph">
                Mi trabajo une la arquitectura sólida en el backend con una ejecución frontend detallada y accesible. Disfruto transformar requisitos técnicos complejos en interfaces simples, intuitivas y rápidas.
              </p>
              <p className="about-paragraph">
                Trabajo con estándares web modernos, componentes modulares y sistemas escalables que facilitan el mantenimiento continuo y aseguran una experiencia óptima en cualquier dispositivo.
              </p>
            </div>

            <div className="about-highlight-box">
              <span className="highlight-tag font-mono">// FILOSOFÍA</span>
              <p className="highlight-quote">
                "El mejor código es aquel que resulta imperceptible para el usuario y legible para el equipo."
              </p>
            </div>

            {/* Habilidades Blandas debajo de la cita de filosofía */}
            {softSkills && softSkills.length > 0 && (
              <div className="about-soft-skills-box">
                <span className="highlight-tag font-mono">// HABILIDADES BLANDAS</span>
                <ul className="skill-pills-list">
                  {softSkills.map((skill, idx) => (
                    <li key={idx} className="skill-pill font-mono">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Skills Column */}
          <div className="about-skills">
            <h3 className="about-subheading">Tecnologías principales</h3>
            
            <div className="skills-groups-wrapper">
              {skills.map((group, idx) => (
                <div className="skill-group-card" key={idx}>
                  <h4 className="skill-group-title font-mono">{group.category}</h4>
                  <ul className="skill-pills-list">
                    {group.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="skill-pill font-mono">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
