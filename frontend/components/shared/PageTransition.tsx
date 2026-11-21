"use client";

import { MotionConfig } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPrivate = pathname.split('/').some(segment =>
    ['admin', 'profile'].includes(segment)
  );

  return (
    <div className={`site-page-content${isPrivate ? '' : ' site-public-content'} w-full h-full`}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </div>
  );
}
