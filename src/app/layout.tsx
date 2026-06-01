// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import LenisProvider from "../components/providers/lenis-provider";
import IntroProvider from "../components/providers/IntroProvider";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import TransitionProvider from "../components/transitions/TransitionProvider";

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
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-white text-black dark:bg-black dark:text-white">
        <LenisProvider>
          <IntroProvider>
            <TransitionProvider>
              <Header />

              {children}

              <Footer />  
            </TransitionProvider>
          </IntroProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
