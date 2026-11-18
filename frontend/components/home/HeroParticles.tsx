"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  hue: number;
  pulseSpeed: number;
  pulseAngle: number;

  constructor(width: number, height: number, initial = false) {
    this.x = Math.random() * width;
    this.y = initial ? Math.random() * height : height + 10;
    this.size = Math.random() * 2 + 0.8;
    this.speedY = -(Math.random() * 0.6 + 0.25);
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.maxOpacity = Math.random() * 0.4 + 0.15;
    this.opacity = this.maxOpacity;
    // 70% soft violet/amethyst, 30% warm starlight amber
    this.hue = Math.random() > 0.3 ? 260 + Math.random() * 20 : 42 + Math.random() * 10;
    this.pulseSpeed = Math.random() * 0.03 + 0.01;
    this.pulseAngle = Math.random() * Math.PI * 2;
  }

  update(width: number, height: number) {
    this.y += this.speedY;
    this.x += this.speedX;
    this.pulseAngle += this.pulseSpeed;
    this.opacity = (Math.sin(this.pulseAngle) * 0.5 + 0.5) * this.maxOpacity;

    if (this.y < -10) {
      this.y = height + 10;
      this.x = Math.random() * width;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 85%, 75%, ${this.opacity})`;
    ctx.shadowBlur = this.size * 3;
    ctx.shadowColor = `hsla(${this.hue}, 90%, 70%, 0.6)`;
    ctx.fill();
    ctx.restore();
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
      canvas.height = Math.min(window.innerHeight * 0.85, 750);

      particles.current = [];
      const count = window.innerWidth < 768 ? 25 : 60;
      for (let i = 0; i < count; i++) {
        particles.current.push(new Particle(canvas.width, canvas.height, true));
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.update(canvas.width, canvas.height);
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
      className="absolute top-0 left-0 w-full pointer-events-none z-0"
      style={{
        maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
      }}
    />
  );
}
