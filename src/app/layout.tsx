import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProvider from "@/components/ScrollProvider";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Noise from "@/components/Noise";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amitsharmadev.vercel.app"),
  title: {
    default: "Amit Sharma | Software Engineer & AI/ML Developer",
    template: "%s | Amit Sharma",
  },
  description:
    "Official portfolio of Amit Sharma — Computer Science Engineering student at Nagaland University (8.62 CGPA), former AI/ML Intern at TIH IIT Guwahati, Full Stack Web Developer, and Founder & Developer of Bounce Back Academy.",
  keywords: [
    "Amit",
    "Amit Sharma",
    "Amit Sharma portfolio",
    "Amit Sharma developer",
    "Amit Sharma AI & Web Developer",
    "Amit Sharma Web Developer",
    "Amit Sharma AI Developer",
    "Amit Sharma Software Engineer",
    "Amit Sharma Nagaland University",
    "Amit Sharma IIT Guwahati",
    "Amit Sharma Bounce Back Academy",
    "Founder Bounce Back Academy",
    "Computer Science Engineer Amit Sharma",
    "Full Stack Developer Amit",
    "AI/ML Engineer India Amit",
    "Amit Sharma Chegg SME",
    "Amit292004",
    "Amit Sharma GitHub",
    "Amit Sharma LinkedIn",
    "Amit Sharma projects",
    "Amit Sharma resume"
  ],
  authors: [{ name: "Amit Sharma", url: "https://amitsharmadev.vercel.app" }],
  creator: "Amit Sharma",
  publisher: "Amit Sharma",
  alternates: {
    canonical: "https://amitsharmadev.vercel.app",
  },
  openGraph: {
    title: "Amit Sharma | Software Engineer & AI/ML Developer",
    description:
      "Personal portfolio and engineering work of Amit Sharma — CS undergraduate, AI/ML Intern at IIT Guwahati, and Full Stack Developer.",
    url: "https://amitsharmadev.vercel.app",
    siteName: "Amit Sharma Portfolio",
    locale: "en_IN",
    type: "profile",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 1200,
        alt: "Amit Sharma - Software Engineer & AI/ML Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Sharma | Software Engineer & AI/ML Developer",
    description:
      "Official portfolio of Amit Sharma — Full Stack Web Developer & AI/ML engineer.",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google81b24f821c3a739d",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://amitsharmadev.vercel.app/#person",
        "name": "Amit Sharma",
        "givenName": "Amit",
        "familyName": "Sharma",
        "alternateName": [
          "Amit",
          "Amit Sharma Developer",
          "Amit Sharma Portfolio",
          "Amit Sharma AI Engineer",
          "Amit Sharma Full Stack Developer",
          "Amit Sharma Nagaland University",
          "Amit Sharma IIT Guwahati",
          "Amit Sharma Bounce Back Academy",
          "Amit292004"
        ],
        "url": "https://amitsharmadev.vercel.app",
        "image": {
          "@type": "ImageObject",
          "@id": "https://amitsharmadev.vercel.app/#image",
          "url": "https://amitsharmadev.vercel.app/profile.png",
          "caption": "Amit Sharma - Software Engineer & AI/ML Developer"
        },
        "jobTitle": "Software Engineer & AI/ML Developer",
        "description":
          "Computer Science Engineering student at Nagaland University (8.62 CGPA), former AI/ML Intern at Technology Innovation Hub, IIT Guwahati, Full Stack Developer, and Founder & Developer of Bounce Back Academy.",
        "email": "mailto:amitsharma72020@gmail.com",
        "telephone": "+917628024274",
        "gender": "https://schema.org/Male",
        "nationality": {
          "@type": "Country",
          "name": "India"
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "Nagaland University",
            "url": "https://nagalanduniversity.ac.in"
          },
          {
            "@type": "EducationalOrganization",
            "name": "Technology Innovation Hub, IIT Guwahati",
            "url": "https://www.iitg.ac.in"
          }
        ],
        "worksFor": [
          {
            "@type": "Organization",
            "name": "Bounce Back Academy",
            "url": "https://amitsharmadev.vercel.app"
          }
        ],
        "sameAs": [
          "https://github.com/Amit292004",
          "https://www.linkedin.com/in/amit-sharma-142a26359/",
          "https://www.instagram.com/am____it_292004/",
          "https://amitsharmadev.vercel.app"
        ],
        "knowsAbout": [
          "Full Stack Web Development",
          "Artificial Intelligence & Machine Learning",
          "Computer Science Engineering",
          "Next.js",
          "React",
          "TypeScript",
          "Python",
          "PyTorch",
          "Java Programming",
          "Data Structures & Algorithms",
          "Cyber Security"
        ],
        "award": [
          "Winner - Death Race Competition at Techaura 2025",
          "2nd Position - Circutrix Techaura 2025"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://amitsharmadev.vercel.app/#website",
        "url": "https://amitsharmadev.vercel.app",
        "name": "Amit Sharma | Software Engineer & AI/ML Developer",
        "alternateName": [
          "Amit",
          "Amit Sharma",
          "Amit Sharma Portfolio",
          "Amit Developer Portfolio",
          "Amit AI & Web Developer"
        ],
        "publisher": {
          "@id": "https://amitsharmadev.vercel.app/#person"
        },
        "inLanguage": "en-IN"
      },
      {
        "@type": "ProfilePage",
        "@id": "https://amitsharmadev.vercel.app/#profilepage",
        "url": "https://amitsharmadev.vercel.app",
        "name": "Amit Sharma Profile & Portfolio",
        "mainEntity": {
          "@id": "https://amitsharmadev.vercel.app/#person"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://amitsharmadev.vercel.app/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Who is Amit Sharma?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Amit Sharma is a Software Engineer, AI/ML Developer, and Computer Science undergraduate at Nagaland University (8.62 CGPA). He is a former AI/ML Intern at TIH IIT Guwahati, former Chegg Subject Matter Expert, and the Founder & Developer of Bounce Back Academy."
            }
          },
          {
            "@type": "Question",
            "name": "What are Amit Sharma's key technical skills and specializations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Amit Sharma specializes in Full Stack Web Development (Next.js, React 19, TypeScript, Tailwind CSS, PostgreSQL, Prisma), Applied Machine Learning & AI (Python, PyTorch, Scikit-Learn), Java Programming, and Data Structures & Algorithms with C++."
            }
          },
          {
            "@type": "Question",
            "name": "What notable projects has Amit Sharma built?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Amit Sharma built Bounce Back Academy (an EdTech platform for courses and academic tracking), applied computer vision and AI projects at IIT Guwahati, and numerous full-stack web applications."
            }
          },
          {
            "@type": "Question",
            "name": "How can I contact Amit Sharma?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Amit Sharma can be reached via email at amitsharma72020@gmail.com, phone at +91 76280 24274, or through his GitHub profile (https://github.com/Amit292004) and LinkedIn."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} ${bricolageGrotesque.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-[#f5f5f7] selection:bg-[#2997ff]/25 selection:text-white`}>
        <Noise />
        <ScrollProvider>
          <ScrollProgressBar />
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
