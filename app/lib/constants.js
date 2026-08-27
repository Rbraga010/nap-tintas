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

// URL publica do site — trocar SO AQUI quando entrar o dominio proprio
// (Fase 7 da docs/SETUP-CLIENTE.md)
export const SITE_URL = "https://nap-tintas.vercel.app";
