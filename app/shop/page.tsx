'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
        setCategories(data.categories);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (!category) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(p => p.category === category)
      );
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-warm-cream">
        <section className="bg-gradient-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              Our Products
            </h1>
            <p className="text-lg opacity-95">
              Discover our full range of premium skincare essentials
            </p>
          </div>
        </section>

        <div className="container-main py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:w-48">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="font-poppins font-bold text-lg mb-6 text-dark-charcoal">
                  Categories
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleCategoryFilter('')}
                    className={`block w-full text-left px-4 py-2 rounded transition ${
                      selectedCategory === ''
                        ? 'bg-terracotta text-warm-cream'
                        : 'bg-gray-100 text-dark-charcoal hover:bg-gray-200'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryFilter(category)}
                      className={`block w-full text-left px-4 py-2 rounded transition ${
                        selectedCategory === category
                          ? 'bg-terracotta text-warm-cream'
                          : 'bg-gray-100 text-dark-charcoal hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-lg text-dark-charcoal/70">Loading products...</p>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
                  {error}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-dark-charcoal/70">No products found in this category.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-dark-charcoal/70">
                      Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
