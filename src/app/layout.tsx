import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Renesh Rajendran | Graphic Designer",
  description: "Renesh Rajendra's portfolio | Graphic Designer based in Bengaluru, India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${bricolageGrotesque.variable} antialiased`}
      >
        {children}
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
