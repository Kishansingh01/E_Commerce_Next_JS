'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function OrderConfirmation() {
  const orderNumber = `SKC-${Date.now()}`;

  return (
    <>
      <Header />
      <main className="bg-warm-cream min-h-screen py-16">
        <div className="container-main max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            <div className="text-7xl mb-6">✓</div>
            
            <h1 className="text-4xl font-poppins font-bold text-green-600 mb-4">
              Order Confirmed!
            </h1>
            
            <p className="text-lg text-dark-charcoal/70 mb-8">
              Thank you for your purchase! We're preparing your beautiful skincare products to be shipped out.
            </p>

            <div className="bg-warm-cream/50 rounded-lg p-8 mb-8 text-left">
              <p className="mb-4">
                <span className="text-dark-charcoal/70">Order Number:</span>
                <br />
                <span className="font-poppins font-bold text-lg text-terracotta">{orderNumber}</span>
              </p>
              
              <p className="mb-4">
                <span className="text-dark-charcoal/70">Status:</span>
                <br />
                <span className="font-medium text-dark-charcoal">Processing</span>
              </p>
              
              <p className="mb-4">
                <span className="text-dark-charcoal/70">Estimated Delivery:</span>
                <br />
                <span className="font-medium text-dark-charcoal">5-7 Business Days</span>
              </p>
              
              <p>
                <span className="text-dark-charcoal/70">Email Confirmation:</span>
                <br />
                <span className="font-medium text-dark-charcoal">Sent to your email address</span>
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-poppins font-bold text-dark-charcoal mb-3">
                📧 What's Next?
              </h3>
              <ul className="space-y-2 text-sm text-dark-charcoal/80">
                <li>✓ You'll receive an order confirmation email shortly</li>
                <li>✓ A shipping notification will be sent when your package ships</li>
                <li>✓ Track your order using the tracking number provided</li>
                <li>✓ Receive your products within 5-7 business days</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn-primary">
                Continue Shopping
              </Link>
              <Link href="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
