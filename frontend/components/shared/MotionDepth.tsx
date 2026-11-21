"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react';

export default function MotionDepth({ children, className, style }: {
  children: ReactNode;
  className: string;
  style?: CSSProperties;
}) {
  const bounds = useRef<DOMRect | null>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!bounds.current || event.pointerType !== 'mouse') return;
    const { left, top, width, height } = bounds.current;
    const offset = (value: number) => Math.max(-.5, Math.min(.5, value)) * 12;
    event.currentTarget.style.setProperty('--depth-x', `${offset((event.clientX - left) / width - .5)}px`);
    event.currentTarget.style.setProperty('--depth-y', `${offset((event.clientY - top) / height - .5)}px`);
  }
  return (
    <div className={className} style={style} onPointerEnter={event => {
      if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
        bounds.current = event.currentTarget.getBoundingClientRect();
      }
    }} onPointerMove={move} onPointerLeave={event => {
      bounds.current = null;
      event.currentTarget.style.removeProperty('--depth-x');
      event.currentTarget.style.removeProperty('--depth-y');
    }}>
      {children}
    </div>
  );
}
