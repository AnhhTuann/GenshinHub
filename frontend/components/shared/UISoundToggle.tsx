"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useUISound } from "@/context/UISoundContext";
import { motion } from "framer-motion";

export default function UISoundToggle() {
  const { soundEnabled, toggleSound } = useUISound();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleSound}
      className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      title={soundEnabled ? "Disable UI Sounds" : "Enable UI Sounds"}
      aria-label={soundEnabled ? "Disable UI Sounds" : "Enable UI Sounds"}
    >
      {soundEnabled ? (
        <Volume2 className="w-4 h-4 text-[#c8a84b]" />
      ) : (
        <VolumeX className="w-4 h-4 text-white/40" />
      )}
    </motion.button>
  );
}
