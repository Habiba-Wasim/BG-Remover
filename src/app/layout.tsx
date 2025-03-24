// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import Header from "@/components/Header"
// import Footer from "@/components/Footer"
// import { Toaster } from "react-hot-toast"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "BG Remover Pro - Professional Background Removal Tool",
//   description: "Remove image backgrounds automatically with our professional online tool.",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="flex flex-col min-h-screen">
//           <Header />
//           <main className="flex-grow">{children}</main>
//           <Footer />
//           <Toaster position="bottom-right" />
//         </div>
//       </body>
//     </html>
//   )
// }








import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BG Remover Pro",
  description: "Remove image backgrounds automatically with our professional online tool.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
