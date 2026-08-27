// ============================================================
// CAMADA DE DADOS DA LOJA (Bloco 4 + Bloco 5, 28/08)
// Interface unica consumida pelas paginas E pelo Super Admin.
// Modos (decididos em runtime pela presenca do .env):
//   DEMO     -> catalogo-demo + alteracoes do admin em localStorage
//               (persistem NESTE navegador; otimo pra demonstracao)
//   SUPABASE -> tabelas produtos/banners/clientes/pedidos do cliente
// ============================================================
import { supabase, temBanco } from "./supabase";
import { PRODUTOS, CATEGORIAS, OFERTAS } from "./catalogo-demo";

export { CATEGORIAS, temBanco };

// ---------- helpers do modo demo (localStorage) ----------
// DEMO_V versiona o sandbox: quando o catalogo-base evolui (novos campos),
// sobe a versao e o navegador re-semeia — senao o storage antigo "vence"
// e esconde os campos novos.
const DEMO_V = "v3";
const LS = {
  categorias: `nap.demo.${DEMO_V}.categorias`,
  produtos: `nap.demo.${DEMO_V}.produtos`,
  banners: `nap.demo.${DEMO_V}.banners`,
  clientes: `nap.demo.${DEMO_V}.clientes`,
  pedidos: `nap.demo.${DEMO_V}.pedidos`,
};
const canLS = () => typeof window !== "undefined";
const lsGet = (k, fallback) => {
  if (!canLS()) return fallback;
  try {
    const v = JSON.parse(localStorage.getItem(k));
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
};
const lsSet = (k, v) => {
  if (canLS()) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  }
};

const demoProdutosBase = () =>
  PRODUTOS.map((p, i) => ({ ativo: true, ordem: i + 1, descricao: "", imagem_url: "", ...p }));
const demoBannersBase = () =>
  OFERTAS.map((o, i) => ({
    id: i + 1, slot: "bio", titulo: o.alt, alt: o.alt,
    imagem_url: o.src, href: "/pedidos", ativo: true, ordem: i + 1,
  }));

const demoCategoriasBase = () =>
  CATEGORIAS.filter((c) => c.id !== "todos").map((c, i) => ({ ...c, ordem: i + 1 }));
const demoCategorias = () => lsGet(LS.categorias, demoCategoriasBase());
const demoProdutos = () => lsGet(LS.produtos, demoProdutosBase());
const demoBanners = () => lsGet(LS.banners, demoBannersBase());

// ============================================================
// LEITURA (vitrine)
// ============================================================
export async function getProdutos() {
  if (!temBanco) return demoProdutos().filter((p) => p.ativo);
  const { data, error } = await supabase
    .from("produtos").select("*").eq("ativo", true).order("ordem");
  if (error || !data?.length) return demoProdutos().filter((p) => p.ativo);
  return data;
}

export async function getBanners(slot = "bio") {
  const demo = () => demoBanners()
    .filter((b) => b.slot === slot && b.ativo)
    .sort((a, b) => a.ordem - b.ordem)
    .map((b) => ({ src: b.imagem_url, alt: b.alt || b.titulo, href: b.href || "/pedidos" }));
  if (!temBanco) return demo();
  const { data, error } = await supabase
    .from("banners").select("*").eq("slot", slot).eq("ativo", true).order("ordem");
  if (error) return demo();
  if (!data?.length) return slot === "bio" ? demo() : [];
  return data.map((b) => ({ src: b.imagem_url, alt: b.alt || b.titulo, href: b.href || "/pedidos" }));
}

// ============================================================
// CATEGORIAS (estantes da loja)
// ============================================================
export async function getCategorias() {
  if (!temBanco) return demoCategorias().sort((a, b) => a.ordem - b.ordem);
  const { data, error } = await supabase.from("categorias").select("*").order("ordem");
  if (error || !data?.length) return demoCategorias().sort((a, b) => a.ordem - b.ordem);
  return data;
}

export async function upsertCategoria(c) {
  const slug = (c.id || c.label || "").toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const cat = { emoji: "🎨", ...c, id: slug };
  if (!temBanco) {
    const lista = demoCategorias();
    const i = lista.findIndex((x) => x.id === cat.id);
    if (i >= 0) lista[i] = { ...lista[i], ...cat };
    else lista.push({ ordem: lista.length + 1, ...cat });
    lsSet(LS.categorias, lista);
    return { ok: true, demo: true };
  }
  const { error } = await supabase.from("categorias").upsert(cat);
  return { ok: !error, error: error?.message };
}

export async function deleteCategoria(id) {
  if (!temBanco) {
    lsSet(LS.categorias, demoCategorias().filter((x) => x.id !== id));
    return { ok: true, demo: true };
  }
  const { error } = await supabase.from("categorias").delete().eq("id", id);
  return { ok: !error, error: error?.message };
}

// ============================================================
// CLIENTES + PEDIDOS (checkout da loja)
// ============================================================
export async function cadastrarCliente({ nome, whatsapp, email }) {
  if (!temBanco) {
    const lista = lsGet(LS.clientes, []);
    const c = { id: Date.now(), nome, whatsapp, email, criado_em: new Date().toISOString() };
    lsSet(LS.clientes, [...lista, c]);
    return { ok: true, demo: true, cliente: c };
  }
  const { data, error } = await supabase
    .from("clientes").insert({ nome, whatsapp, email }).select().single();
  return { ok: !error, error: error?.message, cliente: data };
}

