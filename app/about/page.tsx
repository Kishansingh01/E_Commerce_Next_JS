'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Header />
      <main className="bg-warm-cream">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              About SkinCake
            </h1>
            <p className="text-lg opacity-95">
              Our mission is to make premium skincare accessible to everyone
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container-main py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-h2 font-poppins font-bold mb-6 text-dark-charcoal">
                Who We Are
              </h2>
              <p className="text-dark-charcoal/80 mb-4 leading-relaxed">
                SkinCake was founded with a simple mission: to bring premium, organic skincare 
                to everyone at an affordable price. We believe that beautiful skin shouldn't cost 
                a fortune or require harmful chemicals.
              </p>
              <p className="text-dark-charcoal/80 leading-relaxed">
                Our name "SkinCake" tells our philosophy – skincare should be simple, 
                delightful, and nourishing, just like a slice of cake. We use only natural, 
                certified organic ingredients that are gentle on your skin and the environment.
              </p>
            </div>
            <div className="bg-gradient-to-br from-sage-green/10 to-terracotta/10 h-96 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-7xl">🌿</span>
                <p className="mt-4 text-dark-charcoal/70">Natural Beauty</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-h2 font-poppins font-bold mb-12 text-center text-dark-charcoal">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '💰',
                  title: 'Affordability',
                  description: 'Premium skincare shouldn\'t break the bank. We offer luxury products at budget-friendly prices.'
                },
                {
                  icon: '🌿',
                  title: 'Natural & Organic',
                  description: 'Every product contains 100% natural, certified organic ingredients. No harmful chemicals, ever.'
                },
                {
                  icon: '🐰',
                  title: 'Cruelty-Free',
                  description: 'We never test on animals. Our products are vegan-friendly and made with compassion.'
                }
              ].map((value, idx) => (
                <div key={idx} className="bg-white rounded-lg p-8 shadow-md text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="font-poppins font-bold text-lg mb-3 text-dark-charcoal">
                    {value.title}
                  </h3>
                  <p className="text-dark-charcoal/70">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-sage-green/50 to-terracotta/30 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-poppins font-bold mb-6 text-dark-charcoal">
              Ready to Transform Your Skin?
            </h2>
            <p className="text-lg text-dark-charcoal/80 mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who have already discovered their best skin with SkinCake.
            </p>
            <Link 
              href="/shop"
              className="btn-primary text-lg px-8 py-4 font-poppins font-bold inline-block"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
