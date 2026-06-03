import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Amit Sharma | Premium Portfolio",
  description: "One of the best personal portfolios in India. Discover my achievements, courses, and projects.",
  openGraph: {
    title: "Amit Sharma | Premium Portfolio",
    description: "One of the best personal portfolios in India. Discover my achievements, courses, and projects.",
    url: "https://amitsharma.in",
    siteName: "Amit Sharma Portfolio",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
