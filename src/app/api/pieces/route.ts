// GET/POST /api/pieces - List/Create pottery pieces
// Last updated: 2025-11-08

import { NextRequest, NextResponse } from 'next/server';
import { getAllPieces, createPiece, getPiecesByCollection, getFeaturedPieces } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import type { CreatePieceRequest, ApiError, Collection } from '@/types/pottery';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    const featured = searchParams.get('featured');

    let pieces;
    if (featured === 'true') {
      pieces = await getFeaturedPieces();
    } else if (collection) {
      pieces = await getPiecesByCollection(collection as Collection);
    } else {
      pieces = await getAllPieces();
    }

    return NextResponse.json(pieces);
  } catch (error) {
    console.error('GET pieces error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pieces' } as ApiError,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cookie = request.headers.get('cookie') || '';

    if (!(await isAuthenticated(authHeader, cookie))) {
      return NextResponse.json(
        { error: 'Unauthorized' } as ApiError,
        { status: 401 }
      );
    }

    const body: CreatePieceRequest = await request.json();
    const { title, description, collection, images, featured = false } = body;

    if (!title || !collection || !images?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' } as ApiError,
        { status: 400 }
      );
    }

    const piece = await createPiece({
      title,
      description,
      collection,
      images,
      featured,
    });

    return NextResponse.json(piece, { status: 201 });
  } catch (error) {
    console.error('POST piece error:', error);
    return NextResponse.json(
      { error: 'Failed to create piece' } as ApiError,
      { status: 500 }
    );
  }
}
