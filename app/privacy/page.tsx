'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="bg-warm-cream">
        <section className="bg-gradient-to-r from-sage-green to-sage-green/90 text-warm-cream py-16">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold">
              Privacy Policy
            </h1>
          </div>
        </section>

        <div className="container-main py-16 max-w-3xl">
          <div className="prose prose-sm">
            <div className="space-y-6 text-dark-charcoal">
              <div>
                <h2 className="text-2xl font-poppins font-bold mb-3">Last Updated: March 2024</h2>
                <p className="opacity-75">
                  At SkinCake, we respect your privacy and are committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, and protect your information.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">Information We Collect</h3>
                <p>
                  We collect information you provide directly (name, email, address) and automatically 
                  (browser data, cookies, IP address) when you visit our website or make purchases.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">How We Use Your Information</h3>
                <p>
                  We use your information to process orders, send newsletters, improve our services, 
                  and comply with legal obligations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">Data Security</h3>
                <p>
                  We implement industry-standard security measures to protect your personal data. 
                  However, no method of transmission over the internet is entirely secure.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">Your Rights</h3>
                <p>
                  You have the right to access, correct, or delete your personal information. 
                  Contact us at privacy@skincake.com to exercise these rights.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-poppins font-bold mb-2">Contact Us</h3>
                <p>
                  If you have questions about this privacy policy, please contact us at:<br />
                  Email: privacy@skincake.com<br />
                  Address: 123 Beauty Street, Skincare City, SC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
