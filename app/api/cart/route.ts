import { NextRequest, NextResponse } from 'next/server';

// In-memory cart storage
// In production, this would be session-based or user-based
interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
}

const carts: Map<string, CartItem[]> = new Map();

// Generate a simple session ID
function getOrCreateSessionId(request: NextRequest): string {
  const cookies = request.cookies;
  let sessionId = cookies.get('sessionId')?.value;

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  return sessionId;
}

export async function POST(request: NextRequest) {
  try {
    const sessionId = getOrCreateSessionId(request);
    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    if (quantity < 1) {
      return NextResponse.json(
        { error: 'Quantity must be at least 1' },
        { status: 400 }
      );
    }

    // Get or create cart
    let cart = carts.get(sessionId) || [];

    // Check if product already in cart
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
        addedAt: new Date().toISOString(),
      });
    }

    carts.set(sessionId, cart);

    const response = NextResponse.json(
      {
        message: 'Item added to cart',
        cartSize: cart.length,
        sessionId,
      },
      { status: 201 }
    );

    // Set session cookie
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Cart error:', error);
    return NextResponse.json(
      { error: 'Failed to process cart request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = getOrCreateSessionId(request);
    const cart = carts.get(sessionId) || [];

    return NextResponse.json(
      {
        message: 'Cart retrieved',
        items: cart,
        itemCount: cart.length,
        sessionId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cart error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionId = getOrCreateSessionId(request);
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    let cart = carts.get(sessionId) || [];
    cart = cart.filter(item => item.productId !== productId);

    if (cart.length === 0) {
      carts.delete(sessionId);
    } else {
      carts.set(sessionId, cart);
    }

    return NextResponse.json(
      {
        message: 'Item removed from cart',
        cartSize: cart.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cart error:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}
