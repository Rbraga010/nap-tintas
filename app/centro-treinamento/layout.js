const SITE_URL = "https://nap-tintas.vercel.app";
const OG_IMAGE = `${SITE_URL}/mascote-roda.jpg`;

export const metadata = {
  title: "Centro de Treinamento — Portal do Pintor Parceiro",
  description:
    "Portal do pintor parceiro NAP Tintas. Cursos técnicos, de gestão e marketing, agenda de treinamentos presenciais, vitrine de pintores parceiros e biblioteca de recursos.",
  openGraph: {
    title: "Centro de Treinamento — NAP Tintas",
    description: "Colorindo com a NAP — cursos, biblioteca e comunidade do pintor parceiro.",
    url: `${SITE_URL}/centro-treinamento`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Centro de Treinamento NAP" }],
    type: "website",
    locale: "pt_BR",
    siteName: "NAP Tintas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Centro de Treinamento NAP",
    description: "Portal completo para o pintor parceiro.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: `${SITE_URL}/centro-treinamento` },
};

export default function CentroTreinamentoLayout({ children }) {
  return children;
}
