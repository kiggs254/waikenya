import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://waikenyachapter.com"),
  title: "Women in Aviation International - Kenya Chapter",
  description: "Advancing and encouraging women in all aviation career fields and interests in Kenya. Join our community of pilots, engineers, and aviation enthusiasts.",
  keywords: "Women in Aviation, Kenya, Aviation Careers, Pilots, Aerospace, STEM, Mentorship",
  openGraph: {
    title: "WAI Kenya Chapter",
    description: "Empowering women in the aviation industry in Kenya through education, mentorship, and scholarships.",
    url: "https://waikenyachapter.com",
    siteName: "WAI Kenya",
    images: [
      {
        url: "/images/wai_group.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
