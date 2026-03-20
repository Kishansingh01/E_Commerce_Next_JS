'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  image?: string;
}

interface Order {
  _id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { isLoggedIn, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  if (!isLoggedIn) {
    return redirect('/');
  }

  // Fetch orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.id) {
          setError('User ID not found');
          setIsLoading(false);
          return;
        }

        const res = await fetch(`/api/orders?userId=${user.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  return (
    <>
      <Header />
      <main className="container-main py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">📦 मेरे ऑर्डर</h1>

          {isLoading ? (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <p className="text-xl text-gray-600">ऑर्डर लोड हो रहे हैं...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 rounded-lg p-12 text-center border border-red-200">
              <p className="text-xl text-red-600 mb-6">❌ {error}</p>
              <Link
                href="/shop"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                खरीदारी जारी रखें
              </Link>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <p className="text-xl text-gray-600 mb-6">अभी तक कोई ऑर्डर नहीं है।</p>
              <Link
                href="/shop"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                🛒 खरीदारी जारी रखें
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">ऑर्डर आईडी</label>
                      <p className="text-lg font-bold">{order._id.substring(0, 8)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">कुल मूल्य</label>
                      <p className="text-lg font-bold">₹{order.total.toFixed(0)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">तारीख</label>
                      <p className="text-lg">{new Date(order.createdAt).toLocaleDateString('hi-IN')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">स्थिति</label>
                      <p className="text-lg font-medium text-green-600 capitalize">{order.status}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-700 mb-3">आइटम:</h3>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-600 flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/shop"
              className="text-blue-600 hover:underline font-medium"
            >
              ← वापस खरीदारी करें
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
