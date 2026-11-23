import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ code: 'AUTH_SOCIAL_UNAVAILABLE' }, { status: 403 });
}
