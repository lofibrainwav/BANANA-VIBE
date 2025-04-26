import { NextResponse } from 'next/server';
import { createVibe, getVibesByUserId } from '@/lib/db/vibe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

const ITEMS_PER_PAGE = 10;

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const vibe = await createVibe({
      userId: session.user.id,
      title: data.title,
      content: data.content,
      mood: data.mood,
    });

    return NextResponse.json(vibe);
  } catch (error) {
    console.error('Failed to create vibe:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // URL에서 페이지 번호와 크기를 가져옴
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || String(ITEMS_PER_PAGE));
    const cursor = searchParams.get('cursor'); // 커서 기반 페이지네이션을 위한 커서

    // 커서 기반 페이지네이션 쿼리
    const vibes = await prisma.vibe.findMany({
      where: {
        userId: session.user.id,
      },
      take: limit,
      ...(cursor && {
        skip: 1, // 현재 커서는 제외
        cursor: {
          id: cursor,
        },
      }),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // 다음 페이지 존재 여부 확인
    const hasMore = vibes.length === limit;
    const nextCursor = hasMore ? vibes[vibes.length - 1].id : null;

    return NextResponse.json({
      items: vibes,
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching vibes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vibes' },
      { status: 500 }
    );
  }
} 