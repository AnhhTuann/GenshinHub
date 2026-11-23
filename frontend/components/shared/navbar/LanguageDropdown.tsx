"use client";

import { Check } from "lucide-react";
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
  const triggerRef = useRef<HTMLButtonElement>(null);
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
    <div className="relative" ref={dropdownRef} onKeyDown={(event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="site-nav-control gap-1.5 px-3"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-bold uppercase">
          {locale.toUpperCase()}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-current"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.985 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="site-nav-menu absolute top-full right-0 mt-2 w-max min-w-[130px] max-h-60 overflow-y-auto custom-scrollbar rounded-2xl z-50 flex flex-col p-1.5 shadow-2xl"
          >
            {LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => handleSelect(l)}
                type="button"
                className="site-nav-menu-link"
                aria-pressed={locale === l}
              >
                {LOCALE_NAMES[l]}
                {locale === l && <Check size={16} className="site-nav-language-selected" aria-hidden="true" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
