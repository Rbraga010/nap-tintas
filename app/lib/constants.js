// ============================================================
// CONSTANTES DA MARCA — fonte unica (Bloco 4, 28/08)
// Antes: COLORS duplicado em page.js e centro-treinamento; WhatsApp
// espalhado. Agora TUDO importa daqui.
// ============================================================

export const COLORS = {
  blue: "#1B3A8C",
  green: "#4CAF50",
  yellow: "#F9A825",
  orange: "#FF6D00",
  red: "#D32F2F",
  pink: "#E91E93",
  darkBlue: "#0D1B3E",
  white: "#FFFFFF",
  offWhite: "#F8F8F8",
  darkBg: "#0A0E1A",
};

// numero oficial da NAP (confirmado pelo Rodrigo em 28/08)
const WHATSAPP_NUMBER = "5515998137222";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Vim pelo site da NAP Tintas e gostaria de saber mais!"
)}`;
export const wppLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
export { WHATSAPP_NUMBER };

// URL publica do site — usada em canonical, og:url, sitemap e robots.
// Default = o dominio REAL da loja (producao do cliente). Ambientes que
// nao sao a producao dele (nosso preview/dev) declaram a propria URL na
// env NEXT_PUBLIC_SITE_URL, senao anunciariam o dominio do cliente como
// canonico — e o inverso era pior: com o dev fixo aqui, o site do
// cliente mandava o Google indexar o NOSSO endereco (achado 28/08).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.naptintas.com.br";
