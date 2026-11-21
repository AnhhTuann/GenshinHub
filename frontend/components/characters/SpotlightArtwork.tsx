"use client";

import { useState, useEffect } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';

type Artwork = { src: string; fallback?: string };

export default function SpotlightArtwork({ src, fallback, name }: Artwork & { name: string }) {
  const [frame, setFrame] = useState<{ current: Artwork; previous?: Artwork }>({
    current: { src, fallback },
  });

  if (frame.current.src !== src) {
    setFrame({ current: { src, fallback }, previous: frame.current });
  }

  // Handle cleanup when animation ends or is interrupted or reduced motion is enabled
  useEffect(() => {
    if (!frame.previous) return;

    // If reduced motion is active, remove outgoing frame immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFrame(f => ({ current: f.current }));
      return;
    }

    // Safety timeout in case onAnimationEnd doesn't fire (tab switch, browser interruption)
    // Animation is var(--motion-character) which is 850ms
    const timer = setTimeout(() => {
      setFrame(f => ({ current: f.current }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [frame.previous]);

  const handleAnimationEnd = (endedSrc: string) => {
    setFrame(f => {
      // Only clear if the previous frame matches what actually ended
      // This prevents race conditions when characters are switched rapidly
      if (f.previous?.src === endedSrc) {
        return { current: f.current };
      }
      return f;
    });
  };

  const previousSrc = frame.previous?.src;

  return (
    <>
      {previousSrc && (
        <div
          key={previousSrc}
          className="spotlight-art-layer spotlight-art-outgoing"
          aria-hidden="true"
          onAnimationEnd={() => handleAnimationEnd(previousSrc)}
        >
          <FallbackImage
            src={previousSrc}
            externalSrc={frame.previous?.fallback}
            alt=""
            fill
            sizes="(max-width: 767px) 90vw, 55vw"
            className="character-spotlight-image"
          />
        </div>
      )}
      {src && (
        <div key={src} className="spotlight-art-layer spotlight-art-current">
          <FallbackImage
            src={src}
            externalSrc={fallback}
            alt={name}
            fill
            sizes="(max-width: 767px) 90vw, 55vw"
            className="character-spotlight-image"
          />
        </div>
      )}
    </>
  );
}
