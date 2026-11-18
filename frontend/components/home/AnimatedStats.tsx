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
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setCount(to);
      return;
    }

    let start = 0;
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
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [inView, to, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {String(count).padStart(2, "0")}
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
    <div className="home-stats-card w-full rounded-2xl md:rounded-3xl border border-violet-500/15 bg-white/85 backdrop-blur-md shadow-[0_12px_36px_rgba(124,90,224,0.06)] p-3 md:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* 3 Stat columns */}
      <div className="grid grid-cols-3 divide-x divide-violet-500/10 flex-1">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 px-3 md:px-6 py-1 group transition-colors"
          >
            <div className="text-2xl md:text-3xl font-black text-[#7C5AE0] font-sans tracking-tight">
              <Counter to={stat.value} duration={1.2 + idx * 0.2} />
            </div>
            <div className="flex flex-col">
              <strong className="text-xs md:text-sm font-extrabold text-slate-800 leading-tight group-hover:text-[#7C5AE0] transition-colors">
                {stat.label}
              </strong>
              <small className="text-[10px] md:text-xs font-semibold text-slate-400 mt-0.5">
                {stat.detail}
              </small>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Note indicator */}
      <div className="hidden lg:flex items-center gap-3 pl-6 pr-3 py-1 border-l border-violet-500/10 text-slate-500 text-xs font-semibold shrink-0">
        <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-[#7C5AE0]">
          <Compass size={17} className="animate-[spin_20s_linear_infinite]" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-slate-800 font-bold text-[11px] tracking-wide uppercase">
            {locale === "en" ? "Teyvat Living Guide" : "Cẩm nang luôn đồng hành"}
          </span>
          <span className="text-violet-600 text-[10px] font-semibold">
            {locale === "en" ? "Updated for Version 5.4" : "Cập nhật phiên bản 5.4"}
          </span>
        </div>
      </div>
    </div>
  );
}
