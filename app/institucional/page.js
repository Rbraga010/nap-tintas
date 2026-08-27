// ============================================================
// INSTITUCIONAL — o site "Conheça a NAP" (27/08)
// A porta de entrada do dominio passou a ser a BIO (o trafego vem do
// Instagram), entao a raiz redireciona para /bio (next.config.mjs) e o
// institucional ganhou endereco proprio aqui. O componente segue
// morando em app/page.js, que tambem exporta os blocos compartilhados
// (COLORS, RevealWrap, CalculadoraM2...) usados por outras rotas.
// ============================================================
export { default } from "../page";
