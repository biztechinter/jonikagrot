import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Jonik Ndovu Farm | Luxury Hospitality & Agro-Tourism Destination, Laikipia",
  description:
    "An exclusive hospitality-led agro-tourism destination in Segera, Laikipia County, Kenya. Combining boutique accommodation, regenerative agriculture, and landscape stewardship.",
  keywords: [
    "Jonik Ndovu Farm",
    "Laikipia Kenya",
    "Agro-Tourism Kenya",
    "Luxury Eco Lodge",
    "Segera Safari Lodge",
    "Hospitality Investment Africa",
  ],
  openGraph: {
    title: "Jonik Ndovu Farm | Segera, Laikipia",
    description: "Envisioning a hospitality-led agro-tourism destination in Laikipia, Kenya.",
    images: [{ url: "/images/hero-lodge.jpg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ivory text-charcoal font-sans antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
