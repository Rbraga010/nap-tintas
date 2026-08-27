// ============================================================
// CAMADA DE DADOS DA LOJA (Bloco 4, 28/08)
// Interface unica consumida pelas paginas. Dois modos, decididos em
// runtime pela presenca do .env:
//   DEMO     -> devolve os dados de lib/catalogo-demo.js
//   SUPABASE -> le as tabelas produtos/banners do banco do cliente
// O Super Admin (Bloco 5) escreve pelas mesmas tabelas.
// ============================================================
import { supabase, temBanco } from "./supabase";
import { PRODUTOS, CATEGORIAS, OFERTAS } from "./catalogo-demo";

export { CATEGORIAS };

/** Produtos da loja (vitrine + catalogo). */
export async function getProdutos() {
  if (!temBanco) return PRODUTOS;
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)
    .order("ordem", { ascending: true });
  if (error || !data?.length) return PRODUTOS; // fallback: nunca vitrine vazia
  return data;
}

/**
 * Banners de destaque. slot: "bio" (carrossel do link bio) ou "loja".
 * Cada banner: { src, alt, href }.
 */
export async function getBanners(slot = "bio") {
  if (!temBanco) return OFERTAS.map((o) => ({ ...o, href: "/pedidos" }));
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("slot", slot)
    .eq("ativo", true)
    .order("ordem", { ascending: true });
  if (error || !data?.length) return OFERTAS.map((o) => ({ ...o, href: "/pedidos" }));
  return data.map((b) => ({ src: b.imagem_url, alt: b.alt || b.titulo, href: b.href || "/pedidos" }));
}

/** Cadastro simples de cliente (Bloco 5 pluga o formulario aqui). */
export async function cadastrarCliente({ nome, whatsapp, email }) {
  if (!temBanco) return { ok: true, demo: true };
  const { error } = await supabase.from("clientes").insert({ nome, whatsapp, email });
  return { ok: !error, error: error?.message };
}
