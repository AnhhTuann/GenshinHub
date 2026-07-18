import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const data = await fetchGraphQL(`
      mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email)
      }
    `, { email }, 0);

    // Always return success to prevent email enumeration
    return NextResponse.json({ success: true });
  } catch (err: any) {
    // Rethrow rate-limit errors so the UI can show them
    if (err.message?.includes('đợi')) {
      return NextResponse.json({ error: err.message }, { status: 429 });
    }
    // Otherwise hide backend errors (security)
    return NextResponse.json({ success: true });
  }
}
