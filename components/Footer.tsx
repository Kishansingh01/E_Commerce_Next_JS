'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 md:mt-24 bg-gradient-to-br from-[#2a4632] to-[#1e3324] text-[#f5e6d0] pt-20 border-t-4 border-[#c17232]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16">
          
          {/* Brand Col */}
          <div className="space-y-6 lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-3 hover:opacity-90 transition">
              <span className="text-4xl leading-none">🧱</span>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-[#ffffff] leading-none tracking-tight">भारत इंट</span>
                <span className="text-[#c17232] text-sm font-semibold tracking-widest uppercase mt-1">उद्योग</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              सर्वोच्च गुणवत्ता की ईंटें, सर्वोत्तम कीमत पर। आपके निर्माण प्रकल्पों के लिए भारत का सबसे विश्वसनीय आपूर्तिकर्ता। मजबूती जो पीढ़ियों तक चले।
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#c17232] flex items-center justify-center text-white/80 hover:text-[#ffffff] transition-all hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="font-bold text-lg mb-6 flex items-center gap-2" 
              style={{ color: '#ffffff' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#c17232]" />
              त्वरित लिंक
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: 'होम', href: '/' },
                { label: 'हमारे बारे में', href: '/about' },
                { label: 'सभी उत्पाद खरीदें', href: '/shop' },
                { label: 'सामान्य प्रश्न (FAQ)', href: '/faq' },
                { label: 'संपर्क करें', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#ffffff] hover:text-[#c17232] hover:translate-x-1.5 inline-flex items-center gap-2 transition-transform text-sm font-medium">
                    <ArrowRight size={14} className="text-[#c17232]" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 
              className="font-bold text-lg mb-6 flex items-center gap-2" 
              style={{ color: '#ffffff' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#c17232]" />
              श्रेणियां
            </h4>
            <ul className="space-y-3.5">
              {[
                { label: 'प्रथम श्रेणी ईंट', emoji: '🏆' },
                { label: 'द्वितीय श्रेणी ईंट', emoji: '⭐' },
                { label: 'तृतीय श्रेणी ईंट', emoji: '🧱' },
                { label: 'चतुर्थ श्रेणी ईंट', emoji: '🪨' },
              ].map((cat) => (
                <li key={cat.label}>
                  <Link href={`/shop?category=${cat.label}`} className="text-[#ffffff] hover:text-[#c17232] hover:translate-x-1.5 inline-flex items-center gap-2 transition-transform text-sm font-medium">
                    <span>{cat.emoji}</span> {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="font-bold text-lg mb-6 flex items-center gap-2" 
              style={{ color: '#ffffff' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#c17232]" />
              हमसे जुड़ें
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-[#ffffff] text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 text-[#c17232]">
                  <MapPin size={16} />
                </div>
                <span className="leading-relaxed">Bharat Int Udogh <br />Rasauli, Mashrakh(Bihar)</span>
              </li>
              <li className="flex items-center gap-4 text-[#ffffff] text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-[#c17232]">
                  <Phone size={16} />
                </div>
                <span>+91 878964 2950</span>
              </li>
              <li className="flex items-center gap-4 text-[#ffffff] text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-[#c17232]">
                  <Mail size={16} />
                </div>
                <span>sales@bharatintudyog.com</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} भारत इंट उद्योग। सर्वाधिकार सुरक्षित।
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-white/50 hover:text-[#ffffff] transition">गोपनीयता नीति</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/terms" className="text-white/50 hover:text-[#ffffff] transition">सेवा की शर्तें</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/shipping" className="text-white/50 hover:text-[#ffffff] transition">पॉलिसी</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}