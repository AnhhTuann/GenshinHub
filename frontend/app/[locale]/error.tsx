"use client";

import { useLocale } from 'next-intl';

export default function RouteError({ reset }: { reset: () => void }) {
  const vi = useLocale() === 'vi';
  return (
    <main className="fantasy-route-error" role="alert">
      <h1>{vi ? 'Không thể tải trang' : 'This page could not load'}</h1>
      <button type="button" className="fantasy-action" onClick={reset}>
        {vi ? 'Thử lại' : 'Try again'}
      </button>
    </main>
  );
}
