// ============================================================
// CATALOGO DEMO — dados de demonstracao da loja (Bloco 4, 28/08)
// Quando o Supabase do cliente estiver configurado (.env preenchido),
// a camada lib/db.js passa a ler do banco e este arquivo vira apenas
// o seed de referencia. Estrutura = espelho de supabase/schema.sql.
// ============================================================
import { COLORS } from "./constants";

export const CATEGORIAS = [
  { id: "todos", label: "Todos", emoji: "🎨" },
  { id: "tintas", label: "Tintas", emoji: "🪣" },
  { id: "texturas", label: "Texturas", emoji: "✨" },
  { id: "massas", label: "Massas & Fundos", emoji: "🧱" },
  { id: "acessorios", label: "Acessórios", emoji: "🖌️" },
];

export const PRODUTOS = [
  // TINTAS
  { id: 1, cat: "tintas", marca: "Suvinil", nome: "Látex Premium Branco Neve", rendimento: "até 40 m²/demão", embalagem: "Galão 3,6L", preco: 189.90, cor: COLORS.blue, swatch: "#FAFAFA", destaque: true, descricao: "Cobertura impecável para paredes e tetos internos", preco_de: 219.90 },
  { id: 2, cat: "tintas", marca: "Coral", nome: "Acrílica Fachada Antimofo", rendimento: "até 35 m²/demão", embalagem: "Galão 3,6L", preco: 239.90, cor: COLORS.green, swatch: "#E8F5E9", descricao: "Protege a fachada contra mofo, chuva e sol forte" },
  { id: 3, cat: "tintas", marca: "Sherwin-Williams", nome: "Esmalte Sintético Brilho", rendimento: "até 30 m²/demão", embalagem: "Galão 3,6L", preco: 159.90, cor: COLORS.red, swatch: "#D32F2F", descricao: "Brilho profissional para portões, grades e metais" },
  { id: 4, cat: "tintas", marca: "Lukscolor", nome: "Tinta Epóxi Piso Industrial", rendimento: "até 25 m²/demão", embalagem: "Galão 3,6L", preco: 329.90, cor: COLORS.darkBlue, swatch: "#37474F", destaque: true, descricao: "Resistência industrial para pisos de garagem e oficina" },
  { id: 5, cat: "tintas", marca: "Suvinil", nome: "Ultrabranco Fosco para Teto", rendimento: "até 200 m²/demão", embalagem: "Lata 18L", preco: 589.90, cor: COLORS.blue, swatch: "#FFFFFF", descricao: "O branco absoluto que ilumina qualquer teto" },
  { id: 6, cat: "tintas", marca: "Eucatex", nome: "Látex Rosa Chá Econômica", rendimento: "até 35 m²/demão", embalagem: "Galão 3,6L", preco: 129.90, cor: COLORS.pink, swatch: "#FCE4EC", descricao: "Cor suave e lavável para renovar o quarto gastando pouco" },
  { id: 7, cat: "tintas", marca: "Coral", nome: "Acrílica Amarelo Manteiga", rendimento: "até 35 m²/demão", embalagem: "Galão 3,6L", preco: 219.90, cor: COLORS.yellow, swatch: "#FFF59D", descricao: "Amarelo acolhedor que aquece salas e cozinhas" },
  { id: 8, cat: "tintas", marca: "Iquine", nome: "Látex Azul Anil Profundo", rendimento: "até 40 m²/demão", embalagem: "Galão 3,6L", preco: 199.90, cor: COLORS.blue, swatch: "#1B3A8C", descricao: "Azul profundo premium para paredes de destaque" },

  // TEXTURAS
  { id: 20, cat: "texturas", marca: "Quartzolit", nome: "Grafiato Riscado Branco", rendimento: "20 m²/lata", embalagem: "Lata 25kg", preco: 189.00, cor: COLORS.yellow, swatch: "#F5F5DC", destaque: true, descricao: "Efeito riscado clássico para fachadas com personalidade", preco_de: 219.00 },
  { id: 21, cat: "texturas", marca: "Suvinil", nome: "Textura Rústica Projetada", rendimento: "15 m²/lata", embalagem: "Lata 18L", preco: 349.90, cor: COLORS.orange, swatch: "#D7CCC8", descricao: "Textura projetada que valoriza muros e áreas externas" },
  { id: 22, cat: "texturas", marca: "Coral", nome: "Efeito Cimento Queimado", rendimento: "12 m²/kit", embalagem: "Kit 5kg", preco: 279.00, cor: COLORS.darkBlue, swatch: "#9E9E9E", descricao: "Acabamento rústico sofisticado para áreas internas" },
  { id: 23, cat: "texturas", marca: "Suvinil", nome: "Marmorato Decorativo", rendimento: "10 m²/kit", embalagem: "Kit 5kg", preco: 399.00, cor: COLORS.pink, swatch: "#EFEBE9", descricao: "Efeito mármore luxuoso para paredes de destaque" },

  // MASSAS & FUNDOS
  { id: 30, cat: "massas", marca: "Quartzolit", nome: "Massa Corrida PVA", rendimento: "35 m²/balde", embalagem: "Balde 25kg", preco: 69.90, cor: COLORS.green, swatch: "#FAFAFA", descricao: "Nivela paredes internas e deixa tudo pronto pra pintar" },
  { id: 31, cat: "massas", marca: "Suvinil", nome: "Massa Acrílica Externa", rendimento: "30 m²/balde", embalagem: "Balde 25kg", preco: 119.90, cor: COLORS.blue, swatch: "#F5F5F5", descricao: "Prepara e uniformiza superfícies externas exigentes" },
  { id: 32, cat: "massas", marca: "Coral", nome: "Selador Acrílico Universal", rendimento: "até 45 m²/demão", embalagem: "Galão 3,6L", preco: 89.90, cor: COLORS.yellow, swatch: "#FFFDE7", descricao: "Sela a parede nova e economiza tinta na primeira demão" },
  { id: 33, cat: "massas", marca: "Lukscolor", nome: "Fundo Preparador Parede", rendimento: "até 50 m²/demão", embalagem: "Galão 3,6L", preco: 99.90, cor: COLORS.orange, swatch: "#FFF3E0", descricao: "Firma a superfície e garante aderência da tinta" },

  // ACESSÓRIOS
  { id: 40, cat: "acessorios", marca: "Atlas", nome: "Rolo de Lã 23cm + Cabo", rendimento: "—", embalagem: "Unidade", preco: 29.90, cor: COLORS.red, swatch: "#FFF8E1", descricao: "Maciez e alto rendimento na aplicação de látex" },
  { id: 41, cat: "acessorios", marca: "Tigre", nome: "Trincha Profissional 2\"", rendimento: "—", embalagem: "Unidade", preco: 19.90, cor: COLORS.orange, swatch: "#FFF3E0", descricao: "Cerdas firmes para recortes precisos e cantos limpos" },
  { id: 42, cat: "acessorios", marca: "Condor", nome: "Kit Bandeja + Rolo + Cabo", rendimento: "—", embalagem: "Kit completo", preco: 49.90, cor: COLORS.green, swatch: "#E8F5E9", destaque: true, descricao: "Kit completo pra começar a pintura sem faltar nada", preco_de: 69.90 },
  { id: 43, cat: "acessorios", marca: "Tigre", nome: "Fita Crepe 18mm × 50m", rendimento: "—", embalagem: "Rolo", preco: 12.90, cor: COLORS.yellow, swatch: "#FFF8E1", descricao: "Protege o chão e os móveis durante toda a obra" },
  { id: 44, cat: "acessorios", marca: "3M", nome: "Lixa d'Água Grão 220 (10un)", rendimento: "—", embalagem: "Pacote 10 folhas", preco: 24.90, cor: COLORS.darkBlue, swatch: "#ECEFF1", descricao: "Acabamento fino em massa e repintura, uso com água" },
  { id: 45, cat: "acessorios", marca: "Atlas", nome: "Desempenadeira Aço Inox", rendimento: "—", embalagem: "Unidade", preco: 34.90, cor: COLORS.pink, swatch: "#FCE4EC", descricao: "Aplica massa e textura por igual, com cabo firme" },
];

export const OFERTAS = [
  { src: "/ofertas/oferta-1.webp", alt: "Oferta: Tinta Acrílica Premium 18L por R$ 289,90" },
  { src: "/ofertas/oferta-2.webp", alt: "Oferta: Esmalte Sintético 3,6L por R$ 94,90" },
  { src: "/ofertas/oferta-3.webp", alt: "Oferta: Kit Pintura Completo por R$ 59,90" },
  { src: "/ofertas/oferta-4.webp", alt: "Oferta: Textura Rústica 25kg por R$ 149,90" },
];