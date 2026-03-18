'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-charcoal text-warm-cream">
      <div className="container-main grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
        <div>
          <h4 className="font-poppins font-bold text-lg mb-4">🌿 SkinCake</h4>
          <p className="text-sm opacity-75">
            Organic, budget-friendly skincare for healthy, glowing skin.
          </p>
        </div>

        <div>
          <h4 className="font-poppins font-bold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm opacity-75">
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/shop?category=cleansers">Cleansers</Link></li>
            <li><Link href="/shop?category=serums">Serums</Link></li>
            <li><Link href="/shop?category=masks">Masks</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-poppins font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm opacity-75">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-poppins font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm opacity-75">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/shipping">Shipping & Returns</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-warm-cream/20">
        <div className="container-main py-6 text-center text-sm opacity-75">
          <p>© 2024 SkinCake Beauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
