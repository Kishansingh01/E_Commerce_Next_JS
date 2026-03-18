'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import CartModal from './CartModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <header className="bg-sage-green text-warm-cream sticky top-0 z-40 shadow-xl border-b-4 border-terracotta/50">
        <nav className="container-main flex justify-between items-center py-6 px-6">
          <Link href="/" className="text-3xl font-poppins font-bold hover:opacity-80 transition duration-200 flex items-center gap-3">
            🌿 <span>SkinCake</span>
          </Link>
          
          <div className="hidden md:flex gap-14 font-open-sans text-lg">
            <Link href="/" className="hover:text-warm-cream transition duration-300 relative group font-medium">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-terracotta to-orange-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link href="/shop" className="hover:text-warm-cream transition duration-300 relative group font-medium">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-terracotta to-orange-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link href="/about" className="hover:text-warm-cream transition duration-300 relative group font-medium">
              About
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-terracotta to-orange-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link href="/contact" className="hover:text-warm-cream transition duration-300 relative group font-medium">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-terracotta to-orange-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          </div>

          <div className="flex gap-6 items-center">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-gradient-to-r from-terracotta to-orange-600 hover:shadow-lg active:scale-95 px-6 py-3 rounded-xl text-warm-cream font-bold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 relative text-lg"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full transform translate-x-2 -translate-y-2 shadow-lg border-2 border-warm-cream">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden text-3xl hover:opacity-80 transition duration-200 font-bold"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden bg-sage-green/95 border-t border-warm-cream/30 animate-in fade-in slide-in-from-top-2">
            <div className="container-main flex flex-col gap-4 py-4">
              <Link href="/" className="hover:text-warm-cream transition">Home</Link>
              <Link href="/shop" className="hover:text-warm-cream transition">Shop</Link>
              <Link href="/about" className="hover:text-warm-cream transition">About</Link>
              <Link href="/contact" className="hover:text-warm-cream transition">Contact</Link>
            </div>
          </div>
        )}
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
