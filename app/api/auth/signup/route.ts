import { NextRequest, NextResponse } from 'next/server';
import { authDb } from '@/lib/auth-db';

export async function POST(request: NextRequest) {
  try {
    console.log('\n[signup] ==================== NEW SIGNUP REQUEST ====================');
    const body = await request.json();
    const { name, email, phone, password } = body;

    // Normalize email
    const normalizedEmail = email?.trim().toLowerCase();

    console.log('[signup] Received data:', { name: !!name, email: normalizedEmail, phone, password: !!password });

    // Validate input
    if (!name || !normalizedEmail || !phone || !password) {
      console.log('[signup] ❌ Missing fields');
      return NextResponse.json(
        { error: 'सभी फ़ील्ड आवश्यक हैं' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      console.log('[signup] ❌ Invalid email format:', normalizedEmail);
      return NextResponse.json(
        { error: 'अमान्य ईमेल प्रारूप' },
        { status: 400 }
      );
    }

    // Validate Indian phone number format
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      console.log('[signup] ❌ Invalid phone format:', cleanPhone);
      return NextResponse.json(
        { error: 'अमान्य फोन नंबर। कृपया भारतीय फोन नंबर प्रारूप में दर्ज करें' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('[signup] Checking for existing email...');
    if (await authDb.getUserByEmail(normalizedEmail)) {
      console.log('[signup] ❌ Email already exists');
      return NextResponse.json(
        { error: 'यह ईमेल पहले से पंजीकृत है' },
        { status: 400 }
      );
    }

    console.log('[signup] Checking for existing phone...');
    if (await authDb.getUserByPhone(cleanPhone)) {
      console.log('[signup] ❌ Phone already exists');
      return NextResponse.json(
        { error: 'यह फोन नंबर पहले से पंजीकृत है' },
        { status: 400 }
      );
    }

    console.log('[signup] Creating user in DB...');
    const passwordHash = authDb.hashPassword(password);
    const createdUser = await authDb.createUser({
      name,
      email: normalizedEmail,
      phone: cleanPhone,
      passwordHash,
    });
    console.log('[signup] ✅ User created successfully with MongoDB ID:', createdUser.id);

    // Return user data (without password)
    return NextResponse.json({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      phone: createdUser.phone,
    });
  } catch (error) {
    console.error('[signup] ❌ ERROR:', error);
    return NextResponse.json(
      { error: 'पंजीकरण विफल। कृपया बाद में पुनः प्रयास करें' },
      { status: 500 }
    );
  }
}
