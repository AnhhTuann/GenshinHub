"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import FallbackImage from "@/components/ui/FallbackImage";

interface ElementBadge {
  name: string;
  element: string;
  color: string;
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
    color: "#ff785f",
    glow: "rgba(255, 120, 95, 0.3)",
    top: "22%",
    left: "8%",
    delay: 0.12,
  },
  {
    name: "Hydro",
    element: "hydro",
    color: "#5ecbff",
    glow: "rgba(94, 203, 255, 0.3)",
    top: "28%",
    right: "8%",
    delay: 0.24,
  },
  {
    name: "Anemo",
    element: "anemo",
    color: "#62dcc7",
    glow: "rgba(98, 220, 199, 0.3)",
    top: "64%",
    left: "10%",
    delay: 0.36,
  },
  {
    name: "Electro",
    element: "electro",
    color: "#d3a0ff",
    glow: "rgba(211, 160, 255, 0.3)",
    top: "67%",
    right: "9%",
    delay: 0.48,
  },
];

export default function HeroVisualCard({ locale }: { locale: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
        className="group relative min-h-[440px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#1c1813] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:p-6 md:min-h-[460px] md:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(201,168,106,0.14), transparent 48%), radial-gradient(ellipse at 8% 100%, rgba(201,168,106,0.08), transparent 38%), linear-gradient(135deg, #1c1813 0%, #231e17 45%, #2b251c 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-[22px] border border-white/[0.045]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,234,217,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(240,234,217,0.07) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 76%)",
          }}
        />

        <div className="relative z-10 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em]">
          <div className="flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--accent-primary-dim)] px-3 py-1.5 text-[var(--accent-primary-light)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d7b56d] shadow-[0_0_9px_rgba(215,181,109,0.9)]" />
            <span>{locale === "en" ? "Teyvat Archive" : "Thư viện Teyvat"}</span>
          </div>
          <span className="font-mono text-[9px] tracking-[0.18em] text-white/50">
            FIELD GUIDE · V5.4
          </span>
        </div>

        <div className="relative my-5 flex min-h-[326px] flex-col items-center justify-center sm:my-6">
          <div className="relative flex h-52 w-52 items-center justify-center md:h-60 md:w-60">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-dashed border-white/[0.12]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-5 rounded-full border border-[var(--accent-primary)]/12"
            />

            {[0, 1, 2].map((pulse) => (
              <motion.div
                key={pulse}
                aria-hidden="true"
                initial={false}
                animate={
                  shouldReduceMotion
                    ? { scale: 1, opacity: 0.12 }
                    : { scale: [0.72, 1.28], opacity: [0.38, 0] }
                }
                transition={{
                  duration: 3.6,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  ease: "easeOut",
                  delay: pulse * 1.2,
                }}
                className="absolute inset-8 rounded-full border border-[var(--accent-primary)]/28"
              />
            ))}

            <div className="relative z-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#ffd34d] via-[#c9a86a] to-[#231e17] p-[3px] shadow-[0_0_32px_rgba(201,168,106,0.25)] md:h-36 md:w-36">
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-[#090b13]">
                <FallbackImage
                  src="/logo.webp"
                  alt="Paimon"
                  fill
                  priority
                  sizes="144px"
                  className="scale-110 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-3 text-center">
            <h2 className="text-xl font-black uppercase tracking-[0.38em] text-[#f3ead7] drop-shadow-sm">
              TEYVAT
            </h2>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e7e1f1]/65">
              {locale === "en"
                ? "Seven nations · Living encyclopedia"
                : "Bảy quốc gia · Cẩm nang toàn thư"}
            </p>
          </div>
        </div>

        {ELEMENT_BADGES.map((badge) => (
          <motion.div
            key={badge.name}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.78, y: 8 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 190,
              damping: 17,
              delay: badge.delay,
            }}
            className="absolute z-20 hidden items-center gap-2 rounded-full border bg-[#10121d]/95 px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md sm:flex"
            style={{
              top: badge.top,
              left: badge.left,
              right: badge.right,
              borderColor: `${badge.color}45`,
              boxShadow: `0 8px 24px rgba(0,0,0,0.3), 0 0 18px ${badge.glow}`,
            }}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full border bg-[#090b13]"
              style={{ borderColor: `${badge.color}60` }}
            >
              <FallbackImage
                src={`/assets/elements/${badge.element}.webp`}
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5 object-contain"
              />
            </span>
            <span className="text-[10px] font-bold tracking-wide" style={{ color: badge.color }}>
              {badge.name}
            </span>
          </motion.div>
        ))}

        <div className="relative z-10 flex items-center justify-between border-t border-white/[0.07] pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#d4d0df]/60">
            {locale === "en" ? "Guides for every journey" : "Cẩm nang cho mọi hành trình"}
          </span>
          <Link
            href="/characters"
            className="group/link inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[var(--accent-primary-light)] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dfc27e]"
          >
            <span>{locale === "en" ? "Explore" : "Khám phá"}</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
