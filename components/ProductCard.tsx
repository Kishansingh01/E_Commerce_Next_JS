'use client';

import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const getProductEmoji = (category: string): string => {
  const emojis: { [key: string]: string } = {
    'प्रथम श्रेणी ईंट': '🏆',
    'द्वितीय श्रेणी ईंट': '⭐',
    'तृतीय श्रेणी ईंट': '🧱',
    'चतुर्थ श्रेणी ईंट': '🪨',
  };
  return emojis[category] || '🏭';
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const discount = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100);
  const emoji = getProductEmoji(product.category);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      addToCart(product, 1);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-3 relative border border-gray-100 flex flex-col h-full">
      {/* Product Image Section */}
      <Link href={`/products/${product.id}`}>
        <div className="relative bg-linear-to-br from-sage-green/5 via-terracotta/5 to-warm-cream/10 h-64 md:h-72 flex items-center justify-center overflow-hidden group-hover:bg-linear-to-br group-hover:from-sage-green/10 cursor-pointer group-hover:to-terracotta/10 transition-all duration-300">
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-linear-to-r from-terracotta to-orange-600 text-warm-cream px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10 animate-pulse flex items-center gap-1">
              <span>🔥</span>
              <span>₹{discount}% बचाएं</span>
            </div>
          )}
          
          {/* Stock Badge */}
          {product.inStock && (
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md z-10">
              ✓ स्टॉक में
            </div>
          )}

          {/* Product Image Area */}
          <div className="flex items-center justify-center w-full h-full group-hover:scale-105 transition-transform duration-300 relative">
            {product.image ? (
              product.image.endsWith('.svg') ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="text-7xl drop-shadow-lg">{emoji}</div>
                <p className="text-center text-dark-charcoal font-poppins font-bold text-lg px-4 drop-shadow">
                  {product.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 bg-linear-to-r from-green-500 to-emerald-600 flex items-center justify-center rounded-2xl z-50">
          <div className="text-center text-white">
            <div className="text-6xl mb-3 animate-bounce">✓</div>
            <p className="font-poppins font-bold text-xl">कार्ट में जोड़ा गया!</p>
            <p className="text-sm text-green-100 mt-2">{product.name}</p>
          </div>
        </div>
      )}

      {/* Content Section - FIXED PADDING (p-6) */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-dark-charcoal/75 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Rating Section */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <div className="flex gap-0.5">
            {[...Array(Math.round(product.rating))].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">★</span>
            ))}
          </div>
          <div>
            <span className="font-bold text-dark-charcoal">{product.rating}</span>
            <span className="text-gray-400 text-sm ml-1">({product.reviews} समीक्षाएं)</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-5">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-poppins font-bold text-terracotta">₹{product.price}</span>
            {product.comparePrice > product.price && (
              <span className="text-lg text-gray-400 line-through">₹{product.comparePrice}</span>
            )}
          </div>
          {product.comparePrice > product.price && (
            <span className="text-xs text-green-600 font-semibold mt-1">
              💰 आप ₹{(product.comparePrice - product.price).toFixed(2)} की बचत करें
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAdding || !product.inStock}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-auto font-bold text-base py-3 transition-all duration-200 rounded-xl"
        >
          {isAdding ? '⏳ कार्ट में जोड़ा जा रहा है...' : product.inStock ? '🛒 कार्ट में डालें' : 'स्टॉक समाप्त'}
        </button>
      </div>
    </div>
  );
}