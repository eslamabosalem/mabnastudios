"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ كود الجافاسكربت اللي بيشتغل قبل الـ React render
const initialScript = `
  (function () {
    try {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (saved === null && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* ✅ هذا السكربت بيشتغل قبل ما React ترندر، وبالتالي كلاس dark بيتحط بدري */}
        <script dangerouslySetInnerHTML={{ __html: initialScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
