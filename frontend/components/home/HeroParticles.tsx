"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  hue: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height + height; // start below
    this.size = Math.random() * 2 + 0.5;
    this.speedY = Math.random() * -1 - 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.hue = Math.random() * 30 + 35; // gold-ish hues
  }

  update(height: number) {
    this.y += this.speedY;
    this.x += this.speedX;
    
    if (this.y < 0) {
      this.y = height + 10;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
    ctx.fill();
  }
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrame = useRef<number>(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400; // Match hero height roughly
      
      // Initialize particles on resize
      particles.current = [];
      const count = window.innerWidth < 768 ? 30 : 80;
      for (let i = 0; i < count; i++) {
        particles.current.push(new Particle(canvas.width, canvas.height));
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.update(canvas.height);
        p.draw(ctx);
      }
      animationFrame.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
