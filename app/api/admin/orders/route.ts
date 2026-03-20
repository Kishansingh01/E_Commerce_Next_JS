import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/lib/models/Order';

// GET all orders for the admin dashboard
export async function GET() {
  try {
    await connectDB();
    
    // Fetch all orders, newest first
    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: orders.length, data: orders }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch All Orders API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// PATCH an order to update its status
export async function PATCH(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and new status are required' },
        { status: 400 }
      );
    }

    // Validate status string matches enum
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status provided' },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Order status updated', data: updatedOrder },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update Order API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}
