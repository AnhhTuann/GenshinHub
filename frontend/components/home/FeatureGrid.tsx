"use client";
import { Link } from '@/i18n/routing';
import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

interface Feature {
  href: string;
  label: string;
  desc: string;
  color: string;
  bg: string;
  icon: string;
}

export default function FeatureGrid({ features }: { features: Feature[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="feature-grid">
      {features.map((card, i) => (
        <motion.div
          key={card.href}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.42, delay: shouldReduceMotion ? 0 : i * 0.035, ease: [0.2, 0.75, 0.25, 1] }}
        >
          <Link
            href={card.href}
            className="feature-card"
            style={{ '--feature-color': card.color, '--feature-tint': card.bg } as CSSProperties}
          >
            <span className="feature-card-icon" aria-hidden="true">{card.icon}</span>
            <span className="feature-card-copy">
              <strong>{card.label}</strong>
              <span>{card.desc}</span>
            </span>
            <span className="feature-card-arrow" aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
