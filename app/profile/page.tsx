'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return redirect('/');
  }

  return (
    <>
      <Header />
      <main className="container-main py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-8">👤 मेरी प्रोफाइल</h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-600">नाम</label>
                <p className="text-2xl font-bold text-gray-900">{user?.name}</p>
              </div>

              {user?.email && (
                <div>
                  <label className="text-sm font-medium text-gray-600">ईमेल</label>
                  <p className="text-lg text-gray-800">{user.email}</p>
                </div>
              )}

              {user?.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-600">फोन नंबर</label>
                  <p className="text-lg text-gray-800">{user.phone}</p>
                </div>
              )}

              <div className="pt-4 border-t">
                <Link
                  href="/orders"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  📦 मेरे ऑर्डर देखें
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <h3 className="text-lg font-bold text-red-800 mb-4">खतरे वाली क्षेत्र</h3>
            <button
              onClick={() => {
                logout();
                redirect('/');
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-medium"
            >
              🚪 लॉगआउट
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
