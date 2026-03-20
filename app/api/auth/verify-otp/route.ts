import { NextRequest, NextResponse } from 'next/server';
import { authDb } from '@/lib/auth-db';

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    // Validate input
    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'फोन नंबर और OTP आवश्यक हैं' },
        { status: 400 }
      );
    }

    // Clean phone number
    const cleanPhone = phone.replace(/\s/g, '');

    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: 'OTP 6 अंकों का होना चाहिए' },
        { status: 400 }
      );
    }

    // Verify OTP
    const storedOtp = await authDb.getOTP(cleanPhone);
    
    if (!storedOtp) {
      return NextResponse.json(
        { error: 'OTP को पहले भेजा नहीं गया। कृपया फिर से शुरू करें' },
        { status: 400 }
      );
    }

    if (Date.now() > storedOtp.expiresAt) {
      await authDb.deleteOTP(cleanPhone);
      return NextResponse.json(
        { error: 'OTP समाप्त हो गया है। कृपया नया OTP अनुरोध करें' },
        { status: 400 }
      );
    }

    if (storedOtp.otp !== otp) {
      return NextResponse.json(
        { error: 'OTP गलत है' },
        { status: 401 }
      );
    }

    // OTP verified - find or create user
    let user = await authDb.getUserByPhone(cleanPhone);

    if (!user) {
      // Create new user with phone in MongoDB
      user = await authDb.createUser({
        name: 'Phone User',
        phone: cleanPhone,
      });
    }

    // Clear used OTP
    await authDb.deleteOTP(cleanPhone);

    // Return user data
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'OTP सत्यापन विफल। कृपया बाद में पुनः प्रयास करें' },
      { status: 500 }
    );
  }
}
