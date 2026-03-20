'use client';

import { useRef } from 'react';
import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Approximating card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="featured-products" className="bg-linear-to-b from-warm-cream to-white section-spacing scroll-mt-20 relative">
      <div className="container-main relative">
        <div className="mb-16 text-center">
          <div className="inline-block mb-6">
            <span className="bg-terracotta/10 text-terracotta px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              ✨ हमारे बेस्टसेलर
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-dark-charcoal">
            सबसे लोकप्रिय उत्पाद
          </h2>
          <div className="h-1.5 w-24 bg-linear-to-r from-terracotta via-sage-green to-terracotta rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-dark-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            हजारों ग्राहकों द्वारा विश्वसनीय। अपनी निर्माण परियोजनाओं के लिए प्रीमियम ईंटें प्राप्त करें।
          </p>
        </div>

        <div className="relative group">
          {/* Left Arrow */}
          <button 
             onClick={() => scroll('left')}
             className="absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 bg-white/95 text-dark-charcoal p-2 sm:p-3 rounded-full shadow-lg border border-gray-200 z-10 transition-all duration-300 hover:scale-110 active:scale-95 opacity-90 hover:opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center justify-center h-10 w-10 sm:h-auto sm:w-auto"
             aria-label="Scroll left"
          >
             <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          
          {/* Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 pb-8 px-4 sm:px-0 snap-x snap-mandatory scroll-smooth hide-scrollbar-custom"
          >
            <style dangerouslySetInnerHTML={{
               __html: `
                 .hide-scrollbar-custom::-webkit-scrollbar { display: none; }
                 .hide-scrollbar-custom { -ms-overflow-style: none; scrollbar-width: none; }
               `
            }} />
            {featuredProducts.map((product) => (
              <div key={product.id} className="min-w-[85vw] w-[85vw] sm:min-w-[320px] sm:w-[320px] lg:min-w-[340px] lg:w-[340px] shrink-0 snap-start flex flex-col">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
             onClick={() => scroll('right')}
             className="absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 bg-white/95 text-dark-charcoal p-2 sm:p-3 rounded-full shadow-lg border border-gray-200 z-10 transition-all duration-300 hover:scale-110 active:scale-95 opacity-90 hover:opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center justify-center h-10 w-10 sm:h-auto sm:w-auto"
             aria-label="Scroll right"
          >
             <ChevronRight size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
