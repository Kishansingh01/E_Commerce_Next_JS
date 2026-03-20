'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CartModal from './CartModal';
import { LoginSignupModal } from './LoginSignupModal';
import { LogOut, User, Package, ChevronDown, ShoppingCart, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout, isLoggedIn } = useAuth();

  const navLinks = [
    { href: '/', label: 'होम' },
    { href: '/shop', label: 'खरीदें' },
    { href: '/about', label: 'हमारे बारे में' },
    { href: '/contact', label: 'संपर्क' },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-[#335940] to-[#4a7c59] text-white sticky top-0 z-40 shadow-xl shadow-[#4a7c59]/10 border-b border-white/10 backdrop-blur-md">
        {/* 3-column grid: logo | nav | actions — all vertically centered */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 grid grid-cols-[auto_1fr_auto] items-center gap-4">

          {/* ── Col 1: Logo ── */}
          <Link href="/" className="flex items-center gap-3 group transition-all">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all shadow-inner border border-white/10">
              <span className="text-2xl leading-none transform group-hover:scale-110 transition-transform">🧱</span>
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-extrabold text-lg sm:text-xl leading-none tracking-tight text-white drop-shadow-sm">
                भारत इंट उद्योग
              </span>
            </div>
          </Link>

          {/* ── Col 2: Desktop nav (centered in its column) ── */}
          <nav className="hidden md:flex items-center justify-center gap-2 lg:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2.5 text-[15px] font-semibold text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300 group whitespace-nowrap overflow-hidden"
              >
                {/* Subtle lustrous shine effect on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative z-10 tracking-wide drop-shadow-sm">{link.label}</span>
                
                {/* Glowing bottom indicator */}
                <span className="absolute bottom-1.5 left-4 right-4 h-[3px] bg-gradient-to-r from-[#c17232] to-[#e8955a] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(232,149,90,0.6)]" />
              </Link>
            ))}
          </nav>

          {/* ── Col 3: Actions (always right-aligned) ── */}
          <div className="flex items-center gap-2 sm:gap-3 justify-end">

            {/* User menu (desktop) */}
            {isLoggedIn && user ? (
              <div className="relative group hidden md:block">
                <button className="flex items-center gap-2.5 h-11 bg-black/10 hover:bg-black/20 border border-white/5 px-3.5 rounded-xl font-medium transition-all text-sm backdrop-blur-sm">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#c17232] to-[#a35e26] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <span className="max-w-[100px] truncate font-semibold drop-shadow-sm">{user.name}</span>
                  <ChevronDown size={14} className="text-white/70 group-hover:rotate-180 transition-transform duration-300 shrink-0" />
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto z-50">
                  <div className="px-5 py-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">लॉगिन किया हुआ</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{user.email || user.phone}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-medium text-sm transition-colors group/item">
                      <div className="bg-gray-100 text-gray-500 p-1.5 rounded-lg group-hover/item:bg-[#4a7c59]/10 group-hover/item:text-[#4a7c59] transition-colors"><User size={16} /></div> 
                      प्रोफाइल (Profile)
                    </Link>
                    <Link href="/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-medium text-sm transition-colors group/item">
                      <div className="bg-gray-100 text-gray-500 p-1.5 rounded-lg group-hover/item:bg-[#4a7c59]/10 group-hover/item:text-[#4a7c59] transition-colors"><Package size={16} /></div> 
                      मेरे ऑर्डर (Orders)
                    </Link>
                  </div>
                  <div className="p-2 border-t border-gray-50 bg-gray-50/50">
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 text-sm transition-colors font-bold group/btn"
                    >
                      <div className="bg-red-100/50 p-1.5 rounded-lg group-hover/btn:bg-red-100 transition-colors"><LogOut size={16} /></div> 
                      लॉगआउट
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:flex items-center gap-2 h-11 bg-black/10 hover:bg-black/20 border border-white/5 px-5 rounded-xl font-bold transition-all text-sm backdrop-blur-sm"
              >
                <User size={16} /> <span>लॉगिन</span>
              </button>
            )}

            {/* Lustrous Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 h-11 bg-gradient-to-r from-[#c17232] to-[#d4813d] hover:from-[#a85f22] hover:to-[#c17232] pl-5 pr-4 rounded-xl font-bold text-white transition-all duration-300 shadow-[0_4px_14px_rgba(193,114,50,0.4)] hover:shadow-[0_6px_20px_rgba(193,114,50,0.6)] text-sm border border-white/10 group overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <ShoppingCart size={18} className="relative z-10" />
              <span className="relative z-10 hidden sm:inline tracking-wide">कार्ट</span>
              
              {cartCount > 0 && (
                <span className="relative z-10 bg-white text-[#c17232] text-[12px] font-black min-w-[22px] h-[22px] flex items-center justify-center rounded-full px-1.5 leading-none shadow-sm ml-1">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden h-11 w-11 flex items-center justify-center rounded-xl bg-black/10 hover:bg-black/20 border border-white/5 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-gradient-to-b from-[#3d6b4a] to-[#2a4a33] border-t border-white/10 ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-3.5 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all text-base font-semibold flex items-center gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#e8955a] opacity-50" />
                {link.label}
              </Link>
            ))}
            
            <div className="h-px bg-white/10 my-2" />
            
            {isLoggedIn && user ? (
              <div className="bg-black/10 rounded-2xl p-2 border border-white/5">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-white/50 text-[11px] font-bold uppercase tracking-wider mb-1">लॉगिन किया हुआ</p>
                  <p className="text-white font-bold text-sm truncate">{user.name}</p>
                </div>
                <div className="p-1 space-y-1 mt-1">
                  <Link href="/profile" className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all text-sm font-medium flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                    <User size={16} className="text-[#e8955a]" /> प्रोफाइल
                  </Link>
                  <Link href="/orders" className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all text-sm font-medium flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                    <Package size={16} className="text-[#e8955a]" /> मेरे ऑर्डर
                  </Link>
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all text-sm font-bold flex items-center gap-3 text-left"
                  >
                    <LogOut size={16} /> लॉगआउट
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c17232] to-[#a85f22] text-white px-5 py-4 rounded-xl font-bold text-base shadow-lg mt-2 border border-white/10"
              >
                <User size={18} /> सुरक्षित लॉगिन / साइन अप
              </button>
            )}
          </div>
        </div>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <LoginSignupModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}