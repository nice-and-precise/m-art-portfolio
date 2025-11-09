// Diagnostic endpoint to check environment variables
import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    POSTGRES_URL: process.env.POSTGRES_URL ? 'SET (length: ' + process.env.POSTGRES_URL.length + ')' : 'NOT SET',
    POSTGRES_HOST: process.env.POSTGRES_HOST || 'NOT SET',
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || 'NOT SET',
    POSTGRES_USER: process.env.POSTGRES_USER || 'NOT SET',
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING ? 'SET' : 'NOT SET',
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL ? 'SET' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    // Show first 50 chars of POSTGRES_URL for debugging (safe to show in dev)
    POSTGRES_URL_PREFIX: process.env.POSTGRES_URL?.substring(0, 80) || 'NOT SET',
  };

  return NextResponse.json(envVars);
}
