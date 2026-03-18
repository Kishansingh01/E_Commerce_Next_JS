'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: 'Are all your products organic?',
      answer: 'Yes! All SkinCake products are made with 100% certified organic ingredients. We never use synthetic chemicals or harmful additives.'
    },
    {
      id: '2',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. We also offer expedited shipping (2-3 days) and free shipping on orders over $25.'
    },
    {
      id: '3',
      question: 'Is there a money-back guarantee?',
      answer: 'Absolutely! We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, contact us for a full refund.'
    },
    {
      id: '4',
      question: 'Are your products cruelty-free?',
      answer: 'Yes! We are 100% cruelty-free. Our products are never tested on animals, and we use vegan-friendly ingredients whenever possible.'
    },
    {
      id: '5',
      question: 'Can I mix SkinCake products?',
      answer: 'Yes! Our products are designed to work together. Start with the cleanser, follow with a serum, moisturizer, and finish with sunscreen during the day.'
    },
    {
      id: '6',
      question: 'What if I have sensitive skin?',
      answer: 'Our gentle formula is suitable for all skin types, including sensitive skin. However, we recommend doing a patch test first. If irritation occurs, discontinue use.'
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-warm-cream">
        <section className="bg-gradient-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg opacity-95">
              Find answers to common questions about SkinCake products
            </p>
          </div>
        </section>

        <div className="container-main py-16">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-warm-cream transition"
                >
                  <h3 className="font-poppins font-bold text-dark-charcoal">
                    {faq.question}
                  </h3>
                  <span className={`text-2xl text-terracotta transition-transform ${openId === faq.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openId === faq.id && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-warm-cream/30">
                    <p className="text-dark-charcoal/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
