'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('1');

  const faqs = [
    {
      id: '1',
      question: 'आप किस प्रकार की ईंटें बनाते हैं? (What types of bricks do you manufacture?)',
      answer: 'हम उच्च गुणवत्ता वाली प्रीमियम लाल मिट्टी की ईंटें (Red Clay Bricks), फ्लाई ऐश ईंटें (Fly Ash Bricks) और पेवर्स (Interlocking Pavers) बनाते हैं। हमारे उत्पाद हर प्रकार के आवासीय और व्यावसायिक निर्माण के लिए सर्वोत्तम हैं।'
    },
    {
      id: '2',
      question: 'क्या आप निर्माण स्थल (construction site) पर सीधे डिलीवरी देते हैं?',
      answer: 'जी हाँ! हम ट्रकों और ट्रैक्टरों के माध्यम से सीधे आपके कन्सट्रक्शन साइट पर सुरक्षित डिलीवरी सुनिश्चित करते हैं। स्थान के आधार पर, डिलीवरी आमतौर पर 24 से 48 घंटों के भीतर पूरी की जाती है।'
    },
    {
      id: '3',
      question: 'ऑर्डर करने के लिए न्यूनतम मात्रा (Minimum Order Quantity) क्या है?',
      answer: 'सीधे साइट पर डिलीवरी के लिए हमारी न्यूनतम ऑर्डर मात्रा 1,000 ईंटें है। यदि आपको इससे कम मात्रा की आवश्यकता है, तो आप सीधे हमारे विनिर्माण संयंत्र (Plant) से खरीदारी कर सकते हैं।'
    },
    {
      id: '4',
      question: 'क्या आपकी ईंटों की गुणवत्ता (quality) और मजबूती (strength) का परीक्षण किया जाता है?',
      answer: 'बिल्कुल! उद्योग के मानकों (Industry Standards) को पूरा करने के लिए हमारी ईंटों के हर बैच का मजबूती (Compressive Strength), जल अवशोषण (Water Absorption) और आकार के लिए सख्त परीक्षण किया जाता है।'
    },
    {
      id: '5',
      question: 'क्या आप बड़े और थोक ऑर्डर (Bulk orders) पर छूट प्रदान करते हैं?',
      answer: 'हाँ, हम बड़े बिल्डरों, ठेकेदारों और व्यावसायिक परियोजनाओं के लिए विशेष मूल्य निर्धारण (Special Pricing) प्रदान करते हैं। आप कस्टम कोटेशन के लिए हमारी सेल्स टीम से संपर्क कर सकते हैं।'
    },
    {
      id: '6',
      question: 'क्या मैं बड़ा ऑर्डर देने से पहले सैंपल (Sample) देख सकता हूँ?',
      answer: 'जी हाँ, हमारा मानना है कि आपको पहले गुणवत्ता की जांच करनी चाहिए। आप हमारी संपर्क टीम से बात करके सैंपल मंगा सकते हैं, या सीधे हमारे कारखाने का दौरा कर सकते हैं।'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-sans selection:bg-[#4a7c59] selection:text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#335940] to-[#4a7c59] text-white pt-24 pb-48 relative overflow-hidden mt-8 rounded-t-3xl sm:rounded-none">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-400 blur-3xl opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-white blur-3xl opacity-10 mix-blend-overlay pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-6 backdrop-blur-md shadow-sm">
             <Sparkles size={16} className="text-emerald-300" />
             <span>ग्राहक सहायता केंद्र</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            अक्सर पूछे जाने वाले <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-white">प्रश्न (FAQ)</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-50/90 font-medium max-w-2xl mx-auto leading-relaxed">
            भारत इंट उद्योग के उत्पादों, डिलीवरी और सेवाओं के बारे में आपके सभी सवालों के जवाब यहाँ हैं।
          </p>
        </div>
      </section>

      <main className="flex-1 -mt-32 max-w-4xl w-full mx-auto px-4 sm:px-6 pb-24 relative z-20">
        
        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16 max-w-3xl mx-auto">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${
                  isOpen ? 'border-[#4a7c59]/30 ring-4 ring-[#4a7c59]/5' : 'border-gray-200/60 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus-visible:bg-gray-50 group"
                >
                  <h3 className={`text-base sm:text-lg font-bold pr-8 transition-colors duration-200 ${
                    isOpen ? 'text-[#4a7c59]' : 'text-gray-800 group-hover:text-[#4a7c59]'
                  }`}>
                    {faq.question}
                  </h3>
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${
                    isOpen 
                      ? 'bg-[#4a7c59] text-white rotate-180 shadow-md' 
                      : 'bg-gray-50 text-gray-400 group-hover:bg-[#4a7c59]/10 group-hover:text-[#4a7c59]'
                  }`}>
                    <ChevronDown size={20} strokeWidth={2.5} />
                  </div>
                </button>

                {/* Smooth Grid-based accordion animation */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2">
                      <div className="w-12 h-1 bg-gray-100 rounded-full mb-4"></div>
                      <p className="text-gray-600 leading-relaxed font-medium text-[15px] sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#c17232] to-[#a35e26] rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-[#c17232]/20 overflow-hidden relative max-w-3xl mx-auto">
           {/* CTA Background Decals */}
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>
           
           <div className="relative z-10 flex flex-col items-center">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/20">
               <MessageCircle size={32} className="text-white" />
             </div>
             
             <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">क्या आपको अपना उत्तर नहीं मिला?</h2>
             <p className="text-orange-50/90 font-medium mb-8 max-w-lg mx-auto text-lg leading-relaxed">
               हमारी सपोर्ट टीम हमेशा आपकी मदद के लिए तैयार है। कस्टम आवश्यकताओं या किसी भी अन्य सवाल के लिए बेझिझक हमसे जुड़ें।
             </p>
             
             <Link
               href="/contact"
               className="inline-flex items-center justify-center bg-white text-[#c17232] font-extrabold text-lg px-8 py-4 rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg"
             >
               हमसे संपर्क करें
             </Link>
           </div>
        </div>

      </main>
      
      {/* Added Missing Footer component */}
      <Footer />
    </div>
  );
}