import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { cookies } from 'next/headers';

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { username, displayName } = body;

    const data = await fetchGraphQL(`
      mutation UpdateProfile($input: UpdateProfileInput!) {
        updateProfile(input: $input) {
          id
          username
          displayName
        }
      }
    `, { input: { username, displayName } }, 0, token);

    if (!data || !data.updateProfile) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: data.updateProfile });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
