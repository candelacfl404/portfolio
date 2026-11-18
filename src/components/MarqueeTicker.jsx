import React from 'react';

export default function MarqueeTicker() {
  const phrases = [
    "FULL STACK ARCHITECTURE",
    "REACT & VITE ECOSYSTEM",
    "EDITORIAL DIGITAL EXPERIENCES",
    "HIGH-PERFORMANCE RENDERING",
    "CANVAS & KINETIC TYPOGRAPHY",
    "ACCESSIBILITY & SEMANTIC CODE",
    "MINIMALIST DESIGN DISCIPLINE",
    "BUENOS AIRES // GLOBAL REMOTE"
  ];

  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-content">
        {[...phrases, ...phrases].map((item, idx) => (
          <span key={idx} className="marquee-item">
            {item}
            <span className="marquee-dot"></span>
          </span>
        ))}
      </div>
    </div>
  );
}
