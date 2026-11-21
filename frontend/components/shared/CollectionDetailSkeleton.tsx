import { getTranslations } from 'next-intl/server';

export default async function CollectionDetailSkeleton() {
  const t = await getTranslations('Common');
  return (
    <main className="collection-detail-skeleton" aria-busy="true" aria-label={t('loading')}>
      <div className="collection-detail-skeleton-nav" />
      <div className="collection-detail-skeleton-card">
        <div className="collection-detail-skeleton-art" />
        <div className="collection-detail-skeleton-copy"><div /><div /><div /></div>
      </div>
      <div className="collection-detail-skeleton-bonus" />
    </main>
  );
}
