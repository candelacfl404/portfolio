import React, { useState, useEffect, useMemo } from 'react';
import './KineticGearClock.css';

// Mathematical generator for precision gear teeth
function generateGearPath(cx, cy, teeth, outerRadius, innerRadius) {
  let path = '';
  const step = (Math.PI * 2) / teeth;
  const toothWidth = step * 0.26;

  for (let i = 0; i < teeth; i++) {
    const angle = i * step;
    const a1 = angle;
    const a2 = angle + toothWidth * 0.65;
    const a3 = angle + toothWidth * 1.55;
    const a4 = angle + toothWidth * 2.2;

    const x1 = cx + Math.cos(a1) * innerRadius;
    const y1 = cy + Math.sin(a1) * innerRadius;
    const x2 = cx + Math.cos(a2) * outerRadius;
    const y2 = cy + Math.sin(a2) * outerRadius;
    const x3 = cx + Math.cos(a3) * outerRadius;
    const y3 = cy + Math.sin(a3) * outerRadius;
    const x4 = cx + Math.cos(a4) * innerRadius;
    const y4 = cy + Math.sin(a4) * innerRadius;

    if (i === 0) {
      path += `M ${x1.toFixed(2)} ${y1.toFixed(2)} `;
    } else {
      path += `L ${x1.toFixed(2)} ${y1.toFixed(2)} `;
    }
    path += `L ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} L ${x4.toFixed(2)} ${y4.toFixed(2)} `;
  }
  path += 'Z';
  return path;
}

