"use client";

import { useState, useEffect } from "react";
import { COLORS, WHATSAPP_NUMBER, RevealWrap } from "../page";
import ScrollTop from "../components/ScrollTop";

// ============ PRODUTOS MOCKADOS ============

const CATEGORIAS = [
  { id: "todos", label: "Todos", emoji: "🎨" },
  { id: "tintas", label: "Tintas", emoji: "🪣" },
  { id: "texturas", label: "Texturas", emoji: "✨" },
  { id: "massas", label: "Massas & Fundos", emoji: "🧱" },
  { id: "acessorios", label: "Acessórios", emoji: "🖌️" },
];

const PRODUTOS = [
  // TINTAS
  { id: 1, cat: "tintas", marca: "Suvinil", nome: "Látex Premium Branco Neve", rendimento: "350 m²/galão", embalagem: "Galão 3,6L", preco: 189.90, cor: COLORS.blue, swatch: "#FAFAFA", destaque: true },
  { id: 2, cat: "tintas", marca: "Coral", nome: "Acrílica Fachada Anti-Mofo", rendimento: "280 m²/galão", embalagem: "Galão 3,6L", preco: 239.90, cor: COLORS.green, swatch: "#E8F5E9" },
  { id: 3, cat: "tintas", marca: "Sherwin-Williams", nome: "Esmalte Sintético Brilho", rendimento: "200 m²/galão", embalagem: "Galão 3,6L", preco: 159.90, cor: COLORS.red, swatch: "#D32F2F" },
  { id: 4, cat: "tintas", marca: "Lukscolor", nome: "Tinta Epóxi Piso Industrial", rendimento: "160 m²/galão", embalagem: "Galão 3,6L", preco: 329.90, cor: COLORS.darkBlue, swatch: "#37474F", destaque: true },
  { id: 5, cat: "tintas", marca: "Suvinil", nome: "Ultrabranco Fosco para Teto", rendimento: "420 m²/galão", embalagem: "Lata 18L", preco: 589.90, cor: COLORS.blue, swatch: "#FFFFFF" },
  { id: 6, cat: "tintas", marca: "Eucatex", nome: "Látex Rosa Chá Econômica", rendimento: "300 m²/galão", embalagem: "Galão 3,6L", preco: 129.90, cor: COLORS.pink, swatch: "#FCE4EC" },
  { id: 7, cat: "tintas", marca: "Coral", nome: "Acrílica Amarelo Manteiga", rendimento: "280 m²/galão", embalagem: "Galão 3,6L", preco: 219.90, cor: COLORS.yellow, swatch: "#FFF59D" },
  { id: 8, cat: "tintas", marca: "Iquine", nome: "Látex Azul Anil Profundo", rendimento: "290 m²/galão", embalagem: "Galão 3,6L", preco: 199.90, cor: COLORS.blue, swatch: "#1B3A8C" },

  // TEXTURAS
  { id: 20, cat: "texturas", marca: "Quartzolit", nome: "Grafiato Riscado Branco", rendimento: "20 m²/lata", embalagem: "Lata 25kg", preco: 189.00, cor: COLORS.yellow, swatch: "#F5F5DC", destaque: true },
  { id: 21, cat: "texturas", marca: "Suvinil", nome: "Textura Rústica Projetada", rendimento: "15 m²/lata", embalagem: "Lata 18L", preco: 349.90, cor: COLORS.orange, swatch: "#D7CCC8" },
  { id: 22, cat: "texturas", marca: "Coral", nome: "Efeito Cimento Queimado", rendimento: "25 m²/kit", embalagem: "Kit 5kg", preco: 279.00, cor: COLORS.darkBlue, swatch: "#9E9E9E" },
  { id: 23, cat: "texturas", marca: "Suvinil", nome: "Marmorato Decorativo", rendimento: "18 m²/kit", embalagem: "Kit 5kg", preco: 399.00, cor: COLORS.pink, swatch: "#EFEBE9" },

  // MASSAS & FUNDOS
  { id: 30, cat: "massas", marca: "Quartzolit", nome: "Massa Corrida PVA", rendimento: "35 m²/galão", embalagem: "Balde 25kg", preco: 69.90, cor: COLORS.green, swatch: "#FAFAFA" },
  { id: 31, cat: "massas", marca: "Suvinil", nome: "Massa Acrílica Externa", rendimento: "30 m²/galão", embalagem: "Balde 25kg", preco: 119.90, cor: COLORS.blue, swatch: "#F5F5F5" },
  { id: 32, cat: "massas", marca: "Coral", nome: "Selador Acrílico Universal", rendimento: "180 m²/galão", embalagem: "Galão 3,6L", preco: 89.90, cor: COLORS.yellow, swatch: "#FFFDE7" },
  { id: 33, cat: "massas", marca: "Lukscolor", nome: "Fundo Preparador Parede", rendimento: "220 m²/galão", embalagem: "Galão 3,6L", preco: 99.90, cor: COLORS.orange, swatch: "#FFF3E0" },

  // ACESSÓRIOS
  { id: 40, cat: "acessorios", marca: "Atlas", nome: "Rolo de Lã 23cm + Cabo", rendimento: "—", embalagem: "Unidade", preco: 29.90, cor: COLORS.red, swatch: "#FFF8E1" },
  { id: 41, cat: "acessorios", marca: "Tigre", nome: "Trincha Profissional 2\"", rendimento: "—", embalagem: "Unidade", preco: 19.90, cor: COLORS.orange, swatch: "#FFF3E0" },
  { id: 42, cat: "acessorios", marca: "Condor", nome: "Kit Bandeja + Rolo + Cabo", rendimento: "—", embalagem: "Kit completo", preco: 49.90, cor: COLORS.green, swatch: "#E8F5E9", destaque: true },
  { id: 43, cat: "acessorios", marca: "Tigre", nome: "Fita Crepe 18mm × 50m", rendimento: "—", embalagem: "Rolo", preco: 12.90, cor: COLORS.yellow, swatch: "#FFF8E1" },
  { id: 44, cat: "acessorios", marca: "3M", nome: "Lixa d'Água Grão 220 (10un)", rendimento: "—", embalagem: "Pacote 10 folhas", preco: 24.90, cor: COLORS.darkBlue, swatch: "#ECEFF1" },
  { id: 45, cat: "acessorios", marca: "Atlas", nome: "Desempenadeira Aço Inox", rendimento: "—", embalagem: "Unidade", preco: 34.90, cor: COLORS.pink, swatch: "#FCE4EC" },
];

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

