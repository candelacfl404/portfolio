import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import './Projects.css';

export default function Projects({ projects }) {
  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">02 // Proyectos</span>
          <h2 className="section-title" id="projects-title">Trabajos Destacados</h2>
          <p className="section-subtitle">
            Explora la selección de aplicaciones web full stack construidas con arquitectura moderna, alto rendimiento y atención al detalle.
          </p>
        </div>

        {/* Stackable Cards Container (Sticky Scroll Effect) */}
        <div className="projects-stack-container">
          {projects.map((project, index) => {
            const stickyTop = `calc(3.5rem + ${index * 26}px)`;

            return (
              <article 
                key={project.id} 
                className="project-stack-card"
                id={`project-${project.id}`}
                style={{
                  top: stickyTop,
                  zIndex: index + 1
                }}
              >
                {/* Top Card Bar */}
                <div className="stack-card-bar">
                  <div className="stack-bar-left font-mono">
                    <span className="stack-card-number">{project.number}</span>
                    <span className="stack-bar-slash" aria-hidden="true">//</span>
                    <span className="stack-card-category">{project.category}</span>
                  </div>
                  <div className="stack-bar-right font-mono">
                    <span className="stack-card-year">{project.year}</span>
                    <span className="stack-live-dot" aria-hidden="true" />
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="stack-card-content">
                  
                  {/* Media Column */}
                  <div className="stack-media-wrapper">
                    <img 
                      src={project.image} 
                      alt={`Captura interactiva de ${project.title}`}
                      className="stack-image"
                      loading="lazy"
                      width="600"
                      height="375"
                    />
                    <div className="stack-media-overlay" aria-hidden="true" />
                  </div>

                  {/* Info Column */}
                  <div className="stack-info-column">
                    <h3 className="stack-project-title">{project.title}</h3>

                    <p className="stack-project-description">
                      {project.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="stack-tech-list">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="stack-tech-pill font-mono">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="stack-card-actions">
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary btn-sm stack-action-btn"
                        id={`live-btn-${project.id}`}
                        aria-label={`Ver demo en vivo de ${project.title}`}
                      >
                        <span>Demo en vivo</span>
                        <ExternalLink size={14} aria-hidden="true" />
                      </a>
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-secondary btn-sm stack-action-btn"
                        id={`github-btn-${project.id}`}
                        aria-label={`Ver código fuente de ${project.title} en GitHub`}
                      >
                        <GithubIcon size={14} aria-hidden="true" />
                        <span>Código</span>
                      </a>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
