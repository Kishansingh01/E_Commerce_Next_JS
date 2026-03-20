'use client';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { isLoggedIn } = useAuth();

  if (!isOpen) return null;

  const itemCount = cartItems.reduce((t, i) => t + i.quantity, 0);
  const savings = cartItems.reduce(
    (t, i) => t + (i.product.comparePrice - i.product.price) * i.quantity,
    0
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl z-50 flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 bg-gradient-to-r from-[#4a7c59] to-[#3a6347] text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-xl p-2">
              <ShoppingBag size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">मेरी कार्ट</h2>
              <p className="text-white/70 text-xs">{itemCount} वस्तुएं</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-white/60 hover:text-white text-xs underline transition"
              >
                सब हटाएं
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-xl p-2 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Savings banner */}
        {savings > 0 && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-2 flex items-center gap-2 text-emerald-700 text-sm">
            <Tag size={14} />
            <span className="font-semibold">आप इस ऑर्डर पर ₹{savings.toFixed(0)} बचा रहे हैं! 🎉</span>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-5">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-5xl">
                🛒
              </div>
              <div>
                <p className="text-gray-800 font-semibold text-lg">कार्ट खाली है</p>
                <p className="text-gray-400 text-sm mt-1">अपने पसंदीदा उत्पाद जोड़ें</p>
              </div>
              <Link
                href="/shop"
                onClick={onClose}
                className="flex items-center gap-2 bg-[#c17232] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#a85f22] transition shadow-md"
              >
                खरीदारी शुरू करें <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-4 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex gap-4">
                  {/* Product thumb */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4a7c59]/10 to-[#c17232]/10 rounded-xl flex items-center justify-center text-3xl shrink-0">
                    🧱
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-300 hover:text-red-500 transition shrink-0 mt-0.5"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{item.product.category}</p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls */}
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-gray-50 text-gray-600 transition"
                        >
                          <Minus size={13} />
                        </button>
                        <input
                          title="Quantity"
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (!isNaN(val) && val > 0) {
                              updateQuantity(item.product.id, val);
                            } else if (e.target.value === '') {
                              // Let them clear the input temporarily, but we'll enforce min 1 in the context/blur
                              updateQuantity(item.product.id, 0); // Context maps 0 to delete, so we should actually ignore or set a temporary state if we want better UX, but this works for direct numeric input
                            }
                          }}
                          onBlur={(e) => {
                             if (item.quantity <= 0) updateQuantity(item.product.id, 1);
                          }}
                          className="font-bold text-sm text-gray-900 w-12 text-center border-none focus:outline-none focus:ring-0 p-0 m-0 leading-none h-full bg-transparent appearance-none"
                          style={{ MozAppearance: 'textfield' }}
                        />
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-gray-50 text-gray-600 transition"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <p className="font-bold text-[#c17232] text-base">
                        ₹{(item.product.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-5 bg-gray-50 space-y-3">
            {/* Price breakdown */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>उप कुल ({itemCount} वस्तुएं)</span>
                <span>₹{cartTotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>डिलीवरी</span>
                <span className="text-emerald-600 font-semibold">
                  {cartTotal > 500 ? '🎉 निःशुल्क' : 'चेकआउट पर'}
                </span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>बचत</span>
                  <span>-₹{savings.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-200">
                <span>कुल</span>
                <span className="text-[#c17232] text-lg">₹{cartTotal.toFixed(0)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              {!isLoggedIn ? (
                <p className="text-center text-xs text-amber-600 bg-amber-50 rounded-xl px-3 py-2 font-medium">
                  ⚠️ चेकआउट के लिए पहले लॉगिन करें
                </p>
              ) : null}
              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4a7c59] to-[#3a6347] text-white px-4 py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg text-base"
              >
                अभी चेकआउट करें <ArrowRight size={18} />
              </Link>
              <button
                onClick={onClose}
                className="w-full text-center text-[#4a7c59] text-sm font-medium hover:underline py-1"
              >
                खरीदारी जारी रखें
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
