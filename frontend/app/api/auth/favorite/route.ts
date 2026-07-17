import { NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { itemId, itemType } = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await fetchGraphQL(`
      mutation ToggleFavorite($itemId: String!, $itemType: String!) {
        toggleFavorite(itemId: $itemId, itemType: $itemType) {
          added
          itemId
          itemType
        }
      }
    `, { itemId, itemType }, 0, token);

    return NextResponse.json({ success: true, result: data.toggleFavorite });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
