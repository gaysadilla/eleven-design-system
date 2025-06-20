import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    hasClientId: !!process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID?.substring(0, 8) + '...',
    hasToken: !!process.env.TINA_TOKEN,
    hasBranch: !!process.env.NEXT_PUBLIC_TINA_BRANCH,
    branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 'not set',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    vercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
  };

  return NextResponse.json(envVars);
} 