"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  vi: "Tiếng Việt",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  ru: "Русский",
  th: "ภาษาไทย",
  de: "Deutsch",
  id: "Bahasa Indonesia",
  pt: "Português",
  it: "Italiano",
  tr: "Türkçe",
};

const LOCALES = Object.keys(LOCALE_NAMES);

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
        className="h-8 sm:h-9 flex items-center gap-1.5 rounded-full px-3 transition-all duration-200 group bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200/80 hover:border-violet-300/80 shadow-xs cursor-pointer"
        aria-label="Select language"
      >
        <span className="text-slate-700 text-[11px] font-extrabold uppercase tracking-wider group-hover:text-violet-700 transition-colors">
          {locale.toUpperCase()}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-slate-400 group-hover:text-violet-600"
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
            className="site-nav-menu absolute top-full right-0 mt-2 w-max min-w-[130px] max-h-60 overflow-y-auto custom-scrollbar rounded-2xl z-50 flex flex-col p-1.5 shadow-2xl"
          >
            {LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => handleSelect(l)}
                className={`px-3 py-1.5 text-xs text-left rounded-xl transition-all duration-150 cursor-pointer ${
                  locale === l
                    ? 'text-violet-700 bg-violet-50 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-bold'
                }`}
              >
                {LOCALE_NAMES[l]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
