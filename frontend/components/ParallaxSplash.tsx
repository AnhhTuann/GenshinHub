"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

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
      <div className="absolute inset-0 w-full h-full" style={{ filter: 'blur(20px) brightness(0.4) saturate(1.2)', transform: 'scale(1.1)' }}>
        <Image
          src={imageUrl}
          alt="Splash Background"
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
          priority
        />
      </div>
      
      {/* Full character image in the center */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageUrl}
          alt="Character Splash Art"
          fill
          sizes="100vw"
          quality={90}
          className="object-contain object-center"
          priority
        />
      </div>
    </motion.div>
  );
}
