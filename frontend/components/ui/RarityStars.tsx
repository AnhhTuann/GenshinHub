import { Star } from 'lucide-react';

export default function RarityStars({ rarity, locale }: { rarity: number; locale: string }) {
  if (rarity < 1) return null;

  return (
    <span className="character-rarity char-card-stars" data-rarity={rarity} role="img"
      aria-label={locale === 'vi' ? `${rarity} sao` : `${rarity} stars`}>
      {Array.from({ length: rarity }, (_, index) => (
        <Star key={index} size={15} fill="currentColor" aria-hidden="true" />
      ))}
    </span>
  );
}
