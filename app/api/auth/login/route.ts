import { NextRequest, NextResponse } from 'next/server';
import { authDb } from '@/lib/auth-db';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Normalize email
    const normalizedEmail = email?.trim().toLowerCase();
    
    console.log('[login] Attempting login with email:', normalizedEmail);

    // Validate input
    if (!normalizedEmail || !password) {
      console.log('[login] Missing email or password');
      return NextResponse.json(
        { error: 'ईमेल और पासवर्ड आवश्यक हैं' },
        { status: 400 }
      );
    }

    // Find user by email
    console.log('[login] Searching for user by email...');
    const user = await authDb.getUserByEmail(normalizedEmail);
    
    if (!user) {
      console.log('[login] User not found.');
      
      return NextResponse.json(
        { error: 'ईमेल या पासवर्ड अमान्य है' },
        { status: 401 }
      );
    }

    // Verify password (compare hashes)
    const passwordHash = authDb.hashPassword(password);
    console.log('[login] Password verification - stored:', user.passwordHash?.slice(0, 10) + '...');
    console.log('[login] Password verification - provided:', passwordHash.slice(0, 10) + '...');
    
    if (user.passwordHash !== passwordHash) {
      console.log('[login] Password mismatch');
      return NextResponse.json(
        { error: 'ईमेल या पासवर्ड अमान्य है' },
        { status: 401 }
      );
    }

    console.log('[login] Login successful for:', normalizedEmail);

    // Return user data (without password)
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    console.error('[login] Error:', error);
    return NextResponse.json(
      { error: 'लॉगिन विफल। कृपया बाद में पुनः प्रयास करें' },
      { status: 500 }
    );
  }
}
