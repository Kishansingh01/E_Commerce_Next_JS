'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import {
  Star, ShoppingCart, Minus, Plus, ChevronRight,
  Shield, Truck, RotateCcw, CheckCircle, ArrowLeft,
} from 'lucide-react';

const categoryEmoji: Record<string, string> = {
  'प्रथम श्रेणी ईंट': '🏆',
  'द्वितीय श्रेणी ईंट': '⭐',
  'तृतीय श्रेणी ईंट': '🧱',
  'चतुर्थ श्रेणी ईंट': '🪨',
};

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'shipping'>('description');

  const product = products.find((p) => p.id === productId);
  const related = products
    .filter((p) => p.category === product?.category && p.id !== productId)
    .slice(0, 4);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-7xl">😕</div>
            <h1 className="text-2xl font-bold text-gray-800">उत्पाद नहीं मिला</h1>
            <p className="text-gray-500">आप जिसे खोज रहे हैं वह उपलब्ध नहीं है।</p>
            <Link href="/shop" className="inline-flex items-center gap-2 bg-[#4a7c59] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#3a6347] transition">
              <ArrowLeft size={16} /> दुकान पर वापस
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const discount = product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;
  const savings = (product.comparePrice - product.price).toFixed(0);
  const emoji = categoryEmoji[product.category] || '🏭';

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => { setIsAdding(false); setAdded(true); }, 400);
    setTimeout(() => setAdded(false), 2800);
  };

  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating - fullStars >= 0.5;

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">

        {/* ── Breadcrumb ── */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Link href="/" className="hover:text-[#4a7c59] transition">होम</Link>
              <ChevronRight size={13} />
              <Link href="/shop" className="hover:text-[#4a7c59] transition">खरीदें</Link>
              <ChevronRight size={13} />
              <span className="text-gray-600 font-medium truncate max-w-[160px]">{product.name}</span>
            </div>
          </div>
        </div>

        {/* ── Main product section ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid lg:grid-cols-2 gap-10 mb-16">

            {/* Left — Image panel */}
            <div className="flex flex-col gap-4">
              <div className="relative bg-gradient-to-br from-[#4a7c59]/8 via-white to-[#c17232]/8 rounded-3xl border border-gray-100 shadow-sm overflow-hidden aspect-square flex items-center justify-center">
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${product.inStock ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                    {product.inStock ? '● स्टॉक में' : '✗ स्टॉक समाप्त'}
                  </span>
                  {discount > 0 && (
                    <span className="bg-[#c17232] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Product visual */}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-3/4 h-3/4 object-contain drop-shadow-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 p-12">
                    <div className="text-[120px] leading-none drop-shadow-2xl">{emoji}</div>
                    <p className="text-center text-gray-500 text-sm font-medium px-6">{product.name}</p>
                  </div>
                )}
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Shield size={18} />, label: 'गुणवत्ता गारंटी' },
                  { icon: <Truck size={18} />, label: 'तेज डिलीवरी' },
                  { icon: <RotateCcw size={18} />, label: 'वापसी नीति' },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1.5 bg-white rounded-2xl border border-gray-100 py-3 px-2 shadow-sm">
                    <span className="text-[#4a7c59]">{b.icon}</span>
                    <span className="text-xs text-gray-500 text-center leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Product info */}
            <div className="flex flex-col gap-6">

              {/* Category pill */}
              <span className="inline-flex items-center gap-2 bg-[#4a7c59]/10 text-[#4a7c59] px-4 py-1.5 rounded-full text-xs font-semibold w-fit border border-[#4a7c59]/20">
                {emoji} {product.category}
              </span>

              {/* Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < fullStars
                          ? 'fill-amber-400 text-amber-400'
                          : i === fullStars && hasHalf
                          ? 'fill-amber-200 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-800">{product.rating}</span>
                <span className="text-gray-400 text-sm">({product.reviews.toLocaleString()} समीक्षाएं)</span>
              </div>

              {/* Price */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-[#c17232]">₹{product.price}</span>
                    {product.comparePrice > product.price && (
                      <span className="text-xl text-gray-400 line-through">₹{product.comparePrice}</span>
                    )}
                  </div>
                  {discount > 0 && (
                    <p className="text-emerald-600 text-sm font-semibold mt-1">
                      🎉 आप ₹{savings} बचा रहे हैं!
                    </p>
                  )}
                </div>
                {discount > 0 && (
                  <div className="bg-[#c17232]/10 text-[#c17232] text-2xl font-black rounded-2xl px-5 py-3 border border-[#c17232]/20">
                    {discount}%<br /><span className="text-xs font-medium">OFF</span>
                  </div>
                )}
              </div>

              {/* Quantity + Add to cart */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">मात्रा चुनें</label>
                <div className="flex items-center gap-3">
                  {/* Quantity stepper */}
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-gray-50 text-gray-600 transition shrink-0"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      title="Quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val > 0) {
                          setQuantity(val);
                        } else if (e.target.value === '') {
                          setQuantity('' as any); // allow backspacing
                        }
                      }}
                      onBlur={() => {
                        if (!quantity || quantity < 1) setQuantity(1);
                      }}
                      className="w-16 py-3 font-bold text-gray-900 text-lg text-center border-x border-y-0 border-gray-100 focus:outline-none focus:ring-0 appearance-none bg-transparent"
                      style={{ MozAppearance: 'textfield' }}
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-gray-50 text-gray-600 transition shrink-0"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdding}
                    className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-base transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
                      added
                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                        : 'bg-[#4a7c59] hover:bg-[#3a6347] text-white hover:shadow-lg'
                    }`}
                  >
                    {added ? (
                      <><CheckCircle size={20} /> कार्ट में जोड़ा गया!</>
                    ) : isAdding ? (
                      <><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> जोड़ रहे हैं...</>
                    ) : (
                      <><ShoppingCart size={20} /> कार्ट में डालें ({quantity})</>
                    )}
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100">
                  {(
                    [['description', 'विवरण'], ['features', 'विशेषताएं'], ['shipping', 'शिपिंग']] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex-1 py-3.5 text-sm font-semibold transition-all ${
                        activeTab === key
                          ? 'text-[#4a7c59] border-b-2 border-[#4a7c59] bg-[#4a7c59]/5'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="p-5 text-sm text-gray-600 leading-relaxed">
                  {activeTab === 'description' && (
                    <p className="whitespace-pre-line leading-loose">{product.description}</p>
                  )}
                  {activeTab === 'features' && (
                    <ul className="space-y-3">
                      {[
                        ['🏭', 'औद्योगिक मानदंड अनुरूप'],
                        ['💪', 'उच्च मजबूती और टिकाऊपन'],
                        ['✅', 'गुणवत्ता परीक्षित और प्रमाणित'],
                        ['🌡️', 'मौसम प्रतिरोधी'],
                        ['🔒', 'BIS मानक अनुपालन'],
                      ].map(([icon, text]) => (
                        <li key={text} className="flex items-center gap-3">
                          <span className="text-lg shrink-0">{icon}</span>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'shipping' && (
                    <ul className="space-y-3">
                      {[
                        ['🚚', '₹500+ ऑर्डर पर निःशुल्क डिलीवरी'],
                        ['⏱️', '2-5 व्यावसायिक दिनों में डिलीवरी'],
                        ['📦', 'सुरक्षित पैकेजिंग'],
                        ['🔄', '7 दिनों में वापसी का विकल्प'],
                      ].map(([icon, text]) => (
                        <li key={text} className="flex items-center gap-3">
                          <span className="text-lg shrink-0">{icon}</span>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Related Products ── */}
          {related.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">संबंधित उत्पाद</h2>
                  <div className="h-1 w-14 bg-[#c17232] rounded-full mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
