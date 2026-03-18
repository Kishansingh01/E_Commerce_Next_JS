'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const getProductEmoji = (category: string): string => {
  const emojis: { [key: string]: string } = {
    'Cleansers': '🧼',
    'Serums': '💧',
    'Moisturizers': '🧴',
    'Masks': '🎭',
    'Eye Care': '👁️',
    'Treatment': '💊',
    'Bundles': '🎁',
  };
  return emojis[category] || '✨';
};

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const product = products.find(p => p.id === productId);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== productId).slice(0, 4);
  
  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-warm-cream flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-poppins font-bold text-dark-charcoal mb-4">Product Not Found</h1>
            <p className="text-dark-charcoal/70 mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/shop" className="btn-primary inline-block">
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const discount = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100);
  const emoji = getProductEmoji(product.category);
  const savings = (product.comparePrice - product.price).toFixed(2);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart(product, 1);
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-warm-cream min-h-screen">
        {/* Breadcrumb */}
        <div className="container-main py-6">
          <div className="flex items-center gap-2 text-sm text-dark-charcoal/70">
            <Link href="/" className="hover:text-terracotta">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-terracotta">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-terracotta">{product.category}</Link>
            <span>/</span>
            <span className="text-dark-charcoal font-semibold">{product.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="container-main py-16">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md bg-gradient-to-br from-sage-green/10 via-terracotta/5 to-warm-cream/20 rounded-3xl p-16 shadow-2xl">
                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-terracotta to-orange-600 text-warm-cream px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 z-10">
                    <span className="text-lg">🔥</span>
                    <span>Save {discount}%</span>
                  </div>
                )}

                {/* Stock Badge */}
                <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-bold shadow-md z-10 ${
                  product.inStock 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </div>

                {/* Product Image */}
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="text-8xl drop-shadow-lg animate-bounce">{emoji}</div>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center space-y-10">
              {/* Category */}
              <div>
                <span className="inline-block bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-5xl font-poppins font-bold text-dark-charcoal leading-tight mb-3">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="pb-6 border-b-2 border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition shadow-md ${
                          i < Math.round(product.rating)
                            ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-yellow-900'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        ✓
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-terracotta">{product.rating}</span>
                    <span className="text-lg text-dark-charcoal/70">/ 5.0 Stars</span>
                  </div>
                  <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 transition-all duration-500 rounded-full shadow-lg"
                      style={{ width: `${(product.rating / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-dark-charcoal/60 font-poppins mt-2">
                    ⭐ Rated by {product.reviews.toLocaleString()} satisfied customers
                  </p>
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-poppins font-bold text-terracotta">
                    ${product.price}
                  </span>
                  {product.comparePrice > product.price && (
                    <>
                      <span className="text-2xl text-gray-400 line-through">
                        ${product.comparePrice}
                      </span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        Save ${savings}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <h3 className="font-poppins font-bold text-lg mb-3 text-dark-charcoal">Description</h3>
                <p className="text-dark-charcoal/80 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <label className="font-poppins font-semibold text-dark-charcoal">Quantity:</label>
                  <div className="flex items-center gap-3 bg-white rounded-lg border-2 border-gray-200 p-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-xl text-terracotta hover:bg-gray-100 rounded transition"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 text-lg font-bold text-dark-charcoal">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-xl text-terracotta hover:bg-gray-100 rounded transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed font-poppins font-bold"
                >
                  {isAdding ? 'Adding to Cart...' : `Add ${quantity} to Cart`}
                </button>

                {!product.inStock && (
                  <p className="text-red-600 text-center font-semibold">This product is currently out of stock</p>
                )}

                {showSuccess && (
                  <div className="bg-green-100 border-2 border-green-500 text-green-700 px-6 py-4 rounded-lg text-center font-poppins font-bold animate-pulse">
                    ✓ Added {quantity} item(s) to your cart!
                  </div>
                )}
              </div>

              {/* Product Features */}
              <div className="bg-gradient-to-br from-sage-green/5 to-terracotta/5 rounded-xl p-8 space-y-4">
                <h3 className="font-poppins font-bold text-lg text-dark-charcoal mb-4">Why Choose This?</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌿</span>
                    <span className="text-dark-charcoal/80">100% Natural Ingredients</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🐰</span>
                    <span className="text-dark-charcoal/80">Cruelty-Free & Vegan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span className="text-dark-charcoal/80">Dermatologist Tested</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💚</span>
                    <span className="text-dark-charcoal/80">Eco-Friendly Packaging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="mb-12">
                <h2 className="text-h2 font-poppins font-bold text-dark-charcoal mb-2">Related Products</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-terracotta to-sage-green rounded"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(relProduct => (
                  <ProductCard key={relProduct.id} product={relProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
