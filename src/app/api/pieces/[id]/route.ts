// PUT/DELETE /api/pieces/[id] - Update/Delete pottery piece
// Last updated: 2025-11-08

import { NextRequest, NextResponse } from 'next/server';
import { updatePiece, deletePiece, getPieceById } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import type { UpdatePieceRequest, ApiError } from '@/types/pottery';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    const cookie = request.headers.get('cookie') || '';

    if (!(await isAuthenticated(authHeader, cookie))) {
      return NextResponse.json(
        { error: 'Unauthorized' } as ApiError,
        { status: 401 }
      );
    }

    const body: UpdatePieceRequest = await request.json();
    const piece = await updatePiece(params.id, body);

    if (!piece) {
      return NextResponse.json(
        { error: 'Piece not found' } as ApiError,
        { status: 404 }
      );
    }

    return NextResponse.json(piece);
  } catch (error) {
    console.error('PUT piece error:', error);
    return NextResponse.json(
      { error: 'Failed to update piece' } as ApiError,
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    const cookie = request.headers.get('cookie') || '';

    if (!(await isAuthenticated(authHeader, cookie))) {
      console.error('DELETE unauthorized - no valid auth token');
      return NextResponse.json(
        { error: 'Unauthorized - please log in again' } as ApiError,
        { status: 401 }
      );
    }

    console.log(`Attempting to delete piece: ${params.id}`);
    const success = await deletePiece(params.id);

    if (!success) {
      console.error(`Piece not found: ${params.id}`);
      return NextResponse.json(
        { error: 'Piece not found' } as ApiError,
        { status: 404 }
      );
    }

    console.log(`Successfully deleted piece: ${params.id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE piece error details:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to delete piece: ${errorMessage}` } as ApiError,
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const piece = await getPieceById(params.id);

    if (!piece) {
      return NextResponse.json(
        { error: 'Piece not found' } as ApiError,
        { status: 404 }
      );
    }

    return NextResponse.json(piece);
  } catch (error) {
    console.error('GET piece error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch piece' } as ApiError,
      { status: 500 }
    );
  }
}
