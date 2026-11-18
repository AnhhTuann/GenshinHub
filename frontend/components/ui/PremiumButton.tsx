"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useUISound } from "@/context/UISoundContext";
import { ReactNode } from "react";

interface PremiumButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export default function PremiumButton({
  href,
  onClick,
  children,
  className = "",
  icon,
  variant = "primary"
}: PremiumButtonProps) {
  const { playHover, playClick } = useUISound();

  const isPrimary = variant === "primary";

  const baseStyles = "group relative inline-flex min-h-12 items-center justify-center gap-2.5 font-bold text-sm px-7 py-3 rounded-full transition-all duration-300 overflow-hidden tracking-wide";
  
  const primaryStyles = "text-white bg-[#7C5AE0] hover:bg-[#6346C4] shadow-[0_5px_18px_rgba(124,90,224,0.3)] hover:shadow-[0_8px_24px_rgba(124,90,224,0.42)]";
  const secondaryStyles = "text-[#172b3a] bg-white border border-[#d6e3e6] hover:border-[#b8a5f2] hover:bg-[#fbf9fe]";

  const content = (
    <>
      {/* Liquid Shimmer Effect for Primary */}
      {isPrimary && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
      )}
      
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  );

  const motionProps = {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.98 },
    onHoverStart: () => playHover(),
    onClick: (e: any) => {
      playClick();
      if (onClick) onClick();
    }
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href as any} className={`${baseStyles} ${isPrimary ? primaryStyles : secondaryStyles} ${className}`}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button {...motionProps} className={`${baseStyles} ${isPrimary ? primaryStyles : secondaryStyles} ${className}`}>
      {content}
    </motion.button>
  );
}
