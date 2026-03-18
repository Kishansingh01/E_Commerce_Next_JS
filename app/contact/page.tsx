'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-warm-cream">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg opacity-95">
              We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <div className="container-main py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-h2 font-poppins font-bold mb-8 text-dark-charcoal">
                Get in Touch
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-poppins font-bold text-lg mb-2 text-dark-charcoal">
                    📍 Address
                  </h3>
                  <p className="text-dark-charcoal/70">
                    123 Beauty Street<br />
                    Skincare City, SC 12345<br />
                    United States
                  </p>
                </div>

                <div>
                  <h3 className="font-poppins font-bold text-lg mb-2 text-dark-charcoal">
                    📞 Phone
                  </h3>
                  <p className="text-dark-charcoal/70">
                    +1 (555) 123-4567<br />
                    Mon-Fri: 9am - 5pm EST
                  </p>
                </div>

                <div>
                  <h3 className="font-poppins font-bold text-lg mb-2 text-dark-charcoal">
                    ✉️ Email
                  </h3>
                  <p className="text-dark-charcoal/70">
                    support@skincake.com<br />
                    info@skincake.com
                  </p>
                </div>

                <div>
                  <h3 className="font-poppins font-bold text-lg mb-2 text-dark-charcoal">
                    🕐 Business Hours
                  </h3>
                  <p className="text-dark-charcoal/70">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 3:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-h2 font-poppins font-bold mb-6 text-dark-charcoal">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-open-sans font-medium text-dark-charcoal mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-open-sans font-medium text-dark-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-open-sans font-medium text-dark-charcoal mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label className="block font-open-sans font-medium text-dark-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta disabled:opacity-50"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-lg py-3 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                {submitted && (
                  <p className="text-warm-cream bg-terracotta px-4 py-3 rounded text-center font-open-sans">
                    ✓ Thank you! Your message has been sent successfully.
                  </p>
                )}

                {error && (
                  <p className="text-red-600 bg-red-100 px-4 py-3 rounded text-center font-open-sans">
                    ⚠️ {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
