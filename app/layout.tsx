import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Learn Mahjong - 麻雀學習",
  description: "Learn Mahjong tiles in Cantonese - A Mahjong learning app",
  keywords: [
    "mahjong",
    "cantonese",
    "learning",
    "tiles",
    "chinese",
    "duolingo",
  ],
  authors: [{ name: "Ryan Wong" }],
  creator: "Ryan Wong",
  openGraph: {
    title: "Learn Mahjong - 麻雀學習",
    description: "Learn Mahjong tiles in Cantonese",
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_HK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Mahjong - 麻雀學習",
    description: "Learn Mahjong tiles in Cantonese",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#10b981", //
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
