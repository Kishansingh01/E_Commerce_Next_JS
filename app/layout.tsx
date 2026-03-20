import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import WhatsAppButton from "@/components/WhatsAppButton";

import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "भारत इंट उद्योग - प्रीमियम ईंट निर्माण",
  description: "भारत इंट उद्योग से उच्च गुणवत्ता की ईंटें खरीदें। प्रथम श्रेणी, द्वितीय श्रेणी, तृतीय श्रेणी और चतुर्थ श्रेणी की ईंटें।",
  keywords: "ईंट, ईंट निर्माण, भारत इंट उद्योग, निर्माण सामग्री",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
            <WhatsAppButton />
            <Toaster position="top-center" richColors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
