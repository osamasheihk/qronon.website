import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://qronon.ai"),
  title: {
    default: "Quantum-Enhanced Weather Forecasting | Qronon",
    template: "%s | Qronon"
  },
  description:
    "Qronon builds quantum-enhanced forecasting engines for extreme weather, energy volatility and climate-risk decisions.",
  icons: {
    icon: "/qronon_favicon.png"
  },
  openGraph: {
    title: "Qronon",
    description:
      "A quantum-enhanced forecast-engine layer for organisations exposed to extreme weather and climate risk.",
    url: "https://qronon.ai",
    siteName: "Qronon",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Qronon",
    url: "https://qronon.ai",
    logo: "https://qronon.ai/qronon-transparent.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "pilot enquiries",
        email: "pilots@qronon.ai"
      },
      {
        "@type": "ContactPoint",
        contactType: "investor relations",
        email: "investors@qronon.ai"
      }
    ]
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
