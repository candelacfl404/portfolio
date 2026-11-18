import React, { useState, useEffect } from 'react';
import { Home, User, FolderGit2, Mail } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navSections = [
    { id: 'hero', label: 'Inicio', icon: Home },
    { id: 'about', label: 'Sobre mí', icon: User },
    { id: 'projects', label: 'Proyectos', icon: FolderGit2 },
    { id: 'contact', label: 'Contacto', icon: Mail }
  ];

  return (
    <nav className="floating-dock-nav" aria-label="Navegación flotante">
      <div className="floating-dock-inner">
        
        {/* Clean, Focused Section Navigation */}
        <ul className="dock-items-list" aria-label="Secciones del sitio">
          {navSections.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id} className="dock-item">
                <a
                  href={`#${item.id}`}
                  className={`dock-link ${isActive ? 'active' : ''}`}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span className="dock-tooltip font-mono">
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

      </div>
    </nav>
  );
}
