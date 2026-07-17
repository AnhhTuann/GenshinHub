import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await fetchGraphQL(`
      mutation SyncGachaUrl($url: String!) {
        syncGachaUrl(url: $url) {
          character { pulls pity guaranteed }
          weapon { pulls pity guaranteed }
          standard { pulls pity guaranteed }
          winRate
          totalPulls
          fiveStarHistory {
            id
            name
            type
            pity
            win
            date
          }
        }
      }
    `, { url }, 0, token);

    return NextResponse.json({ success: true, stats: data.syncGachaUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
