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

// numero oficial (ainda placeholder — trocar quando o cliente passar)
const WHATSAPP_NUMBER = "5515999999999";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Vim pelo site da NAP Tintas e gostaria de saber mais!"
)}`;
export const wppLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
export { WHATSAPP_NUMBER };
