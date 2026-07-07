"use client";
import Image from 'next/image';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMouseGlow } from '@/hooks/useMouseGlow';

interface SpotlightChar {
  id: string;
  nameEn: string;
  nameVi: string;
  element: string;
  rarity: number;
  avatarUrl: string;
}

const ELEM_COLOR: Record<string, string> = {
  Pyro: '#ff6b4a', Hydro: '#4fc3f7', Cryo: '#80deea',
  Electro: '#ce93d8', Anemo: '#4db6ac', Geo: '#ffd54f', Dendro: '#aed581',
};

export default function CharacterSpotlight({ characters }: { characters: SpotlightChar[] }) {
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ minHeight: '160px' }} // CLS protection
      className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none"
    >
      {characters.map((char) => (
        <SpotlightCard key={char.id} char={char} locale={locale} />
      ))}
    </motion.div>
  );
}

function SpotlightCard({ char, locale }: { char: SpotlightChar, locale: string }) {
  const name = locale === 'vi' ? (char.nameVi || char.nameEn) : char.nameEn;
  const ec = ELEM_COLOR[char.element] ?? '#c8a84b';
  
  const glowRef = useMouseGlow<HTMLAnchorElement>();

  // 3D Tilt Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="shrink-0"
    >
      <motion.div style={{ rotateX, rotateY }}>
        <Link
          href={`/characters/${char.id}`}
          ref={glowRef as any}
          className="group relative shrink-0 rounded-2xl overflow-hidden transition-all duration-300 mouse-glow-card block"
          style={{
            width: '112px',
            height: '144px',
            border: `1px solid ${ec}30`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          {/* Avatar */}
          <FallbackImage
            src={char.avatarUrl || '/assets/characters/PlayerGirl/avatar.webp'}
            alt={name}
            fill
            sizes="112px"
            className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
          />

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
          {/* Element tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${ec}25, transparent 55%)` }}
          />

          {/* Name */}
          <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
            <div className="text-[10px] font-extrabold truncate px-1.5 drop-shadow-md" style={{ color: ec }}>
              {name}
            </div>
          </div>

          {/* Element icon */}
          <div
            className="absolute top-1.5 left-1.5 p-0.5 rounded-md pointer-events-none"
            style={{ background: `${ec}22`, border: `1px solid ${ec}40` }}
          >
            <FallbackImage
              src={`/assets/elements/${char.element.toLowerCase()}.webp`}
              alt={char.element}
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
          </div>

          {/* 5★ badge */}
          {char.rarity === 5 && (
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(200,168,75,0.8)] pointer-events-none" />
          )}

          {/* Hover glow border */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1.5px ${ec}60` }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}
