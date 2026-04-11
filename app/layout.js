import "./globals.css";

export const metadata = {
  title: "NAP Tintas — Venha colorir com a gente!",
  description:
    "Mais de 20 anos de experiência no mercado de Tintas. Consultoria, capacitação de pintores e as melhores marcas. Os que Transformam Sonhos em Realidades.",
  keywords: [
    "tintas",
    "pintura",
    "NAP Tintas",
    "loja de tintas",
    "texturas",
    "pintores",
    "tintometrico",
  ],
  openGraph: {
    title: "NAP Tintas — Venha colorir com a gente!",
    description:
      "Mais de 20 anos de experiência no mercado de Tintas. Consultoria, capacitação e as melhores marcas.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
