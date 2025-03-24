import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";  

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BG Remover Pro",
  description: "Remove image backgrounds automatically with our professional online tool.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ✅ Header Show Hoga */}
        <Header />

        <main className="min-h-screen">{children}</main>

        {/* ✅ Footer Show Hoga */}
        <Footer />
      </body>
    </html>
  );
}

