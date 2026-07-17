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

  const baseStyles = "group relative inline-flex items-center justify-center gap-2.5 font-black text-sm px-8 py-3.5 rounded-2xl transition-all duration-300 overflow-hidden uppercase tracking-wider";
  
  const primaryStyles = "text-white bg-gradient-to-r from-[#a855f7] via-[#7c3aed] to-[#a855f7] shadow-[0_6px_28px_rgba(168,85,247,0.50)] hover:shadow-[0_8px_40px_rgba(168,85,247,0.65),_0_0_60px_rgba(34,211,238,0.15)] bg-[length:200%_100%]";
  const secondaryStyles = "text-white/85 bg-white/5 border border-white/10 hover:border-[rgba(168,85,247,0.40)] hover:text-[#c084fc] hover:bg-[rgba(168,85,247,0.06)]";

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
