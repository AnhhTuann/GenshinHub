import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    const data = await fetchGraphQL(`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
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
    `, { email, password }, 0);

    if (!data || !data.login) {
      return NextResponse.json({ error: 'Login failed' }, { status: 401 });
    }

    const { token, user } = data.login;

    const cookieStore = await cookies();
    cookieStore.set('user_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      ...(rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}),
      path: '/',
    });

    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
