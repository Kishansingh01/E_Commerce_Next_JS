'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Shipping() {
  return (
    <>
      <Header />
      <main className="bg-warm-cream">
        <section className="bg-gradient-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold">
              Shipping & Returns
            </h1>
          </div>
        </section>

        <div className="container-main py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-poppins font-bold mb-6 text-dark-charcoal">
                🚚 Shipping Information
              </h2>
              <div className="space-y-6 text-dark-charcoal/80">
                <div>
                  <h3 className="font-poppins font-bold mb-2">Standard Shipping</h3>
                  <p>5-7 business days | FREE on orders over $25</p>
                </div>
                <div>
                  <h3 className="font-poppins font-bold mb-2">Expedited Shipping</h3>
                  <p>2-3 business days | $9.99</p>
                </div>
                <div>
                  <h3 className="font-poppins font-bold mb-2">Overnight Shipping</h3>
                  <p>Next business day | $19.99</p>
                </div>
                <div>
                  <h3 className="font-poppins font-bold mb-2">International Shipping</h3>
                  <p>10-15 business days | Varies by location</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-poppins font-bold mb-6 text-dark-charcoal">
                ↩️ Return Policy
              </h2>
              <div className="space-y-6 text-dark-charcoal/80">
                <div>
                  <h3 className="font-poppins font-bold mb-2">Return Period</h3>
                  <p>30 days from purchase for a full refund</p>
                </div>
                <div>
                  <h3 className="font-poppins font-bold mb-2">Condition</h3>
                  <p>Products must be in original condition, unopened if possible</p>
                </div>
                <div>
                  <h3 className="font-poppins font-bold mb-2">Return Shipping</h3>
                  <p>Free return shipping with prepaid label included</p>
                </div>
                <div>
                  <h3 className="font-poppins font-bold mb-2">Refund Processing</h3>
                  <p>5-10 business days after we receive your return</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
