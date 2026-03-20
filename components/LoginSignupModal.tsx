// 'use client';

// import React, { useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { X, Mail, Phone, Eye, EyeOff } from 'lucide-react';

// interface LoginSignupModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ isOpen, onClose }) => {
//   const [mode, setMode] = useState<'login' | 'signup' | 'phone'>('login');
//   const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  
//   // Email auth state
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
  
//   // Signup state
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  
//   // Phone OTP state
//   const [phoneForOtp, setPhoneForOtp] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
  
//   const { login, loginWithPhone, signup } = useAuth();

//   if (!isOpen) return null;

//   const handleEmailLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     try {
//       await login(email, password);
//       setSuccess('लॉगिन सफल! 🎉');
//       setTimeout(onClose, 1500);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'लॉगिन विफल');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (password !== confirmPassword) {
//       setError('पासवर्ड मेल नहीं खा रहे हैं');
//       return;
//     }

//     setLoading(true);

//     try {
//       await signup(name, email, phone, password);
//       setSuccess('पंजीकरण सफल! 🎉');
//       setTimeout(onClose, 1500);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'पंजीकरण विफल');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendOtp = async () => {
//     setError('');
//     setOtpLoading(true);

//     try {
//       const response = await fetch('/api/auth/send-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone: phoneForOtp }),
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         setError(data.error || 'OTP भेजना विफल');
//         return;
//       }

//       setOtpSent(true);
//       setSuccess(`OTP${data.phone} को भेजा गया है`);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'OTP भेजना विफल');
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await loginWithPhone(phoneForOtp, otp);
//       setSuccess('लॉगिन सफल! 🎉');
//       setTimeout(onClose, 1500);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'OTP सत्यापन विफल');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white flex justify-between items-center p-6 border-b">
//           <h2 className="text-xl font-bold text-gray-900">
//             {mode === 'login' && 'लॉगिन'}
//             {mode === 'signup' && 'खाता बनाएं'}
//             {mode === 'phone' && 'फोन से लॉगिन करें'}
//           </h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X size={24} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Error and Success Messages */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
//               {success}
//             </div>
//           )}

//           {/* Login Mode */}
//           {mode === 'login' && authMethod === 'email' && (
//             <form onSubmit={handleEmailLogin} className="space-y-4">
//               <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800 mb-4">
//                 <strong>परीक्षण खाते:</strong><br/>
//                 ईमेल: test@example.com<br/>
//                 पासवर्ड: Test@123
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   ईमेल
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="आपका ईमेल दर्ज करें"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   पासवर्ड
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="आपका पासवर्ड दर्ज करें"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2.5 text-gray-500"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
//               >
//                 {loading ? 'लॉगिन जारी है...' : 'लॉगिन करें'}
//               </button>

//               <div className="text-center text-sm text-gray-600">
//                 खाता नहीं है?{' '}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setMode('signup');
//                     setError('');
//                     setSuccess('');
//                   }}
//                   className="text-blue-600 hover:underline font-medium"
//                 >
//                   खाता बनाएं
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Phone Login Mode */}
//           {mode === 'login' && authMethod === 'phone' && (
//             <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
//               {!otpSent ? (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       फोन नंबर
//                     </label>
//                     <div className="flex items-center">
//                       <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-lg">
//                         +91
//                       </span>
//                       <input
//                         type="tel"
//                         value={phoneForOtp.replace(/^\+91/, '')}
//                         onChange={(e) => setPhoneForOtp('+91' + e.target.value.replace(/\D/g, '').slice(0, 10))}
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="10 अंकों का नंबर दर्ज करें"
//                         maxLength={13}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={handleSendOtp}
//                     disabled={otpLoading || phoneForOtp.length < 13}
//                     className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition"
//                   >
//                     {otpLoading ? 'OTP भेज रहे हैं...' : 'OTP भेजें'}
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       OTP दर्ज करें
//                     </label>
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
//                       placeholder="000000"
//                       maxLength={6}
//                       required
//                     />
//                     <p className="text-xs text-gray-500 mt-1">
//                       QpXabc तरीके से आए हुए OTP दर्ज करें
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       setOtpSent(false);
//                       setOtp('');
//                     }}
//                     className="text-blue-600 text-sm hover:underline"
//                   >
//                     नया OTP भेजें
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={loading || otp.length !== 6}
//                     className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
//                   >
//                     {loading ? 'सत्यापित जारी है...' : 'सत्यापित करें'}
//                   </button>
//                 </>
//               )}

