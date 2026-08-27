"use client";

// ============================================================
// SUPER ADMIN DA LOJA (Bloco 5, 28/08)
// - Sem banco (.env vazio): MODO DEMO — entra sem senha, alteracoes
//   persistem no localStorage deste navegador (a loja e a bio refletem).
// - Com banco: login Supabase (email/senha) + verificacao na tabela
//   admins; o RLS garante a seguranca real das escritas.
// ============================================================

import { useEffect, useMemo, useState } from "react";
import { COLORS } from "../lib/constants";
import { temBanco, adminLogin, adminLogout, adminSessao,
  getCategorias, upsertCategoria, deleteCategoria,
  adminListProdutos, upsertProduto, deleteProduto,
  adminListBanners, upsertBanner, deleteBanner, uploadImagem,
  adminListClientes, adminListPedidos } from "../lib/db";

const fmt = (v) => Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const CORES_MARCA = [
  ["Azul", COLORS.blue], ["Verde", COLORS.green], ["Amarelo", COLORS.yellow],
  ["Laranja", COLORS.orange], ["Vermelho", COLORS.red], ["Rosa", COLORS.pink],
  ["Navy", COLORS.darkBlue],
];

// ---------------- LOGIN ----------------
function Login({ onOk }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const entrar = async (e) => {
    e?.preventDefault();
    setCarregando(true); setErro("");
    const r = await adminLogin(email, senha);
    setCarregando(false);
    r.ok ? onOk() : setErro(r.error || "Falha no login.");
  };

  return (
    <div className="adm-login-wrap">
      <form className="adm-login" onSubmit={entrar}>
        <img src="/nap-logo.jpg" alt="NAP Tintas" className="adm-login-logo" />
        <h1>Super Admin</h1>
        <p className="adm-login-sub">Gestão da loja online NAP Tintas</p>
        {temBanco ? (
          <>
            <label>E-mail
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
            </label>
            <label>Senha
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required autoComplete="current-password" />
            </label>
            {erro && <div className="adm-erro">{erro}</div>}
            <button type="submit" className="adm-btn-primario" disabled={carregando}>
              {carregando ? "Entrando…" : "Entrar"}
            </button>
          </>
        ) : (
          <>
            <div className="adm-demo-aviso">
              <strong>Modo demonstração</strong> — sem banco conectado. As alterações
              valem só neste navegador. Conecte o Supabase (ver README) para ativar
              o login real.
            </div>
            <button type="button" className="adm-btn-primario" onClick={onOk}>
              Entrar em modo demonstração
            </button>
          </>
        )}
        <a className="adm-login-voltar" href="/bio">← Voltar ao site</a>
      </form>
    </div>
  );
}

// ---------------- CAMPO DE IMAGEM (upload ou URL) ----------------
function CampoImagem({ valor, onChange }) {
  const [enviando, setEnviando] = useState(false);
  const [msg, setMsg] = useState("");
  const upload = async (file) => {
    if (!file) return;
    setEnviando(true); setMsg("");
    const r = await uploadImagem(file);
    setEnviando(false);
    if (r.ok) onChange(r.url);
    else setMsg(r.error);
  };
  return (
    <div className="adm-img-campo">
      <label>Imagem (URL)
        <input type="text" placeholder="https://… ou /ofertas/oferta-1.webp"
          value={valor || ""} onChange={(e) => onChange(e.target.value)} />
      </label>
      {temBanco && (
        <label className="adm-img-upload">
          {enviando ? "Enviando…" : "📤 Enviar arquivo"}
          <input type="file" accept="image/*" hidden
            onChange={(e) => upload(e.target.files?.[0])} />
        </label>
      )}
      {msg && <div className="adm-erro">{msg}</div>}
      {valor && <img src={valor} alt="" className="adm-img-preview" />}
    </div>
  );
}

