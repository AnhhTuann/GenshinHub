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
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/80 hover:border-violet-300/80 flex items-center justify-center transition-all shadow-xs cursor-pointer"
      title={soundEnabled ? "Disable UI Sounds" : "Enable UI Sounds"}
      aria-label={soundEnabled ? "Disable UI Sounds" : "Enable UI Sounds"}
    >
      {soundEnabled ? (
        <Volume2 className="w-4 h-4 text-[#7C5AE0]" />
      ) : (
        <VolumeX className="w-4 h-4 text-slate-400" />
      )}
    </motion.button>
  );
}
