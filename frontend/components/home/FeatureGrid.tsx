"use client";
import { Link } from '@/i18n/routing';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMouseGlow } from '@/hooks/useMouseGlow';

interface Feature {
  href: string;
  label: string;
  desc: string;
  color: string;
  bg: string;
  icon: string;
}

export default function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {features.map((card) => (
        <FeatureCard key={card.href} card={card} />
      ))}
    </div>
  );
}

function FeatureCard({ card }: { card: Feature }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
  };

  const handleMouseEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '1';
  };

  // Mouse Glow Setup
  const glowRef = useMouseGlow<HTMLAnchorElement>();

  return (
    <motion.div
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div style={{ rotateX, rotateY }}>
        <Link
          href={card.href}
          ref={glowRef as any}
          className="group relative rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 overflow-hidden mouse-glow-card"
          style={{
            background: card.bg,
            border: `1px solid ${card.color}22`,
          }}
        >
          {/* Hover Top glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 opacity-0"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.color}20 0%, transparent 70%)` }}
            ref={overlayRef}
          />
          {/* Hover border overlay */}
          <div
            className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1px ${card.color}50` }}
          />

          <div className="text-3xl leading-none relative z-10">{card.icon}</div>

          <div className="relative z-10">
            <div className="font-black text-sm text-white/90 uppercase tracking-wide group-hover:text-white transition-colors">
              {card.label}
            </div>
            <div className="text-[10px] text-white/35 font-medium mt-0.5 leading-snug group-hover:text-white/55 transition-colors">
              {card.desc}
            </div>
          </div>

          <svg
            className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 opacity-20 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all duration-200 z-10"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
            style={{ color: card.color }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
}
