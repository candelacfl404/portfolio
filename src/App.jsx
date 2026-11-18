import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { portfolioData } from './data/portfolioData';
import './App.css';

export default function App() {
  return (
    <div className="portfolio-app">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* Subtle Grain & Ambient Glow */}
      <div className="film-grain-overlay" aria-hidden="true" />
      <div className="ambient-glow-orb" aria-hidden="true" />

      {/* High-Performance Custom Cursor with #ff006e accent */}
      <CustomCursor />

      {/* Floating Right Dock Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content">
        <Hero personal={portfolioData.personal} />
        <About skills={portfolioData.skills} softSkills={portfolioData.softSkills} />
        <Projects projects={portfolioData.projects} />
        <Contact contact={portfolioData.contact} />
      </main>

      {/* Footer */}
      <Footer personal={portfolioData.personal} />
    </div>
  );
}
