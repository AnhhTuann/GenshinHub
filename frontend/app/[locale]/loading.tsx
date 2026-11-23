import { getTranslations } from 'next-intl/server';

export default async function Loading() {
  const t = await getTranslations('Common');
  return (
    <main className="route-skeleton" aria-busy="true" aria-label={t('loading')}>
      <div className="route-skeleton-heading" />
      <div className="route-skeleton-grid" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => <div key={index} />)}
      </div>
    </main>
  );
}
