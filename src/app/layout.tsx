// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "../components/providers/lenis-provider";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingContactForm from "../components/common/FloatingContactForm";
import ScrollToTop from "../components/common/ScrollToTop";
import { LoaderProvider } from "../components/providers/LoaderProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Outright Creators",
  description: "Creative Digital Agency",
  icons: {
    icon: "/lamp.png",
    shortcut: "/lamp.png",
    apple: "/lamp.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full max-w-full flex-col overflow-x-hidden text-black dark:text-white">
        <LoaderProvider>
          <LenisProvider>
            <ScrollToTop />
            <Header />
            {children}
            <Footer />
            <FloatingContactForm />
          </LenisProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
