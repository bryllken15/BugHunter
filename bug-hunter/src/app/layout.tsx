import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bug Hunter - Learn to Code by Hunting Bugs",
  description: "A gamified coding education platform inspired by Duolingo for learning HTML, CSS, and JavaScript through interactive bug-hunting challenges.",
  keywords: ["coding", "education", "HTML", "CSS", "JavaScript", "learning", "programming"],
  authors: [{ name: "Bug Hunter Team" }],
  viewport: "width=device-width, initial-scale=1",
  manifest: "/manifest.json",
  themeColor: "#2563EB",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bug Hunter",
  },
  icons: {
    icon: "/Iconlogo.png",
    apple: "/Iconlogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
