import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "SkinCake Beauty - Organic Skincare at Budget Prices",
  description: "Discover premium organic skincare products at affordable prices. 100% natural, cruelty-free skincare for healthy, glowing skin.",
  keywords: "organic skincare, beauty products, affordable skincare, cruelty-free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
