"use client";

import { useEffect, useRef, type ReactNode } from 'react';

export default function MotionRevealGroup({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        (target as HTMLElement).dataset.revealed = 'true';
        observer.unobserve(target);
      }
    }, { threshold: .06 });
    root.querySelectorAll('[data-motion-row]').forEach(row => observer.observe(row));
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
