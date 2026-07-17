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
    const { action, newEmail, otp } = body;

    if (action === 'REQUEST_OTP') {
      const data = await fetchGraphQL(`
        mutation RequestEmailChangeOtp($newEmail: String!) {
          requestEmailChangeOtp(newEmail: $newEmail)
        }
      `, { newEmail }, 0, token);

      return NextResponse.json({ success: data?.requestEmailChangeOtp });
    } 
    
    if (action === 'VERIFY_OTP') {
      const data = await fetchGraphQL(`
        mutation VerifyEmailChangeOtp($newEmail: String!, $otp: String!) {
          verifyEmailChangeOtp(newEmail: $newEmail, otp: $otp) {
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
      `, { newEmail, otp }, 0, token);

      if (!data || !data.verifyEmailChangeOtp) {
        return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 400 });
      }

      return NextResponse.json({ success: true, user: data.verifyEmailChangeOtp });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
