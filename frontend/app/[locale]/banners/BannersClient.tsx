"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { BANNERS_HISTORY, BannerItem } from '@/data/banners';
import { Link } from '@/i18n/routing';
import { useMemo } from 'react';



const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function BannersClient({ locale }: { locale: string }) {
  const t = useTranslations('Banners');

  // Removed charMap and weaponMap

  // Remove renderBannerItem as we will use the full banner images

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-black font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-indigo-500 mb-6 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] uppercase">
          {t('title')}
        </h1>
        <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          {t('description')}
        </p>
      </motion.div>

      {/* Timeline List */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-16 relative">
        {/* Vertical Line */}
        <div className="absolute left-[20px] md:left-1/2 top-4 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent -translate-x-1/2 hidden md:block" />

        {BANNERS_HISTORY.map((versionBlock, index) => {
          const vName = locale === 'en' ? versionBlock.versionNameEn : versionBlock.versionNameVi;
          
          return (
            <motion.div variants={itemVariants} key={versionBlock.version} className="relative z-10 w-full flex flex-col md:flex-row gap-8 md:gap-0">
              
              {/* Version Badge for Mobile */}
              <div className="md:hidden flex items-center gap-4 mb-4">
                <div className="px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-400 font-black text-xl shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  v{versionBlock.version}
                </div>
                <h2 className="text-xl font-bold text-white flex-1 leading-tight">{vName}</h2>
              </div>

              {/* Phase 1 */}
              <div className="md:w-1/2 flex justify-end md:pr-12 w-full">
                {versionBlock.phases[0] && (
                  <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl p-6 w-full max-w-[500px] shadow-2xl hover:border-white/10 transition-colors group">
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
                          <h3 className="text-xs font-bold text-blue-400/80 uppercase mb-3 tracking-widest">{t('characters')}</h3>
                          <div className="flex flex-col gap-4">
                            {versionBlock.phases[0].characterBanners.map((imgUrl, idx) => (
                              <div key={idx} className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(59,130,246,0.3)] cursor-pointer">
                                <Image src={imgUrl} alt="Character Banner" fill priority={index === 0} className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Weapon Banners */}
                      {versionBlock.phases[0].weaponBanners && versionBlock.phases[0].weaponBanners.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold text-purple-400/80 uppercase mb-3 tracking-widest">{t('weapons')}</h3>
                          <div className="flex flex-col gap-4">
                            {versionBlock.phases[0].weaponBanners.map((imgUrl, idx) => (
                              <div key={idx} className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(168,85,247,0.3)] cursor-pointer">
                                <Image src={imgUrl} alt="Weapon Banner" fill priority={index === 0} className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
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
              <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)] border-2 border-[#07070a] z-20" />

              {/* Phase 2 */}
              <div className="md:w-1/2 flex justify-start md:pl-12 w-full mt-4 md:mt-24">
                {versionBlock.phases[1] && (
                  <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl p-6 w-full max-w-[500px] shadow-2xl hover:border-white/10 transition-colors group">
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
                          <h3 className="text-xs font-bold text-blue-400/80 uppercase mb-3 tracking-widest">{t('characters')}</h3>
                          <div className="flex flex-col gap-4">
                            {versionBlock.phases[1].characterBanners.map((imgUrl, idx) => (
                              <div key={idx} className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(59,130,246,0.3)] cursor-pointer">
                                <Image src={imgUrl} alt="Character Banner" fill priority={index === 0} className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Weapon Banners */}
                      {versionBlock.phases[1].weaponBanners && versionBlock.phases[1].weaponBanners.length > 0 && (
                        <div>
                          <h3 className="text-xs font-bold text-purple-400/80 uppercase mb-3 tracking-widest">{t('weapons')}</h3>
                          <div className="flex flex-col gap-4">
                            {versionBlock.phases[1].weaponBanners.map((imgUrl, idx) => (
                              <div key={idx} className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(168,85,247,0.3)] cursor-pointer">
                                <Image src={imgUrl} alt="Weapon Banner" fill priority={index === 0} className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