// ---------------- PRODUTOS ----------------
function FormProduto({ inicial, categorias, onSalvar, onFechar }) {
  const [p, setP] = useState(inicial || {
    cat: "tintas", marca: "", nome: "", descricao: "", rendimento: "",
    embalagem: "", preco: "", preco_de: "", cor: COLORS.blue, swatch: "#FFFFFF",
    imagem_url: "", destaque: false, ativo: true,
  });
  const set = (k, v) => setP((x) => ({ ...x, [k]: v }));
  const salvar = async (e) => {
    e.preventDefault();
    const num = (v) => parseFloat(String(v ?? "").replace(",", ".")) || null;
    await onSalvar({ ...p, preco: num(p.preco) || 0, preco_de: num(p.preco_de) });
  };
  return (
    <div className="adm-modal-fundo" onClick={onFechar}>
      <form className="adm-modal" onClick={(e) => e.stopPropagation()} onSubmit={salvar}>
        <h2>{p.id ? "Editar produto" : "Novo produto"}</h2>
        <div className="adm-grid2">
          <label>Nome*
            <input value={p.nome} onChange={(e) => set("nome", e.target.value)} required />
          </label>
          <label>Marca*
            <input value={p.marca} onChange={(e) => set("marca", e.target.value)} required />
          </label>
          <label>Estante (categoria)
            <select value={p.cat} onChange={(e) => set("cat", e.target.value)}>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
              ))}
            </select>
          </label>
          <label>Preço (R$)*
            <input inputMode="decimal" value={p.preco}
              onChange={(e) => set("preco", e.target.value)} required />
          </label>
          <label>Preço “De” — riscado (deixe vazio se não for oferta)
            <input inputMode="decimal" placeholder="ex.: 219,90" value={p.preco_de || ""}
              onChange={(e) => set("preco_de", e.target.value)} />
          </label>
          <label>Embalagem
            <input placeholder="Galão 3,6L" value={p.embalagem || ""}
              onChange={(e) => set("embalagem", e.target.value)} />
          </label>
          <label>Rendimento
            <input placeholder="350 m²/galão" value={p.rendimento || ""}
              onChange={(e) => set("rendimento", e.target.value)} />
          </label>
          <label>Cor de destaque do card
            <select value={p.cor} onChange={(e) => set("cor", e.target.value)}>
              {CORES_MARCA.map(([n, hex]) => <option key={hex} value={hex}>{n}</option>)}
            </select>
          </label>
          <label>Amostra da cor (swatch)
            <div className="adm-swatch-linha">
              <input type="color" value={p.swatch || "#FFFFFF"}
                onChange={(e) => set("swatch", e.target.value)} />
              <input value={p.swatch || ""} onChange={(e) => set("swatch", e.target.value)} />
            </div>
          </label>
        </div>
        <label>Descrição
          <textarea rows={3} value={p.descricao || ""}
            onChange={(e) => set("descricao", e.target.value)} />
        </label>
        <CampoImagem valor={p.imagem_url} onChange={(v) => set("imagem_url", v)} />
        <div className="adm-check-linha">
          <label className="adm-check">
            <input type="checkbox" checked={!!p.destaque}
              onChange={(e) => set("destaque", e.target.checked)} />
            ⭐ Destaque (aparece nos “Queridinhos”)
          </label>
          <label className="adm-check">
            <input type="checkbox" checked={p.ativo !== false}
              onChange={(e) => set("ativo", e.target.checked)} />
            Ativo na loja
          </label>
        </div>
        <div className="adm-modal-acoes">
          <button type="button" className="adm-btn-fantasma" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="adm-btn-primario">Salvar</button>
        </div>
      </form>
    </div>
  );
}

