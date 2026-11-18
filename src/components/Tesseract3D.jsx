import React, { useEffect, useRef } from 'react';
import './Tesseract3D.css';

export default function Tesseract3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let angleXW = 0;
    let angleZW = 0;
    let angleXY = 0;
    let mouseTiltX = 0;
    let mouseTiltY = 0;

    // Generate 16 vertices of a 4D Hypercube (x, y, z, w in {-1, 1})
    const vertices4D = [];
    for (let i = 0; i < 16; i++) {
      vertices4D.push([
        (i & 1 ? 1 : -1),
        (i & 2 ? 1 : -1),
        (i & 4 ? 1 : -1),
        (i & 8 ? 1 : -1)
      ]);
    }

    // Connect vertices that differ by exactly 1 coordinate (32 edges)
    const edges = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (vertices4D[i][k] !== vertices4D[j][k]) diff++;
        }
        if (diff === 1) {
          edges.push([i, j]);
        }
      }
    }

    // High DPI buffer with crisp rendering
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Subtle ambient mouse parallax
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseTiltX = x * 0.35;
      mouseTiltY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Check prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const size = Math.min(width, height);

      ctx.clearRect(0, 0, width, height);

      // Increment 4D rotation angles smoothly
      if (!reducedMotionQuery.matches) {
        angleXW += 0.01;
        angleZW += 0.007;
        angleXY += 0.005;
      }

      const cosXW = Math.cos(angleXW + mouseTiltX);
      const sinXW = Math.sin(angleXW + mouseTiltX);
      const cosZW = Math.cos(angleZW + mouseTiltY);
      const sinZW = Math.sin(angleZW + mouseTiltY);
      const cosXY = Math.cos(angleXY);
      const sinXY = Math.sin(angleXY);

      // Camera distances
      const distance4D = 3.2;
      const distance3D = 3.6;

      // Guaranteed boundary normalization: max radius is 0.44 * size
      // This leaves 6% of guaranteed margin on every edge: NEVER CLIPS!
      const hypercubeRadius = size * 0.44;
      const projected2D = [];

      for (let i = 0; i < 16; i++) {
        let [x, y, z, w] = vertices4D[i];

        // 4D Rotation in XW plane
        const x1 = x * cosXW - w * sinXW;
        const w1 = x * sinXW + w * cosXW;

        // 4D Rotation in ZW plane
        const z2 = z * cosZW - w1 * sinZW;
        const w2 = z * sinZW + w1 * cosZW;

        // 3D Rotation in XY plane
        const x3 = x1 * cosXY - y * sinXY;
        const y3 = x1 * sinXY + y * cosXY;

        // 4D to 3D perspective projection
        const wFactor = 1 / (distance4D - w2);
        const x3d = x3 * wFactor;
        const y3d = y3 * wFactor;
        const z3d = z2 * wFactor;

        // 3D to 2D perspective projection
        const zFactor = 1 / (distance3D - z3d);

        // Normalized projection guaranteed to remain within hypercubeRadius
        const screenX = centerX + (x3d * zFactor / 0.88) * hypercubeRadius;
        const screenY = centerY + (y3d * zFactor / 0.88) * hypercubeRadius;

        projected2D.push({ x: screenX, y: screenY, depth: z2 + w2 });
      }

      // Draw Edges with glowing #ff006e neon
      ctx.save();
      ctx.lineWidth = 2.0;
      ctx.shadowColor = '#ff006e';
      ctx.shadowBlur = 20;

      for (let i = 0; i < edges.length; i++) {
        const [startIdx, endIdx] = edges[i];
        const p1 = projected2D[startIdx];
        const p2 = projected2D[endIdx];

        const avgDepth = (p1.depth + p2.depth) / 2;
        const alpha = Math.max(0.25, Math.min(0.95, (avgDepth + 2.4) / 4.8));

        ctx.strokeStyle = `rgba(255, 0, 110, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.restore();

      // Draw Glowing Vertex Points
      ctx.save();
      for (let i = 0; i < projected2D.length; i++) {
        const p = projected2D[i];
        const alpha = Math.max(0.4, Math.min(1, (p.depth + 2.4) / 4.8));

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ff006e';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 0, 110, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="tesseract-container" aria-hidden="true">
      <div className="tesseract-glow-underlay" />
      <canvas ref={canvasRef} className="tesseract-canvas" />
    </div>
  );
}
