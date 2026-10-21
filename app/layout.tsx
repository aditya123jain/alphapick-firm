import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealController from "@/components/Reveal";
import { SITE } from "@/lib/site";

// next/font downloads these at build time and serves them from /_next/static (self-hosted, no Google requests at runtime).
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Alphapick | Proprietary trading firm", template: "%s | Alphapick" },
  description: SITE.description,
  applicationName: "Alphapick",
  openGraph: {
    type: "website", url: SITE.url, siteName: "Alphapick",
    title: "Alphapick | Proprietary trading firm",
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Alphapick, proprietary trading firm" }],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "Alphapick | Proprietary trading firm", description: SITE.description, images: ["/og.png"] },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#16181c", colorScheme: "dark", width: "device-width", initialScale: 1 };

const orgLd = {
  "@context": "https://schema.org", "@type": "Organization", name: "Alphapick", url: SITE.url,
  logo: `${SITE.url}/brand/logo-mark.svg`, email: SITE.emailGeneral,
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only z-[60] rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4">Skip to content</a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
        <Footer />
        <RevealController />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
