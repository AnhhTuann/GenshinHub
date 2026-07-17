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
    const { name, characters } = body;

    if (!name || !characters) {
      return NextResponse.json({ error: 'Missing name or characters' }, { status: 400 });
    }

    const data = await fetchGraphQL(`
      mutation CreateTeam($name: String!, $characters: [String!]!) {
        createTeam(name: $name, characters: $characters) {
          id
          name
          characters
        }
      }
    `, { name, characters }, 0, token);

    if (!data || !data.createTeam) {
      throw new Error('Failed to create team');
    }

    return NextResponse.json({ team: data.createTeam });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, characters } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing team ID' }, { status: 400 });
    }

    const data = await fetchGraphQL(`
      mutation UpdateTeam($id: String!, $name: String, $characters: [String!]) {
        updateTeam(id: $id, name: $name, characters: $characters) {
          id
          name
          characters
        }
      }
    `, { id, name, characters }, 0, token);

    if (!data || !data.updateTeam) {
      throw new Error('Failed to update team');
    }

    return NextResponse.json({ team: data.updateTeam });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing team ID' }, { status: 400 });
    }

    const data = await fetchGraphQL(`
      mutation DeleteTeam($id: String!) {
        deleteTeam(id: $id)
      }
    `, { id }, 0, token);

    if (!data || !data.deleteTeam) {
      throw new Error('Failed to delete team');
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
