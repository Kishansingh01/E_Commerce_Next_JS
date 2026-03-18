'use client';

export default function TrustBadges() {
  const badges = [
    { icon: '✓', label: '100% Natural', color: 'from-green-50 to-green-100' },
    { icon: '🐰', label: 'Cruelty-Free', color: 'from-pink-50 to-pink-100' },
    { icon: '🌱', label: 'Organic Certified', color: 'from-emerald-50 to-emerald-100' },
    { icon: '🔒', label: 'BPA-Free', color: 'from-blue-50 to-blue-100' },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-warm-cream section-spacing">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${badge.color} rounded-2xl p-8 md:p-10 text-center shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100`}
            >
              <div className="text-5xl md:text-6xl mb-4">{badge.icon}</div>
              <p className="font-poppins font-bold text-dark-charcoal text-lg">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
