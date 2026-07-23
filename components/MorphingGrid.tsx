"use client";

import { useEffect, useRef } from 'react';

export default function MorphingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const mouse = { x: -1000, y: -1000 };
    const spacing = 64;
    let points: { ox: number, oy: number, x: number, y: number, vx: number, vy: number }[][] = [];
    let animationFrameId: number;

    const initGrid = () => {
      points = [];
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      
      for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
          let x = (j - 1) * spacing;
          let y = (i - 1) * spacing;
          row.push({ ox: x, oy: y, x: x, y: y, vx: 0, vy: 0 });
        }
        points.push(row);
      }
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initGrid();
    };

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const resetMouse = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', handleMouseMove as any, { passive: true });
    container.addEventListener('touchmove', handleTouchMove as any, { passive: true });
    container.addEventListener('mouseleave', resetMouse);
    container.addEventListener('touchend', resetMouse);

    resize();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const mouseRadius = 250;
      const force = 45; 
      const tension = 0.035;
      const dampening = 0.88;
      
      const rows = points.length;
      if (rows === 0) return;
      const cols = points[0].length;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let p = points[i][j];
          let dx = mouse.x - p.ox;
          let dy = mouse.y - p.oy;
          let dist = Math.sqrt(dx * dx + dy * dy);
          
          let tx = p.ox;
          let ty = p.oy;
          
          if (dist < mouseRadius) {
            let push = Math.sin(((mouseRadius - dist) / mouseRadius) * (Math.PI / 2));
            tx -= (dx / dist) * push * force;
            ty -= (dy / dist) * push * force;
          }
          
          p.vx += (tx - p.x) * tension;
          p.vy += (ty - p.y) * tension;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= dampening;
          p.vy *= dampening;
        }
      }
      
      // Golden color line
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)'; 
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols - 1; j++) {
          ctx.moveTo(points[i][j].x, points[i][j].y);
          ctx.lineTo(points[i][j+1].x, points[i][j+1].y);
        }
      }
      for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows - 1; i++) {
          ctx.moveTo(points[i][j].x, points[i][j].y);
          ctx.lineTo(points[i+1][j].x, points[i+1][j].y);
        }
      }
      
      ctx.stroke();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove as any);
      container.removeEventListener('touchmove', handleTouchMove as any);
      container.removeEventListener('mouseleave', resetMouse);
      container.removeEventListener('touchend', resetMouse);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{
        maskImage: 'radial-gradient(ellipse at center, black 60%, rgba(0,0,0,0.6) 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, rgba(0,0,0,0.6) 100%)'
      }}
    />
  );
}
