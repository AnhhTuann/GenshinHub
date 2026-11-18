"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import FallbackImage from "@/components/ui/FallbackImage";

interface ElementBadge {
  name: string;
  element: string;
  color: string;
  bg: string;
  glow: string;
  top: string;
  left?: string;
  right?: string;
  delay: number;
}

const ELEMENT_BADGES: ElementBadge[] = [
  {
    name: "Pyro",
    element: "pyro",
    color: "#ff5a45",
    bg: "rgba(255, 90, 69, 0.12)",
    glow: "rgba(255, 90, 69, 0.35)",
    top: "20%",
    left: "10%",
    delay: 0,
  },
  {
    name: "Hydro",
    element: "hydro",
    color: "#3aa8ff",
    bg: "rgba(58, 168, 255, 0.12)",
    glow: "rgba(58, 168, 255, 0.35)",
    top: "28%",
    right: "10%",
    delay: 0.8,
  },
  {
    name: "Anemo",
    element: "anemo",
    color: "#35d6c5",
    bg: "rgba(53, 214, 197, 0.12)",
    glow: "rgba(53, 214, 197, 0.35)",
    top: "62%",
    left: "12%",
    delay: 1.6,
  },
  {
    name: "Electro",
    element: "electro",
    color: "#cf8fff",
    bg: "rgba(207, 143, 255, 0.12)",
    glow: "rgba(207, 143, 255, 0.35)",
    top: "65%",
    right: "12%",
    delay: 2.2,
  },
];

export default function HeroVisualCard({ locale }: { locale: string }) {
  const shouldReduceMotion = useReducedMotion();

  // 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full"
    >
      <motion.div
        style={shouldReduceMotion ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative w-full min-h-[440px] md:min-h-[460px] rounded-3xl overflow-hidden border border-violet-500/20 bg-gradient-to-br from-violet-100/50 via-white/80 to-purple-50/60 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(124,90,224,0.12)] transition-shadow duration-500 hover:shadow-[0_28px_65px_rgba(124,90,224,0.22)]"
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 42px, rgba(124,90,224,0.06) 43px, transparent 44px), repeating-linear-gradient(0deg, transparent 0 42px, rgba(124,90,224,0.06) 43px, transparent 44px)",
          }}
        />

        {/* Ambient radial lighting */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-violet-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-300/15 blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-bold tracking-wider uppercase">
          <div className="flex items-center gap-2 text-violet-700/80 bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
            <span>{locale === 'en' ? 'Teyvat Archive' : 'Thư viện Teyvat'}</span>
          </div>
          <span className="text-violet-900/40 font-mono tracking-widest text-[10px]">
            FIELD GUIDE • V5.4
          </span>
        </div>

        {/* Centerpiece: Mascot + Celestial Ring */}
        <div className="relative my-8 flex flex-col items-center justify-center">
          {/* Animated Celestial Orbital Ring */}
          <div className="relative flex items-center justify-center w-52 h-52 md:w-60 md:h-60">
            {/* Outer dotted orbital ring */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-violet-400/40"
            />

            {/* Inner counter-rotating ring */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-violet-300/30 shadow-[0_0_20px_rgba(124,90,224,0.15)]"
            />

            {/* Glow halo behind mascot */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-violet-500/20 via-purple-400/25 to-amber-300/20 blur-xl animate-pulse" />

            {/* Mascot Avatar Container */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-32 h-32 md:w-36 md:h-36 rounded-full p-1.5 bg-gradient-to-b from-white via-white/80 to-violet-100 shadow-[0_12px_32px_rgba(124,90,224,0.22)] border-2 border-white"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src="/logo.webp"
                  alt="Paimon Mascot"
                  className="w-full h-full object-cover scale-110 drop-shadow-md"
                />
              </div>
            </motion.div>
          </div>

          {/* TEYVAT Brand title */}
          <div className="mt-3 text-center">
            <h2 className="text-lg md:text-xl font-black tracking-[0.35em] uppercase text-slate-800 drop-shadow-xs">
              TEYVAT
            </h2>
            <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
              {locale === 'en' ? 'Seven Nations • Living Encyclopedia' : 'Bảy Quốc Gia • Cẩm Nang Toàn Thư'}
            </p>
          </div>
        </div>

        {/* Floating Elemental Badges */}
        {ELEMENT_BADGES.map((badge) => (
          <motion.div
            key={badge.name}
            animate={shouldReduceMotion ? {} : { y: [-4, 4, -4] }}
            transition={{
              duration: 3.5 + badge.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: badge.delay,
            }}
            className="absolute z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border transition-transform duration-300 hover:scale-110 cursor-pointer"
            style={{
              top: badge.top,
              left: badge.left,
              right: badge.right,
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              borderColor: `${badge.color}45`,
              boxShadow: `0 4px 16px ${badge.glow}`,
            }}
          >
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center p-0.5"
              style={{ backgroundColor: `${badge.color}20` }}
            >
              <FallbackImage
                src={`/assets/elements/${badge.element}.webp`}
                alt={badge.name}
                width={14}
                height={14}
                className="w-3.5 h-3.5 object-contain"
              />
            </div>
            <span
              className="text-[11px] font-bold tracking-wide"
              style={{ color: badge.color }}
            >
              {badge.name}
            </span>
          </motion.div>
        ))}

        {/* Bottom Action Footer */}
        <div className="relative z-10 pt-4 border-t border-violet-500/10 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
            {locale === 'en' ? 'Guides for every journey' : 'Cẩm nang cho mọi hành trình'}
          </span>
          <Link
            href="/characters"
            className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#7C5AE0] hover:text-[#6346C4] transition-colors uppercase tracking-wider group/link"
          >
            <span>{locale === 'en' ? 'Explore' : 'Khám phá'}</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
