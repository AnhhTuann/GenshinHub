"use client";

import { Link } from '@/i18n/routing';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { CSSProperties } from 'react';
import {
  ArrowUpRight,
  Gem,
  Package,
  ScrollText,
  Search,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  href: string;
  label: string;
  desc: string;
  color: string;
  bg: string;
  icon: string;
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  characters: Swords,
  weapons: Shield,
  artifacts: Gem,
  tierlist: Trophy,
  teams: Users,
  banners: ScrollText,
  materials: Package,
  showcase: Search,
  tcg: Sparkles,
};

const FEATURE_TAGS: Record<string, { en: string; vi: string }> = {
  characters: { en: '80+ Guides', vi: '80+ Hướng dẫn' },
  weapons: { en: 'All 5★ & 4★', vi: 'Toàn bộ vũ khí' },
  artifacts: { en: 'Sets & Stats', vi: 'Bộ & Chỉ số' },
  tierlist: { en: 'Patch 5.4 Meta', vi: 'Meta 5.4' },
  teams: { en: 'Synergies', vi: 'Đội hình' },
  banners: { en: 'Wish History', vi: 'Lịch sử cầu nguyện' },
  materials: { en: 'Daily Reset', vi: 'Lịch nguyên liệu' },
  showcase: { en: 'Enka UID', vi: 'Tra cứu UID' },
  tcg: { en: 'Deck Builds', vi: 'Bộ bài TCG' },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function FeatureGrid({
  features,
  locale = 'en',
}: {
  features: Feature[];
  locale?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="feature-hub-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {features.map((feature) => {
        const Icon = FEATURE_ICONS[feature.icon] ?? Search;
        const tag = FEATURE_TAGS[feature.icon]?.[locale === 'vi' ? 'vi' : 'en'] || '';

        return (
          <motion.div
            key={feature.href}
            variants={cardVariants}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    y: -6,
                    scale: 1.015,
                    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                  }
            }
          >
            <Link
              href={feature.href}
              className="feature-hub-card group"
              style={{ '--feat-color': feature.color } as CSSProperties}
            >
              {/* Radial ambient glow on hover */}
              <div
                className="feature-hub-card-glow"
                style={{
                  background: `radial-gradient(ellipse at 25% 30%, ${feature.color}20 0%, transparent 65%)`,
                }}
              />

              {/* Top Row: Icon + Badge + Arrow */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="feature-hub-icon-box group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300"
                  style={{
                    background: `${feature.color}15`,
                    borderColor: `${feature.color}35`,
                    color: feature.color,
                  }}
                >
                  <Icon size={22} strokeWidth={1.8} className="drop-shadow-xs" />
                </div>

                <div className="flex items-center gap-2">
                  {tag && (
                    <span
                      className="feature-hub-tag"
                      style={{
                        background: `${feature.color}12`,
                        color: feature.color,
                        borderColor: `${feature.color}30`,
                      }}
                    >
                      {tag}
                    </span>
                  )}

                  <span
                    className="feature-hub-arrow group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    style={{
                      color: feature.color,
                      borderColor: `${feature.color}30`,
                    }}
                  >
                    <ArrowUpRight size={14} strokeWidth={2.2} />
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="relative z-10">
                <h3 className="feature-hub-title group-hover:text-[var(--feat-color)] transition-colors duration-200">
                  {feature.label}
                </h3>
                <p className="feature-hub-desc">{feature.desc}</p>
              </div>

              {/* Bottom Subtle Indicator Bar */}
              <div
                className="feature-hub-bottom-bar group-hover:opacity-100 group-hover:w-full transition-all duration-400"
                style={{ background: feature.color }}
              />

              {/* Border glow on hover */}
              <div
                className="feature-hub-border-glow"
                style={{
                  boxShadow: `inset 0 0 0 1.5px ${feature.color}50, 0 8px 24px ${feature.color}18`,
                }}
              />
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
