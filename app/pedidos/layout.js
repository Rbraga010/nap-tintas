const SITE_URL = "https://nap-tintas.vercel.app";
const OG_IMAGE = `${SITE_URL}/mascote-roda.jpg`;

export const metadata = {
  title: "Faça seu Pedido — Loja Online NAP Tintas",
  description:
    "Tintas, acessórios, texturas e massas. Monte seu pedido online e finalize pelo WhatsApp com consultoria personalizada. Entrega em Sorocaba e região.",
  openGraph: {
    title: "Faça seu Pedido — NAP Tintas",
    description: "Loja online da NAP Tintas. Tudo pra sua obra em um só lugar.",
    url: `${SITE_URL}/pedidos`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Loja online NAP Tintas" }],
    type: "website",
    locale: "pt_BR",
    siteName: "NAP Tintas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loja Online NAP Tintas",
    description: "Tudo pra sua obra. Na palma da mão.",
    images: [OG_IMAGE],
  },
  alternates: { canonical: `${SITE_URL}/pedidos` },
};

export default function PedidosLayout({ children }) {
  return children;
}
