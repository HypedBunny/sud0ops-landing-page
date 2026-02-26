import type { Metadata } from "next";
import { Inter, Space_Grotesk, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const digitalClockFont = Share_Tech_Mono({
  weight: "400",
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sud0Ops | Cloud, DevOps & AI Modernization",
  description: "Strategic modernization partner helping growing businesses scale through DevOps automation, AI integration, and cloud-native practices.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${digitalClockFont.variable} font-sans antialiased selection:bg-brand-blue/30 selection:text-white`}
      >
        <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden text-slate-50">
          <Navbar />
          <main className="flex-1 w-full pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
