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
      {features.map((card, i) => (
        <FeatureCard key={card.href} card={card} index={i} />
      ))}
    </div>
  );
}

function FeatureCard({ card, index }: { card: Feature; index: number }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
  };

  const handleMouseEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '1';
  };

  const glowRef = useMouseGlow<HTMLAnchorElement>();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div style={{ rotateX, rotateY }}>
        <Link
          href={card.href}
          ref={glowRef as any}
          className="group relative rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 overflow-hidden mouse-glow-card block"
          style={{
            background: `linear-gradient(145deg, ${card.color}0d, rgba(8,8,16,0.95))`,
            border: `1px solid ${card.color}25`,
          }}
        >
          {/* Hover top glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 opacity-0"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.color}28 0%, transparent 65%)` }}
            ref={overlayRef}
          />
          {/* Hover border overlay */}
          <div
            className="absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1.5px ${card.color}55` }}
          />
          {/* Bottom gradient shine */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${card.color}50, transparent)` }}
          />

          {/* Icon — larger and with glow background */}
          <div
            className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center text-2xl leading-none transition-all duration-300 group-hover:scale-110"
            style={{
              background: `${card.color}18`,
              border: `1px solid ${card.color}30`,
              boxShadow: `0 0 12px ${card.color}10`,
            }}
          >
            {card.icon}
          </div>

          <div className="relative z-10">
            <div
              className="font-black text-sm uppercase tracking-wide mb-0.5 transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              {card.label}
            </div>
            <div className="text-[10px] text-white/35 font-medium leading-snug group-hover:text-white/55 transition-colors duration-200">
              {card.desc}
            </div>
          </div>

          {/* Arrow */}
          <svg
            className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 opacity-20 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all duration-200 z-10"
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
