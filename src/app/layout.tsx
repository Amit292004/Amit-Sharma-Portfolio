import type { Metadata } from "next";
import "./globals.css";
import ScrollProvider from "@/components/ScrollProvider";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Noise from "@/components/Noise";

export const metadata: Metadata = {
  title: "Amit Sharma | AI & Web Developer",
  description: "Explore the personal portfolio of Amit Sharma, an AI & Web Developer specializing in Full Stack Development, Machine Learning, and Software Engineering. Winner of the Death Race Competition at Techaura 2025.",
  keywords: [
    "Amit Sharma",
    "Amit Sharma portfolio",
    "Amit Sharma AI & Web Developer",
    "Amit Sharma Web Developer",
    "Amit Sharma AI Developer",
    "Computer Science Engineer Amit Sharma",
    "Amit Sharma Techaura",
    "Amit Sharma Death Race Winner",
    "Full Stack Developer",
    "AI/ML Engineer India"
  ],
  authors: [{ name: "Amit Sharma" }],
  creator: "Amit Sharma",
  openGraph: {
    title: "Amit Sharma | AI & Web Developer",
    description: "Personal portfolio of Amit Sharma, a Computer Science Engineering student, AI & Web Developer, and problem solver. Discover projects, achievements, and courses.",
    url: "https://amitsharma.in",
    siteName: "Amit Sharma Portfolio",
    locale: "en_IN",
    type: "profile",
    images: [
      {
        url: "https://amitsharma-portfolio-v2.vercel.app/profile.jpg",
        width: 1200,
        height: 1200,
        alt: "Amit Sharma - AI & Web Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Sharma | AI & Web Developer",
    description: "Personal portfolio of Amit Sharma, a Computer Science Engineering student, AI & Web Developer, and problem solver.",
    images: ["https://amitsharma-portfolio-v2.vercel.app/profile.jpg"],
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=JetBrains+Mono:wght@400..700&family=Plus+Jakarta+Sans:wght@400..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Amit Sharma",
              "url": "https://amitsharma-portfolio-v2.vercel.app",
              "jobTitle": "AI & Web Developer",
              "description": "Computer Science Engineering Student, Full Stack Developer, and AI/ML Enthusiast. Winner of the Death Race Competition at Techaura 2025.",
              "image": {
                "@type": "ImageObject",
                "url": "https://amitsharma-portfolio-v2.vercel.app/profile.jpg",
                "width": 1200,
                "height": 1200,
                "caption": "Amit Sharma - AI & Web Developer"
              },
              "sameAs": [
                "https://amitsharma-portfolio-v2.vercel.app",
                "https://github.com/Amit292004",
                "https://www.linkedin.com/in/amit-sharma-142a26359/",
                "https://www.instagram.com/am____it_292004/"
              ],
              "knowsAbout": [
                "Full Stack Web Development",
                "Artificial Intelligence & Machine Learning",
                "Computer Science Engineering",
                "Data Science & Generative AI",
                "Java Programming",
                "Cyber Security"
              ],
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Nagaland University"
                }
              ],
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "Technology Innovation Hub, IIT Guwahati"
                }
              ],
              "award": [
                "1st Place in Death Race coding competition at Techaura 2025",
                "2nd Position in Circutrix competition at Techaura 2025"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased bg-black text-[#f5f5f7] selection:bg-[#2997ff]/25 selection:text-white">
        <Noise />
        <ScrollProvider>
          <ScrollProgressBar />
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
