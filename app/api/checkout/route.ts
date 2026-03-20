import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/lib/models/Order';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const {
      userId,        // optional
      personalInfo,  // { firstName, lastName, email, phone }
      shippingAddress, // { address, city, state, zip }
      paymentMethod, // mock payment details (we only extract mask)
      items,         // cart items snapshot
      subtotal,
      tax,
      shippingCost,
      total
    } = body;

    // VERY basic validation
    if (!personalInfo || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required order data' },
        { status: 400 }
      );
    }

    // Mask card (e.g., getting last 4 digits of whatever string was sent in mock)
    const rawCard = paymentMethod?.cardNumber || '';
    const last4 = rawCard.length >= 4 ? rawCard.slice(-4) : '0000';

    // Build the order document
    const orderDoc = {
      user: userId || undefined,
      personalInfo,
      shippingAddress,
      paymentMaskedInfo: { last4, cardType: 'card' },
      items,
      subtotal,
      tax,
      shippingCost,
      total,
      paymentStatus: 'completed', // For our mock checkout, we assume payment worked
      status: 'pending' // Order is now pending fulfillment
    };

    const newOrder = await Order.create(orderDoc);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Order created successfully', 
        orderId: newOrder._id 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
