import { Metadata } from "next";
import "../app/globals.css";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

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
  title: {
    default: "Konyat",
    template: "%s | Konyat",
  },
  description: "A community app for chatting and connecting with friends and communities in real time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        <Toaster richColors position="top-right" />
        <DraggableButton />
        {children}
      </body>
    </html>
  );
}