export default function KineticGearClock() {
  const [timeData, setTimeData] = useState(() => getCurrentTimeData());
  const [isHovered, setIsHovered] = useState(false);

  function getCurrentTimeData() {
    try {
      const now = new Date();
      
      const timeStr = now.toLocaleTimeString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const parts = timeStr.split(':');
      const hours = parts[0] || '00';
      const minutes = parts[1] || '00';
      const seconds = parts[2] || '00';

      const dateStr = now.toLocaleDateString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Capitalize first letter of date
      const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

      return { hours, minutes, seconds, fullDate: formattedDate };
    } catch {
      return { hours: '12', minutes: '00', seconds: '00', fullDate: 'Buenos Aires' };
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeData(getCurrentTimeData());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Pre-generate gear paths once for optimal performance
  const gear1 = useMemo(() => ({
    cx: 140,
    cy: 140,
    path: generateGearPath(140, 140, 18, 76, 64)
  }), []);

  const gear2 = useMemo(() => ({
    cx: 242,
    cy: 88,
    path: generateGearPath(242, 88, 12, 48, 39)
  }), []);

  const gear3 = useMemo(() => ({
    cx: 74,
    cy: 226,
    path: generateGearPath(74, 226, 9, 36, 28)
  }), []);

  const gear4 = useMemo(() => ({
    cx: 258,
    cy: 196,
    path: generateGearPath(258, 196, 11, 42, 34)
  }), []);

  // Dial ticks for outer seconds ring
  const dialTicks = useMemo(() => {
    const ticks = [];
    for (let i = 0; i < 36; i++) {
      const angle = (i * Math.PI * 2) / 36;
      const isMajor = i % 3 === 0;
      const r1 = 110;
      const r2 = isMajor ? 122 : 116;
      ticks.push({
        x1: (140 + Math.cos(angle) * r1).toFixed(1),
        y1: (140 + Math.sin(angle) * r1).toFixed(1),
        x2: (140 + Math.cos(angle) * r2).toFixed(1),
        y2: (140 + Math.sin(angle) * r2).toFixed(1),
        isMajor
      });
    }
    return ticks;
  }, []);

  return (
    <div 
      className={`kinetic-clock-module ${isHovered ? 'is-accelerated' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Mecanismo monumental de reloj engranajes"
    >
      <div className="kinetic-clock-container">
        
        {/* Kinetic Gear Mechanism Assembly */}
        <div className="kinetic-gears-assembly" aria-hidden="true">
          <div className="gears-ambient-glow" />
          
          <svg 
            viewBox="0 0 320 280" 
            className="kinetic-gears-svg" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Slow Orbit Dial */}
            <g className="gear-subsystem gear-orbit-ring" style={{ transformOrigin: '140px 140px' }}>
              <circle cx="140" cy="140" r="118" stroke="rgba(119, 141, 169, 0.2)" strokeWidth="1" strokeDasharray="3 4" />
              <circle cx="140" cy="140" r="126" stroke="rgba(255, 0, 110, 0.25)" strokeWidth="1" strokeDasharray="12 18" />
              {dialTicks.map((t, idx) => (
                <line 
                  key={idx} 
                  x1={t.x1} 
                  y1={t.y1} 
                  x2={t.x2} 
                  y2={t.y2} 
                  stroke={t.isMajor ? 'var(--accent)' : 'rgba(119, 141, 169, 0.35)'} 
                  strokeWidth={t.isMajor ? 1.6 : 1} 
                />
              ))}
            </g>

            {/* Connecting Mechanical Traces & Structural Rods */}
            <line x1="140" y1="140" x2="242" y2="88" stroke="rgba(119, 141, 169, 0.25)" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="140" y1="140" x2="74" y2="226" stroke="rgba(119, 141, 169, 0.25)" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="242" y1="88" x2="258" y2="196" stroke="rgba(119, 141, 169, 0.2)" strokeWidth="1" strokeDasharray="2 3" />

            {/* Gear 4 - Minor Aux Pinion */}
            <g className="gear-subsystem gear-aux" style={{ transformOrigin: `${gear4.cx}px ${gear4.cy}px` }}>
              <path d={gear4.path} className="gear-metal" />
              <circle cx={gear4.cx} cy={gear4.cy} r="18" className="gear-interior" />
              <circle cx={gear4.cx} cy={gear4.cy} r="6" className="gear-pivot" />
            </g>

            {/* Gear 3 - Fast Escape Gear */}
            <g className="gear-subsystem gear-escape" style={{ transformOrigin: `${gear3.cx}px ${gear3.cy}px` }}>
              <path d={gear3.path} className="gear-neon" />
              <circle cx={gear3.cx} cy={gear3.cy} r="16" className="gear-interior" />
              <circle cx={gear3.cx} cy={gear3.cy} r="5" className="gear-pivot-accent" />
            </g>

            {/* Gear 2 - Medium Counter-Clockwise Pinion */}
            <g className="gear-subsystem gear-secondary" style={{ transformOrigin: `${gear2.cx}px ${gear2.cy}px` }}>
              <path d={gear2.path} className="gear-metal" />
              <circle cx={gear2.cx} cy={gear2.cy} r="24" className="gear-interior" />
              {/* Spoke cutouts */}
              <circle cx={gear2.cx - 12} cy={gear2.cy} r="4.5" className="spoke-window" />
              <circle cx={gear2.cx + 12} cy={gear2.cy} r="4.5" className="spoke-window" />
              <circle cx={gear2.cx} cy={gear2.cy - 12} r="4.5" className="spoke-window" />
              <circle cx={gear2.cx} cy={gear2.cy + 12} r="4.5" className="spoke-window" />
              <circle cx={gear2.cx} cy={gear2.cy} r="7" className="gear-pivot-accent" />
            </g>

            {/* Gear 1 - Master Grand Wheel */}
            <g className="gear-subsystem gear-master" style={{ transformOrigin: `${gear1.cx}px ${gear1.cy}px` }}>
              <path d={gear1.path} className="gear-master-path" />
              <circle cx={gear1.cx} cy={gear1.cy} r="48" className="gear-interior-large" />
              
              {/* 6 Decorative Spoke Holes */}
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const holeX = gear1.cx + Math.cos(rad) * 32;
                const holeY = gear1.cy + Math.sin(rad) * 32;
                return (
                  <circle 
                    key={deg} 
                    cx={holeX} 
                    cy={holeY} 
                    r="8.5" 
                    className="spoke-window-large" 
                  />
                );
              })}

              <circle cx={gear1.cx} cy={gear1.cy} r="18" className="gear-core-outer" />
              <circle cx={gear1.cx} cy={gear1.cy} r="8" className="gear-core-center" />
            </g>

            {/* Fixed Central Pulsing Core Bearing */}
            <circle cx="140" cy="140" r="4.5" className="core-led-pulsing" />
          </svg>
        </div>

        {/* Monumental Digital Readout & Context */}
        <div className="kinetic-clock-display">
          
          <div className="clock-eyebrow font-mono">
            <span className="clock-live-indicator" aria-hidden="true" />
            <span>MECANISMO HOROLÓGICO CINÉTICO // TIEMPO REAL</span>
          </div>

          <div className="clock-digits-row font-mono" aria-label={`Hora actual: ${timeData.hours} horas, ${timeData.minutes} minutos y ${timeData.seconds} segundos`}>
            <span className="clock-unit-hour">{timeData.hours}</span>
            <span className="clock-separator">:</span>
            <span className="clock-unit-minute">{timeData.minutes}</span>
            <span className="clock-separator">:</span>
            <span className="clock-unit-second">{timeData.seconds}</span>
            <span className="clock-zone-badge">ART</span>
          </div>

          <p className="clock-full-date font-mono">
            {timeData.fullDate}
          </p>

          <div className="clock-meta-footer font-mono">
            <div className="meta-item">
              <span className="meta-label">Ubicación:</span>
              <span className="meta-val">Buenos Aires, Argentina (UTC-3)</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Motor:</span>
              <span className="meta-val highlight-neon">Kinetic 60 FPS Engine</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

