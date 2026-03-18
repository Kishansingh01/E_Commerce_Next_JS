'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Order submitted:', formData);
      setSubmitted(true);
      clearCart();

      setTimeout(() => {
        window.location.href = '/order-confirmation';
      }, 1500);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0 && !submitted) {
    return (
      <>
        <Header />
        <main className="bg-warm-cream min-h-screen">
          <div className="container-main py-16 text-center">
            <h1 className="text-3xl font-poppins font-bold text-dark-charcoal mb-4">
              Your cart is empty
            </h1>
            <Link href="/shop" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="bg-warm-cream min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl mb-4">✓</div>
            <h1 className="text-4xl font-poppins font-bold text-green-600 mb-4">
              Order Submitted!
            </h1>
            <p className="text-dark-charcoal/70 mb-4">
              Thank you for your purchase. Redirecting to confirmation...
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const shippingCost = cartTotal > 25 ? 0 : 10 - cartTotal * 0.1;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  return (
    <>
      <Header />
      <main className="bg-warm-cream min-h-screen py-16">
        <div className="container-main">
          <h1 className="text-4xl font-poppins font-bold text-center mb-12 text-dark-charcoal">
            Checkout
          </h1>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="font-poppins font-bold text-lg mb-4 text-dark-charcoal">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta mb-4"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                  />
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-poppins font-bold text-lg mb-4 text-dark-charcoal">
                    Shipping Address
                  </h3>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta mb-4"
                  />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                    />
                  </div>
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                  />
                </div>

                {/* Payment Info */}
                <div>
                  <h3 className="font-poppins font-bold text-lg mb-4 text-dark-charcoal">
                    Payment Information
                  </h3>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    maxLength={19}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta mb-4"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      required
                      maxLength={5}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                    />
                    <input
                      type="text"
                      name="cardCVC"
                      placeholder="CVC"
                      value={formData.cardCVC}
                      onChange={handleChange}
                      required
                      maxLength={3}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-primary py-3 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Complete Purchase'}
                </button>

                <Link
                  href="/cart"
                  className="w-full block text-center btn-secondary py-3"
                >
                  Back to Cart
                </Link>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8 sticky top-24">
                <h3 className="font-poppins font-bold text-xl mb-6 text-dark-charcoal">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-dark-charcoal/70">Subtotal:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-charcoal/70">Shipping:</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600 font-bold">FREE</span>
                      ) : (
                        <span>${shippingCost.toFixed(2)}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-charcoal/70">Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-poppins font-bold text-lg text-dark-charcoal">
                    Total:
                  </span>
                  <span className="font-poppins font-bold text-2xl text-terracotta">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {cartTotal > 25 && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm">
                    ✓ You save on shipping!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