function AbaProdutos() {
  const [lista, setLista] = useState([]);
  const [categorias, setCategorias] = useState([]);
  useEffect(() => { getCategorias().then(setCategorias); }, []);
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState(null); // null | {} | produto
  const carregar = () => adminListProdutos().then(setLista);
  useEffect(() => { carregar(); }, []);

  const filtrada = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return lista;
    return lista.filter((p) =>
      [p.nome, p.marca, p.cat].join(" ").toLowerCase().includes(q));
  }, [lista, busca]);

  const salvar = async (p) => {
    const r = await upsertProduto(p);
    if (!r.ok) return alert(r.error);
    setEditando(null); carregar();
  };
  const excluir = async (p) => {
    if (!confirm(`Excluir "${p.nome}"? Essa ação não tem volta.`)) return;
    const r = await deleteProduto(p.id);
    r.ok ? carregar() : alert(r.error);
  };

  return (
    <div>
      <div className="adm-barra">
        <input className="adm-busca" placeholder="Buscar por nome, marca ou categoria…"
          value={busca} onChange={(e) => setBusca(e.target.value)} />
        <button className="adm-btn-primario" onClick={() => setEditando({})}>+ Novo produto</button>
      </div>
      <div className="adm-tabela-wrap">
        <table className="adm-tabela">
          <thead>
            <tr><th></th><th>Produto</th><th>Categoria</th><th>Preço</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtrada.map((p) => (
              <tr key={p.id} className={p.ativo === false ? "adm-inativo" : ""}>
                <td><span className="adm-swatch" style={{ background: p.swatch }} /></td>
                <td>
                  <strong>{p.nome}</strong>
                  <span className="adm-sub">{p.marca} · {p.embalagem}</span>
                </td>
                <td className="adm-cap">{p.cat}</td>
                <td className="adm-preco">{fmt(p.preco)}</td>
                <td>
                  {p.destaque && <span className="adm-tag adm-tag-destaque">⭐ destaque</span>}
                  <span className={`adm-tag ${p.ativo === false ? "adm-tag-off" : "adm-tag-on"}`}>
                    {p.ativo === false ? "inativo" : "ativo"}
                  </span>
                </td>
                <td className="adm-acoes">
                  <button onClick={() => setEditando(p)}>✏️</button>
                  <button onClick={() => excluir(p)}>🗑️</button>
                </td>
              </tr>
            ))}
            {!filtrada.length && (
              <tr><td colSpan={6} className="adm-vazio">Nenhum produto encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {editando !== null && (
        <FormProduto inicial={editando.id ? editando : null} categorias={categorias}
          onSalvar={salvar} onFechar={() => setEditando(null)} />
      )}
    </div>
  );
}

// ---------------- BANNERS ----------------
function FormBanner({ slot, inicial, onSalvar, onFechar }) {
  const [b, setB] = useState(inicial || {
    slot, titulo: "", alt: "", imagem_url: "", href: "/pedidos", ativo: true,
  });
  const set = (k, v) => setB((x) => ({ ...x, [k]: v }));
  return (
    <div className="adm-modal-fundo" onClick={onFechar}>
      <form className="adm-modal" onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => { e.preventDefault(); onSalvar(b); }}>
        <h2>{b.id ? "Editar banner" : `Novo banner (${slot})`}</h2>
        <label>Título
          <input value={b.titulo || ""} onChange={(e) => set("titulo", e.target.value)} />
        </label>
        <label>Texto alternativo (acessibilidade)
          <input value={b.alt || ""} onChange={(e) => set("alt", e.target.value)} />
        </label>
        <CampoImagem valor={b.imagem_url} onChange={(v) => set("imagem_url", v)} />
        <label>Link ao clicar
          <input value={b.href || ""} onChange={(e) => set("href", e.target.value)} />
        </label>
        <label className="adm-check">
          <input type="checkbox" checked={b.ativo !== false}
            onChange={(e) => set("ativo", e.target.checked)} />
          Ativo
        </label>
        <div className="adm-modal-acoes">
          <button type="button" className="adm-btn-fantasma" onClick={onFechar}>Cancelar</button>
          <button type="submit" className="adm-btn-primario" disabled={!b.imagem_url}>Salvar</button>
        </div>
      </form>
    </div>
  );
}

