import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import { Poppins, Nunito } from "next/font/google";

// Fontes self-hosted pelo next/font: zero request externo, zero layout shift.
// Poppins = display (titulos/UI) · Nunito = corpo. Montserrat foi aposentada
// na unificacao tipografica do banho de UI (27/08).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const SITE_URL = "https://nap-tintas.vercel.app";
const OG_IMAGE = `${SITE_URL}/mascote-roda.jpg`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NAP Tintas — Colorindo Sonhos em Sorocaba",
    template: "%s · NAP Tintas",
  },
  description:
    "Mais de 20 anos de experiência no mercado de Tintas. Consultoria personalizada, capacitação de pintores e as melhores marcas. Aqui, pintor é da família.",
  keywords: [
    "NAP Tintas",
    "tintas Sorocaba",
    "loja de tintas",
    "pintor parceiro",
    "formação pintor",
    "Colorindo com a NAP",
    "texturas decorativas",
    "sistema tintométrico",
    "tinta látex",
    "tinta acrílica",
  ],
  authors: [{ name: "NAP Tintas" }],
  creator: "NAP Tintas",
  publisher: "NAP Tintas",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "NAP Tintas — Colorindo Sonhos em Sorocaba",
    description:
      "Mais de 20 anos pintando histórias em Sorocaba. Loja de tintas, formação de pintores e família NAP. Venha colorir com a gente!",
    url: SITE_URL,
    siteName: "NAP Tintas",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "NAP Tintas — Colorindo Sonhos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAP Tintas — Colorindo Sonhos em Sorocaba",
    description:
      "20+ anos em Sorocaba. Tintas, formação pra pintor e família NAP.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/nap-logo.jpg", type: "image/jpeg" },
    ],
    apple: "/nap-logo.jpg",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // google: "...", // adicionar quando tiver Search Console
  },
};

export const viewport = {
  themeColor: "#0D1B3E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${nunito.variable}`}>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
