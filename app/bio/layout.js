const SITE_URL = "https://nap-tintas.vercel.app";
const OG_IMAGE = `${SITE_URL}/mascote-roda.jpg`;

export const metadata = {
  title: "Link Bio — Pintor Parceiro, Formação & Atendimento",
  description:
    "NAP Tintas — Colorindo Sonhos. Seja um pintor parceiro, conheça o Centro de Formação Colorindo com a NAP, visite nosso site institucional ou faça seu pedido.",
  openGraph: {
    title: "NAP Tintas — Link Bio",
    description: "Formação, parceria e atendimento para pintores em Sorocaba.",
    url: `${SITE_URL}/bio`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "NAP Tintas" }],
    type: "website",
    locale: "pt_BR",
    siteName: "NAP Tintas",
  },
  twitter: {
    card: "summary_large_image",
    title: "NAP Tintas — Link Bio",
    description: "Formação, parceria e atendimento para pintores.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: `${SITE_URL}/bio` },
};

export default function BioLayout({ children }) {
  return children;
}
