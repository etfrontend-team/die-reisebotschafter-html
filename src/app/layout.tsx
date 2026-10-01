import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter, Montserrat } from "next/font/google";
import LenisProvider from "@/utils/LenisProvider";
import Footer from "@/components/shared/Footer";
import ContactWidget from "@/components/shared/ContactWidget";
import ExpertBar from "@/components/shared/ExpertBar";
import Header from "@/components/shared/Header";
import "@/styles/globals.css";

const montserrat = Montserrat({
  variable: "--next-font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--next-font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--next-font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.die-reisebotschafter.de";
const siteName = "Die Reisebotschafter";
const siteTitle = "Die Reisebotschafter – Your expert for individual long-distance travel";
const siteDescription =
  "For over 40 years, our travel ambassadors have personally explored the destinations we offer. Tailor-made long-distance journeys to Africa, the Antarctic, Australia, the Indian Ocean, Latin America, North America and the South Seas.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Die Reisebotschafter",
    "travel ambassadors",
    "individual travel",
    "long-distance travel",
    "tailor-made journeys",
    "Africa safari",
    "small group tours",
    "travel agency",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Red desert dunes at sunrise – Die Reisebotschafter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/og-image.jpg"],
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
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#682535",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${dmSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LenisProvider>
          <Header />
          {children}
          <Footer />
          <ContactWidget />
          <ExpertBar />
        </LenisProvider>
      </body>
    </html>
  );
}
