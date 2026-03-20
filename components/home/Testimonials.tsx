'use client';

import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <section className="bg-linear-to-b from-warm-cream to-white section-spacing">
      <div className="container-main">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-dark-charcoal">
            ग्राहक संतुष्टि ❤️
          </h2>
          <div className="h-1.5 w-24 bg-linear-to-r from-terracotta to-sage-green rounded-full mx-auto"></div>
          <p className="text-lg text-dark-charcoal/70 mt-6 max-w-2xl mx-auto">
            हजारों संतुष्ट ग्राहक हमारी ईंटों पर विश्वास करते हैं
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gradient-to-br from-white to-warm-cream/50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl border border-gray-100 hover:border-terracotta/30 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-dark-charcoal mb-6 font-open-sans text-lg leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <p className="font-poppins font-bold text-dark-charcoal text-lg">
                  {testimonial.author}
                </p>
                <p className="text-terracotta text-sm font-semibold">सत्यापित ग्राहक</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}