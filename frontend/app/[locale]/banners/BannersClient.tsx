"use client";
import { useTranslations } from 'next-intl';
import FallbackImage from '@/components/ui/FallbackImage';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MotionRevealGroup from '@/components/shared/MotionRevealGroup';
import { BANNERS_HISTORY, BannerItem } from '@/data/banners';
import { Link } from '@/i18n/routing';
import { useMemo } from 'react';



export default function BannersClient({ locale }: { locale: string }) {
  const t = useTranslations('Banners');

  // Removed charMap and weaponMap

  // Remove renderBannerItem as we will use the full banner images

  return (
    <div className="atlas-container py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: .8, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36 }}
        className="text-left mb-12"
      >
        <h1 className="atlas-detail-title">
          {t('title')}
        </h1>
        <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl leading-relaxed">
          {t('description')}
        </p>
      </motion.div>

      {/* Timeline List */}
      <MotionRevealGroup className="fantasy-timeline flex flex-col gap-16 relative">
        {/* Vertical Line */}
        <div className="absolute left-[20px] md:left-1/2 top-4 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent -translate-x-1/2 hidden md:block" />

        {BANNERS_HISTORY.map((versionBlock, index) => {
          const vName = locale === 'en' ? versionBlock.versionNameEn : versionBlock.versionNameVi;
          
          return (
            <div data-motion-row data-latest={index === 0} key={versionBlock.version} className="relative z-10 w-full flex flex-col md:flex-row gap-8 md:gap-0">
              
              {/* Version Badge for Mobile */}
              <div className="md:hidden flex items-center gap-4 mb-4">
                <div className="px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-400 font-black text-xl ">
                  v{versionBlock.version}
                </div>
                <h2 className="text-xl font-bold text-white flex-1 leading-tight">{vName}</h2>
              </div>

              {/* Phase 1 */}
              <div className="md:w-1/2 flex justify-end md:pr-12 w-full">
                {versionBlock.phases[0] && (
                  <div className="atlas-surface p-4 sm:p-6 w-full max-w-[580px] hover:border-[var(--border-strong)] transition-colors group">
                    <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                      <div>
                        <span className="text-xs font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded-md">Phase 1</span>
                        <div className="text-sm font-medium text-white/50 mt-2">
                          {versionBlock.phases[0].startDate} - {versionBlock.phases[0].endDate}
                        </div>
                      </div>
                      <div className="hidden md:flex flex-col items-end">
                        <span className="text-2xl font-black text-white/90 drop-shadow-md">v{versionBlock.version}</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-wider mt-1 text-right max-w-[150px]">{vName}</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Character Banners */}
                      {versionBlock.phases[0].characterBanners && versionBlock.phases[0].characterBanners.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold text-[var(--accent-second-light)] uppercase mb-3 tracking-widest">{t('characters')}</h3>
                          <div className="flex flex-col gap-4">
                            {versionBlock.phases[0].characterBanners.map((imgUrl, idx) => (
                              <div key={idx} className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-none group-hover:border-white/30 transition-all duration-500 fantasy-banner-card cursor-pointer">
                                <FallbackImage src={imgUrl} alt="Character Banner" fill priority={index === 0} className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Weapon Banners */}
                      {versionBlock.phases[0].weaponBanners && versionBlock.phases[0].weaponBanners.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold text-[var(--accent-primary-light)] uppercase mb-3 tracking-widest">{t('weapons')}</h3>
                          <div className="flex flex-col gap-4">
                            {versionBlock.phases[0].weaponBanners.map((imgUrl, idx) => (
                              <div key={idx} className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-none group-hover:border-white/30 transition-all duration-500 fantasy-banner-card cursor-pointer">
                                <FallbackImage src={imgUrl} alt="Weapon Banner" fill priority={index === 0} className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Center Dot for Desktop */}
              <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(201,168,106,0.8)] border-2 border-[#121109] z-20" />

              {/* Phase 2 */}
              <div className="md:w-1/2 flex justify-start md:pl-12 w-full mt-4 md:mt-24">
                {versionBlock.phases[1] && (
                  <div className="atlas-surface p-4 sm:p-6 w-full max-w-[580px] hover:border-[var(--border-strong)] transition-colors group">
                    <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                      <div>
                        <span className="text-xs font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-1 rounded-md">Phase 2</span>
                        <div className="text-sm font-medium text-white/50 mt-2">
                          {versionBlock.phases[1].startDate} - {versionBlock.phases[1].endDate}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Character Banners */}
                      {versionBlock.phases[1].characterBanners && versionBlock.phases[1].characterBanners.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold text-[var(--accent-second-light)] uppercase mb-3 tracking-widest">{t('characters')}</h3>
                          <div className="flex flex-col gap-4">
                            {versionBlock.phases[1].characterBanners.map((imgUrl, idx) => (
                              <div key={idx} className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-none group-hover:border-white/30 transition-all duration-500 fantasy-banner-card cursor-pointer">
                                <FallbackImage src={imgUrl} alt="Character Banner" fill priority={index === 0} className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Weapon Banners */}
                      {versionBlock.phases[1].weaponBanners && versionBlock.phases[1].weaponBanners.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold text-[var(--accent-primary-light)] uppercase mb-3 tracking-widest">{t('weapons')}</h3>
                          <div className="flex flex-col gap-4">
                            {versionBlock.phases[1].weaponBanners.map((imgUrl, idx) => (
                              <div key={idx} className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-none group-hover:border-white/30 transition-all duration-500 fantasy-banner-card cursor-pointer">
                                <FallbackImage src={imgUrl} alt="Weapon Banner" fill priority={index === 0} className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </MotionRevealGroup>
    </div>
  );
}
