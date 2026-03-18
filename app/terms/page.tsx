'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Terms() {
  return (
    <>
      <Header />
      <main className="bg-warm-cream">
        <section className="bg-gradient-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold">
              Terms of Service
            </h1>
          </div>
        </section>

        <div className="container-main py-16 max-w-3xl">
          <div className="prose prose-sm">
            <div className="space-y-6 text-dark-charcoal">
              <div>
                <h2 className="text-2xl font-poppins font-bold mb-3">Last Updated: March 2024</h2>
                <p className="opacity-75">
                  These Terms of Service govern your use of the SkinCake website and services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">Use License</h3>
                <p>
                  You are granted a limited, revocable license to use this website for personal, 
                  non-commercial purposes only. You may not reproduce, distribute, or transmit content 
                  without our permission.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">Product Information</h3>
                <p>
                  We strive to provide accurate product information, but we do not warrant that descriptions, 
                  pricing, or availability are error-free. We reserve the right to correct any inaccuracies.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">Returns & Refunds</h3>
                <p>
                  We offer a 30-day money-back guarantee on all purchases. Items must be returned in original 
                  condition within 30 days of purchase for a full refund.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by law, SkinCake shall not be liable for any indirect, 
                  incidental, special, or consequential damages arising from your use of our website or products.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">Changes to Terms</h3>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective upon posting 
                  to the website.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">Contact Us</h3>
                <p>
                  If you have questions about these Terms of Service, please contact us at:<br />
                  Email: legal@skincake.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
