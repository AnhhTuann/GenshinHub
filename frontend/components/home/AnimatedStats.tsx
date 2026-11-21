"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, motion, useReducedMotion } from "framer-motion";
import { Compass, Sparkles, Trophy, Users } from "lucide-react";

interface StatItem {
  value: number;
  label: string;
  detail: string;
  icon?: any;
}

function Counter({ to, duration = 1.2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(to);
      return;
    }
    if (!inView) return;

    let frameId: number;
    const start = 0;
    const end = to;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (end - start) + start));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [inView, to, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {String(shouldReduceMotion ? to : count).padStart(2, "0")}
    </span>
  );
}

export default function AnimatedStats({
  charactersCount,
  fiveStarCount,
  collectionsCount,
  locale,
}: {
  charactersCount: number;
  fiveStarCount: number;
  collectionsCount: number;
  locale: string;
}) {
  const stats: StatItem[] = [
    {
      value: charactersCount,
      label: locale === "en" ? "Characters" : "Nhân vật",
      detail: locale === "en" ? "in the archive" : "trong thư viện",
      icon: Users,
    },
    {
      value: fiveStarCount,
      label: locale === "en" ? "Five-star" : "Truyền kỳ",
      detail: locale === "en" ? "to discover" : "đang chờ khám phá",
      icon: Sparkles,
    },
    {
      value: collectionsCount,
      label: locale === "en" ? "Collections" : "Danh mục",
      detail: locale === "en" ? "for your journey" : "cho hành trình của bạn",
      icon: Trophy,
    },
  ];

  return (
    <div className="home-stats-card w-full rounded-2xl md:rounded-3xl atlas-surface p-3 md:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* 3 Stat columns */}
      <div className="grid grid-cols-3 divide-x divide-violet-500/10 flex-1">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2 }}
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-2 md:px-6 py-1 group transition-colors"
          >
            <div className="text-2xl md:text-3xl font-black text-[var(--accent-primary-light)] font-sans tracking-tight">
              <Counter to={stat.value} duration={1.2 + idx * 0.2} />
            </div>
            <div className="flex flex-col">
              <strong className="text-xs md:text-sm font-extrabold text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-primary-light)] transition-colors">
                {stat.label}
              </strong>
              <small className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5">
                {stat.detail}
              </small>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Note indicator */}
      <div className="hidden lg:flex items-center gap-3 pl-6 pr-3 py-1 border-l border-[var(--border-accent)] text-[var(--text-secondary)] text-xs font-semibold shrink-0">
        <div className="w-8 h-8 rounded-full bg-[var(--accent-primary-dim)] flex items-center justify-center text-[var(--accent-primary-light)]">
          <Compass size={17} aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-[var(--text-primary)] font-bold text-xs tracking-wide uppercase">
            {locale === "en" ? "Teyvat Living Guide" : "Cẩm nang luôn đồng hành"}
          </span>
          <span className="text-[var(--accent-primary-light)] text-xs font-semibold">
            {locale === "en" ? "Updated for Version 5.4" : "Cập nhật phiên bản 5.4"}
          </span>
        </div>
      </div>
    </div>
  );
}