function AbaBanners({ slot }) {
  const [lista, setLista] = useState([]);
  const [editando, setEditando] = useState(null);
  const carregar = () => adminListBanners(slot).then(setLista);
  useEffect(() => { carregar(); }, [slot]);

  const salvar = async (b) => {
    const r = await upsertBanner({ ...b, slot });
    if (!r.ok) return alert(r.error);
    setEditando(null); carregar();
  };
  const excluir = async (b) => {
    if (!confirm(`Excluir o banner "${b.titulo || b.id}"?`)) return;
    const r = await deleteBanner(b.id);
    r.ok ? carregar() : alert(r.error);
  };
  const mover = async (i, delta) => {
    const j = i + delta;
    if (j < 0 || j >= lista.length) return;
    const a = lista[i], b = lista[j];
    await upsertBanner({ id: a.id, slot, ordem: b.ordem });
    await upsertBanner({ id: b.id, slot, ordem: a.ordem });
    carregar();
  };

  return (
    <div>
      <div className="adm-barra">
        <p className="adm-dica">
          {slot === "bio"
            ? "Este carrossel aparece no topo do Link Bio."
            : "Este banner aparece no topo da Loja."} A ordem aqui é a ordem de exibição.
        </p>
        <button className="adm-btn-primario" onClick={() => setEditando({})}>+ Novo banner</button>
      </div>
      <div className="adm-banners">
        {lista.map((b, i) => (
          <div key={b.id} className={`adm-banner-item ${b.ativo === false ? "adm-inativo" : ""}`}>
            <img src={b.imagem_url} alt={b.alt || ""} />
            <div className="adm-banner-info">
              <strong>{b.titulo || `Banner ${b.id}`}</strong>
              <span className="adm-sub">{b.href}</span>
              <span className={`adm-tag ${b.ativo === false ? "adm-tag-off" : "adm-tag-on"}`}>
                {b.ativo === false ? "inativo" : "ativo"}
              </span>
            </div>
            <div className="adm-banner-acoes">
              <button title="Subir" onClick={() => mover(i, -1)} disabled={i === 0}>↑</button>
              <button title="Descer" onClick={() => mover(i, 1)} disabled={i === lista.length - 1}>↓</button>
              <button onClick={() => setEditando(b)}>✏️</button>
              <button onClick={() => excluir(b)}>🗑️</button>
            </div>
          </div>
        ))}
        {!lista.length && <div className="adm-vazio">Nenhum banner neste espaço ainda.</div>}
      </div>
      {editando !== null && (
        <FormBanner slot={slot} inicial={editando.id ? editando : null}
          onSalvar={salvar} onFechar={() => setEditando(null)} />
      )}
    </div>
  );
}

