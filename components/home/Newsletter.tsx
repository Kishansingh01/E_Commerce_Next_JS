'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call the backend API to save the email
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-16 mb-24 md:mt-24 md:mb-32 mx-4 xl:mx-auto max-w-7xl bg-linear-to-br from-sage-green via-sage-green to-sage-green/80 text-warm-cream py-20 md:py-24 relative overflow-hidden rounded-3xl shadow-xl shadow-sage-green/10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/15 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-warm-cream/10 rounded-full blur-3xl -z-10"></div>

      <div className="container-main max-w-xl mx-auto text-center px-6">
        <div className="mb-10">
          <span className="inline-block bg-terracotta/20 text-warm-cream px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            💌 जुड़े रहें
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
          भारत इंट उद्योग समुदाय में शामिल हों
        </h2>
        
        <p className="text-xl mb-12 opacity-95 font-open-sans leading-relaxed">
          विशेष लाभ, निर्माण सुझाव, और नए उत्पादों के बारे में सबसे पहले जानें।
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4  ">
          <div className="flex gap-3 flex-col sm:flex-row ">
            <input
              type="email"
              placeholder="अपना ईमेल पता दर्ज करें"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="flex-1 px-6 py-4 rounded-xl  bg-warm-cream text-dark-charcoal placeholder-gray-400 font-open-sans text-lg focus:outline-none focus:ring-3 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-sage-green disabled:opacity-50 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-terracotta to-orange-600 hover:shadow-lg active:scale-95 px-8 py-4 rounded-xl font-poppins font-bold transition-all duration-200 shadow-lg disabled:opacity-50 transform hover:-translate-y-1 whitespace-nowrap text-lg text-white"
            >
              {loading ? '⏳ सदस्यता...' : '✉️ सदस्यता लें'}
            </button>
            
          </div>
 <div className='p-4'></div>
          {submitted && (
            <p className="text-warm-cream font-open-sans text-lg animate-fade-in bg-green-500/30 px-4 py-3 rounded-xl border border-green-400/50 mt-2">
              ✓ धन्यवाद! विशेष लाभों के लिए अपना ईमेल जांचें।
            </p>
          )}

          {error && (
            <p className="text-red-200 font-open-sans text-lg bg-red-500/30 px-4 py-3 rounded-xl border border-red-400/50 mt-2">
              ⚠️ {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}