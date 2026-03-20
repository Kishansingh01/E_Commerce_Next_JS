'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Header />
      <main className="bg-warm-cream">
        {/* Hero Section */}
        <section className="bg-linear-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              भारत इंट उद्योग के बारे में
            </h1>
            <p className="text-lg opacity-95">
              हमारा उद्देश्य सर्वोच्च गुणवत्ता की ईंटें सभी तक पहुंचाना है
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container-main py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-h2 font-poppins font-bold mb-6 text-dark-charcoal">
                हम कौन हैं
              </h2>
              <p className="text-dark-charcoal/80 mb-4 leading-relaxed">
                भारत इंट उद्योग की स्थापना एक सरल लक्ष्य के साथ की गई थी: सर्वोच्च गुणवत्ता की ईंटें सभी तक पहुंचाना। 
                हम विश्वास करते हैं कि मजबूत और टिकाऊ निर्माण सामग्री सभी के लिए सुलभ होनी चाहिए।
              </p>
              <p className="text-dark-charcoal/80 leading-relaxed">
                हमारे ब्रांड का नाम हमारी दर्शन को दर्शाता है - हमारी ईंटें उच्च गुणवत्ता, टिकाऊ और विश्वसनीय है। 
                हम केवल सर्वोत्तम मिट्टी का उपयोग करते हैं जो पर्यावरण के लिए सुरक्षित है।
              </p>
            </div>
            <div className="bg-linear-to-br from-sage-green/10 to-terracotta/10 h-96 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-7xl">🏭</span>
                <p className="mt-4 text-dark-charcoal/70">गुणवत्ता का प्रतीक</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-h2 font-poppins font-bold mb-12 text-center text-dark-charcoal">
              हमारे मुख्य मूल्य
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '💪',
                  title: 'मजबूती',
                  description: 'हमारी ईंटें सर्वोच्च मानक की मजबूती प्रदान करती हैं। लंबे समय तक टिकाऊ और विश्वसनीय।'
                },
                {
                  icon: '🏭',
                  title: 'गुणवत्ता नियंत्रण',
                  description: 'प्रत्येक ईंट कठोर गुणवत्ता मानकों के अनुसार जांची जाती है। पूर्ण सुरक्षा और विश्वास।'
                },
                {
                  icon: '✅',
                  title: 'प्रमाणित',
                  description: 'सभी ईंटें भारतीय मानदंडों के अनुसार प्रमाणित हैं। उद्योग के सर्वश्रेष्ठ मानकों को पूरा करता है।'
                },
              ].map((value, idx) => (
                <div key={idx} className="bg-white rounded-lg p-8 shadow-md text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="font-poppins font-bold text-lg mb-3 text-dark-charcoal">
                    {value.title}
                  </h3>
                  <p className="text-dark-charcoal/70">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-linear-to-br from-sage-green/50 to-terracotta/30 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-poppins font-bold mb-6 text-dark-charcoal">
              अपनी निर्माण परियोजना शुरू करने के लिए तैयार?
            </h2>
            <p className="text-lg text-dark-charcoal/80 mb-8 max-w-2xl mx-auto">
              हजारों संतुष्ट ग्राहक पहले से ही भारत इंट उद्योग की ईंटों पर विश्वास करते हैं।
            </p>
            <Link 
              href="/shop"
              className="btn-primary text-lg px-8 py-4 font-poppins font-bold inline-block"
            >
              अभी खरीदें
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
