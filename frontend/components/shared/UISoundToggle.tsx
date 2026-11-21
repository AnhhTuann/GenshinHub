"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useUISound } from "@/context/UISoundContext";
import { motion } from "framer-motion";

export default function UISoundToggle() {
  const { soundEnabled, toggleSound } = useUISound();

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={toggleSound}
      className="site-nav-control"
      title={soundEnabled ? "Disable UI Sounds" : "Enable UI Sounds"}
      aria-label={soundEnabled ? "Disable UI Sounds" : "Enable UI Sounds"}
    >
      {soundEnabled ? (
        <Volume2 className="w-4 h-4 text-[var(--accent-primary-light)]" />
      ) : (
        <VolumeX className="w-4 h-4 text-current" />
      )}
    </motion.button>
  );
}
