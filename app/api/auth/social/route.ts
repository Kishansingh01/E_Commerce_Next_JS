import { NextRequest, NextResponse } from 'next/server';
import { authDb } from '@/lib/auth-db';

/**
 * Google OAuth callback handler
 * In production: use next-auth with Google provider, verify ID token via Google API.
 * For now: upsert a user record in MongoDB based on the provided email.
 */
export async function POST(request: NextRequest) {
  try {
    const { token, provider, email, name } = await request.json();

    if (!token || !provider) {
      return NextResponse.json(
        { error: 'टोकन और प्रदाता आवश्यक हैं' },
        { status: 400 }
      );
    }

    // Look up by email if provided, otherwise create a fresh user
    let user = email ? await authDb.getUserByEmail(email) : undefined;

    if (!user) {
      user = await authDb.createUser({
        name: name || 'Google User',
        email: email || `user-${Date.now()}@google.local`,
      });
    }

    if (!user) {
      throw new Error('प्रयोक्ता बनाने में विफल');
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    console.error('[social] Social login error:', error);
    return NextResponse.json(
      { error: 'सामाजिक लॉगिन विफल। कृपया बाद में पुनः प्रयास करें' },
      { status: 500 }
    );
  }
}
