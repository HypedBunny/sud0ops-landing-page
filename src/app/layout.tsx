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
  metadataBase: new URL("https://sud0ops.com"),
  title: "Sud0Ops | Take Control of Your Technology",
  description: "Sud0ops helps growing teams discover, build, adopt, and support the technology that fits them. We don't just advise, we build alongside you.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Sud0ops", url: "/" },
};

// Structured data so search engines and AI summaries can identify the business and its founder.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Sud0ops",
  url: "https://sud0ops.com",
  email: "alex@sud0ops.com",
  description: "Technology consultancy that helps small businesses, growing teams and NPOs pick, build, adopt and support the technology that fits them.",
  address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
  areaServed: ["ZA", "GB"],
  founder: { "@type": "Person", name: "Alex-Jay Beukes", url: "https://sud0ops.com/about-founder" },
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers";
import { DottedSurface } from "@/components/ui/dotted-surface";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${digitalClockFont.variable} font-sans antialiased selection:bg-brand-blue/30 selection:text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>
          <DottedSurface />
          <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden text-slate-50">
            {/* Full-page grid background */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
            <Navbar />
            <main className="flex-1 w-full pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-YFDD5L827E"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YFDD5L827E');
            `,
          }}
        />
      </body>
    </html>
  );
}
