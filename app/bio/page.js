"use client";

import { useEffect, useState } from "react";
import { COLORS, WHATSAPP_NUMBER } from "../page";

const WPP_PEDIDO = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Oi NAP! Quero fazer um pedido / pedir um orçamento."
)}`;

// ---- RESPINGOS DE TINTA DECORATIVOS (SVG) ----

function PaintSplash({ color, size = 140, style }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={{ position: "absolute", ...style }}
      aria-hidden
    >
      <g fill={color} opacity={0.85}>
        <ellipse cx="100" cy="100" rx="68" ry="54" />
        <circle cx="42" cy="86" r="18" />
        <circle cx="160" cy="78" r="14" />
        <circle cx="52" cy="150" r="10" />
        <circle cx="168" cy="138" r="12" />
        <circle cx="28" cy="118" r="7" />
        <circle cx="180" cy="112" r="6" />
      </g>
    </svg>
  );
}

function PaintDripSVG({ color, style }) {
  return (
    <svg
      viewBox="0 0 60 100"
      width="60"
      height="100"
      style={{ position: "absolute", ...style }}
      aria-hidden
    >
      <path
        d="M10 0 H50 V50 Q 40 60 40 75 Q 40 90 30 90 Q 20 90 20 75 Q 20 60 10 50 Z"
        fill={color}
        opacity={0.9}
      />
      <circle cx="30" cy="95" r="5" fill={color} opacity={0.75} />
    </svg>
  );
}

// ---- ICONS (SVG inline, tema pintura) ----

const IconParceiro = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
    <circle cx="10" cy="7" r="4" />
    <path d="M21 21v-2a4 4 0 00-3-3.87M17 3.13a4 4 0 010 7.75" />
  </svg>
);

const IconFormacao = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const IconCasa = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1h-4.5v-8h-7v8H4a1 1 0 01-1-1V9.5z" />
  </svg>
);

const IconPedido = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
  </svg>
);

const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

// ---- CARD ----

function BioCard({
  icon,
  iconColor,
  badge,
  title,
  subtitle,
  desc,
  href,
  highlight = false,
}) {
  // Bio é porta de entrada — TODOS os cards abrem em nova guia
  // pra manter a bio sempre visível atrás
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`bio-card ${highlight ? "bio-card-hl" : ""}`}
      style={{
        "--card-color": iconColor,
      }}
    >
      {highlight && <span className="bio-card-ribbon">VAGAS LIMITADAS</span>}

      <div className="bio-card-icon" style={{ background: iconColor, color: "#fff" }}>
        {icon}
      </div>

      <div className="bio-card-body">
        {badge && (
          <span
            className="bio-card-badge"
            style={{ color: iconColor, borderColor: `${iconColor}40` }}
          >
            {badge}
          </span>
        )}
        <div className="bio-card-title" style={{ color: COLORS.darkBlue }}>
          {title}
        </div>
        <div className="bio-card-subtitle" style={{ color: iconColor }}>
          {subtitle}
        </div>
        <p className="bio-card-desc">{desc}</p>
      </div>

      <div className="bio-card-arrow" style={{ color: iconColor }}>
        <IconArrow width="20" height="20" />
      </div>
    </a>
  );
}

// ---- MAIN ----

export default function BioPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cards = [
    {
      icon: <IconParceiro width="22" height="22" />,
      iconColor: COLORS.pink,
      badge: "DESTAQUE",
      title: "Seja um Pintor Parceiro",
      subtitle: "Aqui, pintor é da família.",
      desc: "Formação em técnica, gestão e vendas. Apoio em obra, empréstimo de equipamento, indicação de cliente e uma família inteira do seu lado.",
      href: "/colorindo-com-a-nap",
      highlight: true,
    },
    {
      icon: <IconFormacao width="22" height="22" />,
      iconColor: COLORS.orange,
      badge: "ESPAÇO DO PINTOR",
      title: "Centro de Formação",
      subtitle: "Colorindo com a NAP",
      desc: "Portal do parceiro com cursos técnicos, biblioteca de produtos, agenda de treinamentos e comunidade de pintores.",
      href: "/centro-treinamento",
    },
    {
      icon: <IconCasa width="22" height="22" />,
      iconColor: COLORS.blue,
      badge: "INSTITUCIONAL",
      title: "Conheça a NAP",
      subtitle: "Colorindo Sonhos desde sempre",
      desc: "Mais de 20 anos pintando histórias em Sorocaba. Nossa família, nossos valores, nossa forma de atender.",
      href: "/",
    },
    {
      icon: <IconPedido width="20" height="20" />,
      iconColor: COLORS.green,
      badge: "LOJA ONLINE",
      title: "Faça seu pedido",
      subtitle: "Tintas, acessórios e texturas",
      desc: "Vitrine completa de produtos. Escolha, monte seu pedido e finalize direto no WhatsApp com consultoria incluída.",
      href: "/pedidos",
    },
  ];

  return (
    <div className="bio-page-v2">
      {/* Respingos decorativos nos cantos */}
      <PaintSplash color={COLORS.yellow} size={200} style={{ top: -40, left: -60, transform: "rotate(-15deg)" }} />
      <PaintSplash color={COLORS.pink} size={160} style={{ top: 80, right: -70, transform: "rotate(25deg)" }} />
      <PaintSplash color={COLORS.green} size={140} style={{ top: "45%", left: -50, transform: "rotate(45deg)" }} />
      <PaintSplash color={COLORS.orange} size={180} style={{ bottom: 200, right: -60, transform: "rotate(-20deg)" }} />
      <PaintSplash color={COLORS.blue} size={130} style={{ bottom: -30, left: "30%", transform: "rotate(10deg)" }} />

      {/* Gotas de tinta caindo */}
      <PaintDripSVG color={COLORS.pink} style={{ top: 0, left: "15%" }} />
      <PaintDripSVG color={COLORS.yellow} style={{ top: 0, left: "35%", transform: "scale(0.7)" }} />
      <PaintDripSVG color={COLORS.blue} style={{ top: 0, right: "25%", transform: "scale(0.8)" }} />
      <PaintDripSVG color={COLORS.orange} style={{ top: 0, right: "8%", transform: "scale(0.6)" }} />

      <main className="bio-main-v2">
        {/* Header */}
        <header className="bio-header-v2">
          <div className="bio-avatar-v2">
            {/* Mascote roda colorida como avatar principal */}
            <div className="bio-avatar-ring" aria-hidden />
            <img
              src="/mascote-roda.jpg"
              alt="Mascote NAP Tintas"
              className="bio-avatar-img"
            />
          </div>

          <h1 className="bio-name-v2">
            <span className="bio-name-nap-v2">NAP</span>
            <span className="bio-name-tintas-v2">TINTAS</span>
          </h1>

          <p className="bio-tagline-v2">
            Aqui, pintor é <strong>da família.</strong>
          </p>
          <p className="bio-sub-v2">
            Colorindo sonhos em <strong>Sorocaba/SP</strong> · +20 anos de estrada
          </p>

          <div className="bio-stats-v2">
            <div className="bio-stat-pill" style={{ "--c": COLORS.blue }}>
              <span className="bio-stat-dot" />
              <strong>+20</strong> anos
            </div>
            <div className="bio-stat-pill" style={{ "--c": COLORS.orange }}>
              <span className="bio-stat-dot" />
              <strong>+2.000</strong> cores
            </div>
            <div className="bio-stat-pill" style={{ "--c": COLORS.pink }}>
              <span className="bio-stat-dot" />
              <strong>Família</strong> NAP
            </div>
          </div>
        </header>

        {/* Cards */}
        <div className="bio-cards-v2">
          {cards.map((c, i) => (
            <div
              key={i}
              className={mounted ? "bio-card-enter" : ""}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <BioCard {...c} />
            </div>
          ))}
        </div>

        {/* Secao com mascote menino + CTA pra pintor */}
        <section className="bio-pintor-cta">
          <div className="bio-pintor-img-wrap">
            <img
              src="/mascote-menino.jpg"
              alt="Pintor NAP"
              className="bio-pintor-img"
            />
            <div className="bio-pintor-confete" aria-hidden />
          </div>
          <div className="bio-pintor-text">
            <p className="bio-pintor-quote">
              &ldquo;Aqui, pintor é da família.&rdquo;
            </p>
            <p className="bio-pintor-sub">
              Técnica, gestão, vendas e apoio de verdade na obra.
            </p>
            <a
              href="/colorindo-com-a-nap"
              className="bio-pintor-btn"
            >
              Entrar pra família NAP →
            </a>
          </div>
        </section>

        {/* Rodape com video institucional */}
        <section className="bio-video-section">
          <div className="bio-video-head">
            <span className="bio-video-label">
              <span className="bio-video-dot-v2" /> NAP em 1 minuto
            </span>
          </div>
          <div className="bio-video-frame">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="bio-video-v2"
              poster="/hero-cans.jpg"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* Social + footer */}
        <footer className="bio-footer-v2">
          <div className="bio-social-v2">
            <a
              href="https://instagram.com/nap_tintas"
              target="_blank"
              rel="noopener noreferrer"
              className="bio-social-v2-btn"
              style={{ "--c": COLORS.pink }}
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
              </svg>
              @nap_tintas
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bio-social-v2-btn"
              style={{ "--c": COLORS.green }}
              aria-label="WhatsApp"
            >
              <IconPedido width="16" height="16" />
              WhatsApp
            </a>
          </div>
          <p className="bio-copy-v2">
            © 2026 NAP Tintas · Rua Cônego André Pieroni, 371 · Sorocaba/SP
          </p>
          <p className="bio-copy-small-v2">Colorindo Sonhos todos os dias.</p>
        </footer>
      </main>
    </div>
  );
}
