'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, CreditCard, MapPin, User, ShieldCheck, CheckCircle2, ChevronRight, ShoppingBag, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardNumber: '', cardExpiry: '', cardCVC: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Pricing math needed in scope for submission
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const savings = cartItems.reduce((t, i) => t + (i.product.comparePrice - i.product.price) * i.quantity, 0);
  const shippingCost = cartTotal > 500 ? 0 : 50; 
  const tax = cartTotal * 0.18; 
  const total = cartTotal + shippingCost + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');

    try {
      const payload = {
        userId: user?.id,
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip
        },
        paymentMethod: {
          cardNumber: formData.cardNumber
        },
        items: cartItems.map(i => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          category: i.product.category,
          image: i.product.image
        })),
        subtotal: cartTotal,
        tax,
        shippingCost,
        total
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Checkout failed');
      }

      setSubmitted(true);
      clearCart();
    } catch (error: any) {
      console.error('Checkout error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Empty cart view
  if (cartItems.length === 0 && !submitted) {
    return (
      <>
        <Header />
        <main className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md w-full">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">आपका कार्ट खाली है</h1>
            <p className="text-gray-500 mb-8">चेकआउट करने के लिए पहले अपने कार्ट में उत्पाद जोड़ें।</p>
            <Link href="/shop" className="w-full inline-flex items-center justify-center gap-2 bg-[#4a7c59] text-white py-3.5 rounded-xl font-semibold hover:bg-[#3a6347] transition">
              <ShoppingBag size={18} /> खरीदारी शुरू करें
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Success view
  if (submitted) {
    return (
      <>
        <Header />
        <main className="bg-emerald-50 min-h-screen flex items-center justify-center p-6">
          <div className="bg-white p-12 rounded-3xl shadow-xl shadow-emerald-200/50 border border-emerald-100 text-center max-w-lg w-full animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">ऑर्डर सफल! 🎉</h1>
            <p className="text-gray-600 mb-8 text-lg">
              धन्यवाद, <span className="font-semibold text-gray-900">{formData.firstName}</span>। आपका ऑर्डर प्राप्त हो गया है और संसाधित किया जा रहा है।
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 text-left">
              <p className="text-sm font-semibold text-gray-500 mb-1">ऑर्डर संख्या</p>
              <p className="font-mono font-bold text-gray-900 text-lg">#IND-{Math.floor(Math.random() * 900000) + 100000}</p>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 text-[#4a7c59] font-bold hover:underline">
              <ArrowLeft size={16} /> होम पेज पर लौटें
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 focus:border-[#4a7c59] transition text-sm font-medium text-gray-900 placeholder:text-gray-400";
  const labelClass = "block text-sm font-bold text-gray-700 mb-2";
  const sectionTitleClass = "text-xl font-bold text-gray-900 mb-6 flex items-center gap-3";
  const sectionIconClass = "w-8 h-8 rounded-lg bg-[#4a7c59]/10 text-[#4a7c59] flex items-center justify-center shrink-0";

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen pb-20">
        
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 py-6 mb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3">
            <Link href="/cart" className="text-gray-400 hover:text-gray-600 transition">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">सुरक्षित चेकआउट</h1>
            <div className="ml-auto hidden sm:flex items-center gap-2 text-emerald-600 text-sm font-semibold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <ShieldCheck size={16} /> SSL एन्क्रिप्टेड
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* ── Left Column: Form ── */}
            <form id="checkout-form" onSubmit={handleSubmit} className="flex-1 w-full space-y-8">
              
              {/* Personal Info */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h2 className={sectionTitleClass}>
                  <div className={sectionIconClass}><User size={18} /></div>
                  व्यक्तिगत जानकारी
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>पहला नाम</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className={inputClass} placeholder="आपका नाम" />
                  </div>
                  <div>
                    <label className={labelClass}>अंतिम नाम</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className={inputClass} placeholder="आपके परिवार का नाम" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>ईमेल पता</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="order@example.com" />
                    <p className="text-xs text-gray-400 mt-2 ml-1">हम इस पते पर रसीद भेजेंगे।</p>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>फोन नंबर</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h2 className={sectionTitleClass}>
                  <div className={sectionIconClass}><MapPin size={18} /></div>
                  डिलीवरी पता
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>सड़क पता</label>
                    <input type="text" name="address" required value={formData.address} onChange={handleChange} className={inputClass} placeholder="घर का नंबर और सड़क का नाम" />
                  </div>
                  <div>
                    <label className={labelClass}>शहर</label>
                    <input type="text" name="city" required value={formData.city} onChange={handleChange} className={inputClass} placeholder="आपका शहर" />
                  </div>
                  <div>
                    <label className={labelClass}>राज्य</label>
                    <input type="text" name="state" required value={formData.state} onChange={handleChange} className={inputClass} placeholder="राज्य का नाम" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>पिन कोड</label>
                    <input type="text" name="zip" required value={formData.zip} onChange={handleChange} className={inputClass} placeholder="6 अंकों का पिन" maxLength={6} />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-gray-100 pointer-events-none">
                  <CreditCard size={120} className="rotate-12 transform" />
                </div>
                <h2 className={`${sectionTitleClass} relative z-10`}>
                  <div className={sectionIconClass}><CreditCard size={18} /></div>
                  भुगतान जानकारी
                </h2>
                <div className="grid sm:grid-cols-2 gap-5 relative z-10">
                  <div className="sm:col-span-2">
                    <label className={labelClass}>कार्ड नंबर</label>
                    <input type="text" name="cardNumber" required value={formData.cardNumber} onChange={handleChange} className={inputClass} placeholder="0000 0000 0000 0000" maxLength={19} />
                  </div>
                  <div>
                    <label className={labelClass}>समाप्ति (MM/YY)</label>
                    <input type="text" name="cardExpiry" required value={formData.cardExpiry} onChange={handleChange} className={inputClass} placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div>
                    <label className={labelClass}>CVC</label>
                    <input type="text" name="cardCVC" required value={formData.cardCVC} onChange={handleChange} className={inputClass} placeholder="123" maxLength={3} />
                  </div>
                </div>
              </div>
              
              {/* Mobile Submit Button (Visible only on lg down) */}
              <div className="lg:hidden">
                <button type="submit" form="checkout-form" disabled={isProcessing} className="w-full h-14 bg-gradient-to-r from-[#4a7c59] to-[#3a6347] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                  {isProcessing ? 'प्रक्रिया चल रही है...' : `₹${total.toFixed(0)} का भुगतान करें`}
                </button>
              </div>

            </form>

            {/* ── Right Column: Order Summary ── */}
            <div className="w-full lg:w-[400px] xl:w-[480px] shrink-0">
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-200 p-6 sm:p-8 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">ऑर्डर सारांश</h2>
                
                {/* Items List */}
                <div className="space-y-4 mb-6 pr-2 max-h-[300px] overflow-y-auto no-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-start">
                      <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shrink-0 border border-gray-100">
                        🧱
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug">{item.product.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">मात्रा: {item.quantity}</p>
                      </div>
                      <div className="font-bold text-sm text-[#c17232] shrink-0 pt-1">
                        ₹{(item.product.price * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-100 mb-6" />

                {/* Calculation */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">उप कुल ({itemCount} वस्तुएं)</span>
                    <span className="font-semibold text-gray-900">₹{cartTotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">अनुमानित टैक्स (GST)</span>
                    <span className="font-semibold text-gray-900">₹{tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-500 flex items-center gap-1.5"><Truck size={14}/> डिलीवरी</span>
                    {shippingCost === 0 ? (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">निःशुल्क</span>
                    ) : (
                      <span className="font-semibold text-gray-900">₹{shippingCost.toFixed(0)}</span>
                    )}
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600 font-medium">
                      <span>बचत</span>
                      <span>-₹{savings.toFixed(0)}</span>
                    </div>
                  )}
                </div>

                <hr className="border-gray-300 border-dashed mb-6" />

                {/* Total */}
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="block text-gray-500 text-sm mb-1">कुल राशि</span>
                    <span className="text-3xl font-black text-[#c17232] leading-none">₹{total.toFixed(0)}</span>
                  </div>
                  <div className="text-right text-xs text-gray-400 font-medium mb-1">
                    सभी करों सहित
                  </div>
                </div>

                {/* Desktop Submit Button */}
                <button type="submit" form="checkout-form" disabled={isProcessing} className="hidden lg:flex w-full h-14 bg-gradient-to-r from-[#4a7c59] to-[#3a6347] text-white rounded-xl font-bold text-lg items-center justify-center gap-2 transition-all shadow-lg shadow-[#4a7c59]/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:pointer-events-none">
                  {isProcessing ? 'प्रक्रिया चल रही है...' : (
                    <>सुरक्षित भुगतान <ChevronRight size={20} className="mt-0.5" /></>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 font-medium mt-4 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={14} /> आपका डेटा सुरक्षित और एन्क्रिप्टेड है
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
