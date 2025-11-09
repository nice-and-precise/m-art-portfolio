// GET /api/admin/submissions - Get all contact submissions (admin only)
// Last updated: 2025-11-09

import { NextRequest, NextResponse } from 'next/server';
import { getAllContactSubmissions } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import type { ApiError } from '@/types/pottery';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cookie = request.headers.get('cookie') || '';

    if (!(await isAuthenticated(authHeader, cookie))) {
      return NextResponse.json(
        { error: 'Unauthorized' } as ApiError,
        { status: 401 }
      );
    }

    const submissions = await getAllContactSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('GET submissions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' } as ApiError,
      { status: 500 }
    );
  }
}