export async function registrarPedido({ cliente_id, itens, total }) {
  if (!temBanco) {
    const lista = lsGet(LS.pedidos, []);
    lsSet(LS.pedidos, [...lista, {
      id: Date.now(), cliente_id, itens, total,
      status: "novo", criado_em: new Date().toISOString(),
    }]);
    return { ok: true, demo: true };
  }
  const { error } = await supabase.from("pedidos").insert({ cliente_id, itens, total });
  return { ok: !error, error: error?.message };
}

// ============================================================
// SUPER ADMIN — autenticacao
// ============================================================
export async function adminLogin(email, senha) {
  if (!temBanco) return { ok: true, demo: true }; // modo demo: entrada livre com aviso
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) return { ok: false, error: "E-mail ou senha inválidos." };
  const { data: adm } = await supabase
    .from("admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (!adm) {
    await supabase.auth.signOut();
    return { ok: false, error: "Este usuário não é admin." };
  }
  return { ok: true };
}

export async function adminLogout() {
  if (temBanco) await supabase.auth.signOut();
}

export async function adminSessao() {
  if (!temBanco) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session || null;
}

// ============================================================
// SUPER ADMIN — produtos (inclui inativos)
// ============================================================
export async function adminListProdutos() {
  if (!temBanco) return demoProdutos();
  const { data, error } = await supabase.from("produtos").select("*").order("ordem");
  return error ? [] : data;
}

export async function upsertProduto(p) {
  if (!temBanco) {
    const lista = demoProdutos();
    if (p.id) {
      const i = lista.findIndex((x) => x.id === p.id);
      if (i >= 0) lista[i] = { ...lista[i], ...p };
    } else {
      p.id = Math.max(0, ...lista.map((x) => x.id)) + 1;
      p.ordem = p.ordem ?? lista.length + 1;
      lista.push({ ativo: true, destaque: false, ...p });
    }
    lsSet(LS.produtos, lista);
    return { ok: true, demo: true };
  }
  const { error } = p.id
    ? await supabase.from("produtos").update(p).eq("id", p.id)
    : await supabase.from("produtos").insert(p);
  return { ok: !error, error: error?.message };
}

export async function deleteProduto(id) {
  if (!temBanco) {
    lsSet(LS.produtos, demoProdutos().filter((x) => x.id !== id));
    return { ok: true, demo: true };
  }
  const { error } = await supabase.from("produtos").delete().eq("id", id);
  return { ok: !error, error: error?.message };
}

// ============================================================
// SUPER ADMIN — banners (slots bio | loja)
// ============================================================
export async function adminListBanners(slot) {
  if (!temBanco) {
    return demoBanners()
      .filter((b) => !slot || b.slot === slot)
      .sort((a, b) => a.ordem - b.ordem);
  }
  let q = supabase.from("banners").select("*").order("ordem");
  if (slot) q = q.eq("slot", slot);
  const { data, error } = await q;
  return error ? [] : data;
}

export async function upsertBanner(b) {
  if (!temBanco) {
    const lista = demoBanners();
    if (b.id) {
      const i = lista.findIndex((x) => x.id === b.id);
      if (i >= 0) lista[i] = { ...lista[i], ...b };
    } else {
      b.id = Math.max(0, ...lista.map((x) => x.id)) + 1;
      b.ordem = b.ordem ?? lista.filter((x) => x.slot === b.slot).length + 1;
      lista.push({ ativo: true, href: "/pedidos", ...b });
    }
    lsSet(LS.banners, lista);
    return { ok: true, demo: true };
  }
  const { error } = b.id
    ? await supabase.from("banners").update(b).eq("id", b.id)
    : await supabase.from("banners").insert(b);
  return { ok: !error, error: error?.message };
}

export async function deleteBanner(id) {
  if (!temBanco) {
    lsSet(LS.banners, demoBanners().filter((x) => x.id !== id));
    return { ok: true, demo: true };
  }
  const { error } = await supabase.from("banners").delete().eq("id", id);
  return { ok: !error, error: error?.message };
}

/** Upload de imagem pro bucket "midia" (com banco). Em demo, orienta URL. */
export async function uploadImagem(file) {
  if (!temBanco) return { ok: false, demo: true, error: "Modo demo: use uma URL de imagem." };
  const nome = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
  const { error } = await supabase.storage.from("midia").upload(nome, file);
  if (error) return { ok: false, error: error.message };
  const { data } = supabase.storage.from("midia").getPublicUrl(nome);
  return { ok: true, url: data.publicUrl };
}

// ============================================================
// SUPER ADMIN — leitura de clientes/pedidos
// ============================================================
export async function adminListClientes() {
  if (!temBanco) return lsGet(LS.clientes, []);
  const { data, error } = await supabase
    .from("clientes").select("*").order("criado_em", { ascending: false });
  return error ? [] : data;
}

export async function adminListPedidos() {
  if (!temBanco) return lsGet(LS.pedidos, []);
  const { data, error } = await supabase
    .from("pedidos").select("*").order("criado_em", { ascending: false });
  return error ? [] : data;
}
