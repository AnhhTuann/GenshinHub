import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const data = await fetchGraphQL(`
      query Me {
        me {
          id
          email
          username
          gender
          displayName
          avatarUrl
          travelerCharId
          favoritesCount
        }
        myFavorites {
          itemId
          itemType
        }
        myWishlist {
          id
          itemId
          itemType
          note
          priority
        }
        myTeams {
          id
          name
          characters
        }
      }
    `, {}, 0, token);

    if (!data || !data.me) {
      // Token might be invalid/expired, let's clear it
      cookieStore.delete('user_token');
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const userWithExtras = {
      ...data.me,
      favoriteIds: data.myFavorites.map((f: any) => f.itemId),
      wishlist: data.myWishlist,
      teams: data.myTeams,
    };

    return NextResponse.json({ user: userWithExtras });
  } catch (err: any) {
    return NextResponse.json({ user: null, error: err.message }, { status: 401 });
  }
}
