'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-sage-green text-warm-cream p-6">
          <h2 className="text-2xl font-poppins font-bold">🛒 Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-80 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-dark-charcoal/70 text-lg mb-4">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="btn-primary inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-poppins font-bold text-dark-charcoal">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-dark-charcoal/70">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-gray-300 rounded">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 bg-gray-50">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-poppins font-bold text-terracotta">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-warm-cream/30">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-dark-charcoal">Subtotal:</span>
                <span className="font-bold text-dark-charcoal">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-dark-charcoal text-sm">Shipping:</span>
                <span className="font-bold text-dark-charcoal text-sm">
                  {cartTotal > 25 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    <span>Calculated at checkout</span>
                  )}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-poppins font-bold text-dark-charcoal">
                  Total:
                </span>
                <span className="font-poppins font-bold text-lg text-terracotta">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full btn-primary mb-2"
            >
              Continue Shopping
            </button>
            <Link
              href="/cart"
              className="w-full block text-center btn-secondary mb-2"
              onClick={onClose}
            >
              View Full Cart
            </Link>
            <Link
              href="/checkout"
              className="w-full block text-center bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition"
              onClick={onClose}
            >
              Checkout Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
