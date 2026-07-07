"use client";

import { useEffect, useState } from 'react';
import { User } from '@/context/UserContext';
import { fetchGraphQLClient } from '@/lib/graphql/client';
import CharacterCard from '@/components/characters/client/CharacterCard';
import { CharacterData } from '@/types/character';
import { Loader2 } from 'lucide-react';

export default function FavoritesTab({ user }: { user: User }) {
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      if (!user.favoriteIds || user.favoriteIds.length === 0) {
        setLoading(false);
        return;
      }
      try {
        // Fetch all characters and filter, or fetch specific. Fetching all is fast since it's a small list anyway
        const data = await fetchGraphQLClient(`
          query AllCharacters {
            characters {
              id
              nameEn
              nameVi
              element
              rarity
              avatarUrl
              splashArtUrl
            }
          }
        `);
        if (data.characters) {
          const favs = data.characters.filter((c: CharacterData) => user.favoriteIds?.includes(c.id));
          setCharacters(favs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavs();
  }, [user.favoriteIds]);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-[#c8a84b]" /></div>;

  if (characters.length === 0) {
    return (
      <div className="text-center p-10">
        <p className="text-white/40 mb-4">You haven't favorited any characters yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  );
}
