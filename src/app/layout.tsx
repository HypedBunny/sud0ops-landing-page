import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { pageMetadata } from "@/lib/seo";
import { FOUNDER_ID, FOUNDER_NAME, FOUNDER_PHOTO_URL, FOUNDER_URL, SITE_URL, hasFounderPhoto } from "@/lib/founder";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Headings and the wordmark.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Terminal accents: tags, labels and code. Kept readable for non-technical visitors.
const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sud0ops.com"),
  ...pageMetadata({
    path: "/",
    title: "Sud0ops | Take Control of Your Technology",
    description: "Sud0ops helps growing teams discover, build, adopt, and support the technology that fits them. We don't just advise, we build alongside you.",
  }),
};

// Browser chrome and the phone status bar match the dark slate page.
export const viewport: Viewport = {
  themeColor: "#0F172A",
  colorScheme: "dark",
};

// Structured data so search engines and AI summaries can identify the business and its founder.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Sud0ops",
  url: "https://sud0ops.com",
  email: "alex@sud0ops.com",
  description: "Technology consultancy that helps small businesses, growing teams and NPOs pick, build, adopt and support the technology that fits them.",
  address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
  areaServed: ["ZA", "GB"],
  // Same @id as the Person on /about-founder, so both pages describe one entity.
  founder: {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: FOUNDER_NAME,
    url: FOUNDER_URL,
    ...(hasFounderPhoto && { image: FOUNDER_PHOTO_URL }),
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jakarta.variable} ${monoFont.variable} font-sans antialiased selection:bg-brand-accent selection:text-brand-black`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden text-slate-50">
          {/* Blueprint rails: two vertical guides on the content column's edges. */}
          <div className="blueprint-rails" aria-hidden="true" />
          <Navbar />
          <main className="relative flex-1 w-full pt-20">
            {children}
          </main>
          <Footer />
          <MobileCta />
        </div>
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
