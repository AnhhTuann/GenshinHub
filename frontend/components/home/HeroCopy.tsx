"use client";

import { motion } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import OpenSearchButton from '@/components/home/OpenSearchButton';
import PremiumButton from '@/components/ui/PremiumButton';

export default function HeroCopy({ locale }: { locale: string }) {
  return (
    <div className="home-hero-copy">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-primary-dim)] border border-[var(--border-accent)] text-[var(--accent-primary-light)] text-xs font-bold tracking-wide backdrop-blur-md shadow-xs mb-4"
      >
        <Sparkles size={14} className="text-[var(--accent-primary)] animate-pulse" aria-hidden="true" />
        <span>{locale === 'en' ? 'Your journey through Teyvat' : 'Cẩm nang đồng hành tại Teyvat'}</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        className="home-title"
      >
        {locale === 'en' ? (
          <>
            Explore Teyvat,<br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-[var(--accent-primary-light)] font-italic"
            >
              your way.
            </motion.span>
          </>
        ) : (
          <>
            Chạm ngõ Teyvat,<br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-[var(--accent-primary-light)] font-italic"
            >
              viết hành trình riêng.
            </motion.span>
          </>
        )}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        className="home-description"
      >
        {locale === 'en'
          ? 'A thoughtful companion for every build, every team, and every adventure.'
          : 'Người bạn đồng hành cho từng đội hình, từng bản build và mọi chuyến phiêu lưu.'}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
        className="home-actions"
      >
        <PremiumButton href="/characters" icon={<Compass size={17} strokeWidth={1.8} aria-hidden="true" />}>
          {locale === 'en' ? 'Discover characters' : 'Khám phá nhân vật'}
        </PremiumButton>
        <OpenSearchButton label={locale === 'en' ? 'Search the archive' : 'Tìm trong thư viện'} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="home-trust-line"
      >
        <span className="home-status-dot" />
        {locale === 'en' ? 'Your Teyvat archive, all in one place' : 'Toàn bộ dữ liệu Teyvat trong một nơi'}
      </motion.div>
    </div>
  );
}