//               <div className="text-center text-sm text-gray-600">
//                 खाता नहीं है?{' '}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setMode('signup');
//                     setError('');
//                     setSuccess('');
//                   }}
//                   className="text-blue-600 hover:underline font-medium"
//                 >
//                   खाता बनाएं
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Signup Mode */}
//           {mode === 'signup' && (
//             <form onSubmit={handleSignup} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   नाम
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="आपका नाम दर्ज करें"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   ईमेल
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="आपका ईमेल दर्ज करें"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   फोन नंबर
//                 </label>
//                 <div className="flex items-center">
//                   <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-l-lg">
//                     +91
//                   </span>
//                   <input
//                     type="tel"
//                     value={phone.replace(/^\+91/, '')}
//                     onChange={(e) => setPhone('+91' + e.target.value.replace(/\D/g, '').slice(0, 10))}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="10 अंकों का नंबर दर्ज करें"
//                     maxLength={13}
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   पासवर्ड
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="एक मजबूत पासवर्ड दर्ज करें"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2.5 text-gray-500"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   पासवर्ड की पुष्टि करें
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="पासवर्ड की पुष्टि करें"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2.5 text-gray-500"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
//               >
//                 {loading ? 'खाता बनाई जा रहा है...' : 'खाता बनाएं'}
//               </button>

//               <div className="text-center text-sm text-gray-600">
//                 पहले से खाता है?{' '}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setMode('login');
//                     setAuthMethod('email');
//                     setError('');
//                     setSuccess('');
//                   }}
//                   className="text-blue-600 hover:underline font-medium"
//                 >
//                   लॉगिन करें
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Auth Method Switcher */}
//           {mode === 'login' && (
//             <div className="mt-6 pt-6 border-t">
//               <p className="text-xs text-gray-600 mb-3 text-center">लॉगिन विधि चुनें:</p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => {
//                     setAuthMethod('email');
//                     setError('');
//                     setSuccess('');
//                   }}
//                   className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
//                     authMethod === 'email'
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   <Mail size={16} /> ईमेल
//                 </button>
//                 <button
//                   onClick={() => {
//                     setAuthMethod('phone');
//                     setError('');
//                     setSuccess('');
//                   }}
//                   className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
//                     authMethod === 'phone'
//                       ? 'bg-green-600 text-white'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   <Phone size={16} /> फोन
//                 </button>
//               </div>
//             </div>
//           )}


