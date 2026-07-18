import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp, newPassword } = body;

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const data = await fetchGraphQL(`
      mutation ResetPassword($email: String!, $otp: String!, $newPassword: String!) {
        resetPassword(email: $email, otp: $otp, newPassword: $newPassword)
      }
    `, { email, otp, newPassword }, 0);

    if (!data?.resetPassword) {
      return NextResponse.json({ error: 'Failed to reset password' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
