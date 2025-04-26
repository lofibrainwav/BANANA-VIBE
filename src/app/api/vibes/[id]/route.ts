import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getVibeById, deleteVibe, updateVibe } from '@/lib/db/vibe';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const vibe = await getVibeById(params.id);
    if (!vibe) {
      return NextResponse.json(
        { error: 'Vibe not found' },
        { status: 404 }
      );
    }

    if (vibe.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(vibe);
  } catch (error) {
    console.error('Failed to fetch vibe:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const vibe = await getVibeById(params.id);
    if (!vibe) {
      return NextResponse.json(
        { error: 'Vibe not found' },
        { status: 404 }
      );
    }

    if (vibe.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const updatedVibe = await updateVibe(params.id, {
      title: data.title,
      content: data.content,
      mood: data.mood,
    });

    return NextResponse.json(updatedVibe);
  } catch (error) {
    console.error('Failed to update vibe:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const vibe = await getVibeById(params.id);
    if (!vibe) {
      return NextResponse.json(
        { error: 'Vibe not found' },
        { status: 404 }
      );
    }

    if (vibe.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await deleteVibe(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete vibe:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 