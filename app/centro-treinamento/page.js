"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const WHATSAPP_NUMBER = "5515999999999";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Vim do Portal do Pintor da NAP e gostaria de saber mais!`;

const COLORS = {
  blue: "#1B3A8C",
  green: "#4CAF50",
  yellow: "#F9A825",
  orange: "#FF6D00",
  red: "#D32F2F",
  pink: "#E91E93",
  darkBlue: "#0D1B3E",
  darkBg: "#0A0E1A",
  offWhite: "#F8F8F8",
};

// ---- DATA ----

const CURSOS = [
  // Técnicos
  { id: 1, categoria: "Técnico", color: COLORS.blue, title: "Preparação de Superfícies", desc: "Lixamento, massa corrida, selador. O que define o acabamento final.", duracao: "1h 20min", liberado: true },
  { id: 2, categoria: "Técnico", color: COLORS.blue, title: "Aplicação de Texturas e Grafiato", desc: "Técnicas profissionais de textura com desempenadeira e rolo específico.", duracao: "2h 10min", liberado: false },
  { id: 3, categoria: "Técnico", color: COLORS.blue, title: "Efeitos Decorativos: Cimento Queimado", desc: "Passo a passo do efeito cimento queimado em salas e fachadas.", duracao: "1h 45min", liberado: false },
  { id: 4, categoria: "Técnico", color: COLORS.blue, title: "Pintura Epóxi em Pisos Industriais", desc: "Aplicação de epóxi em alto tráfego, áreas químicas e garagens.", duracao: "2h 30min", liberado: false },

  // Gestão
  { id: 5, categoria: "Gestão", color: COLORS.green, title: "Precificação: Como Cobrar pelo Seu Trabalho", desc: "Fórmula real para calcular M² + hora técnica + lucro sem perder cliente.", duracao: "55 min", liberado: true },
  { id: 6, categoria: "Gestão", color: COLORS.green, title: "Fluxo de Caixa para Pintor Autônomo", desc: "Como separar PF de PJ, controlar entradas/saídas e não quebrar.", duracao: "1h 15min", liberado: false },
  { id: 7, categoria: "Gestão", color: COLORS.green, title: "Formalização: MEI para Pintor", desc: "Passo a passo do MEI, obrigações mensais e benefícios fiscais.", duracao: "40 min", liberado: false },
  { id: 8, categoria: "Gestão", color: COLORS.green, title: "Gestão de Equipe e Ajudantes", desc: "Como contratar, formalizar, treinar e reter bons ajudantes.", duracao: "1h 30min", liberado: false },

  // Marketing
  { id: 9, categoria: "Marketing", color: COLORS.pink, title: "Instagram para Pintores: Feed que Converte", desc: "Grid, bio, posts de portfólio e stories que geram orçamento.", duracao: "1h 05min", liberado: true },
  { id: 10, categoria: "Marketing", color: COLORS.pink, title: "Fotos de Antes & Depois que Vendem", desc: "Técnica de fotografia de obra com celular, iluminação e enquadramento.", duracao: "50 min", liberado: false },
  { id: 11, categoria: "Marketing", color: COLORS.pink, title: "Atendimento no WhatsApp: Fechar Mais Orçamentos", desc: "Script, tempo de resposta, apresentação e objeções mais comuns.", duracao: "1h 10min", liberado: false },
  { id: 12, categoria: "Marketing", color: COLORS.pink, title: "Orçamentos Digitais: Como Apresentar ao Cliente", desc: "Modelo profissional de orçamento que passa confiança e fecha venda.", duracao: "45 min", liberado: false },
];

