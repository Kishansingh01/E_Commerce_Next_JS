'use client';

import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/data/products';

export default function FeaturedProducts() {
  return (
    <section id="featured-products" className="bg-gradient-to-b from-warm-cream to-white section-spacing scroll-mt-20">
      <div className="container-main">
        <div className="mb-16 text-center">
          <div className="inline-block mb-6">
            <span className="bg-terracotta/10 text-terracotta px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              ✨ Our Best Sellers
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-dark-charcoal">
            Best-Selling Products
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-terracotta via-sage-green to-terracotta rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-dark-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            Loved by thousands of customers worldwide. Transform your skin with our premium, organic skincare essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
