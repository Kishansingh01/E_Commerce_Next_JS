'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  return (
    <>
      <Header />
      <main className="bg-warm-cream min-h-screen">
        <section className="bg-linear-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-2">
              कार्ट
            </h1>
            <p className="text-lg opacity-95">
              आपके कार्ट में {cartItems.length} वस्तु हैं
            </p>
          </div>
        </section>

        <div className="container-main py-16">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-poppins font-bold text-dark-charcoal mb-4">
                आपका कार्ट खाली है
              </h2>
              <p className="text-dark-charcoal/70 mb-8">
                खरीदारी शुरू करें और अपनी आवश्यकता की ईंटें खोजें!
              </p>
              <Link href="/shop" className="btn-primary inline-block">
                खरीदारी जारी रखें
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="border-b border-gray-200 p-6 bg-warm-cream/30">
                    <h2 className="text-xl font-poppins font-bold text-dark-charcoal">
                      ऑर्डर सारांश
                    </h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-6 hover:bg-warm-cream/20 transition"
                      >
                        <div className="flex gap-4 mb-4">
                          <div className="w-24 h-24 bg-linear-to-br from-sage-green/10 to-terracotta/10 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-3xl">✨</span>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-poppins font-bold text-lg text-dark-charcoal mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-dark-charcoal/70 mb-3">
                              {item.product.description}
                            </p>
                            <p className="text-terracotta font-bold">
                              ₹{item.product.price.toFixed(2)} प्रत्येक
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition self-start"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="px-4 py-2 hover:bg-gray-100 transition"
                            >
                              −
                            </button>
                            <span className="px-6 py-2 bg-gray-50 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="px-4 py-2 hover:bg-gray-100 transition"
                            >
                              +
                            </button>
                          </div>
                          <p className="font-poppins font-bold text-lg text-terracotta">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-warm-cream/30 border-t border-gray-200">
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 font-medium transition"
                    >
                      कार्ट साफ करें
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-poppins font-bold text-dark-charcoal mb-6">
                    ऑर्डर कुल
                  </h2>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-dark-charcoal/70">उप कुल:</span>
                      <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-charcoal/70">डिलीवरी:</span>
                      <span className="font-medium">
                        {cartTotal > 50 ? (
                          <span className="text-green-600 font-bold">निःशुल्क</span>
                        ) : (
                          <span className="text-orange-600">
                            ₹{(10 - cartTotal * 0.1).toFixed(2)}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-charcoal/70">कर:</span>
                      <span className="font-medium">
                        ₹{(cartTotal * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-6">
                    <span className="font-poppins font-bold text-lg text-dark-charcoal">
                      कुल:
                    </span>
                    <span className="font-poppins font-bold text-2xl text-terracotta">
                      ₹{(
                        cartTotal +
                        (cartTotal > 50 ? 0 : 10 - cartTotal * 0.1) +
                        cartTotal * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>

                  {cartTotal > 50 && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-sm">
                      ✓ आप निःशुल्क डिलीवरी के लिए योग्य हैं!
                    </div>
                  )}

                  <Link
                    href="/checkout"
                    className="w-full btn-primary block text-center mb-2"
                  >
                    चेकआउट पर जाएं
                  </Link>
                  <Link
                    href="/shop"
                    className="w-full btn-secondary block text-center"
                  >
                    खरीदारी जारी रखें
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
