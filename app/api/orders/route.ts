import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/lib/models/Order';

export async function GET(req: Request) {
  try {
    await connectDB();
    
    // Get userId from query param
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find all orders for this user, sorted newest first
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: orders.length, data: orders }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch Orders API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
