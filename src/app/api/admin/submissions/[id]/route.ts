// PATCH/DELETE /api/admin/submissions/[id] - Update or delete submission (admin only)
// Last updated: 2025-11-09

import { NextRequest, NextResponse } from 'next/server';
import { updateContactSubmissionStatus, deleteContactSubmission } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import type { ApiError } from '@/types/pottery';

export async function PATCH(
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

    const body = await request.json();
    const { status } = body;

    if (!status || !['new', 'read', 'responded', 'archived'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' } as ApiError,
        { status: 400 }
      );
    }

    const submission = await updateContactSubmissionStatus(params.id, status);

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' } as ApiError,
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error('PATCH submission error:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' } as ApiError,
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
      return NextResponse.json(
        { error: 'Unauthorized' } as ApiError,
        { status: 401 }
      );
    }

    await deleteContactSubmission(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE submission error:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' } as ApiError,
      { status: 500 }
    );
  }
}
