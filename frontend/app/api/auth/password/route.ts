import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { oldPassword, newPassword } = body;

    const data = await fetchGraphQL(`
      mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
      }
    `, { oldPassword, newPassword }, 0, token);

    if (data?.changePassword === true) {
      // Upon successful password change, we revoke the session by deleting the cookie
      // to force them to log in with the new password.
      const response = NextResponse.json({ success: true });
      response.cookies.delete('user_token');
      return response;
    }

    return NextResponse.json({ error: 'Failed to change password' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
