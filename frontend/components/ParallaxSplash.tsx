"use client";
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSplash({ imageUrl }: { imageUrl: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute inset-0 w-full h-[120%]"
    >
      <div
        className="w-full h-full bg-cover bg-[center_15%] bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})`, filter: 'brightness(0.5) saturate(1.1)' }}
      />
    </motion.div>
  );
}
