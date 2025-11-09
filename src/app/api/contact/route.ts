// POST /api/contact - Create contact submission
// Last updated: 2025-11-09

import { NextRequest, NextResponse } from 'next/server';
import { createContactSubmission } from '@/lib/db';
import type { CreateContactRequest, ContactResponse } from '@/types/contact';

export async function POST(request: NextRequest) {
  try {
    const body: CreateContactRequest = await request.json();
    const { name, email, phone, inquiryType, message } = body;

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (!inquiryType) {
      return NextResponse.json(
        { success: false, error: 'Inquiry type is required' },
        { status: 400 }
      );
    }

    if (!message?.trim() || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Create contact submission in database
    await createContactSubmission({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      inquiryType,
      message: message.trim(),
    });

    const response: ContactResponse = {
      success: true,
      message: 'Thank you for your inquiry! We\'ll get back to you soon.',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('POST contact error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