const AGENDA = [
  { data: "28 ABR", dia: "SEG", mes: "Abril/2026", title: "Workshop Prático: Texturas e Efeitos Decorativos", tema: "Técnico", desc: "Mão na massa com grafiato, marmorato e cimento queimado. Material incluso.", local: "NAP Tintas — Sorocaba/SP", vagas: "8 de 20" },
  { data: "05 MAI", dia: "TER", mes: "Maio/2026", title: "Precificação: Planilha + Método NAP", tema: "Gestão", desc: "Workshop com planilha pronta. Saia sabendo cobrar corretamente.", local: "NAP Tintas — Sorocaba/SP", vagas: "14 de 25" },
  { data: "12 MAI", dia: "TER", mes: "Maio/2026", title: "Pintura Epóxi em Pisos — Aula Prática", tema: "Técnico", desc: "Aplicação real de epóxi em 20m². Certificado NAP ao final.", local: "NAP Tintas — Sorocaba/SP", vagas: "6 de 15" },
  { data: "19 MAI", dia: "TER", mes: "Maio/2026", title: "Instagram para Pintor: Foto, Feed e Bio", tema: "Marketing", desc: "Seu celular é o seu catálogo. Aprenda a montar um feed vendedor.", local: "NAP Tintas — Sorocaba/SP", vagas: "11 de 20" },
  { data: "02 JUN", dia: "TER", mes: "Junho/2026", title: "Sistema Tintométrico: Misturando Cores na Prática", tema: "Técnico", desc: "Como funciona o tintométrico NAP. Casos reais e ajustes finos.", local: "NAP Tintas — Sorocaba/SP", vagas: "9 de 15" },
  { data: "16 JUN", dia: "TER", mes: "Junho/2026", title: "WhatsApp Business: Atendimento Profissional", tema: "Marketing", desc: "Bot de resposta, etiquetas, catálogo e respostas rápidas.", local: "NAP Tintas — Sorocaba/SP", vagas: "17 de 25" },
];

