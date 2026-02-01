import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/src/widgets/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://movie-atlas.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Movie Atlas — Discover Films",
    template: "%s — Movie Atlas",
  },
  description:
    "Discover trending movies, explore by genre, and find your next favorite film.",
  keywords: ["movies", "films", "trending", "discover", "genres", "movie database"],
  authors: [{ name: "Movie Atlas" }],
  openGraph: {
    title: "Movie Atlas — Discover Films",
    description:
      "Discover trending movies, explore by genre, and find your next favorite film.",
    siteName: "Movie Atlas",
    locale: "en_US",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movie Atlas — Discover Films",
    description:
      "Discover trending movies, explore by genre, and find your next favorite film.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-950`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