//         </div>
//       </div>
//     </div>
//   );
// };
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Mail, Phone, Eye, EyeOff, User, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  // Auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Status state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const resetState = () => {
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    setLoading(true);
    try {
      await login(email.trim(), password);
      setSuccess('लॉगिन सफल! 🎉');
      setTimeout(() => {
        onClose();
        setEmail('');
        setPassword('');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'लॉगिन विफल');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();
    if (password !== confirmPassword) {
      setError('पासवर्ड मेल नहीं खा रहे हैं');
      return;
    }
    setLoading(true);
    try {
      await signup(name, email.trim(), phone, password);
      setSuccess('पंजीकरण सफल! 🎉');
      setTimeout(() => {
        onClose();
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'पंजीकरण विफल');
    } finally {
      setLoading(false);
    }
  };

  // Reusable Classes
  const inputWrapper = "flex items-center w-full bg-gray-50/80 border border-gray-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-[#4a7c59]/30 focus-within:border-[#4a7c59] transition-all duration-200 shadow-sm";
  const iconWrapper = "w-12 h-12 flex items-center justify-center text-gray-400 shrink-0";
  const baseInput = "flex-1 py-3.5 px-3 bg-transparent outline-none border-none text-gray-900 placeholder-gray-400 font-medium text-sm sm:text-base";
  const labelCls = "block text-sm font-bold text-gray-700 mb-1.5 pl-1 font-poppins tracking-wide";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#333333]/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-300 border border-white/20 my-auto">
        
        {/* Decorative Top Bar */}
        <div className="h-28 bg-gradient-to-br from-[#335940] to-[#4a7c59] w-full absolute top-0 left-0 overflow-hidden pointer-events-none">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
        </div>

        <button 
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 w-9 h-9 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm z-20"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* Modal Header content */}
        <div className="px-8 pt-8 pb-6 text-center relative z-10 mt-2">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg border border-gray-100">
             🧱
           </div>
           <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-1 tracking-tight">
             {mode === 'login' ? 'वापस स्वागत है!' : 'नया खाता बनाएं'}
           </h2>
           <p className="text-gray-500 font-medium text-sm">
             {mode === 'login' ? 'अपने खाते में सुरक्षित रूप से लॉगिन करें' : 'भारत इंट उद्योग परिवार में शामिल हों'}
           </p>

           {/* Switcher (Login/Signup) */}
           <div className="flex bg-gray-100/80 p-1 rounded-xl mt-6">
             <button 
                type="button"
                onClick={() => { setMode('login'); resetState(); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${mode === 'login' ? 'bg-white text-[#4a7c59] shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-800'}`}
             >
               लॉगिन
             </button>
             <button 
                type="button"
                onClick={() => { setMode('signup'); resetState(); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${mode === 'signup' ? 'bg-white text-[#4a7c59] shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-800'}`}
             >
               साइन अप
             </button>
           </div>
        </div>

        <div className="px-6 sm:px-8 pb-8">
          
          {/* Alerts */}
          {error && (
            <div className="mb-5 bg-red-50 text-red-600 p-3.5 rounded-xl text-sm flex items-start gap-2.5 border border-red-100 animate-in slide-in-from-top-2">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span className="font-medium leading-snug">{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-5 bg-emerald-50 text-emerald-700 p-3.5 rounded-xl text-sm flex items-center gap-2.5 border border-emerald-100 animate-in slide-in-from-top-2">
              <CheckCircle size={18} className="shrink-0" />
              <span className="font-bold">{success}</span>
            </div>
          )}

          {/* ================= LOGIN MODE ================= */}
          {mode === 'login' && (
            <form onSubmit={handleEmailLogin} className="space-y-4 animate-in fade-in duration-300">
              <div>
                <label className={labelCls}>ईमेल</label>
                <div className={inputWrapper}>
                  <div className={iconWrapper}><Mail size={18} /></div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={baseInput}
                    placeholder="example@mail.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-bold text-gray-700 pl-1 font-poppins">पासवर्ड</label>
                </div>
                <div className={inputWrapper}>
                  <div className={iconWrapper}><Lock size={18} /></div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={baseInput}
                    placeholder="••••••••"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors shrink-0"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3a6347] text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#4a7c59]/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 mt-6 text-base"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
                {loading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें'}
              </button>
            </form>
          )}

          {/* ================= SIGNUP MODE ================= */}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelCls}>पूरा नाम</label>
                  <div className={inputWrapper}>
                    <div className={iconWrapper}><User size={18} /></div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={baseInput}
                      placeholder="आपका नाम"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>ईमेल</label>
                  <div className={inputWrapper}>
                    <div className={iconWrapper}><Mail size={18} /></div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={baseInput}
                      placeholder="example@mail.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>फोन नंबर</label>
                  <div className={inputWrapper}>
                    <div className={iconWrapper}><Phone size={18} /></div>
                    <div className="flex items-center shrink-0">
                      <span className="text-gray-500 font-bold pr-3 py-1 border-r border-gray-200">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phone.replace(/^\+91/, '')}
                      onChange={(e) => setPhone('+91' + e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={`${baseInput} pl-3`}
                      placeholder="10 अंकों का नंबर"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>पासवर्ड</label>
                    <div className={inputWrapper}>
                      <div className="pl-4 pr-2 flex items-center justify-center text-gray-400 shrink-0"><Lock size={18} /></div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${baseInput} pl-1`}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>पासवर्ड दोहराएं</label>
                    <div className={inputWrapper}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`${baseInput} pl-4`}
                        placeholder="••••••••"
                        required
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors shrink-0"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3a6347] text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#4a7c59]/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 mt-6 text-base"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
                {loading ? 'खाता बनाया जा रहा है...' : 'खाता बनाएं'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};