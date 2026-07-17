import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { cookies } from 'next/headers';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider, token, gender } = body;

    if (!provider || !token) {
      return NextResponse.json({ error: 'Thiếu thông tin đăng nhập từ Provider' }, { status: 400 });
    }

    let providerId = '';
    let email = '';
    let username = '';
    let displayName = '';
    let avatarUrl = '';

    if (provider === 'google') {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email) throw new Error('Invalid Google token');
      
      providerId = payload.sub;
      email = payload.email;
      username = email.split('@')[0];
      displayName = payload.name || username;
      avatarUrl = payload.picture || '';
    } else if (provider === 'facebook') {
      // Verify Facebook Access Token
      const fbRes = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`);
      const fbData = await fbRes.json();
      
      if (fbData.error) {
        throw new Error('Invalid Facebook token');
      }

      providerId = fbData.id;
      email = fbData.email || `${fbData.id}@facebook.com`; // FB might not return email
      username = email.split('@')[0];
      displayName = fbData.name;
      avatarUrl = fbData.picture?.data?.url || '';
    } else {
      throw new Error('Unsupported provider');
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
