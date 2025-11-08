// POST /api/upload - Upload image to Cloudinary
// Last updated: 2025-11-08

import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';
import type { ApiError } from '@/types/pottery';

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

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' } as ApiError,
        { status: 400 }
      );
    }

    // Convert file to base64 data URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await uploadImage(dataUrl);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' } as ApiError,
      { status: 500 }
    );
  }
}
