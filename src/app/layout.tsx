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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://jonikndovufarm.com";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Jonik Ndovu Farm | Luxury Agro-Tourism & Conservation Hospitality, Laikipia Kenya",
    template: "%s | Jonik Ndovu Farm, Laikipia Kenya",
  },
  description:
    "An exclusive 12–15 key luxury eco-lodge and regenerative agro-tourism destination in Segera, Laikipia County, Kenya. Bordering Lewa and Ol Pejeta conservancies, combining closed-loop farming with high-yield conservation hospitality.",
  keywords: [
    "Jonik Ndovu Farm",
    "Laikipia Kenya investment",
    "luxury eco lodge Laikipia",
    "agro-tourism Kenya",
    "Segera safari lodge",
    "Lewa wildlife conservancy",
    "Ol Pejeta conservancy",
    "African hospitality private equity",
    "regenerative agriculture Africa",
    "sustainable safari lodge development",
    "boutique eco lodge Segera",
    "impact investing Kenya",
    "Mount Kenya conservation tourism",
  ],
  authors: [{ name: "Jonik Ndovu Farm Investment Syndicate", url: APP_URL }],
  creator: "Jonik Ndovu Farm",
  publisher: "Jonik Ndovu Farm",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Jonik Ndovu Farm | Luxury Agro-Tourism & Safari Destination, Laikipia Kenya",
    description:
      "A boutique 12–15 key eco-lodge, organic macadamia and avocado orchards, and elephant corridor conservation in Segera, Laikipia County, Kenya.",
    url: APP_URL,
    siteName: "Jonik Ndovu Farm",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/images/hero-lodge.jpg",
        width: 1200,
        height: 630,
        alt: "Jonik Ndovu Farm luxury eco-lodge concept overlooking the Segera savannah, Laikipia Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonik Ndovu Farm | Luxury Agro-Tourism & Conservation Hospitality, Laikipia",
    description:
      "Regenerative agriculture, luxury boutique safari hospitality, and landscape stewardship in Segera, Laikipia County, Kenya.",
    images: ["/images/hero-lodge.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${APP_URL}/#organization`,
      name: "Jonik Ndovu Farm",
      url: APP_URL,
      logo: `${APP_URL}/images/hero-lodge.jpg`,
      description:
        "Exclusive agro-tourism and luxury conservation hospitality destination in Segera, Laikipia County, Kenya.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Segera",
        addressRegion: "Laikipia County",
        addressCountry: "KE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "investor relations",
        email: "invest@jonikndovufarm.com",
      },
    },
    {
      "@type": ["LodgingBusiness", "Resort"],
      "@id": `${APP_URL}/#lodging`,
      name: "Jonik Ndovu Farm Luxury Eco-Lodge",
      description:
        "A boutique 12–15 key luxury eco-lodge, immersive safari experience, and closed-loop regenerative agro-forestry estate.",
      url: APP_URL,
      image: `${APP_URL}/images/hero-lodge.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Segera",
        addressRegion: "Laikipia County",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 0.2872,
        longitude: 36.8524,
      },
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "Elephant Corridor Wildlife Viewing",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Farm-to-Table Organic Dining",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "100% Off-Grid Solar Microgrid & Rainwater Harvesting",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Boutique 12-15 Key Private Suites",
          value: true,
        },
      ],
    },
    {
      "@type": "TouristAttraction",
      "@id": `${APP_URL}/#attraction`,
      name: "Jonik Ndovu Agro-Tourism & Wildlife Habitat",
      description:
        "Conservation corridor bridging Lewa Wildlife Conservancy and Ol Pejeta Conservancy with organic macadamia, Hass avocado orchards, and bee-fence buffers.",
      touristType: ["Eco-tourists", "Wildlife Safari Enthusiasts", "Impact Investors", "Agro-forestry Observers"],
    },
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      url: APP_URL,
      name: "Jonik Ndovu Farm",
      publisher: {
        "@id": `${APP_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-ivory text-charcoal font-sans antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
