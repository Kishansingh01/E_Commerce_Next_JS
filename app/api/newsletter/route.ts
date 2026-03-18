import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for newsletter subscribers
// In a production app, this would be a database
const subscribers: Set<string> = new Set();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.has(email)) {
      return NextResponse.json(
        { message: 'Already subscribed', subscribed: true },
        { status: 200 }
      );
    }

    // Add to subscribers
    subscribers.add(email);

    // TODO: In production, save to database and send confirmation email

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter',
        email,
        subscriberCount: subscribers.size
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Newsletter API',
      subscribers: subscribers.size,
      endpoint: 'POST to subscribe'
    },
    { status: 200 }
  );
}
