'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, Clock, MapPin, BadgeIndianRupee, AlertCircle, RefreshCcw, ShieldCheck, PhoneCall } from 'lucide-react';

export default function Shipping() {
  const shippingInfo = [
    {
      icon: <Truck size={20} />,
      title: "डिलीवरी के तरीके (Delivery Methods)",
      desc: "हम ऑर्डर की मात्रा और दूरी के आधार पर ट्रैक्टर और बड़े ट्रकों के माध्यम से ईंटों की डिलीवरी करते हैं।"
    },
    {
      icon: <Clock size={20} />,
      title: "डिलीवरी का समय (Delivery Time)",
      desc: "स्थानीय डिलीवरी (मशरख और आसपास): 24-48 घंटे।\nअन्य क्षेत्र (बिहार में): 3-5 कार्य दिवस।"
    },
    {
      icon: <BadgeIndianRupee size={20} />,
      title: "डिलीवरी शुल्क (Shipping Charges)",
      desc: "डिलीवरी शुल्क आपके स्थान की दूरी और ऑर्डर की गई ईंटों की मात्रा के आधार पर अलग-अलग होता है। सटीक शुल्क कोटेशन के समय बताया जाएगा।"
    },
    {
      icon: <MapPin size={20} />,
      title: "साइट तक पहुंच (Site Accessibility)",
      desc: "कृपया सुनिश्चित करें कि आपकी निर्माण साइट पर ट्रकों/ट्रैक्टरों के प्रवेश और ईंटों को उतारने के लिए पर्याप्त जगह और सही रास्ता है।"
    }
  ];

  const returnInfo = [
    {
      icon: <AlertCircle size={20} />,
      title: "गुणवत्ता की जांच (Quality Check)",
      desc: "हम अनुरोध करते हैं कि डिलीवरी के समय साइट पर ईंटों की गुणवत्ता की जांच की जाए। एक बार ईंटें उतर जाने के बाद, उन्हें वापस नहीं लिया जाएगा।"
    },
    {
      icon: <RefreshCcw size={20} />,
      title: "ऑर्डर रद्दीकरण (Order Cancellation)",
      desc: "फैक्ट्री से गाड़ी (ट्रक/ट्रैक्टर) रवाना होने से पहले ही ऑर्डर रद्द किया जा सकता है। एक बार माल रवाना होने के बाद रद्दीकरण शुल्क लागू हो सकता है।"
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "क्षतिग्रस्त माल (Damaged Goods)",
      desc: "परिवहन के दौरान ईंटों का 2-3% टूटना उद्योग में सामान्य है। यदि क्षति इससे अधिक है, तो कृपया माल उतारने से पहले ड्राइवर या हमारी टीम को सूचित करें।"
    },
    {
      icon: <PhoneCall size={20} />,
      title: "रिफंड प्रक्रिया (Refund Process)",
      desc: "स्वीकृत रद्दीकरण या मान्य रिफंड के मामले में, राशि 5-7 कार्य दिवसों के भीतर आपके मूल भुगतान विधि में वापस कर दी जाएगी।"
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
          <div className="container-main max-w-5xl mx-auto text-center relative z-10 px-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-xl">
              <Truck size={32} className="text-emerald-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 tracking-tight">
              शिपिंग और वापसी नीति
              <span className="block text-2xl md:text-3xl mt-2 text-emerald-100 font-medium tracking-normal">(Shipping & Returns)</span>
            </h1>
            <p className="text-lg text-emerald-50/80 max-w-2xl mx-auto font-medium">
              डिलीवरी, माल उतराई, और वापसी से संबंधित हमारे नियम और शर्तें नीचे दी गई हैं।
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="container-main max-w-6xl mx-auto py-16 px-4 sm:px-6 relative z-10 -mt-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Shipping Column */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg shadow-sage-green/5 border border-gray-100">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-sage-green/10 flex items-center justify-center text-sage-green">
                  <Truck size={24} />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-dark-charcoal">
                  शिपिंग जानकारी<br />
                  <span className="text-sm text-gray-400 font-medium">Shipping Information</span>
                </h2>
              </div>
              
              <div className="space-y-8">
                {shippingInfo.map((info, idx) => (
                  <div key={idx} className="flex gap-5 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 group-hover:bg-sage-green/10 group-hover:text-sage-green transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-poppins font-bold mb-1.5 text-dark-charcoal group-hover:text-sage-green transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">
                        {info.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Returns Column */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg shadow-terracotta/5 border border-gray-100">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta">
                  <RefreshCcw size={24} />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-dark-charcoal">
                  वापसी नीति<br />
                  <span className="text-sm text-gray-400 font-medium">Return Policy</span>
                </h2>
              </div>
              
              <div className="space-y-8">
                {returnInfo.map((info, idx) => (
                  <div key={idx} className="flex gap-5 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 group-hover:bg-terracotta/10 group-hover:text-terracotta transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-poppins font-bold mb-1.5 text-dark-charcoal group-hover:text-terracotta transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">
                        {info.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}