const PARCEIROS = [
  { nome: "Carlos Silva", cidade: "Sorocaba/SP", servico: "Textura externa — 180m²", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=600&fit=crop" },
  { nome: "Marco Antônio", cidade: "Votorantim/SP", servico: "Epóxi garagem industrial — 320m²", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop" },
  { nome: "José Roberto", cidade: "Itu/SP", servico: "Cimento queimado sala — 85m²", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop" },
  { nome: "Wesley Oliveira", cidade: "Sorocaba/SP", servico: "Fachada residencial — 240m²", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=600&fit=crop" },
  { nome: "Paulo Henrique", cidade: "Porto Feliz/SP", servico: "Grafiato condomínio — 650m²", img: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=600&h=600&fit=crop" },
  { nome: "Rafael Costa", cidade: "Sorocaba/SP", servico: "Pintura comercial loja — 140m²", img: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=600&h=600&fit=crop" },
  { nome: "Fernando Lima", cidade: "Boituva/SP", servico: "Marmorato entrada hall — 45m²", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop" },
  { nome: "Anderson Souza", cidade: "Sorocaba/SP", servico: "Pintura residencial completa — 380m²", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop" },
];

const FICHAS_TECNICAS = [
  { nome: "Tinta Látex PVA Premium", rendimento: "350 m²/galão", diluicao: "Até 20% água", secagem: "2h entre demãos", color: COLORS.blue },
  { nome: "Tinta Acrílica Fachada", rendimento: "280 m²/galão", diluicao: "Até 15% água", secagem: "4h entre demãos", color: COLORS.green },
  { nome: "Esmalte Sintético Brilhante", rendimento: "200 m²/galão", diluicao: "Aguarrás 10%", secagem: "6h entre demãos", color: COLORS.orange },
  { nome: "Tinta Epóxi Industrial", rendimento: "160 m²/galão", diluicao: "Não diluir", secagem: "24h cura total", color: COLORS.red },
];

// ---- ICONS ----

const IconPlay = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const IconLock = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

// ---- COMPONENTS ----

function Header({ onLogin }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(10,14,26,0.92)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      padding: "14px 24px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/nap-logo.jpg" alt="NAP Tintas" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 900, fontSize: 15, color: "#fff", letterSpacing: "0.06em", lineHeight: 1 }}>COLORINDO COM A NAP</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: COLORS.yellow, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>Portal do Pintor</div>
          </div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="/" target="_blank" rel="noopener noreferrer" className="header-link" style={{
            padding: "10px 18px", borderRadius: 30, textDecoration: "none",
            color: "rgba(255,255,255,0.7)", fontFamily: "'Nunito', sans-serif",
            fontSize: 13, fontWeight: 700, letterSpacing: "0.02em",
            border: "1px solid rgba(255,255,255,0.12)",
          }}>← Voltar ao site</a>
          <button onClick={onLogin} style={{
            padding: "10px 20px", borderRadius: 30, border: "none", cursor: "pointer",
            background: COLORS.yellow, color: COLORS.darkBlue,
            fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800,
            letterSpacing: "0.02em", boxShadow: `0 4px 16px ${COLORS.yellow}40`,
          }}>Entrar como Membro</button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, ${COLORS.blue} 100%)`,
      padding: "64px 24px", textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.1 }}>
        <div style={{ position: "absolute", top: "-20%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: COLORS.yellow, filter: "blur(100px)" }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "-5%", width: 350, height: 350, borderRadius: "50%", background: COLORS.pink, filter: "blur(80px)" }} />
      </div>
      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block", padding: "6px 18px", borderRadius: 30,
          background: "rgba(249,168,37,0.15)", border: "1px solid rgba(249,168,37,0.3)",
          marginBottom: 18,
        }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: COLORS.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Área do Pintor Parceiro
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontSize: "clamp(28px, 4.5vw, 44px)",
          fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16,
          letterSpacing: "-0.02em",
        }}>
          Centro de Treinamento e Capacitação
        </h1>
        <p style={{
          fontFamily: "'Nunito', sans-serif", fontSize: "clamp(15px, 2vw, 18px)",
          color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto",
        }}>
          O portal completo para o pintor profissional. Cursos técnicos, de gestão e marketing, agenda de treinamentos presenciais, vitrine de trabalhos parceiros e biblioteca técnica — tudo em um só lugar.
        </p>
      </div>
    </section>
  );
}

const TABS = [
  { id: "cursos", label: "Cursos", icon: "🎓" },
  { id: "agenda", label: "Agenda Presencial", icon: "📅" },
  { id: "parceiros", label: "Pintores Parceiros", icon: "🖼️" },
  { id: "biblioteca", label: "Biblioteca", icon: "📚" },
  { id: "indicacao", label: "Indicação", icon: "💎" },
];

function Tabs({ active, onChange }) {
  return (
    <div className="ct-tabs-wrap" style={{
      background: "rgba(255,251,242,0.96)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      position: "sticky", top: 66, zIndex: 50,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", display: "flex", gap: 4, overflowX: "auto" }}>
        {TABS.map((t) => {
          const isActive = active === t.id;
          return (
            <button key={t.id} onClick={() => onChange(t.id)} className="ct-tab" style={{
              padding: "16px 18px", border: "none", background: "none", cursor: "pointer",
              fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 800,
              color: isActive ? COLORS.darkBlue : "#6b7280",
              borderBottom: `3px solid ${isActive ? COLORS.yellow : "transparent"}`,
              transition: "all 0.2s ease", whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CursosTab({ onLock }) {
  const [filter, setFilter] = useState("Todos");
  const filtros = ["Todos", "Técnico", "Gestão", "Marketing"];
  const lista = filter === "Todos" ? CURSOS : CURSOS.filter((c) => c.categoria === filter);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 2 }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontSize: 12, color: COLORS.pink, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 800, marginBottom: 12 }}>
          <span style={{ width: 20, height: 3, background: COLORS.pink, borderRadius: 2 }} />
          Área Exclusiva
        </p>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 900, color: COLORS.darkBlue, marginBottom: 8, letterSpacing: "-0.01em" }}>Área de Membros</h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#6b7280", marginBottom: 20 }}>
          Cursos técnicos, de gestão e marketing. Alguns liberados para demo, o acervo completo é exclusivo para parceiros.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {filtros.map((f) => {
            const isActive = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "8px 16px", borderRadius: 30,
                border: `1.5px solid ${isActive ? COLORS.darkBlue : "#e5e7eb"}`,
                background: isActive ? COLORS.darkBlue : "#fff",
                color: isActive ? "#fff" : "#6b7280",
                fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s ease",
              }}>{f}</button>
            );
          })}
        </div>
      </div>

      <div className="curso-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {lista.map((c) => (
          <div key={c.id} onClick={() => !c.liberado && onLock(c)} className="curso-card" style={{
            background: "#fff", borderRadius: 16, overflow: "hidden",
            border: "1px solid #e5e7eb", cursor: c.liberado ? "default" : "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{
              height: 140, position: "relative",
              background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(255,255,255,0.95)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: c.liberado ? COLORS.green : COLORS.yellow,
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}>
                {c.liberado ? <IconPlay size={26} /> : <IconLock size={22} />}
              </div>
              <div style={{
                position: "absolute", top: 12, left: 12,
                padding: "4px 10px", borderRadius: 20,
                background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)",
                color: "#fff", fontFamily: "'Nunito', sans-serif",
                fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                {c.categoria}
              </div>
              {!c.liberado && (
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  padding: "4px 10px", borderRadius: 20,
                  background: COLORS.yellow,
                  color: COLORS.darkBlue, fontFamily: "'Nunito', sans-serif",
                  fontSize: 10, fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  Membro
                </div>
              )}
            </div>
            <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 8, lineHeight: 1.25 }}>{c.title}</h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#6b7280", lineHeight: 1.55, marginBottom: 14, flex: 1 }}>{c.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#9ca3af", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700 }}>
                <span>⏱</span> {c.duracao}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgendaTab() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 2 }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontSize: 12, color: COLORS.orange, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 800, marginBottom: 12 }}>
          <span style={{ width: 20, height: 3, background: COLORS.orange, borderRadius: 2 }} />
          Turmas Presenciais
        </p>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 900, color: COLORS.darkBlue, marginBottom: 8, letterSpacing: "-0.01em" }}>Agenda de Cursos Presenciais</h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#6b7280" }}>
          Treinamentos ao vivo na nossa loja em Sorocaba. Mão na massa, networking e certificado NAP.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {AGENDA.map((e, i) => (
          <div key={i} className="agenda-item" style={{
            background: "#fff", borderRadius: 16, padding: 24,
            border: "1px solid #e5e7eb", display: "flex", gap: 24, alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}>
            <div style={{
              flexShrink: 0, width: 90, textAlign: "center",
              padding: "14px 0", borderRadius: 12,
              background: `linear-gradient(135deg, ${COLORS.darkBlue}, ${COLORS.blue})`,
              color: "#fff",
            }}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 700, opacity: 0.75, letterSpacing: "0.08em" }}>{e.dia}</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{e.data}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{
                  padding: "3px 10px", borderRadius: 20,
                  background: e.tema === "Técnico" ? `${COLORS.blue}15` : e.tema === "Gestão" ? `${COLORS.green}15` : `${COLORS.pink}15`,
                  color: e.tema === "Técnico" ? COLORS.blue : e.tema === "Gestão" ? COLORS.green : COLORS.pink,
                  fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em",
                }}>{e.tema}</span>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#9ca3af", fontWeight: 700 }}>{e.vagas} vagas</span>
              </div>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 17, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 6 }}>{e.title}</h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#6b7280", lineHeight: 1.5, marginBottom: 8 }}>{e.desc}</p>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>📍 {e.local}</div>
            </div>
            <a href={`${WHATSAPP_URL}%20%2D%20Quero%20reservar%20vaga%20no%20curso%20%22${encodeURIComponent(e.title)}%22`} target="_blank" rel="noopener noreferrer" className="agenda-btn" style={{
              flexShrink: 0, padding: "12px 22px", borderRadius: 30,
              background: "#25D366", color: "#fff",
              fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800,
              textDecoration: "none", transition: "all 0.2s ease",
              boxShadow: "0 4px 14px rgba(37,211,102,0.25)",
            }}>Reservar vaga</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParceirosTab() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 2 }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontSize: 12, color: COLORS.green, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 800, marginBottom: 12 }}>
          <span style={{ width: 20, height: 3, background: COLORS.green, borderRadius: 2 }} />
          Vitrine Parceiros
        </p>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 900, color: COLORS.darkBlue, marginBottom: 8, letterSpacing: "-0.01em" }}>Pintores Parceiros NAP</h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#6b7280" }}>
          Vitrine de trabalhos dos nossos parceiros. Seu próximo cliente pode estar aqui.
        </p>
      </div>

      <div className="parceiros-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
        {PARCEIROS.map((p, i) => (
          <div key={i} className="parceiro-card" style={{
            background: "#fff", borderRadius: 14, overflow: "hidden",
            border: "1px solid #e5e7eb", transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}>
            <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
              <img src={p.img} alt={p.servico} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{
                position: "absolute", top: 10, right: 10,
                padding: "4px 10px", borderRadius: 20,
                background: COLORS.yellow, color: COLORS.darkBlue,
                fontFamily: "'Nunito', sans-serif", fontSize: 10, fontWeight: 900, letterSpacing: "0.06em", textTransform: "uppercase",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}>⭐ Parceiro</div>
            </div>
            <div style={{ padding: 14 }}>
              <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 3 }}>{p.nome}</h4>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>{p.cidade}</p>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#4b5563", lineHeight: 1.4 }}>{p.servico}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${COLORS.darkBlue}, ${COLORS.blue})`,
        borderRadius: 20, padding: "36px 32px", textAlign: "center", color: "#fff",
      }}>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 22, fontWeight: 900, marginBottom: 10 }}>Você também quer divulgar seu trabalho?</h3>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)", marginBottom: 20, maxWidth: 520, margin: "0 auto 20px" }}>
          Cadastre-se como parceiro NAP e participe da vitrine. Sua obra aparece aqui, na nossa rede e no marketing da NAP.
        </p>
        <a href={`${WHATSAPP_URL}%20%2D%20Quero%20divulgar%20meu%20trabalho%20como%20parceiro%20NAP`} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block", padding: "14px 32px", borderRadius: 30,
          background: "#25D366", color: "#fff",
          fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 800,
          textDecoration: "none", boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
        }}>Quero divulgar meu trabalho</a>
      </div>
    </div>
  );
}

