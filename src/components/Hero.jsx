import React from 'react';
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import Tesseract3D from './Tesseract3D';
import './Hero.css';

export default function Hero({ personal }) {
  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-title">
      
      {/* 3D Tesseract Ambient Backdrop (Behind Hero text) */}
      <div className="hero-backdrop-visual" aria-hidden="true">
        <Tesseract3D />
      </div>

      <div className="container hero-container">
        
        {/* Main Content Column */}
        <div className="hero-content">
          {/* Eyebrow */}
          <div className="hero-eyebrow font-mono">
            <span className="eyebrow-accent" aria-hidden="true">/</span>
            <span>{personal.location}</span>
          </div>

          {/* Colossal Minimalist Title */}
          <h1 className="hero-title" id="hero-title">
            <span className="hero-title-greeting">Hola, soy {personal.name}.</span>
            <span className="hero-title-role">{personal.role}</span>
          </h1>

          {/* Direct summary */}
          <p className="hero-description">
            {personal.tagline} {personal.bio}
          </p>

          {/* Direct Action Row */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary" id="hero-btn-projects">
              <span>Ver proyectos</span>
              <ArrowDown size={15} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-secondary" id="hero-btn-contact">
              <span>Contactar</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          {/* Quick Social Links */}
          <div className="hero-social-links" aria-label="Enlaces sociales">
            <a 
              href={personal.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link" 
              aria-label="GitHub de Pri"
            >
              <GithubIcon size={17} aria-hidden="true" />
              <span className="social-text font-mono">GitHub</span>
            </a>
            <a 
              href={personal.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link" 
              aria-label="LinkedIn de Pri"
            >
              <LinkedinIcon size={17} aria-hidden="true" />
              <span className="social-text font-mono">LinkedIn</span>
            </a>
            <a 
              href={`mailto:${personal.email}`} 
              className="social-link" 
              aria-label="Email de Pri"
            >
              <Mail size={17} aria-hidden="true" />
              <span className="social-text font-mono">Email</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
