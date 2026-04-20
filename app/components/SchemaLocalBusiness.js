export default function SchemaLocalBusiness() {
  const data = {
    "@context": "https://schema.org",
    "@type": "PaintStore",
    "@id": "https://nap-tintas.vercel.app/#business",
    name: "NAP Tintas",
    alternateName: "NAP Tintas — Colorindo Sonhos",
    description:
      "Loja de tintas, texturas, acessórios e centro de formação para pintores em Sorocaba/SP. Mais de 20 anos de mercado com atendimento familiar.",
    url: "https://nap-tintas.vercel.app",
    logo: "https://nap-tintas.vercel.app/nap-logo.jpg",
    image: "https://nap-tintas.vercel.app/mascote-roda.jpg",
    telephone: "+551599999-9999",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Cônego André Pieroni, 371",
      addressLocality: "Sorocaba",
      addressRegion: "SP",
      postalCode: "18074-000",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    sameAs: [
      "https://instagram.com/nap_tintas",
      "https://wa.me/5515999999999",
    ],
    areaServed: [
      { "@type": "City", name: "Sorocaba" },
      { "@type": "City", name: "Votorantim" },
      { "@type": "City", name: "Itu" },
      { "@type": "City", name: "Porto Feliz" },
      { "@type": "City", name: "Boituva" },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Formação Colorindo com a NAP",
          description:
            "Centro de treinamento para pintores com cursos de técnica, gestão e vendas.",
          url: "https://nap-tintas.vercel.app/colorindo-com-a-nap",
        },
      },
    ],
    knowsAbout: [
      "Tintas",
      "Pintura residencial",
      "Pintura comercial",
      "Texturas decorativas",
      "Efeitos decorativos",
      "Sistema tintométrico",
      "Capacitação de pintores",
    ],
    slogan: "Colorindo Sonhos. Aqui, pintor é da família.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