function BibliotecaTab() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 2 }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontSize: 12, color: COLORS.blue, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 800, marginBottom: 12 }}>
          <span style={{ width: 20, height: 3, background: COLORS.blue, borderRadius: 2 }} />
          Recursos Técnicos
        </p>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 900, color: COLORS.darkBlue, marginBottom: 8, letterSpacing: "-0.01em" }}>Biblioteca Técnica</h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#6b7280" }}>
          Fichas técnicas, tabelas de cores e manuais de aplicação. Tudo que você precisa para especificar com segurança.
        </p>
      </div>

      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 16 }}>📄 Fichas Técnicas</h3>
        <div className="biblio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {FICHAS_TECNICAS.map((f, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 14, padding: 20,
              border: "1px solid #e5e7eb",
              borderLeft: `4px solid ${f.color}`,
            }}>
              <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 10 }}>{f.nome}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12, fontFamily: "'Nunito', sans-serif", fontSize: 13 }}>
                <div><span style={{ color: "#9ca3af" }}>Rendimento:</span> <strong style={{ color: COLORS.darkBlue }}>{f.rendimento}</strong></div>
                <div><span style={{ color: "#9ca3af" }}>Diluição:</span> <strong style={{ color: COLORS.darkBlue }}>{f.diluicao}</strong></div>
                <div><span style={{ color: "#9ca3af" }}>Secagem:</span> <strong style={{ color: COLORS.darkBlue }}>{f.secagem}</strong></div>
              </div>
              <button onClick={(e) => { e.preventDefault(); alert("Ficha técnica em PDF — link fake para demo."); }} style={{
                padding: "8px 16px", borderRadius: 20, border: `1.5px solid ${f.color}`,
                background: `${f.color}10`, color: f.color,
                fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 800, cursor: "pointer",
              }}>⬇ Baixar PDF</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 16 }}>🎨 Tabelas de Cores</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {["Suvinil", "Coral", "Sherwin-Williams", "Lukscolor"].map((m, i) => (
            <a key={i} href="#" onClick={(e) => { e.preventDefault(); alert(`Tabela de cores ${m} — em breve.`); }} style={{
              padding: 16, borderRadius: 12, background: "#fff",
              border: "1px solid #e5e7eb", textDecoration: "none",
              fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 700,
              color: COLORS.darkBlue, textAlign: "center", transition: "all 0.2s ease",
            }}>🎨 {m}</a>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 16 }}>📘 Manuais de Aplicação</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          {[
            "Manual de Aplicação Epóxi em Pisos",
            "Guia de Preparação de Superfícies",
            "Técnicas de Texturas e Efeitos",
          ].map((m, i) => (
            <button key={i} onClick={() => alert(`${m} — PDF em demo.`)} style={{
              padding: 16, borderRadius: 12, background: "#fff",
              border: "1px solid #e5e7eb", cursor: "pointer",
              fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 700,
              color: COLORS.darkBlue, textAlign: "left", transition: "all 0.2s ease",
            }}>📘 {m}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function IndicacaoTab() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 2 }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.darkBlue}, ${COLORS.blue})`,
        borderRadius: 24, padding: "48px 36px", color: "#fff", marginBottom: 24,
      }}>
        <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 30, background: "rgba(249,168,37,0.2)", border: "1px solid rgba(249,168,37,0.4)", marginBottom: 18 }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: COLORS.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>Programa de Indicação</span>
        </div>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 900, marginBottom: 14, lineHeight: 1.2 }}>
          Indique. Receba. Repita.
        </h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 600, marginBottom: 28 }}>
          A cada cliente que você traz pra NAP, você recebe uma comissão direta. Sem burocracia, sem letras miúdas. Pintor parceiro ganha mais trabalhando o que já faz.
        </p>
      </div>

      <div className="indicacao-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
        {[
          { emoji: "💰", title: "Comissão por Indicação", desc: "Percentual sobre cada venda fechada através do seu código." },
          { emoji: "🎁", title: "Bonificações Mensais", desc: "Metas atingidas = brindes, vales e premiações exclusivas." },
          { emoji: "💎", title: "Preços Diferenciados", desc: "Parceiros cadastrados compram em condições especiais o ano todo." },
        ].map((b, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 14, padding: 24,
            border: "1px solid #e5e7eb",
          }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{b.emoji}</div>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 6 }}>{b.title}</h4>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#6b7280", lineHeight: 1.55 }}>{b.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <a href={`${WHATSAPP_URL}%20%2D%20Quero%20participar%20do%20Programa%20de%20Indicação%20NAP`} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block", padding: "16px 36px", borderRadius: 30,
          background: "#25D366", color: "#fff",
          fontFamily: "'Nunito', sans-serif", fontSize: 16, fontWeight: 800,
          textDecoration: "none", boxShadow: "0 6px 24px rgba(37,211,102,0.3)",
        }}>Quero me cadastrar no programa</a>
      </div>
    </div>
  );
}

function ModalMembro({ open, onClose, lockedCourse }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(10,14,26,0.8)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "fadeIn 0.25s ease",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20, padding: "40px 36px",
        maxWidth: 440, width: "100%", position: "relative",
        boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: "50%",
          border: "none", background: "#f3f4f6", cursor: "pointer", fontSize: 18, color: "#6b7280",
        }}>×</button>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px",
            background: `linear-gradient(135deg, ${COLORS.yellow}, ${COLORS.orange})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
          }}>
            <IconLock size={28} />
          </div>
          <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 22, fontWeight: 900, color: COLORS.darkBlue, marginBottom: 8 }}>
            {lockedCourse ? "Conteúdo de membro" : "Área do Membro NAP"}
          </h3>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
            {lockedCourse
              ? <>O curso <strong style={{ color: COLORS.darkBlue }}>{lockedCourse.title}</strong> está disponível apenas para pintores parceiros cadastrados. Fale com a NAP e ative seu acesso.</>
              : "Área exclusiva para pintores parceiros cadastrados. Se você ainda não é parceiro, converse com a NAP no WhatsApp para ativar seu acesso."
            }
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#6b7280", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>E-mail</label>
          <input type="email" placeholder="seunome@email.com" style={{
            width: "100%", padding: "12px 14px", borderRadius: 10,
            border: "1px solid #e5e7eb", fontFamily: "'Nunito', sans-serif", fontSize: 14, outline: "none",
          }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "#6b7280", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Senha</label>
          <input type="password" placeholder="••••••••" style={{
            width: "100%", padding: "12px 14px", borderRadius: 10,
            border: "1px solid #e5e7eb", fontFamily: "'Nunito', sans-serif", fontSize: 14, outline: "none",
          }} />
        </div>

        <div style={{ padding: 14, borderRadius: 10, background: "#fef3c7", border: "1px solid #fde68a", marginBottom: 20 }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#92400e", lineHeight: 1.55 }}>
            ⚡ <strong>Área em construção.</strong> Para acesso antecipado como parceiro, fale com a NAP pelo WhatsApp abaixo.
          </p>
        </div>

        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          padding: "14px 24px", borderRadius: 30,
          background: "#25D366", color: "#fff",
          fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 800,
          textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
        }}>Falar com a NAP</a>
      </div>
    </div>
  );
}

