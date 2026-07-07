import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { cookies } from 'next/headers';

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
      }
    `, {}, 0, token);

    if (!data || !data.me) {
      // Token might be invalid/expired, let's clear it
      cookieStore.delete('user_token');
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: data.me });
  } catch (err: any) {
    return NextResponse.json({ user: null, error: err.message }, { status: 401 });
  }
}
