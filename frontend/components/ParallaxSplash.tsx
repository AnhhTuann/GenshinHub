"use client";
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSplash({ imageUrl }: { imageUrl: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute inset-0 w-full h-[120%] overflow-hidden"
    >
      {/* Blurred background to fill the wide screen */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`, 
          filter: 'blur(20px) brightness(0.4) saturate(1.2)',
          transform: 'scale(1.1)' // Prevent blurred edges from bleeding
        }}
      />
      {/* Full character image in the center */}
      <div
        className="absolute inset-0 w-full h-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </motion.div>
  );
}