function FloatingWhatsApp() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="floating-wpp" style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 999,
      width: 62, height: 62, borderRadius: "50%", background: "#25D366",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 24px rgba(37,211,102,0.5)",
    }}>
      <svg width={30} height={30} viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ---- CLIENT PAGE CONTENT ----

function CentroContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "cursos";
  const validTabs = TABS.map((t) => t.id);
  const [tab, setTab] = useState(validTabs.includes(initialTab) ? initialTab : "cursos");
  const [modalOpen, setModalOpen] = useState(false);
  const [lockedCourse, setLockedCourse] = useState(null);

  useEffect(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab && validTabs.includes(urlTab) && urlTab !== tab) {
      setTab(urlTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const changeTab = (id) => {
    setTab(id);
    router.push(`/centro-treinamento?tab=${id}`, { scroll: false });
  };

  const handleLock = (curso) => {
    setLockedCourse(curso);
    setModalOpen(true);
  };

  return (
    <div className="ct-page-v2" style={{
      background: "linear-gradient(180deg, #FFFBF2 0%, #FFF8F0 100%)",
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      {/* Respingos decorativos sutis */}
      <div style={{ position: "absolute", top: 400, left: -100, width: 280, height: 280, borderRadius: "50%", background: COLORS.yellow, opacity: 0.05, filter: "blur(3px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 1200, right: -100, width: 240, height: 240, borderRadius: "50%", background: COLORS.pink, opacity: 0.05, filter: "blur(3px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 2200, left: -80, width: 200, height: 200, borderRadius: "50%", background: COLORS.green, opacity: 0.05, filter: "blur(3px)", pointerEvents: "none", zIndex: 0 }} />

      <Header onLogin={() => { setLockedCourse(null); setModalOpen(true); }} />
      <Hero />
      <Tabs active={tab} onChange={changeTab} />

      {tab === "cursos" && <CursosTab onLock={handleLock} />}
      {tab === "agenda" && <AgendaTab />}
      {tab === "parceiros" && <ParceirosTab />}
      {tab === "biblioteca" && <BibliotecaTab />}
      {tab === "indicacao" && <IndicacaoTab />}

      <footer style={{ background: COLORS.darkBlue, padding: "36px 24px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontFamily: "'Nunito', sans-serif", fontSize: 13 }}>
        <div style={{ marginBottom: 8 }}>© 2026 NAP Tintas — Centro de Treinamento | Sorocaba/SP</div>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.yellow, textDecoration: "none", fontWeight: 700 }}>← Voltar ao site principal</a>
      </footer>

      <ModalMembro open={modalOpen} onClose={() => setModalOpen(false)} lockedCourse={lockedCourse} />
      <FloatingWhatsApp />
    </div>
  );
}

export default function CentroTreinamentoPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito', sans-serif", color: COLORS.darkBlue }}>Carregando portal...</div>}>
      <CentroContent />
    </Suspense>
  );
}
