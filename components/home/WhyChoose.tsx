'use client';

export default function WhyChooseBharatIntUdyog() {
  const features = [
    {
      emoji: '💰',
      title: 'किफायती मूल्य',
      description: 'प्रीमियम गुणवत्ता सर्वोत्तम कीमत पर। गुणवत्ता से समझौता किए बिना बचत करें।',
      color: 'from-yellow-50 to-amber-50',
      icon_bg: 'bg-yellow-100',
    },
    {
      emoji: '🏗️',
      title: 'मजबूत निर्माण',
      description: 'टिकाऊ और विश्वसनीय ईंटें। दीर्घस्थायी निर्माण कार्यों के लिए आदर्श।',
      color: 'from-green-50 to-emerald-50',
      icon_bg: 'bg-green-100',
    },
    {
      emoji: '✅',
      title: 'मानक अनुपालन',
      description: 'सभी औद्योगिक मानकों के अनुसार। गुणवत्ता और सुरक्षा की गारंटी।',
      color: 'from-red-50 to-pink-50',
      icon_bg: 'bg-red-100',
    },
  ];

  return (
    <section className="bg-linear-to-b from-white to-warm-cream section-spacing">
      <div className="container-main">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-dark-charcoal">
            भारत इंट उद्योग को क्यों चुनें?
          </h2>
          <div className="h-1.5 w-24 bg-linear-to-r from-terracotta to-sage-green rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-linear-to-br ${feature.color} rounded-2xl p-10 text-center shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100`}
            >
              <div className={`${feature.icon_bg} w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6`}>
                {feature.emoji}
              </div>
              <h3 className="font-poppins font-bold text-2xl mb-4 text-dark-charcoal">
                {feature.title}
              </h3>
              <p className="text-dark-charcoal/75 font-open-sans text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
