'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Package, Search, Loader2, IndianRupee, Clock, TrendingUp, User, MapPin, ChevronDown, Mail, Phone, AlertCircle } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  _id: string;
}

interface OrderData {
  _id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function AdminOrdersPage() {
  const { isLoggedIn, user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch orders if they are actually the admin
    if (!authLoading && isLoggedIn && user?.email === 'admin@bharatintudyog.com') {
      fetchOrders();
    }
  }, [authLoading, isLoggedIn, user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
      }
    } catch (err) {
      console.error('Failed to load admin orders', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      
      if (res.ok) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (error) {
      console.error('Failed to update status', error);
      alert('स्थिति अपडेट करने में विफल रहा।');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 ring-amber-500';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 ring-blue-500';
      case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 ring-purple-500';
      case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 ring-emerald-500';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 ring-red-500';
      default: return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 ring-gray-500';
    }
  };

  // Calculate Stats
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  if (authLoading) return null;

  if (!isLoggedIn || user?.email !== 'admin@bharatintudyog.com') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 -mt-20">
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-red-900/5 border border-red-100 max-w-md w-full text-center relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-10 -mt-10"></div>
             
             <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 border border-red-100 shadow-inner">
               <AlertCircle size={40} />
             </div>
             
             <h1 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">प्रवेश निषेध<br/><span className="text-lg text-gray-500 font-medium">(Access Denied)</span></h1>
             <p className="text-gray-600 mb-8 font-medium leading-relaxed relative z-10">
               यह एक सुरक्षित एडमिन डैशबोर्ड है। इसे देखने के लिए आपको व्यवस्थापक (Admin) के रूप में प्रमाणित होना होगा।
             </p>
             
             <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-left mb-8 shadow-inner relative z-10">
               <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">सुझाई गई लॉगिन जानकारी</p>
               <div className="space-y-3">
                 <div className="flex flex-col gap-1.5">
                   <span className="font-medium text-gray-500 text-sm">ईमेल (Email):</span>
                   <span className="font-mono font-bold text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200">admin@bharatintudyog.com</span>
                 </div>
                 <div className="flex flex-col gap-1.5">
                   <span className="font-medium text-gray-500 text-sm">पासवर्ड (Password):</span>
                   <span className="font-mono font-bold text-gray-900 bg-white px-3 py-1.5 rounded-lg border border-gray-200">admin123</span>
                 </div>
               </div>
             </div>

             <button 
                onClick={() => router.push('/')}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 relative z-10"
             >
                होम पेज पर लौटें और लॉगिन करें
             </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
      <Header />
      
      {/* Top Banner Area */}
      <div className="mt-8 bg-gradient-to-br from-[#335940] to-[#4a7c59] text-white pt-14 pb-32 relative overflow-hidden rounded-t-3xl sm:rounded-none">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl mix-blend-overlay"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-emerald-300 blur-3xl mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-4 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              लाइव डैशबोर्ड
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">ऑर्डर प्रबंधन</h1>
            <p className="text-emerald-50 text-lg max-w-xl font-light">अपने व्यवसाय के आंकड़े देखें और ग्राहकों के ऑर्डर प्रबंधित करें।</p>
          </div>
        </div>
      </div>

      <main className="flex-1 -mt-20 max-w-7xl w-full mx-auto px-4 sm:px-6 pb-20 relative z-20">
        
        {/* Quick Stats Row */}
        {!loading && orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 mt-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex justify-center items-center">
                <IndianRupee size={24} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">कुल कमाई</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex justify-center items-center">
                <TrendingUp size={24} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">कुल ऑर्डर</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight">{totalOrders}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex justify-center items-center">
                <Clock size={24} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">लंबित ऑर्डर</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight">{pendingOrders}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        {loading ? (
           <div className="bg-white rounded-2xl p-24 mt-8 flex flex-col items-center justify-center shadow-sm border border-gray-100">
             <Loader2 size={40} className="animate-spin text-[#4a7c59] mb-4" />
             <p className="text-gray-500 font-medium">डेटा लोड हो रहा है...</p>
           </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 mt-8 text-center shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-20 h-20 mb-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
              <Package size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">कोई ऑर्डर नहीं मिला</h2>
            <p className="text-gray-500 max-w-sm">अभी तक वेबसाइट पर कोई ऑर्डर नहीं आया है। जब ग्राहक खरीदारी करेंगे तो वे यहां दिखाई देंगे।</p>
          </div>
        ) : (
          <div className="space-y-8">
            
            <div className="flex items-center justify-between mb-6 mt-4 px-1">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                हाल के ऑर्डर
              </h2>
            </div>

            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col">
                
                {/* Top Bar of Card */}
                <div className="bg-gray-50/50 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 gap-5">
                  <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">ऑर्डर आईडी</p>
                      <p className="font-mono text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded border border-gray-200">
                        #{order._id.slice(-6).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">दिनांक</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString('hi-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">कुल राशि</p>
                      <p className="text-base font-black text-gray-900">₹{order.total?.toLocaleString() || 0}</p>
                    </div>
                  </div>
                  
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-3 mt-3 sm:mt-0">
                    {updatingId === order._id && <Loader2 size={16} className="animate-spin text-gray-400" />}
                    <div className="relative inline-flex">
                      <select 
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                        className={`appearance-none focus:outline-none focus:ring-2 focus:ring-offset-1 text-sm font-bold pl-4 pr-10 py-2.5 rounded-full transition-all cursor-pointer border ${getStatusStyle(order.status)}`}
                      >
                        <option value="pending">लंबित (Pending)</option>
                        <option value="processing">प्रक्रिया में (Processing)</option>
                        <option value="shipped">भेज दिया गया (Shipped)</option>
                        <option value="delivered">पहुंच गया (Delivered)</option>
                        <option value="cancelled">रद्द (Cancelled)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-current opacity-60">
                        <ChevronDown size={14} strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-0 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  
                  {/* Customer Info Column */}
                  <div className="p-6 md:p-8 md:w-2/5 lg:w-1/3 bg-white">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">ग्राहक विवरण</h3>
                    
                    {/* Increased spacing to space-y-5 for breathing room */}
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="text-gray-400 mt-0.5"><User size={20} /></div>
                        <div>
                          <p className="text-base font-bold text-gray-900">{order.personalInfo?.firstName} {order.personalInfo?.lastName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="text-gray-400 mt-0.5"><Mail size={20} /></div>
                        <div>
                          <a href={`mailto:${order.personalInfo?.email}`} className="text-sm text-gray-600 hover:text-[#4a7c59] transition-colors break-all">{order.personalInfo?.email}</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="text-gray-400 mt-0.5"><Phone size={20} /></div>
                        <div>
                          <a href={`tel:${order.personalInfo?.phone}`} className="text-sm font-medium text-gray-600 hover:text-[#4a7c59] transition-colors">{order.personalInfo?.phone}</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 pt-1">
                        <div className="text-gray-400 mt-0.5"><MapPin size={20} /></div>
                        <div className="text-sm text-gray-600 leading-relaxed">
                          <p className="font-medium text-gray-800 mb-1">{order.shippingAddress?.address}</p>
                          <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                          <p className="text-gray-500 font-mono text-xs mt-1.5">{order.shippingAddress?.zip}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Items Column */}
                  <div className="p-6 md:p-8 md:w-3/5 lg:w-2/3 bg-gray-50/30">
                     <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">
                       आइटम ({order.items?.length || 0})
                     </h3>
                     {/* Increased gap between item cards */}
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {order.items?.map(item => (
                          <div key={item._id} className="flex justify-between items-center bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#4a7c59]/30 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 shrink-0">
                                <span className="text-2xl leading-none">🧱</span>
                              </div>
                              <div className="min-w-0 pr-2">
                                <p className="text-base font-bold text-gray-900 truncate mb-1">{item.name}</p>
                                <p className="text-sm text-gray-500 font-medium">मात्रा: <span className="text-gray-900 font-bold">{item.quantity}</span></p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-lg font-black text-gray-900 mb-1">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-400">₹{item.price}/ea</p>
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Email: admin@bharatintudyog.com
// Password: admin123