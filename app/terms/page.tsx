'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Package, RefreshCcw, Scale, Edit3, Mail, CalendarClock, Gavel } from 'lucide-react';

export default function Terms() {
  const terms = [
    {
      icon: <FileText size={24} />,
      title: "वेबसाइट का उपयोग (Website Usage)",
      content: "आपको इस वेबसाइट का उपयोग केवल व्यक्तिगत और गैर-व्यावसायिक उद्देश्यों के लिए करने का सीमित अधिकार दिया जाता है। आप हमारी अनुमति के बिना सामग्री को पुन: प्रस्तुत, वितरित या प्रसारित नहीं कर सकते हैं।"
    },
    {
      icon: <Package size={24} />,
      title: "उत्पाद जानकारी (Product Information)",
      content: "हम सटीक उत्पाद जानकारी (जैसे ईंटों की श्रेणी, आकार और मूल्य) प्रदान करने का प्रयास करते हैं, लेकिन हम यह गारंटी नहीं देते कि विवरण या मूल्य निर्धारण पूरी तरह से त्रुटि-मुक्त हैं। हम किसी भी अशुद्धि को सुधारने का अधिकार सुरक्षित रखते हैं।"
    },
    {
      icon: <RefreshCcw size={24} />,
      title: "वापसी और रद्दीकरण (Returns & Cancellations)",
      content: "ऑर्डर को डिस्पैच (dispatch) होने से पहले रद्द किया जा सकता है। डिलीवरी के समय ईंटों की गुणवत्ता की जांच की जानी चाहिए। साइट पर माल उतारने के बाद, किसी भी वापसी या रिफंड पर विचार कंपनी के विवेक पर किया जाएगा।"
    },
    {
      icon: <Scale size={24} />,
      title: "दायित्व की सीमा (Limitation of Liability)",
      content: "कानून द्वारा अनुमत अधिकतम सीमा तक, भारत इंट उद्योग हमारी वेबसाइट या उत्पादों के आपके उपयोग से उत्पन्न होने वाले किसी भी अप्रत्यक्ष, आकस्मिक या विशेष नुकसान के लिए उत्तरदायी नहीं होगा।"
    },
    {
      icon: <Edit3 size={24} />,
      title: "शर्तों में बदलाव (Changes to Terms)",
      content: "हम किसी भी समय इन शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं। वेबसाइट पर पोस्ट किए जाने के तुरंत बाद बदलाव प्रभावी होंगे। निरंतर उपयोग का अर्थ है कि आप नए नियमों को स्वीकार करते हैं।"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-sans">
      <Header />
      
      <main className="flex-1 bg-warm-cream relative selection:bg-sage-green/20">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23a35e26" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#335940] to-[#4a7c59] text-white pt-24 pb-32 relative overflow-hidden rounded-b-3xl sm:rounded-none">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          <div className="container-main max-w-4xl mx-auto text-center relative z-10 px-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-xl">
              <Gavel size={32} className="text-emerald-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 tracking-tight">
              सेवा की शर्तें
              <span className="block text-2xl md:text-3xl mt-2 text-emerald-100 font-medium tracking-normal">(Terms of Service)</span>
            </h1>
            <p className="text-lg text-emerald-50/80 max-w-2xl mx-auto font-medium">
              ये सेवा की शर्तें भारत इंट उद्योग की वेबसाइट और सेवाओं के आपके उपयोग को नियंत्रित करती हैं।
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="container-main max-w-4xl mx-auto py-16 px-4 sm:px-6 relative z-10 -mt-16">
          
          {/* Last Updated Badge */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 text-sm font-bold text-gray-600">
              <CalendarClock size={16} className="text-terracotta" />
              अंतिम अपडेट: मार्च 2024 (Last Updated: March 2024)
            </div>
          </div>

          <div className="space-y-6">
            {/* Map through standard terms */}
            {terms.map((term, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-sage-green/10 text-sage-green flex items-center justify-center shrink-0 group-hover:bg-sage-green group-hover:text-white transition-colors duration-300">
                    {term.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-poppins font-bold text-dark-charcoal mb-3">
                      {term.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base font-medium">
                      {term.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Contact Us Special Card */}
            <div className="bg-gradient-to-br from-[#c17232]/10 to-[#a35e26]/5 rounded-2xl p-6 sm:p-8 border border-terracotta/20 mt-10">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-terracotta text-white flex items-center justify-center shrink-0 shadow-md">
                  <Mail size={24} />
                </div>
                <div className="w-full">
                  <h3 className="text-xl font-poppins font-bold text-dark-charcoal mb-3">
                    संपर्क करें (Contact Us)
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                    यदि इन सेवा की शर्तों (Terms of Service) के बारे में आपके कोई प्रश्न हैं, तो कृपया बेझिझक हमसे संपर्क करें:
                  </p>
                  
                  <div className="bg-white rounded-xl p-5 border border-white shadow-sm space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="font-bold text-dark-charcoal w-16">Email:</span>
                      <a href="mailto:legal@bharatintudyog.com" className="hover:text-terracotta transition-colors break-all">legal@bharatintudyog.com</a>
                    </div>
                    <div className="flex items-start gap-3 text-gray-600">
                      <span className="font-bold text-dark-charcoal w-16 shrink-0">Address:</span>
                      <span>Bharat Int Udyog<br />Rasauli, Mashrakh (Bihar) - India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}