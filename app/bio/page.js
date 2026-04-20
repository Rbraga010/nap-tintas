"use client";

import { useEffect, useRef } from "react";
import { COLORS, WHATSAPP_NUMBER } from "../page";

const WPP_PEDIDO = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Oi NAP! Quero fazer um pedido / pedir um orçamento."
)}`;

// ---- MATRIX RAIN (tematico pintura) ----

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    const DPR = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener("resize", resize);

    // Palavras e simbolos relacionados a pintura — tema NAP
    const charset =
      "NAPTINTASCORPINCELPINTORFAMILIAARTECASACASASONHOAMOR0123456789";
    const fontSize = 14;
    const columns = Math.ceil(window.innerWidth / fontSize);
    const drops = Array(columns)
      .fill(null)
      .map(() => Math.random() * -50);

    // Cores da marca NAP — vao rotacionar nas trilhas
    const brandColors = [
      COLORS.blue,
      COLORS.green,
      COLORS.yellow,
      COLORS.orange,
      COLORS.pink,
      COLORS.red,
    ];
    const columnColors = Array(columns)
      .fill(null)
      .map(() => brandColors[Math.floor(Math.random() * brandColors.length)]);

    const draw = () => {
      // Fade trail (mais forte = trail curto)
      ctx.fillStyle = "rgba(10, 14, 26, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charset[Math.floor(Math.random() * charset.length)];
        const y = drops[i] * fontSize;
        const x = i * fontSize;

        // Trilha: cor da marca no topo, mais esmaecida embaixo
        const color = columnColors[i];
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        // Reset da drop + troca cor ao reiniciar
        if (y > window.innerHeight && Math.random() > 0.97) {
          drops[i] = 0;
          columnColors[i] =
            brandColors[Math.floor(Math.random() * brandColors.length)];
        }
        drops[i] += 0.6; // velocidade
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="bio-matrix" />;
}

// ---- ICONS (SVG premium, evita emoji) ----

const IconSparkle = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3l1.9 5.2L19 10l-5.1 1.8L12 17l-1.9-5.2L5 10l5.1-1.8L12 3z" />
    <path d="M18 18l.8 2 2.2.8-2.2.8-.8 2-.8-2-2.2-.8 2.2-.8z" />
  </svg>
);

const IconBook = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v16H6.5A2.5 2.5 0 004 20.5v0a2.5 2.5 0 002.5 2.5H20" />
    <path d="M8 6h8M8 10h8" />
  </svg>
);

const IconHome = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1h-4.5v-8h-7v8H4a1 1 0 01-1-1V9.5z" />
  </svg>
);

const IconPaint = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 4h16v4a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
    <path d="M10 10v3a2 2 0 002 2h0a2 2 0 012 2v3" />
  </svg>
);

const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const IconCheck = (p) => (
  <svg viewBox="0 0 24 24" fill="#1E90FF" {...p}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z" fill="#fff" />
    <circle cx="12" cy="12" r="10" fill="#1E90FF" />
    <path d="M10 17l-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9z" fill="#fff" />
  </svg>
);

// ---- CARD TERMINAL ----

function CardTerminal({
  url,
  badge,
  badgeColor,
  category,
  title,
  desc,
  descEmoji,
  icon,
  iconColor,
  href,
  external = true,
  highlight = false,
}) {
  const Comp = "a";
  return (
    <Comp
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`bio-card ${highlight ? "bio-card-highlight" : ""}`}
    >
      {/* Glow animado na borda quando destaque */}
      {highlight && <span className="bio-card-glow" aria-hidden />}

      <div className="bio-card-inner">
        {/* Barra tipo terminal */}
        <div className="bio-card-bar">
          <div className="bio-card-dots">
            <span style={{ background: "#FF5F57" }} />
            <span style={{ background: "#FEBC2E" }} />
            <span style={{ background: "#28C840" }} />
          </div>
          <div className="bio-card-url">{url}</div>
        </div>

        {/* Conteudo */}
        <div className="bio-card-body">
          {badge && (
            <span
              className="bio-card-badge"
              style={{
                color: badgeColor || COLORS.pink,
                borderColor: `${badgeColor || COLORS.pink}80`,
              }}
            >
              {badge}
            </span>
          )}

          <div className="bio-card-row">
            <div
              className="bio-card-icon"
              style={{
                color: iconColor,
                background: `${iconColor}14`,
                borderColor: `${iconColor}30`,
              }}
            >
              {icon}
            </div>
            <div className="bio-card-text">
              <div className="bio-card-category" style={{ color: iconColor }}>
                {category}
              </div>
              <div className="bio-card-title">{title}</div>
            </div>
            <div
              className="bio-card-arrow"
              style={{
                color: iconColor,
                background: `${iconColor}14`,
                borderColor: `${iconColor}40`,
              }}
            >
              <IconArrow width="18" height="18" />
            </div>
          </div>

          <p className="bio-card-desc">
            <span style={{ color: iconColor, marginRight: 6 }}>
              {descEmoji}
            </span>
            {desc}
          </p>
        </div>
      </div>
    </Comp>
  );
}

// ---- MAIN ----

export default function BioPage() {
  const cards = [
    {
      url: "nap-tintas.com.br/colorindo-com-a-nap",
      badge: "DESTAQUE",
      badgeColor: COLORS.green,
      category: "PARCERIA EXCLUSIVA",
      title: "SEJA UM PINTOR PARCEIRO",
      desc: "Formação completa em técnica, gestão e vendas. Apoio em obra, empréstimo de equipamento e família inteira do seu lado.",
      descEmoji: "✦",
      icon: <IconSparkle width="22" height="22" />,
      iconColor: COLORS.green,
      href: "/colorindo-com-a-nap",
      external: false,
      highlight: true,
    },
    {
      url: "nap-tintas.com.br/centro-treinamento",
      badge: "FORMAÇÃO CONTINUADA",
      badgeColor: COLORS.yellow,
      category: "ESPAÇO DO PINTOR",
      title: "CENTRO DE FORMAÇÃO",
      desc: "Portal do pintor parceiro. Cursos técnicos, biblioteca completa, agenda de treinamentos e comunidade exclusiva.",
      descEmoji: "▶",
      icon: <IconBook width="22" height="22" />,
      iconColor: COLORS.yellow,
      href: "/centro-treinamento",
      external: false,
    },
    {
      url: "nap-tintas.com.br",
      badge: "INSTITUCIONAL",
      badgeColor: COLORS.blue,
      category: "CONHEÇA A NAP",
      title: "SITE INSTITUCIONAL",
      desc: "Mais de 20 anos pintando sonhos em Sorocaba. Nossa história, diferenciais, valores e tudo que torna a NAP diferente.",
      descEmoji: "●",
      icon: <IconHome width="22" height="22" />,
      iconColor: COLORS.blue,
      href: "/",
      external: false,
    },
    {
      url: "wa.me/nap-tintas",
      badge: "ATENDIMENTO ATIVO",
      badgeColor: COLORS.pink,
      category: "ORÇAMENTO & COMPRA",
      title: "FAÇA SEU PEDIDO",
      desc: "Atendimento direto via WhatsApp. Consultoria personalizada, orçamento rápido e a cor certa pra sua obra.",
      descEmoji: "◆",
      icon: <IconPaint width="22" height="22" />,
      iconColor: COLORS.pink,
      href: WPP_PEDIDO,
      external: true,
    },
  ];

  return (
    <div className="bio-page">
      <MatrixRain />

      {/* Overlay gradient pra legibilidade */}
      <div className="bio-overlay" aria-hidden />

      <main className="bio-main">
        {/* Header — Foto + Nome + Subtitulo + Stats */}
        <header className="bio-header">
          <div className="bio-avatar-wrap">
            <div className="bio-avatar-glow" aria-hidden />
            <img
              src="/nap-logo.jpg"
              alt="NAP Tintas"
              className="bio-avatar"
            />
            <IconCheck width="28" height="28" className="bio-verified" />
          </div>

          <h1 className="bio-name">
            <span className="bio-name-nap">NAP</span>
            <span className="bio-name-tintas">TINTAS</span>
          </h1>

          <p className="bio-subtitle">
            <span className="bio-prompt">&gt;</span> COLORINDO SONHOS · PINTOR É DA FAMÍLIA
          </p>

          <div className="bio-stats">
            <span>+20 ANOS</span>
            <span className="bio-sep">·</span>
            <span>+2.000 CORES</span>
            <span className="bio-sep">·</span>
            <span>FAMÍLIA NAP</span>
          </div>
        </header>

        {/* Cards */}
        <div className="bio-cards">
          {cards.map((c, i) => (
            <CardTerminal key={i} {...c} />
          ))}
        </div>

        {/* Rodape com video institucional */}
        <footer className="bio-footer">
          <div className="bio-video-card">
            <div className="bio-video-label">
              <span className="bio-video-dot" />
              Conheça a NAP em 1 minuto
            </div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="bio-video"
              poster="/hero-cans.jpg"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="bio-social">
            <a
              href="https://instagram.com/nap_tintas"
              target="_blank"
              rel="noopener noreferrer"
              className="bio-social-btn"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
              </svg>
              @nap_tintas
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bio-social-btn"
              aria-label="WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              WhatsApp
            </a>
          </div>

          <p className="bio-copy">
            © 2026 NAP Tintas · Sorocaba/SP · Colorindo Sonhos desde 2026
          </p>
        </footer>
      </main>
    </div>
  );
}
