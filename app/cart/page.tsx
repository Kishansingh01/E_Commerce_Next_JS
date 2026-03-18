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
        <section className="bg-gradient-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-2">
              Shopping Cart
            </h1>
            <p className="text-lg opacity-95">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
        </section>

        <div className="container-main py-16">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-poppins font-bold text-dark-charcoal mb-4">
                Your cart is empty
              </h2>
              <p className="text-dark-charcoal/70 mb-8">
                Start shopping and find the perfect skincare products for you!
              </p>
              <Link href="/shop" className="btn-primary inline-block">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="border-b border-gray-200 p-6 bg-warm-cream/30">
                    <h2 className="text-xl font-poppins font-bold text-dark-charcoal">
                      Order Summary
                    </h2>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-6 hover:bg-warm-cream/20 transition"
                      >
                        <div className="flex gap-4 mb-4">
                          <div className="w-24 h-24 bg-gradient-to-br from-sage-green/10 to-terracotta/10 rounded-lg flex items-center justify-center flex-shrink-0">
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
                              ${item.product.price.toFixed(2)} each
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
                            ${(item.product.price * item.quantity).toFixed(2)}
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
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-poppins font-bold text-dark-charcoal mb-6">
                    Order Total
                  </h2>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-dark-charcoal/70">Subtotal:</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-charcoal/70">Shipping:</span>
                      <span className="font-medium">
                        {cartTotal > 25 ? (
                          <span className="text-green-600 font-bold">FREE</span>
                        ) : (
                          <span className="text-orange-600">
                            ${(10 - cartTotal * 0.1).toFixed(2)}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-charcoal/70">Tax:</span>
                      <span className="font-medium">
                        ${(cartTotal * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-6">
                    <span className="font-poppins font-bold text-lg text-dark-charcoal">
                      Total:
                    </span>
                    <span className="font-poppins font-bold text-2xl text-terracotta">
                      ${(
                        cartTotal +
                        (cartTotal > 25 ? 0 : 10 - cartTotal * 0.1) +
                        cartTotal * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>

                  {cartTotal > 25 && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-sm">
                      ✓ You qualified for FREE shipping!
                    </div>
                  )}

                  <Link
                    href="/checkout"
                    className="w-full btn-primary block text-center mb-2"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/shop"
                    className="w-full btn-secondary block text-center"
                  >
                    Continue Shopping
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
