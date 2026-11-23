"use client";

import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { X } from 'lucide-react';
import SpotlightPanel, { type SpotlightCharacter } from '@/components/characters/SpotlightPanel';

interface Props {
  open: boolean;
  onClose: () => void;
  character: SpotlightCharacter & { nameEn: string; nameVi?: string; title?: string; role?: string; tier?: string };
  href: string;
  locale: string;
}

export default function SplashArtOverlay({ open, onClose, character, href, locale }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const vi = locale === 'vi';
  const name = vi && character.nameVi ? character.nameVi : character.nameEn;

  function dismiss() {
    ref.current?.close();
    onClose();
  }

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const trigger = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = overflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open]);

  return createPortal(
    <dialog ref={ref} aria-labelledby={headingId} className="character-preview"
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={event => { event.preventDefault(); dismiss(); }}
      onClick={event => { if (event.target === event.currentTarget) dismiss(); }}>
      <div className="character-preview-inner">
        <button autoFocus type="button" className="character-preview-close fantasy-action"
          aria-label={vi ? 'Đóng xem trước' : 'Close preview'} onClick={dismiss}><X size={20} /></button>
        <SpotlightPanel compact character={character} name={name} title={character.title} locale={locale}
          headingId={headingId} actions={<Link className="fantasy-action fantasy-action-primary" href={href} onClick={dismiss}>
            {vi ? 'Xem bản build' : 'View Full Build'}
          </Link>}>
          {(character.tier || character.role) && <p className="character-spotlight-title">
            {[character.tier, character.role].filter(Boolean).join(' · ')}
          </p>}
        </SpotlightPanel>
      </div>
    </dialog>,
    document.body,
  );
}
