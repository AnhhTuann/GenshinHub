"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : -8, filter: reduceMotion ? "none" : "blur(3px)" }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 26,
          mass: 0.8,
        }}
        className="site-page-content w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