function PedidosNav({ cartCount, onOpenCart }) {
  return (
    <nav className="ped-nav">
      <div className="ped-nav-inner">
        <a href="/" target="_blank" rel="noopener noreferrer" className="ped-logo">
          <img src="/nap-logo.jpg" alt="NAP" className="ped-logo-img" />
          <div>
            <div className="ped-logo-nap">NAP TINTAS</div>
            <div className="ped-logo-sub">Loja Online</div>
          </div>
        </a>
        <div className="ped-nav-links">
          <a href="/" target="_blank" rel="noopener noreferrer" className="ped-nav-link">Institucional</a>
          <a href="/colorindo-com-a-nap" target="_blank" rel="noopener noreferrer" className="ped-nav-link">Parceiro</a>
          <a href="/centro-treinamento" target="_blank" rel="noopener noreferrer" className="ped-nav-link">Espaço Pintor</a>
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

function PedidosCategorias({ ativa, onChange }) {
  return (
    <div className="ped-cats">
      <div className="ped-cats-inner">
        {CATEGORIAS.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
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
  return (
    <div className="ped-prod-card">
      {produto.destaque && <span className="ped-prod-destaque">Destaque</span>}

      <div className="ped-prod-swatch" style={{ background: produto.swatch }}>
        {/* Simulação de lata de tinta SVG */}
        <svg viewBox="0 0 120 120" width="88" height="88" aria-hidden>
          <ellipse cx="60" cy="105" rx="42" ry="7" fill="rgba(0,0,0,0.1)" />
          <path d="M22 32 Q22 20 60 20 Q98 20 98 32 V95 Q98 107 60 107 Q22 107 22 95 Z" fill={produto.cor} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
          <ellipse cx="60" cy="32" rx="38" ry="8" fill={produto.cor} stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
          <ellipse cx="60" cy="32" rx="32" ry="5" fill={produto.swatch} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
          <path d="M58 14 Q60 9 62 14 Q64 20 60 26 Q56 20 58 14 Z" fill={produto.cor} opacity="0.8" />
          <rect x="30" y="55" width="60" height="22" rx="2" fill="white" opacity="0.95" />
          <text x="60" y="69" textAnchor="middle" fill={produto.cor} fontSize="9" fontWeight="900" fontFamily="Poppins, sans-serif">NAP</text>
        </svg>
      </div>

      <div className="ped-prod-body">
        <div className="ped-prod-marca">{produto.marca}</div>
        <h3 className="ped-prod-nome">{produto.nome}</h3>
        <div className="ped-prod-meta">
          <span>{produto.embalagem}</span>
          {produto.rendimento !== "—" && (
            <>
              <span className="ped-prod-sep">·</span>
              <span>{produto.rendimento}</span>
            </>
          )}
        </div>
        <div className="ped-prod-footer">
          <div className="ped-prod-preco">{fmt(produto.preco)}</div>
          {qty > 0 ? (
            <div className="ped-prod-qty">
              <button onClick={() => onAdd(produto, -1)} className="ped-qty-btn" aria-label="Remover"><IconMinus width="14" height="14" /></button>
              <span className="ped-qty-num">{qty}</span>
              <button onClick={() => onAdd(produto, 1)} className="ped-qty-btn" aria-label="Adicionar"><IconPlus width="14" height="14" /></button>
            </div>
          ) : (
            <button onClick={() => onAdd(produto, 1)} className="ped-add-btn">
              <IconPlus width="14" height="14" /> Adicionar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ CARRINHO DRAWER ============

function CarrinhoDrawer({ open, onClose, carrinho, onUpdate, onClear, total }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  const finalizarWpp = () => {
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
            <a href="/" target="_blank" rel="noopener noreferrer" className="ped-footer-link">Site institucional</a>
            <a href="/colorindo-com-a-nap" target="_blank" rel="noopener noreferrer" className="ped-footer-link">Formação pra pintor</a>
            <a href="/centro-treinamento" target="_blank" rel="noopener noreferrer" className="ped-footer-link">Espaço do Pintor</a>
            <a href="/bio" target="_blank" rel="noopener noreferrer" className="ped-footer-link">Link na bio</a>
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

export default function PedidosPage() {
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
    if (!q) return true;
    return (
      p.nome.toLowerCase().includes(q) ||
      p.marca.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q)
    );
  });

  const destaques = PRODUTOS.filter((p) => p.destaque);

  return (
    <div className="ped-page">
      <PedidosNav cartCount={cartCount} onOpenCart={() => setDrawerOpen(true)} />

      <PedidosHero busca={busca} setBusca={setBusca} />

      <PedidosCategorias ativa={cat} onChange={setCat} />

      {/* Destaques — só quando nao ha busca nem filtro */}
      {cat === "todos" && !q && (
        <section className="ped-destaques-sec">
          <div className="ped-section-inner">
            <RevealWrap>
              <div className="ped-section-head">
                <div>
                  <span className="ped-section-tag" style={{ color: COLORS.pink }}>
                    <span style={{ background: COLORS.pink }} /> Em destaque
                  </span>
                  <h2 className="ped-section-title">Queridinhos da família NAP</h2>
                </div>
              </div>
            </RevealWrap>
            <div className="ped-grid">
              {destaques.map((p) => (
                <ProdutoCard key={p.id} produto={p} onAdd={addToCart} qty={qtyOf(p.id)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catalogo geral */}
      <section className="ped-catalogo-sec">
        <div className="ped-section-inner">
          <div className="ped-section-head">
            <div>
              <span className="ped-section-tag" style={{ color: COLORS.orange }}>
                <span style={{ background: COLORS.orange }} />
                {cat === "todos" ? "Todo o catálogo" : CATEGORIAS.find((c) => c.id === cat)?.label}
              </span>
              <h2 className="ped-section-title">
                {q
                  ? `${filtrados.length} resultado${filtrados.length !== 1 ? "s" : ""} para "${busca}"`
                  : "Escolha, adicione e feche o pedido."}
              </h2>
            </div>
          </div>
          {filtrados.length === 0 ? (
            <div className="ped-empty-search">
              <div className="ped-empty-emoji">🎨</div>
              <p>Nenhum produto encontrado.</p>
              <span>Tente outra busca ou escolha outra categoria.</span>
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
