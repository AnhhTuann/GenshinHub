"use client";

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface FallbackImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  externalSrc?: string;
}

export default function FallbackImage({ src, externalSrc, alt, ...props }: FallbackImageProps) {
  const [tier, setTier] = useState<1 | 2 | 3>(1);

  // Reset state khi component được reuse cho ảnh khác
  React.useEffect(() => {
    setTier(1);
  }, [src, externalSrc]);

  let currentSrc = src;
  if (tier === 2 && externalSrc) currentSrc = externalSrc;
  if (tier === 3 || (tier === 2 && !externalSrc)) currentSrc = '/assets/fallback-icon.png';

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt || ''}
      unoptimized={true} // Bypass Next.js server optimization for Local Assets
      onError={() => {
        if (tier === 1) setTier(2);
        else if (tier === 2) setTier(3);
      }}
    />
  );
}
