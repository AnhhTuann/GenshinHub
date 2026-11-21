"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

export default function ScrollEntrance({ children, className = '', delay = 0 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.revealed = 'true';
      observer.disconnect();
    }, { threshold: .08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fantasy-scroll-entrance ${className}`}
      style={{ '--motion-delay': `${Math.min(delay, .1) * 1000}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
