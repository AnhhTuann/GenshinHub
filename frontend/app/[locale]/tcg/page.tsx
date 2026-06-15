import { setRequestLocale } from 'next-intl/server';
import TCGClient from './TCGClient';

export default async function TCGPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TCGClient locale={locale} />;
}
