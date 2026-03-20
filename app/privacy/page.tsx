'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Database, Settings, UserCheck, Mail, CalendarClock } from 'lucide-react';

export default function Privacy() {
  const policies = [
    {
      icon: <Database size={24} />,
      title: "हम जो जानकारी एकत्र करते हैं (Information We Collect)",
      content: "जब आप हमारी वेबसाइट पर आते हैं या खरीदारी करते हैं, तो हम आपके द्वारा सीधे प्रदान की गई जानकारी (नाम, ईमेल, पता) और स्वचालित रूप से (ब्राउज़र डेटा, कुकीज़, आईपी पता) जानकारी एकत्र करते हैं।"
    },
    {
      icon: <Settings size={24} />,
      title: "हम आपकी जानकारी का उपयोग कैसे करते हैं (How We Use It)",
      content: "हम आपकी जानकारी का उपयोग ऑर्डर को प्रोसेस करने, ईंटों की सुरक्षित डिलीवरी सुनिश्चित करने, महत्वपूर्ण अपडेट भेजने, हमारी सेवाओं में सुधार करने और कानूनी दायित्वों का पालन करने के लिए करते हैं।"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "डेटा सुरक्षा (Data Security)",
      content: "हम आपके व्यक्तिगत डेटा की सुरक्षा के लिए उद्योग-मानक सुरक्षा उपाय (Industry-standard security) लागू करते हैं। हम कभी भी आपका डेटा किसी तीसरे पक्ष (Third-party) को नहीं बेचते हैं।"
    },
    {
      icon: <UserCheck size={24} />,
      title: "आपके अधिकार (Your Rights)",
      content: "आपको अपनी व्यक्तिगत जानकारी तक पहुंचने, उसे सुधारने या हटाने का अधिकार है। इन अधिकारों का प्रयोग करने के लिए आप हमारी प्राइवेसी टीम से संपर्क कर सकते हैं।"
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
              <ShieldCheck size={32} className="text-emerald-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 tracking-tight">
              गोपनीयता नीति
              <span className="block text-2xl md:text-3xl mt-2 text-emerald-100 font-medium tracking-normal">(Privacy Policy)</span>
            </h1>
            <p className="text-lg text-emerald-50/80 max-w-2xl mx-auto font-medium">
              भारत इंट उद्योग में, हम आपकी गोपनीयता का सम्मान करते हैं और आपके व्यक्तिगत डेटा की सुरक्षा के लिए प्रतिबद्ध हैं।
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
            {/* Map through standard policies */}
            {policies.map((policy, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-sage-green/10 text-sage-green flex items-center justify-center shrink-0 group-hover:bg-sage-green group-hover:text-white transition-colors duration-300">
                    {policy.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-poppins font-bold text-dark-charcoal mb-3">
                      {policy.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base font-medium">
                      {policy.content}
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
                    यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया बेझिझक हमसे संपर्क करें:
                  </p>
                  
                  <div className="bg-white rounded-xl p-5 border border-white shadow-sm space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <span className="font-bold text-dark-charcoal w-16">Email:</span>
                      <a href="mailto:privacy@bharatintudyog.com" className="hover:text-terracotta transition-colors break-all">privacy@bharatintudyog.com</a>
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