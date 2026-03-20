import { NextRequest, NextResponse } from 'next/server';
import { authDb } from '@/lib/auth-db';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    // Validate input
    if (!phone) {
      return NextResponse.json(
        { error: 'फोन नंबर आवश्यक है' },
        { status: 400 }
      );
    }

    // Validate Indian phone number format
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'अमान्य फोन नंबर। कृपया भारतीय फोन नंबर प्रारूप में दर्ज करें' },
        { status: 400 }
      );
    }

    // Generate OTP (6 digits)
    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store OTP
    await authDb.setOTP(cleanPhone, otp, expiresAt);

    // In production, send via SMS gateway like Twilio, AWS SNS, or AWS SES
    // For now, log to console (in real app, this would be sent via SMS)
    console.log(`OTP for ${cleanPhone}: ${otp}`);

    return NextResponse.json({
      message: 'OTP आपके प्रदान किए गए नंबर पर भेजा गया है',
      phone: cleanPhone.slice(-4), // Only return last 4 digits for security
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'OTP भेजना विफल। कृपया बाद में पुनः प्रयास करें' },
      { status: 500 }
    );
  }
}
