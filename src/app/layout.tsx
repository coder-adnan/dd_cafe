import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DD Cafe - Riyadh's Cozy Coffee Destination",
  description: "Experience premium coffee, Spanish Lattes, and Iced Matcha in a warm, cozy environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-foreground bg-background flex flex-col min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
