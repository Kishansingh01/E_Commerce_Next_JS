'use client';

import Link from 'next/link';

export default function HeroSection() {
  const handleShopNow = () => {
    const shopElement = document.getElementById('featured-products');
    if (shopElement) {
      shopElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-sage-green to-sage-green/80 text-warm-cream section-spacing relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-warm-cream/5 rounded-full blur-3xl -z-10"></div>

      <div className="container-main text-center py-16 md:py-32 px-6">
        <h1 className="text-5xl md:text-7xl font-poppins font-bold mb-8 leading-tight animate-fade-in">
          Radiant Skin, <br />
          <span className="text-terracotta">Natural Ingredients,</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-cream to-yellow-100">Budget-Friendly</span>
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button 
            onClick={handleShopNow}
            className="btn-primary text-lg px-10 py-4 font-poppins font-bold"
          >
            🛍️ Shop Now
          </button>
          <Link 
            href="/about"
            className="btn-secondary text-lg px-10 py-4 font-poppins font-bold"
          >
            📖 Learn More
          </Link>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-lg h-72 md:h-96 bg-gradient-to-br from-warm-cream/30 via-terracotta/10 to-warm-cream/20 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-warm-cream/30 hover:shadow-3xl hover:border-warm-cream/50 transition-all duration-300">
            <div className="text-center">
              <span className="text-9xl animate-bounce">✨</span>
              <p className="text-warm-cream/60 text-center mt-6 text-2xl font-poppins font-bold">Premium Skincare</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
