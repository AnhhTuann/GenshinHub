"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const LOCALES = ['en', 'vi', 'zh', 'ja', 'ko', 'es', 'fr', 'ru', 'th', 'de', 'id', 'pt', 'it', 'tr'];

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (l: string) => {
    router.replace(pathname, { locale: l });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl px-3 py-1.5 transition-all duration-200 group"
        style={{
          background: 'rgba(13,13,20,0.6)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span className="text-white/80 text-[10px] font-black uppercase tracking-widest group-hover:text-[var(--theme-light)] transition-colors">
          {locale}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-white/50 group-hover:text-[var(--theme-light)]"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-24 max-h-60 overflow-y-auto custom-scrollbar rounded-xl z-50 flex flex-col p-1 glass-strong border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => handleSelect(l)}
                className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest text-left rounded-lg transition-all duration-200 ${
                  locale === l
                    ? 'text-[var(--theme-main)] bg-white/5'
                    : 'text-white/50 hover:text-[var(--theme-light)] hover:bg-white/5'
                }`}
              >
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
