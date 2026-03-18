import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let filteredProducts = products;

    if (category) {
      filteredProducts = products.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    return NextResponse.json(
      {
        message: 'Products retrieved successfully',
        products: filteredProducts,
        total: filteredProducts.length,
        categories: [...new Set(products.map(p => p.category))],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Products error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
