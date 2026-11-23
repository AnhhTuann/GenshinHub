"use client";

import { Sparkles, Compass } from 'lucide-react';
import OpenSearchButton from '@/components/home/OpenSearchButton';
import PremiumButton from '@/components/ui/PremiumButton';

export default function HeroCopy({ locale }: { locale: string }) {
  return (
    <div className="home-hero-copy">
      <div
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-primary-dim)] border border-[var(--border-accent)] text-[var(--accent-primary-light)] text-xs font-bold tracking-wide mb-4"
      >
        <Sparkles size={14} className="text-[var(--accent-primary-light)]" aria-hidden="true" />
        <span>{locale === 'en' ? 'Your journey through Teyvat' : 'Cẩm nang đồng hành tại Teyvat'}</span>
      </div>

      <h1
        className="home-title"
      >
        {locale === 'en' ? (
          <>
            Explore Teyvat,<br />
            <span
              className="text-[var(--accent-primary-light)] font-italic"
            >
              your way.
            </span>
          </>
        ) : (
          <>
            Chạm ngõ Teyvat,<br />
            <span
              className="text-[var(--accent-primary-light)] font-italic"
            >
              viết hành trình riêng.
            </span>
          </>
        )}
      </h1>
      <p
        className="home-description"
      >
        {locale === 'en'
          ? 'A thoughtful companion for every build, every team, and every adventure.'
          : 'Người bạn đồng hành cho từng đội hình, từng bản build và mọi chuyến phiêu lưu.'}
      </p>

      <div
        className="home-actions"
      >
        <PremiumButton className="home-primary-button" href="/characters" icon={<Compass size={17} strokeWidth={1.8} aria-hidden="true" />}>
          {locale === 'en' ? 'Discover characters' : 'Khám phá nhân vật'}
        </PremiumButton>
        <OpenSearchButton label={locale === 'en' ? 'Search the archive' : 'Tìm trong thư viện'} />
      </div>

      <div
        className="home-trust-line"
      >
        <span className="home-status-dot" />
        {locale === 'en' ? 'Your Teyvat archive, all in one place' : 'Toàn bộ dữ liệu Teyvat trong một nơi'}
      </div>
    </div>
  );
}
