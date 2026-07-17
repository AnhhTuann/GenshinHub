import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider, providerId, email, username, displayName, avatarUrl, gender } = body;

    if (!provider || !providerId || !email) {
      return NextResponse.json({ error: 'Thiếu thông tin đăng nhập từ Provider' }, { status: 400 });
    }

    const data = await fetchGraphQL(`
      mutation SocialLogin(
        $provider: String!
        $providerId: String!
        $email: String!
        $username: String
        $displayName: String
        $avatarUrl: String
        $gender: String
      ) {
        socialLogin(
          provider: $provider
          providerId: $providerId
          email: $email
          username: $username
          displayName: $displayName
          avatarUrl: $avatarUrl
          gender: $gender
        ) {
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
    `, { provider, providerId, email, username, displayName, avatarUrl, gender }, 0);

    if (!data || !data.socialLogin) {
      return NextResponse.json({ error: 'Social Login failed' }, { status: 400 });
    }

    const { token, user } = data.socialLogin;

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
