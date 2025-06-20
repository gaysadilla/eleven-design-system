import { NextResponse } from 'next/server';

// GET /api/health - Simple health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'next-js',
    timestamp: new Date().toISOString()
  });
}

// HEAD /api/health - For quick health checks
export async function HEAD() {
  return new Response(null, { status: 200 });
} 