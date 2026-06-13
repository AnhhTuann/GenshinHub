"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ELEMENT_COLORS: Record<string, string> = {
  Pyro: "#ff5c5c",
  Hydro: "#4cc2f1",
  Anemo: "#5cf1b5",
  Electro: "#d35cff",
  Dendro: "#a5c83b",
  Cryo: "#99ffff",
  Geo: "#ffc85c",
};

export default function WishIntro({ imageUrl, element }: { imageUrl: string, element?: string }) {
  const [show, setShow] = useState(true);
  const color = ELEMENT_COLORS[element || ""] || "#ffd700";

  useEffect(() => {
    // Lock scroll while playing
    document.body.style.overflow = "hidden";

    // The animation takes about 2.5 seconds total
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "auto"; // Unlock scroll after animation
    }, 2800);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // Fallback on unmount
    };
  }, []);

  return (
    <>
      {/* Click blocker that unmounts instantly */}
      {show && <div className="fixed inset-0 z-[99]" />}

      <AnimatePresence>
        {show && (
          <motion.div
            key="wish-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black pointer-events-none"
          >
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 5, 10], opacity: [1, 1, 0] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 m-auto w-10 h-10 rounded-full mix-blend-screen"
            style={{ 
              backgroundColor: color, 
              boxShadow: `0 0 100px 50px ${color}`,
            }}
          />

          {/* Rays Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], scale: 1.2, rotate: 45 }}
            transition={{ duration: 2, delay: 0.2 }}
            className="absolute w-[200vw] h-[200vw] mix-blend-screen pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${color}40 0%, transparent 50%)`
            }}
          />

          {/* Character Splash Art handles the initial Gacha explosion */}
          <motion.img
            src={imageUrl}
            initial={{ 
              scale: 2, 
              opacity: 0, 
              filter: `brightness(2) contrast(1.2) drop-shadow(0 0 50px ${color})`
            }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              filter: `brightness(1) contrast(1) drop-shadow(0 0 0px ${color})`
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              filter: "brightness(0)",
              transition: { duration: 0.5 }
            }}
            transition={{ 
              type: "spring", 
              stiffness: 60, 
              damping: 12, 
              delay: 0.2 
            }}
            className="absolute w-full h-[100vh] object-contain object-center z-10 origin-center"
          />

          {/* White flash overlay at the exact moment of impact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute inset-0 bg-white z-20 mix-blend-overlay"
          />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
