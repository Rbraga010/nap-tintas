const SITE_URL = "https://nap-tintas.vercel.app";
const OG_IMAGE = `${SITE_URL}/mascote-menino.jpg`;

export const metadata = {
  title: "Formação Colorindo com a NAP — Centro de Treinamento para Pintores",
  description:
    "A NAP Tintas tem um centro de treinamento pra pintor da região de Sorocaba. Técnica, gestão, vendas e apoio completo. Aqui, pintor é da família.",
  keywords: [
    "NAP Tintas",
    "Colorindo com a NAP",
    "centro de treinamento pintor",
    "formação pintor Sorocaba",
    "capacitação pintor",
    "pintor parceiro",
    "curso pintura",
    "gestão para pintor",
    "vendas para pintor",
  ],
  openGraph: {
    title: "Formação Colorindo com a NAP — Aqui, pintor é da família.",
    description:
      "Formação completa em técnica, gestão e vendas pra quem vive de pintar. Família NAP do seu lado na loja, na obra e no dia a dia.",
    url: `${SITE_URL}/colorindo-com-a-nap`,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Formação Colorindo com a NAP — Pintor parceiro",
      },
    ],
    type: "website",
    locale: "pt_BR",
    siteName: "NAP Tintas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formação Colorindo com a NAP",
    description: "Aqui, pintor é da família. Técnica, gestão e vendas.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: `${SITE_URL}/colorindo-com-a-nap` },
};

export default function ColorindoComANapLayout({ children }) {
  return children;
}
