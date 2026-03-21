import { Metadata } from "next";
import "../app/globals.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import DraggableButton from "@/components/ui/DraggableButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.konyat.chat"),
  title: {
    default: "Konyat",
    template: "%s | Konyat",
  },
  description: "Konyat.chat — a fast modern chat app. Sign up and start chatting today.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Konyat",
              url: "https://www.konyat.chat",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Konyat",
              operatingSystem: "Web",
              applicationCategory: "SocialNetworkingApplication",
              url: "https://www.konyat.chat",
              description:
                "A community chat app for Myanmar people in Thailand to connect and discover businesses.",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <Toaster richColors position="top-right" />
        <DraggableButton />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
