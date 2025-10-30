import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PompeurPro - L'app intelligente pour compter tes pompes avec l'IA",
  description:
    "Transforme ton smartphone en coach personnel ! PompeurPro utilise l'IA pour compter automatiquement tes pompes. Suis ta progression, rejoins des challenges et atteins tes objectifs. Essai gratuit 7 jours.",
  keywords: [
    "pompes",
    "fitness",
    "musculation",
    "IA",
    "compteur pompes",
    "entraînement",
    "sport",
    "application fitness",
    "push-ups",
    "workout",
  ],
  authors: [{ name: "PompeurPro Team" }],
  creator: "PompeurPro",
  publisher: "PompeurPro",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://pumppro-backend.onrender.com",
    title: "PompeurPro - Compte tes pompes automatiquement avec l'IA",
    description:
      "L'application intelligente qui compte automatiquement tes pompes grâce à l'IA. Rejoins +10 000 athlètes !",
    siteName: "PompeurPro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PompeurPro - Application de comptage de pompes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PompeurPro - Compte tes pompes automatiquement avec l'IA",
    description:
      "Transforme ton smartphone en coach personnel. Essai gratuit 7 jours !",
    images: ["/og-image.png"],
    creator: "@pompeurpro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "votre-code-google-search-console",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* Vercel tools */}
        <SpeedInsights />
        <Analytics />

        {/* JSON-LD pour SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "PompeurPro",
              operatingSystem: "iOS, Android",
              applicationCategory: "FitnessApplication",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "10000",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
              url: "https://pumppro-backend.onrender.com",
            }),
          }}
        />
      </body>
    </html>
  );
}
