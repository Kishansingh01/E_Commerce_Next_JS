'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  const backgroundImages = [
    '/images/factory1.png',
    '/images/factory2.png',
    '/images/factory3.png',
    '/images/factory4.png',
    '/images/factory5.png'
  ];

  useEffect(() => {
    // 2-second interval for switching the images
    const timer = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleShopNow = () => {
    const shopElement = document.getElementById('featured-products');
    if (shopElement) {
      shopElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#2a4632] text-warm-cream section-spacing relative overflow-hidden">
      
      {/* Animated "Movable" Image Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {backgroundImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Factory Background ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            quality={100}
            className={`object-cover transition-all duration-1000 ease-in-out ${
              index === currentImage 
                ? 'opacity-100 scale-105' 
                : 'opacity-0 scale-100'
            }`}
          />
        ))}
        {/* Dark overlay to ensure text is readable, but light enough to keep images clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#2a4632]/80 z-10" />
      </div>

      <div className="container-main text-center py-16 md:py-32 px-6 relative z-20">
        <h1 className="text-5xl md:text-7xl font-poppins font-bold mb-8 leading-tight animate-fade-in drop-shadow-2xl">
          <br />
          <span className="text-[#e8955a]"> मजबूत ईंटें,<br />गुणवत्ता की गारंटी,</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200 drop-shadow-md">सर्वश्रेष्ठ कीमत</span>
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button 
            onClick={handleShopNow}
            className="btn-primary text-lg px-10 py-4 font-poppins font-bold shadow-xl shadow-[#c17232]/20 hover:-translate-y-1 transition-all"
          >
            🛍️ अभी खरीदें
          </button>
          <Link 
            href="/about"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-lg px-10 py-4 font-poppins font-bold rounded-xl backdrop-blur-sm transition-all shadow-lg hover:-translate-y-1"
          >
            📖 और जानें
          </Link>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="">
            <div className="text-center transform group-hover:scale-105 transition-transform duration-500">
              <span className="text-9xl inline-block drop-shadow-2xl mb-4 group-hover:animate-bounce">🏭</span>
              <p className="text-white/90 text-center text-3xl font-poppins font-bold tracking-wide drop-shadow-md">उच्च श्रेणी की ईंटें</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}