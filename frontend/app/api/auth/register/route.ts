import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password, gender, displayName } = body;

    const data = await fetchGraphQL(`
      mutation Register($input: RegisterInput!) {
        register(input: $input) {
          token
          user {
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
      }
    `, { input: { username, email, password, gender, displayName } });

    if (!data || !data.register) {
      return NextResponse.json({ error: 'Registration failed' }, { status: 400 });
    }

    const { token, user } = data.register;

    const cookieStore = await cookies();
    cookieStore.set('user_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
