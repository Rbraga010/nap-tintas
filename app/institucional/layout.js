import { SITE_URL } from "../lib/constants";
const OG_IMAGE = `${SITE_URL}/mascote-roda.jpg`;

export const metadata = {
  title: "Conheça a NAP · Loja de Tintas em Sorocaba",
  description:
    "Mais de 20 anos pintando histórias em Sorocaba. Tintas, texturas e acessórios com cores preparadas na hora, atendimento de família e entrega para Sorocaba e região.",
  alternates: { canonical: `${SITE_URL}/institucional` },
  openGraph: {
    title: "Conheça a NAP Tintas",
    description:
      "Nossa família, nossos valores e a forma de atender que fez a NAP virar referência em Sorocaba.",
    url: `${SITE_URL}/institucional`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "NAP Tintas" }],
    type: "website",
    locale: "pt_BR",
    siteName: "NAP Tintas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conheça a NAP Tintas",
    description: "Mais de 20 anos colorindo sonhos em Sorocaba.",
    images: [OG_IMAGE],
  },
};

export default function InstitucionalLayout({ children }) {
  return children;
}
