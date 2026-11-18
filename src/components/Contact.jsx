import React, { useState } from 'react';
import { ArrowUpRight, MessageSquareText, ChevronDown, X, Send } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';
import './Contact.css';

export default function Contact({ contact }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const subjectText = encodeURIComponent(`[Consulta Web] ${formData.subject || 'Contacto desde Portafolio'}`);
    const bodyText = encodeURIComponent(
      `Hola Pri,\n\nMi nombre es ${formData.name}.\n\nConsulta:\n${formData.message}\n\n---\nEnviado desde tu portafolio web.`
    );
    window.location.href = `mailto:${contact.email}?subject=${subjectText}&body=${bodyText}`;
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header contact-header">
          <span className="section-tag">03 // Contacto</span>
          <h2 className="section-title contact-title" id="contact-title">
            ¿Tienes un proyecto en mente?{' '}
            <span className="contact-title-accent">Trabajemos juntos.</span>
          </h2>
          <p className="section-subtitle contact-subtitle">
            {contact.subheading}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="contact-grid">
          
          {/* Main Direct Email Card */}
          <div className="contact-main-card">
            <div>
              <div className="contact-badge font-mono">
                <span className="contact-badge-dot" aria-hidden="true" />
                <span>Disponible para nuevos proyectos</span>
              </div>
              <span className="contact-card-label font-mono">Correo directo</span>
              <div className="contact-email-val font-mono">{contact.email}</div>
              <p className="contact-card-note">
                Escríbeme directamente para coordinar reuniones, consultas técnicas o sumarme a tu equipo.
              </p>
            </div>
            
            <div className="contact-main-actions">
              <a 
                href={`mailto:${contact.email}`} 
                className="btn btn-primary"
                id="contact-mailto-btn"
              >
                <span>Enviar correo directo</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Direct Channels */}
          <div className="contact-channels-list">
            
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="channel-link-card"
              aria-label="Perfil de LinkedIn de Pri"
            >
              <div className="channel-icon-wrapper" aria-hidden="true">
                <LinkedinIcon size={24} />
              </div>
              <div className="channel-info">
                <span className="channel-name">LinkedIn</span>
                <span className="channel-desc font-mono">Conexión profesional & trayectoria</span>
              </div>
              <ArrowUpRight size={22} className="channel-arrow" aria-hidden="true" />
            </a>

            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="channel-link-card"
              aria-label="Perfil de GitHub de Pri"
            >
              <div className="channel-icon-wrapper" aria-hidden="true">
                <GithubIcon size={24} />
              </div>
              <div className="channel-info">
                <span className="channel-name">GitHub</span>
                <span className="channel-desc font-mono">Repositorios, código fuente y actividad</span>
              </div>
              <ArrowUpRight size={22} className="channel-arrow" aria-hidden="true" />
            </a>

          </div>

        </div>

        {/* Expandable Direct Message Section */}
        <div className="contact-quick-inquiry-wrap">
          {!isExpanded ? (
            <button 
              type="button" 
              className="quick-inquiry-toggle-btn"
              onClick={() => setIsExpanded(true)}
              id="toggle-quick-inquiry-btn"
              aria-expanded={isExpanded}
            >
              <div className="toggle-btn-content">
                <div className="toggle-icon-wrap" aria-hidden="true">
                  <MessageSquareText size={20} className="toggle-icon-accent" />
                </div>
                <div className="toggle-text-block">
                  <span className="toggle-text-main">¿Prefieres escribir un mensaje directo aquí?</span>
                  <span className="toggle-badge font-mono">Escribir consulta rápida &rarr;</span>
                </div>
              </div>
              <ChevronDown size={20} className="toggle-arrow" aria-hidden="true" />
            </button>
          ) : (
            <div className="quick-inquiry-card animate-slide-down">
              <div className="quick-inquiry-header">
                <div>
                  <span className="contact-card-label font-mono">// MENSAJE DIRECTO</span>
                  <h3 className="quick-inquiry-title">Envíame una breve consulta</h3>
                  <p className="quick-inquiry-subtitle">
                    Completa tus datos y la consulta; se abrirá tu cliente de correo con el mensaje ya estructurado para enviar al instante.
                  </p>
                </div>
                <button 
                  type="button" 
                  className="quick-inquiry-close-btn"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Cerrar formulario de consulta rápida"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={handleSendInquiry} className="quick-inquiry-form">
                <div className="form-row-dual">
                  <div className="form-field">
                    <label htmlFor="inquiry-name" className="form-label font-mono">Tu Nombre *</label>
                    <input 
                      type="text" 
                      id="inquiry-name" 
                      name="name" 
                      required 
                      placeholder="Ej. Ana García"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="inquiry-subject" className="form-label font-mono">Asunto / Motivo</label>
                    <input 
                      type="text" 
                      id="inquiry-subject" 
                      name="subject" 
                      placeholder="Ej. Proyecto web / Colaboración"
                      className="form-input"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="inquiry-message" className="form-label font-mono">Tu Consulta *</label>
                  <textarea 
                    id="inquiry-message" 
                    name="message" 
                    rows="3" 
                    required 
                    placeholder="Cuéntame brevemente sobre tu proyecto, plazos o ideas..."
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-actions-row">
                  <button type="submit" className="btn btn-primary" id="btn-submit-inquiry">
                    <Send size={16} aria-hidden="true" />
                    <span>Enviar consulta por correo</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setIsExpanded(false)}
                  >
                    <span>Cerrar</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