// ---------------- ESTANTES (categorias da loja) ----------------
function AbaEstantes() {
  const [lista, setLista] = useState([]);
  const [label, setLabel] = useState("");
  const [emoji, setEmoji] = useState("🎨");
  const carregar = () => getCategorias().then(setLista);
  useEffect(() => { carregar(); }, []);

  const criar = async (e) => {
    e.preventDefault();
    if (!label.trim()) return;
    const r = await upsertCategoria({ label: label.trim(), emoji: emoji || "🎨" });
    if (!r.ok) return alert(r.error);
    setLabel(""); setEmoji("🎨"); carregar();
  };
  const excluir = async (c) => {
    if (!confirm(`Excluir a estante "${c.label}"? Os produtos dela ficam sem estante até serem reclassificados.`)) return;
    const r = await deleteCategoria(c.id);
    r.ok ? carregar() : alert(r.error);
  };
  const mover = async (i, delta) => {
    const j = i + delta;
    if (j < 0 || j >= lista.length) return;
    await upsertCategoria({ ...lista[i], ordem: lista[j].ordem });
    await upsertCategoria({ ...lista[j], ordem: lista[i].ordem });
    carregar();
  };

  return (
    <div>
      <form className="adm-barra" onSubmit={criar}>
        <input className="adm-busca" placeholder="Nome da nova estante (ex.: Equipamentos)"
          value={label} onChange={(e) => setLabel(e.target.value)} />
        <input style={{ width: 64, textAlign: "center" }} value={emoji}
          onChange={(e) => setEmoji(e.target.value)} aria-label="Emoji" />
        <button type="submit" className="adm-btn-primario">+ Criar estante</button>
      </form>
      <div className="adm-banners">
        {lista.map((c, i) => (
          <div key={c.id} className="adm-banner-item" style={{ gridTemplateColumns: "auto 1fr auto" }}>
            <span style={{ fontSize: 26 }}>{c.emoji}</span>
            <div className="adm-banner-info">
              <strong>{c.label}</strong>
              <span className="adm-sub">/{c.id} · ordem {c.ordem}</span>
            </div>
            <div className="adm-banner-acoes">
              <button title="Subir" onClick={() => mover(i, -1)} disabled={i === 0}>↑</button>
              <button title="Descer" onClick={() => mover(i, 1)} disabled={i === lista.length - 1}>↓</button>
              <button onClick={() => excluir(c)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
      <p className="adm-dica" style={{ marginTop: 14 }}>
        A ordem aqui define a ordem das estantes na loja. Produtos são
        classificados nas estantes pelo campo “Estante” de cada produto.
      </p>
    </div>
  );
}

// ---------------- CLIENTES + PEDIDOS ----------------
function AbaClientes() {
  const [lista, setLista] = useState([]);
  useEffect(() => { adminListClientes().then(setLista); }, []);
  return (
    <div className="adm-tabela-wrap">
      <table className="adm-tabela">
        <thead><tr><th>Nome</th><th>WhatsApp</th><th>E-mail</th><th>Cadastro</th></tr></thead>
        <tbody>
          {lista.map((c) => (
            <tr key={c.id}>
              <td><strong>{c.nome}</strong></td>
              <td>{c.whatsapp}</td>
              <td>{c.email || "—"}</td>
              <td>{new Date(c.criado_em).toLocaleDateString("pt-BR")}</td>
            </tr>
          ))}
          {!lista.length && <tr><td colSpan={4} className="adm-vazio">Nenhum cliente cadastrado ainda.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function AbaPedidos() {
  const [lista, setLista] = useState([]);
  useEffect(() => { adminListPedidos().then(setLista); }, []);
  return (
    <div className="adm-tabela-wrap">
      <table className="adm-tabela">
        <thead><tr><th>#</th><th>Itens</th><th>Total</th><th>Status</th><th>Data</th></tr></thead>
        <tbody>
          {lista.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{(p.itens || []).map((i) => `${i.qtd}× ${i.nome}`).join(", ")}</td>
              <td className="adm-preco">{fmt(p.total)}</td>
              <td><span className="adm-tag adm-tag-on">{p.status}</span></td>
              <td>{new Date(p.criado_em).toLocaleString("pt-BR")}</td>
            </tr>
          ))}
          {!lista.length && <tr><td colSpan={5} className="adm-vazio">Nenhum pedido registrado ainda.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

// ---------------- SHELL ----------------
const ABAS = [
  ["produtos", "📦 Produtos"],
  ["estantes", "🗂️ Estantes"],
  ["banner-bio", "🎯 Banner Bio"],
  ["banner-loja", "🏪 Banner Loja"],
  ["clientes", "👥 Clientes"],
  ["pedidos", "🧾 Pedidos"],
];

export default function AdminPage() {
  const [logado, setLogado] = useState(false);
  const [carregou, setCarregou] = useState(false);
  const [aba, setAba] = useState("produtos");

  useEffect(() => {
    adminSessao().then((s) => { if (s) setLogado(true); setCarregou(true); });
  }, []);

  if (!carregou) return null;
  if (!logado) return <Login onOk={() => setLogado(true)} />;

  return (
    <div className="adm">
      <header className="adm-topo">
        <div className="adm-topo-marca">
          <img src="/nap-logo.jpg" alt="" />
          <div>
            <strong>NAP Tintas</strong>
            <span>Super Admin{!temBanco && " · demonstração"}</span>
          </div>
        </div>
        <div className="adm-topo-acoes">
          <a href="/pedidos" className="adm-link">Ver a loja ↗</a>
          <button className="adm-btn-fantasma"
            onClick={async () => { await adminLogout(); setLogado(false); }}>
            Sair
          </button>
        </div>
      </header>

      {!temBanco && (
        <div className="adm-demo-faixa">
          Modo demonstração: alterações valem só neste navegador. Conecte o
          Supabase (README) para gestão real.
        </div>
      )}

      <nav className="adm-abas">
        {ABAS.map(([id, label]) => (
          <button key={id} className={aba === id ? "on" : ""} onClick={() => setAba(id)}>
            {label}
          </button>
        ))}
      </nav>

      <main className="adm-conteudo">
        {aba === "produtos" && <AbaProdutos />}
        {aba === "estantes" && <AbaEstantes />}
        {aba === "banner-bio" && <AbaBanners slot="bio" />}
        {aba === "banner-loja" && <AbaBanners slot="loja" />}
        {aba === "clientes" && <AbaClientes />}
        {aba === "pedidos" && <AbaPedidos />}
      </main>
    </div>
  );
}
