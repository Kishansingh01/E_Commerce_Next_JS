'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Loader2, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
       console.error(error);
       setStatus('error');
       setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // 🛠️ FIX: Added `!px-5 !py-4` to force the padding and override any global CSS resets
  const inputClass = "w-full !px-5 !py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a7c59]/40 focus:border-[#4a7c59] transition text-sm text-gray-900 font-medium placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-100 shadow-sm";

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        
        {/* ── Hero Section ── */}
        <section className="relative bg-[#2a4632] overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#c17232 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 text-white mb-6 backdrop-blur-sm border border-white/20">
              <MessageSquare size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
              हमसे <span className="text-[#e8955a]">संपर्क</span> करें
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              क्या आपके कोई प्रश्न हैं या आपको सहायता चाहिए? हमारी टीम मदद के लिए तैयार है।
            </p>
          </div>
          
          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-gray-50 translate-y-1">
              <path d="M0 48H1440V0C1440 0 1140 48 720 48C300 48 0 0 0 0V48Z" fill="currentColor"/>
            </svg>
          </div>
        </section>

        {/* ── Contact Content ── */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
            
            {/* Left: Info Cards */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">संपर्क जानकारी</h2>
                <p className="text-gray-500 mb-8">किसी भी पूछताछ या सहयोग के लिए बेझिझक हमसे संपर्क करें।</p>
              </div>

              <div className="grid gap-4">
                {/* Info Card 1 */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5 hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-2xl bg-[#4a7c59]/10 text-[#4a7c59] flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">मुख्यालय (HQ)</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Bharat Int Udogh <br />
                      Rasauli, Mashrakh(Bihar)
                    </p>
                  </div>
                </div>

                {/* Info Card 2 */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5 hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-2xl bg-[#c17232]/10 text-[#c17232] flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">फ़ोन सपोर्ट</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      +91 878964 2950<br />
                      <span className="text-xs font-normal text-gray-400 mt-0.5 inline-block">सोम-शुक्र: सुबह 9 से शाम 6 बजे</span>
                    </p>
                  </div>
                </div>

                {/* Info Card 3 */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5 hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">ईमेल करें</h3>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm text-gray-600 font-medium">sales@bharatintudyog.com</p>
                    </div>
                  </div>
                </div>

                {/* Info Card 4 */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-5 hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">व्यावसायिक घंटे</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex justify-between gap-8"><span>सोम - शुक्र:</span> <span className="font-medium text-gray-900">09:00 - 18:00</span></li>
                      <li className="flex justify-between gap-8"><span>शनिवार:</span> <span className="font-medium text-gray-900">10:00 - 15:00</span></li>
                      <li className="flex justify-between gap-8"><span>रविवार:</span> <span className="font-medium text-red-500">बंद</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10 relative overflow-hidden">
              {/* Form header bg decoration */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4a7c59] to-[#c17232]" />
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-4">हमें एक संदेश भेजें</h2>

              {status === 'success' ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">संदेश भेजा गया!</h3>
                  <p className="text-gray-500 max-w-[280px]">
                    संपर्क करने के लिए धन्यवाद। हमारी टीम जल्द ही आपसे वापस संपर्क करेगी।
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-[#4a7c59] font-bold hover:underline"
                  >
                    एक और संदेश भेजें
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 pl-1" htmlFor="name">
                        आपका नाम
                      </label>
                      <input
                        id="name" name="name" type="text"
                        value={formData.name} onChange={handleChange}
                        required disabled={status === 'loading'}
                        className={inputClass}
                        placeholder="उदा. राहुल कुमार"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 pl-1" htmlFor="email">
                        ईमेल पता
                      </label>
                      <input
                        id="email" name="email" type="email"
                        value={formData.email} onChange={handleChange}
                        required disabled={status === 'loading'}
                        className={inputClass}
                        placeholder="उदा. rahul@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 pl-1" htmlFor="subject">
                      विषय
                    </label>
                    <input
                      id="subject" name="subject" type="text"
                      value={formData.subject} onChange={handleChange}
                      required disabled={status === 'loading'}
                      className={inputClass}
                      placeholder="आप किस बारे में बात करना चाहते हैं?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 pl-1" htmlFor="message">
                      संदेश
                    </label>
                    <textarea
                      id="message" name="message"
                      value={formData.message} onChange={handleChange}
                      required disabled={status === 'loading'}
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="कृपया अपना पूरा संदेश यहां लिखें..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">
                      ⚠️ संदेश भेजने में विफल। कृपया पुनः प्रयास करें।
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full h-14 bg-gradient-to-r from-[#4a7c59] to-[#3a6347] hover:shadow-lg hover:shadow-[#4a7c59]/20 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={20} className="animate-spin" /> भेज रहे हैं...</>
                    ) : (
                      <><Send size={20} /> संदेश भेजें</>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}