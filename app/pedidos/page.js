"use client";

import { useState, useEffect } from "react";
import { COLORS, WHATSAPP_NUMBER, RevealWrap } from "../page";
import { getProdutos, getCategorias, cadastrarCliente, registrarPedido } from "../lib/db";
import { CATEGORIAS as CATEGORIAS_DEMO } from "../lib/catalogo-demo";
import OfertasCarrossel from "../components/OfertasCarrossel";
import { PRODUTOS as PRODUTOS_DEMO } from "../lib/catalogo-demo";
import ScrollTop from "../components/ScrollTop";

// Catalogo agora vem da camada de dados (lib/db): demo hoje, Supabase
// quando o cliente plugar o .env — mesma interface (Bloco 4).


const STORAGE_KEY = "nap_carrinho_v1";
const fmt = (v) => `R$ ${v.toFixed(2).replace(".", ",")}`;

// ============ ICONS ============

const IconCart = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="9" cy="21" r="1.5" />
    <circle cx="20" cy="21" r="1.5" />
    <path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6" />
  </svg>
);

const IconPlus = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const IconMinus = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}>
    <path d="M5 12h14" />
  </svg>
);

const IconX = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const IconWhats = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
  </svg>
);

const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

// ============ NAVBAR ============

function PedidosNav({ cartCount, onOpenCart, marcas, marca, setMarca, ordem, setOrdem }) {
  return (
    <nav className="ped-nav">
      <div className="ped-nav-inner">
        <a href="/bio" className="ped-logo">
          <img src="/nap-logo.jpg" alt="NAP" className="ped-logo-img" />
          <div>
            <div className="ped-logo-nap">NAP TINTAS</div>
            <div className="ped-logo-sub">Loja Online</div>
          </div>
        </a>
        <div className="ped-nav-links">
          <a href="/bio" className="ped-nav-link">← Início</a>
          {/* filtros DA LOJA (links do site vivem no footer) */}
          <select className="ped-filtro" value={marca} onChange={(e) => setMarca(e.target.value)} aria-label="Filtrar por marca">
            <option value="">Todas as marcas</option>
            {marcas.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select className="ped-filtro" value={ordem} onChange={(e) => setOrdem(e.target.value)} aria-label="Ordenar">
            <option value="relevancia">Mais relevantes</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
            <option value="az">Nome A–Z</option>
          </select>
          <button onClick={onOpenCart} className="ped-cart-btn" aria-label="Carrinho">
            <IconCart width="20" height="20" />
            {cartCount > 0 && <span className="ped-cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ============ HERO ============

function PedidosHero({ busca, setBusca }) {
  return (
    <section className="ped-hero">
      <div className="ped-hero-splash ped-splash-1" style={{ background: COLORS.yellow }} />
      <div className="ped-hero-splash ped-splash-2" style={{ background: COLORS.pink }} />
      <div className="ped-hero-splash ped-splash-3" style={{ background: COLORS.green }} />

      <div className="ped-hero-inner">
        <div className="ped-hero-badge">
          <span className="ped-hero-dot" />
          LOJA ONLINE NAP
        </div>
        <h1 className="ped-hero-title">
          Tudo pra sua obra.{" "}
          <span className="ped-hero-accent">Na palma da mão.</span>
        </h1>
        <p className="ped-hero-sub">
          Monte seu pedido, finalize no WhatsApp e receba em Sorocaba. Sem cadastro, sem complicação. <strong>A NAP cuida contigo.</strong>
        </p>
        <div className="ped-hero-search">
          <span className="ped-search-icon">🔎</span>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="O que você precisa? Ex: látex branco, massa corrida, rolo de lã…"
            className="ped-search-input"
          />
        </div>
      </div>
    </section>
  );
}

// ============ CATEGORIAS ============

function PedidosCategorias({ categorias, ativa, onChange }) {
  // pills = navegacao entre estantes: clique rola ate a estante da categoria
  const irPara = (id) => {
    onChange(id);
    if (id !== "todos") {
      requestAnimationFrame(() => {
        document.getElementById(`estante-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const lista = [{ id: "todos", label: "Todos", emoji: "🎨" }, ...categorias];
  return (
    <div className="ped-cats">
      <div className="ped-cats-inner">
        {lista.map((c) => (
          <button
            key={c.id}
            onClick={() => irPara(c.id)}
            className={`ped-cat-btn ${ativa === c.id ? "ped-cat-active" : ""}`}
          >
            <span className="ped-cat-emoji">{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ PRODUTO CARD ============

function ProdutoCard({ produto, onAdd, qty }) {
  // Card v3 (spec Rodrigo 28/08): foto em destaque, marca discreta,
  // NOME em negrito (unico bold), descricao, unidade micro e preco
  // com de/para quando for oferta. Leve: cores e tamanhos hierarquizam.
  const emOferta = produto.preco_de && Number(produto.preco_de) > Number(produto.preco);
  return (
    <div className="ped-prod-card">
      {emOferta ? (
        <span className="ped-prod-oferta">OFERTA</span>
      ) : produto.destaque ? (
        <span className="ped-prod-destaque">Destaque</span>
      ) : null}

      <div className="ped-prod-foto-area" style={{ "--sw": produto.swatch || "#F4F5F9" }}>
        {produto.imagem_url ? (
          <img src={produto.imagem_url} alt="" className="ped-prod-foto" loading="lazy" />
        ) : (
          <svg viewBox="0 0 120 120" width="84" height="84" aria-hidden>
            <ellipse cx="60" cy="105" rx="42" ry="7" fill="rgba(0,0,0,0.08)" />
            <path d="M22 32 Q22 20 60 20 Q98 20 98 32 V95 Q98 107 60 107 Q22 107 22 95 Z" fill={produto.cor} stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            <ellipse cx="60" cy="32" rx="38" ry="8" fill={produto.cor} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
            <ellipse cx="60" cy="32" rx="32" ry="5" fill={produto.swatch} stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
            <rect x="30" y="55" width="60" height="22" rx="2" fill="white" opacity="0.95" />
            <text x="60" y="69" textAnchor="middle" fill={produto.cor} fontSize="9" fontWeight="900" fontFamily="var(--font-display)">NAP</text>
          </svg>
        )}
      </div>

      <div className="ped-prod-body">
        <div className="ped-prod-marca">{produto.marca}</div>
        <h3 className="ped-prod-nome">{produto.nome}</h3>
        {produto.descricao && <p className="ped-prod-desc">{produto.descricao}</p>}
        <div className="ped-prod-meta">
          {produto.embalagem}
          {produto.rendimento && produto.rendimento !== "—" ? ` · ${produto.rendimento}` : ""}
        </div>
        <div className="ped-prod-footer">
          <div className="ped-prod-precos">
            {emOferta && <span className="ped-prod-de">{fmt(produto.preco_de)}</span>}
            <div className={`ped-prod-preco ${emOferta ? "oferta" : ""}`}>{fmt(produto.preco)}</div>
          </div>
          {qty > 0 ? (
            <div className="ped-prod-qty">
              <button onClick={() => onAdd(produto, -1)} className="ped-qty-btn" aria-label="Remover"><IconMinus width="14" height="14" /></button>
              <span className="ped-qty-num">{qty}</span>
              <button onClick={() => onAdd(produto, 1)} className="ped-qty-btn" aria-label="Adicionar"><IconPlus width="14" height="14" /></button>
            </div>
          ) : (
            <button onClick={() => onAdd(produto, 1)} className="ped-add-btn" aria-label={`Adicionar ${produto.nome}`}>
              <IconPlus width="14" height="14" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ CARRINHO DRAWER ============

function CarrinhoDrawer({ open, onClose, carrinho, onUpdate, onClear, total }) {
  // dados do cliente (lembrados neste navegador; cadastro leve no checkout)
  const [nome, setNome] = useState("");
  const [zap, setZap] = useState("");
  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem("nap.cliente") || "null");
      if (c) { setNome(c.nome || ""); setZap(c.zap || ""); }
    } catch {}
  }, []);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  const finalizarWpp = async () => {
    try {
      let cliente_id = null;
      if (nome.trim() && zap.trim()) {
        try { localStorage.setItem("nap.cliente", JSON.stringify({ nome, zap })); } catch {}
        const r = await cadastrarCliente({ nome: nome.trim(), whatsapp: zap.trim() });
        cliente_id = r?.cliente?.id ?? null;
      }
      await registrarPedido({
        cliente_id,
        itens: carrinho.map((i) => ({ produto_id: i.id, nome: i.nome, qtd: i.qty, preco: i.preco })),
        total,
      });
    } catch {}
    const itens = carrinho.map((i) =>
      `• ${i.qty}× ${i.nome} (${i.marca}) — ${fmt(i.preco * i.qty)}`
    ).join("\n");
    const texto = `*Olá NAP!* Quero fazer este pedido:\n\n${itens}\n\n*Total:* ${fmt(total)}\n\nPode me confirmar disponibilidade e forma de pagamento?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`, "_blank");
  };

  if (!open) return null;

  return (
    <>
      <div className="ped-drawer-overlay" onClick={onClose} />
      <aside className="ped-drawer" role="dialog" aria-label="Carrinho">
        <header className="ped-drawer-head">
          <div>
            <div className="ped-drawer-title">Seu pedido</div>
            <div className="ped-drawer-sub">
              {carrinho.length === 0
                ? "Vazio por enquanto"
                : `${carrinho.reduce((s, i) => s + i.qty, 0)} item${carrinho.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""}`
              }
            </div>
          </div>
          <button onClick={onClose} className="ped-drawer-close" aria-label="Fechar">
            <IconX width="18" height="18" />
          </button>
        </header>

        <div className="ped-drawer-items">
          {carrinho.length === 0 ? (
            <div className="ped-drawer-empty">
              <div className="ped-drawer-empty-emoji">🧺</div>
              <p>Seu carrinho está vazio.</p>
              <span>Escolha seus produtos e eles aparecem aqui.</span>
            </div>
          ) : (
            carrinho.map((i) => (
              <div key={i.id} className="ped-drawer-item">
                <div className="ped-drawer-swatch" style={{ background: i.swatch, borderColor: i.cor }}>
                  <div className="ped-drawer-swatch-dot" style={{ background: i.cor }} />
                </div>
                <div className="ped-drawer-item-body">
                  <div className="ped-drawer-item-marca">{i.marca}</div>
                  <div className="ped-drawer-item-nome">{i.nome}</div>
                  <div className="ped-drawer-item-ctrl">
                    <div className="ped-prod-qty">
                      <button onClick={() => onUpdate(i, -1)} className="ped-qty-btn"><IconMinus width="12" height="12" /></button>
                      <span className="ped-qty-num">{i.qty}</span>
                      <button onClick={() => onUpdate(i, 1)} className="ped-qty-btn"><IconPlus width="12" height="12" /></button>
                    </div>
                    <div className="ped-drawer-item-preco">{fmt(i.preco * i.qty)}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {carrinho.length > 0 && (
          <footer className="ped-drawer-footer">
            <div className="ped-drawer-total-row">
              <span>Subtotal</span>
              <strong>{fmt(total)}</strong>
            </div>
            <p className="ped-drawer-note">
              Frete e condições de pagamento são confirmados pelo WhatsApp.
            </p>
            <div className="ped-cliente">
              <input className="ped-cliente-campo" placeholder="Seu nome"
                value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />
              <input className="ped-cliente-campo" placeholder="Seu WhatsApp (15 9…)"
                value={zap} onChange={(e) => setZap(e.target.value)} inputMode="tel" autoComplete="tel" />
            </div>
            <button onClick={finalizarWpp} className="ped-drawer-finalize">
              <IconWhats width="18" height="18" />
              Finalizar no WhatsApp
              <IconArrow width="16" height="16" />
            </button>
            <button onClick={onClear} className="ped-drawer-clear">
              Limpar carrinho
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}

// ============ FOOTER ============

function PedidosFooter() {
  return (
    <footer className="ped-footer">
      <div className="ped-footer-inner">
        <div className="ped-footer-grid">
          <div>
            <div className="ped-footer-logo">NAP TINTAS</div>
            <p className="ped-footer-tag">Loja online da família NAP · Sorocaba/SP</p>
          </div>
          <div>
            <div className="ped-footer-col-title">Navegar</div>
            <a href="/" className="ped-footer-link">Site institucional</a>
            <a href="/colorindo-com-a-nap" className="ped-footer-link">Formação pra pintor</a>
            <a href="/centro-treinamento" className="ped-footer-link">Espaço do Pintor</a>
            <a href="/bio" className="ped-footer-link">Link na bio</a>
          </div>
          <div>
            <div className="ped-footer-col-title">Atendimento</div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="ped-footer-link">WhatsApp direto</a>
            <a href="https://instagram.com/nap_tintas" target="_blank" rel="noopener noreferrer" className="ped-footer-link">@nap_tintas</a>
            <p className="ped-footer-info">Seg a Sex · 8h às 18h</p>
            <p className="ped-footer-info">Sábado · 8h às 13h</p>
          </div>
        </div>
        <div className="ped-footer-copy">
          © 2026 NAP Tintas · Rua Cônego André Pieroni, 371 · Sorocaba/SP
          <span>Colorindo Sonhos todos os dias.</span>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN ============

// ---- ESTANTE: fileira horizontal de uma categoria, deslizando pro lado ----
function Estante({ id, categoria, cor, itens, onAdd, qtyOf }) {
  const rolar = (delta) => {
    const el = document.getElementById(`trilho-${id}`);
    if (el) el.scrollBy({ left: delta * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <section className="ped-estante" id={`estante-${id}`}>
      <div className="ped-section-inner">
        <div className="ped-estante-head">
          <span className="ped-section-tag" style={{ color: cor }}>
            <span style={{ background: cor }} /> {categoria.emoji} {categoria.label}
          </span>
          <div className="ped-estante-setas">
            <button aria-label="Anterior" onClick={() => rolar(-1)}>‹</button>
            <button aria-label="Próximo" onClick={() => rolar(1)}>›</button>
          </div>
        </div>
        <div className="ped-trilho" id={`trilho-${id}`}>
          {itens.map((p) => (
            <ProdutoCard key={p.id} produto={p} onAdd={onAdd} qty={qtyOf(p.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PedidosPage() {
  // produtos: demo como valor inicial (sem flash), banco assume se existir
  const [PRODUTOS, setProdutos] = useState(PRODUTOS_DEMO);
  useEffect(() => { getProdutos().then(setProdutos); }, []);

  // filtros da loja (nav) + banner de destaque do slot "loja"
  const [marca, setMarca] = useState("");
  const [ordem, setOrdem] = useState("relevancia");
  const [categorias, setCategorias] = useState(CATEGORIAS_DEMO.filter((c) => c.id !== "todos"));
  useEffect(() => { getCategorias().then(setCategorias); }, []);
  const marcas = [...new Set(PRODUTOS.map((p) => p.marca))].sort();

  const [cat, setCat] = useState("todos");
  const [busca, setBusca] = useState("");
  const [carrinho, setCarrinho] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Load carrinho do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCarrinho(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
    } catch {}
  }, [carrinho]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = (produto, delta = 1) => {
    setCarrinho((prev) => {
      const found = prev.find((i) => i.id === produto.id);
      if (found) {
        const newQty = found.qty + delta;
        if (newQty <= 0) return prev.filter((i) => i.id !== produto.id);
        return prev.map((i) => i.id === produto.id ? { ...i, qty: newQty } : i);
      }
      if (delta <= 0) return prev;
      return [...prev, { ...produto, qty: 1 }];
    });
    if (delta > 0 && !drawerOpen) {
      // Toast + pulse no icone do carrinho
      setToast({ produto, ts: Date.now() });
      const btn = document.querySelector(".ped-cart-btn");
      if (btn) {
        btn.classList.remove("ped-cart-pulse");
        void btn.offsetWidth;
        btn.classList.add("ped-cart-pulse");
      }
    }
  };

  const clearCart = () => setCarrinho([]);

  const total = carrinho.reduce((s, i) => s + i.preco * i.qty, 0);
  const cartCount = carrinho.reduce((s, i) => s + i.qty, 0);
  const qtyOf = (id) => carrinho.find((i) => i.id === id)?.qty || 0;

  const q = busca.trim().toLowerCase();
  const filtrados = PRODUTOS.filter((p) => {
    if (cat !== "todos" && p.cat !== cat) return false;
    if (marca && p.marca !== marca) return false;
    if (!q) return true;
    return (
      p.nome.toLowerCase().includes(q) ||
      p.marca.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    if (ordem === "menor") return a.preco - b.preco;
    if (ordem === "maior") return b.preco - a.preco;
    if (ordem === "az") return a.nome.localeCompare(b.nome, "pt-BR");
    return (a.ordem ?? a.id) - (b.ordem ?? b.id);
  });

  const destaques = PRODUTOS.filter((p) => p.destaque);

  return (
    <div className="ped-page">
      <PedidosNav cartCount={cartCount} onOpenCart={() => setDrawerOpen(true)}
        marcas={marcas} marca={marca} setMarca={setMarca} ordem={ordem} setOrdem={setOrdem} />

      <PedidosHero busca={busca} setBusca={setBusca} />

      <section className="ped-ofertas" aria-label="Destaques">
        <OfertasCarrossel slot="loja" fallbackSlot="bio" max={5} />
      </section>

      <PedidosCategorias categorias={categorias} ativa={cat} onChange={setCat} />

      {/* ============ ESTANTES ============
          Sem busca: uma estante por categoria, deslizando pro lado.
          Com busca: grid unico de resultados. */}
      {q ? (
        <section className="ped-catalogo-sec">
          <div className="ped-section-inner">
            <div className="ped-section-head">
              <div>
                <span className="ped-section-tag" style={{ color: COLORS.orange }}>
                  <span style={{ background: COLORS.orange }} /> Busca
                </span>
                <h2 className="ped-section-title">
                  {`${filtrados.length} resultado${filtrados.length !== 1 ? "s" : ""} para "${busca}"`}
                </h2>
              </div>
            </div>
            {filtrados.length === 0 ? (
              <div className="ped-empty-search">
                <div className="ped-empty-emoji">🎨</div>
                <p>Nenhum produto encontrado.</p>
                <span>Tente outra busca ou escolha outra estante.</span>
              </div>
            ) : (
              <div className="ped-grid">
                {filtrados.map((p) => (
                  <ProdutoCard key={p.id} produto={p} onAdd={addToCart} qty={qtyOf(p.id)} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="ped-estantes">
          {categorias.map((c, idx) => {
            const itens = filtrados.filter((p) => p.cat === c.id);
            if (!itens.length) return null;
            const cor = [COLORS.blue, COLORS.pink, COLORS.orange, COLORS.green, COLORS.yellow, COLORS.red][idx % 6];
            return (
              <Estante key={c.id} id={c.id} categoria={c} cor={cor}
                itens={itens} onAdd={addToCart} qtyOf={qtyOf} />
            );
          })}
        </div>
      )}

      {/* Ajuda */}
      <section className="ped-ajuda-sec">
        <div className="ped-section-inner">
          <div className="ped-ajuda-card">
            <div className="ped-ajuda-emoji">💬</div>
            <div>
              <h3 className="ped-ajuda-title">Não encontrou o que queria?</h3>
              <p className="ped-ajuda-sub">Manda mensagem no WhatsApp com o que precisa — a gente procura pra você. A NAP tem muito mais na loja física.</p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Oi NAP! Estou na loja online e queria ajuda pra encontrar um produto específico.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ped-ajuda-btn"
            >
              <IconWhats width="16" height="16" />
              Falar com a NAP
            </a>
          </div>
        </div>
      </section>

      <PedidosFooter />

      {/* Carrinho flutuante */}
      {cartCount > 0 && !drawerOpen && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="ped-fab"
          aria-label={`Abrir carrinho (${cartCount})`}
        >
          <IconCart width="22" height="22" />
          <span className="ped-fab-count">{cartCount}</span>
          <span className="ped-fab-total">{fmt(total)}</span>
        </button>
      )}

      <CarrinhoDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        carrinho={carrinho}
        onUpdate={addToCart}
        onClear={clearCart}
        total={total}
      />

      <ScrollTop />

      {/* Toast "Adicionado ao carrinho" */}
      {toast && (
        <div
          key={toast.ts}
          className="ped-toast"
          role="status"
          aria-live="polite"
        >
          <div className="ped-toast-icon" style={{ background: toast.produto.cor }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className="ped-toast-body">
            <div className="ped-toast-title">Adicionado ao pedido!</div>
            <div className="ped-toast-msg">{toast.produto.nome}</div>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="ped-toast-btn"
            aria-label="Ver carrinho"
          >
            Ver
          </button>
        </div>
      )}
    </div>
  );
}
