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
    <section className="bg-gradient-to-br from-sage-green via-sage-green to-sage-green/80 text-warm-cream py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/15 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-warm-cream/10 rounded-full blur-3xl -z-10"></div>

      <div className="container-main max-w-xl mx-auto text-center px-6">
        <div className="mb-10">
          <span className="inline-block bg-terracotta/20 text-warm-cream px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            💌 Stay Connected
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
          Join the SkinCake Community
        </h2>
        
        <p className="text-xl mb-12 opacity-95 font-open-sans leading-relaxed">
          Get exclusive offers, skincare tips, and be the first to know about new products.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="flex-1 px-6 py-4 rounded-xl bg-warm-cream text-dark-charcoal placeholder-gray-400 font-open-sans text-lg focus:outline-none focus:ring-3 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-sage-green disabled:opacity-50 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-terracotta to-orange-600 hover:shadow-lg active:scale-95 px-8 py-4 rounded-xl font-poppins font-bold transition-all duration-200 shadow-lg disabled:opacity-50 transform hover:-translate-y-1 whitespace-nowrap text-lg"
            >
              {loading ? '⏳ Subscribing...' : '✉️ Subscribe'}
            </button>
          </div>

          {submitted && (
            <p className="text-warm-cream font-open-sans text-lg animate-fade-in bg-green-500/30 px-4 py-3 rounded-xl border border-green-400/50">
              ✓ Thanks for subscribing! Check your email for exclusive offers.
            </p>
          )}

          {error && (
            <p className="text-red-200 font-open-sans text-lg bg-red-500/30 px-4 py-3 rounded-xl border border-red-400/50">
              ⚠️ {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
