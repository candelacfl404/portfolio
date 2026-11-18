import React, { useState, useEffect } from 'react';
import './QuantumHourglassClock.css';

export default function QuantumHourglassClock() {
  const [time, setTime] = useState(() => getBuenosAiresTime());

  function getBuenosAiresTime() {
    try {
      const now = new Date();
      return now.toLocaleTimeString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      const now = new Date();
      return now.toTimeString().split(' ')[0];
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getBuenosAiresTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="quantum-clock-widget font-mono" title="Hora local en Buenos Aires (UTC-3)" aria-label="Hora actual en Buenos Aires">
      {/* Sci-Fi Animated Geometric Hourglass */}
      <div className="hourglass-frame" aria-hidden="true">
        <svg 
          viewBox="0 0 32 40" 
          width="20" 
          height="25" 
          className="hourglass-svg"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top & Bottom Caps */}
          <line x1="6" y1="4" x2="26" y2="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="6" y1="36" x2="26" y2="36" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />

          {/* Geometric Hourglass Outer Contour */}
          <path 
            d="M8 5 L24 5 L18 19 L18 21 L24 35 L8 35 L14 21 L14 19 Z" 
            stroke="rgba(119, 141, 169, 0.45)" 
            strokeWidth="1.2" 
            strokeLinejoin="round"
          />

          {/* Upper Chamber Quantum Glow Sand */}
          <polygon 
            points="10,8 22,8 18,17 14,17" 
            className="hourglass-sand-top"
          />

          {/* Center Quantum Flow Line */}
          <line 
            x1="16" y1="18" 
            x2="16" y2="32" 
            className="hourglass-sand-stream"
          />

          {/* Lower Chamber Accumulating Sand */}
          <polygon 
            points="14,24 18,24 22,33 10,33" 
            className="hourglass-sand-bottom" 
          />

          {/* Flowing Quantum Particle Sparks */}
          <circle cx="16" cy="20" r="1" className="sand-particle particle-1" />
          <circle cx="16" cy="25" r="1.1" className="sand-particle particle-2" />
          <circle cx="16" cy="30" r="1" className="sand-particle particle-3" />
        </svg>
      </div>

      {/* Digital Time & Timezone Tag */}
      <div className="quantum-clock-body">
        <div className="quantum-clock-time">
          <span className="quantum-digits">{time}</span>
          <span className="quantum-tag">ART</span>
        </div>
        <div className="quantum-clock-sub">
          <span className="quantum-pulse-dot" aria-hidden="true" />
          <span>Buenos Aires, UTC-3</span>
        </div>
      </div>
    </div>
  );
}

