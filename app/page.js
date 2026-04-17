"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const WHATSAPP_NUMBER = "5515999999999";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Vim pelo site da NAP Tintas e gostaria de saber mais!`;

const COLORS = {
  blue: "#1B3A8C",
  green: "#4CAF50",
  yellow: "#F9A825",
  orange: "#FF6D00",
  red: "#D32F2F",
  pink: "#E91E93",
  darkBlue: "#0D1B3E",
  white: "#FFFFFF",
  offWhite: "#F8F8F8",
  darkBg: "#0A0E1A",
};

const VALORES = [
  { name: "Amor", emoji: "❤️", color: COLORS.red, desc: "Paixão pelo que fazemos e por quem servimos." },
  { name: "Confiança", emoji: "🤝", color: COLORS.blue, desc: "Relação construída com transparência e verdade." },
  { name: "Integridade", emoji: "🛡️", color: COLORS.green, desc: "Fazer o certo, mesmo quando ninguém está olhando." },
  { name: "Respeito", emoji: "🙏", color: COLORS.orange, desc: "Cada pessoa importa, cada necessidade é única." },
  { name: "Desenvolvimento", emoji: "🌱", color: COLORS.yellow, desc: "Crescer é cuidar de gente e capacitar profissionais." },
];

const DIFERENCIAIS = [
  { emoji: "🎨", title: "Sistema Tintométrico", desc: "Auxiliamos você na escolha do tom perfeito para seu ambiente. Montamos o seu projeto para que você possa visualizar como ficará a cor antes de pintar. São mais de 2.000 opções de cores preparadas na hora.", color: COLORS.blue },
  { emoji: "💬", title: "Consultoria Personalizada", desc: "Nossa equipe está preparada para te auxiliar com a melhor opção de custo-benefício, entendendo a sua necessidade e te indicando a melhor opção.", color: COLORS.green },
  { emoji: "🪣", title: "Portfólio Completo", desc: "Tintas internas e externas, primers, texturas, efeitos decorativos e todos os acessórios. Tudo em um só lugar.", color: COLORS.orange },
  { emoji: "🚚", title: "Entrega em Sorocaba", desc: "Comprou, a gente leva. Entrega disponível para Sorocaba e região. Sem complicação.", color: COLORS.pink },
  { emoji: "⭐", title: "+20 Anos de Experiência", desc: "Duas décadas de mercado formaram nosso olhar técnico e nossa capacidade de orientação.", color: COLORS.yellow },
  { emoji: "👨‍👩‍👧‍👦", title: "Atendimento Familiar", desc: "Aqui você é recebido como gente e não como número. Somos uma loja de família, com uma gestão colaborativa, próspera e humana.", color: COLORS.red },
];

// ---- HOOKS ----

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const h = () => setOffset(window.scrollY * 0.3);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return offset;
}

// ---- COMPONENTS ----

function RevealWrap({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

function WhatsAppBtn({ text = "Fale Conosco", small = false }) {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="wpp-btn" style={{
      display: "inline-flex", alignItems: "center", gap: small ? 8 : 10,
      background: "#25D366", color: "#fff",
      padding: small ? "12px 20px" : "16px 36px",
      borderRadius: 60, fontSize: small ? 14 : 17, fontWeight: 700,
      textDecoration: "none", letterSpacing: "0.01em",
      boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
      transition: "all 0.3s ease", fontFamily: "'Nunito', sans-serif",
      border: "none", cursor: "pointer",
    }}>
      <svg width={small ? 18 : 22} height={small ? 18 : 22} viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {text}
    </a>
  );
}

function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="floating-wpp" style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 1000,
      width: 62, height: 62, borderRadius: "50%", background: "#25D366",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 24px rgba(37,211,102,0.5)",
      transition: "all 0.4s ease",
      opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.5)",
      pointerEvents: show ? "auto" : "none",
    }}>
      <svg width={30} height={30} viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

function NAPLogo({ size = 40 }) {
  return (
    <img
      src="/nap-logo.jpg"
      alt="NAP Tintas"
      style={{
        width: size, height: size, borderRadius: "50%", objectFit: "cover",
        flexShrink: 0,
      }}
    />
  );
}

function WaveDivider({ flip = false, color = "#fff" }) {
  return (
    <div style={{ lineHeight: 0, overflow: "hidden", transform: flip ? "rotate(180deg)" : "none" }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }}>
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill={color} />
      </svg>
    </div>
  );
}

// ---- NAV ----

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { label: "Sobre", href: "#sobre" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Valores", href: "#valores" },
    { label: "Pintores", href: "#pintores" },
    { label: "Contato", href: "#contato" },
  ];
  const navText = scrolled ? COLORS.darkBlue : "#fff";
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
      padding: scrolled ? "10px 0" : "16px 0",
      background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(10,14,26,0.5)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      transition: "all 0.4s ease",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#hero" style={{ textDecoration: "none" }}><NAPLogo size={38} /></a>
        <div className="nav-desk" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" style={{
              color: navText, textDecoration: "none", fontSize: 14, fontWeight: 700,
              fontFamily: "'Nunito', sans-serif", letterSpacing: "0.02em",
              transition: "all 0.3s ease", opacity: 0.8, position: "relative",
              paddingBottom: 4,
            }}>{l.label}</a>
          ))}
          <WhatsAppBtn text="Fale Conosco" small />
        </div>
        <button className="nav-mob-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", fontSize: 28,
          cursor: "pointer", color: scrolled ? COLORS.darkBlue : "#fff", padding: 4,
        }}>{menuOpen ? "✕" : "☰"}</button>
      </div>
      {menuOpen && (
        <div className="nav-mob-menu" style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)",
          padding: "20px 24px", display: "flex", flexDirection: "column", gap: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: COLORS.darkBlue, textDecoration: "none", fontSize: 17, fontWeight: 700,
              fontFamily: "'Nunito', sans-serif", padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
            }}>{l.label}</a>
          ))}
          <div style={{ marginTop: 8 }}><WhatsAppBtn text="Fale no WhatsApp" small /></div>
        </div>
      )}
    </nav>
  );
}

// ---- HERO (parallax + image BG) ----

function Hero() {
  const parallax = useParallax();
  return (
    <section id="hero" className="hero-section" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url(/hero-cans.jpg)",
        backgroundSize: "cover", backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        transform: `translateY(${parallax}px) scale(1.1)`,
        willChange: "transform",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(90deg, rgba(13,27,62,0.92) 0%, rgba(13,27,62,0.82) 35%, rgba(13,27,62,0.45) 60%, rgba(13,27,62,0.1) 100%)",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, zIndex: 3, background: `linear-gradient(90deg, ${COLORS.red}, ${COLORS.orange}, ${COLORS.yellow}, ${COLORS.green}, ${COLORS.blue}, #7B1FA2, ${COLORS.pink})` }} />

      <div className="hero-inner" style={{
        position: "relative", zIndex: 2,
        maxWidth: 1200, margin: "0 auto", width: "100%",
        padding: "130px 48px 80px",
        display: "flex", alignItems: "center", justifyContent: "flex-start",
      }}>
        <div className="hero-copy" style={{ maxWidth: 540, animation: "fadeUp 0.8s ease-out", textAlign: "left" }}>
          <h1 className="hero-h1" style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)",
            fontWeight: 900, color: "#fff", lineHeight: 1.12,
            letterSpacing: "-0.02em", marginBottom: 24,
          }}>
            A cor que{" "}
            <span className="gradient-text" style={{
              background: `linear-gradient(135deg, ${COLORS.yellow}, ${COLORS.orange})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontStyle: "italic",
            }}>transforma</span>{" "}
            o seu espaço começa com uma{" "}
            <span className="gradient-text" style={{
              background: `linear-gradient(135deg, ${COLORS.green}, #81C784)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontStyle: "italic",
            }}>boa conversa</span>.
          </h1>

          <p className="hero-sub" style={{
            fontFamily: "'Nunito', sans-serif", fontSize: "clamp(15px, 1.8vw, 18px)",
            color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: 40,
          }}>
            Mais de 20 anos de experiência no mercado de tintas. Mais de 2.000 opções de cores misturadas na hora. Consultoria personalizada que vai além do balcão.
          </p>

          <div className="hero-ctas" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "flex-start" }}>
            <WhatsAppBtn text="Peça seu Orçamento" />
            <a href="#sobre" className="btn-secondary" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 32px", borderRadius: 60,
              border: "2px solid rgba(255,255,255,0.3)", color: "#fff",
              fontSize: 17, fontWeight: 700, textDecoration: "none",
              fontFamily: "'Nunito', sans-serif", transition: "all 0.3s ease",
              backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.06)",
            }}>Conheça a NAP</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- MARQUEE ----

function Marquee() {
  const items = [
    { icon: "⭐", text: "+20 anos de experiência" },
    { icon: "🎨", text: "+2.000 cores na hora" },
    { icon: "🚚", text: "Entrega disponível" },
    { icon: "👨‍👩‍👧‍👦", text: "Atendimento familiar" },
    { icon: "🎯", text: "Consultoria gratuita" },
    { icon: "🏆", text: "Marcas líderes do mercado" },
  ];
  const repeated = [...items, ...items, ...items];
  return (
    <section style={{ background: COLORS.darkBlue, padding: "18px 0", overflow: "hidden" }}>
      <div className="marquee-track" style={{
        display: "flex", gap: 48, whiteSpace: "nowrap",
        animation: "marqueeScroll 8s linear infinite",
      }}>
        {repeated.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.text}</span>
            <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 18, marginLeft: 8 }}>|</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---- VIDEO SECTION ----

function HistoriaVideo() {
  return (
    <section style={{ width: "100%", lineHeight: 0, background: "#fff" }}>
      <video
        autoPlay loop muted playsInline
        style={{ width: "100%", display: "block" }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </section>
  );
}

// ---- SOBRE ----

function Sobre() {
  return (
    <section id="sobre" className="section-pad" style={{ background: "#fff", padding: "100px 24px", position: "relative" }}>

      <div style={{ maxWidth: 800, margin: "0 auto", paddingTop: 20 }}>
        <RevealWrap>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.orange, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Nossa História</p>
            <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: COLORS.darkBlue, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.2 }}>
              Nascemos de paixão. Crescemos com propósito.
            </h2>
          </div>
        </RevealWrap>

        <RevealWrap delay={0.15}>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#555", lineHeight: 1.85 }}>
            <p style={{ marginBottom: 20 }}>
              A NAP Tintas foi construída <strong style={{ color: COLORS.darkBlue }}>pincelada a pincelada</strong>. Mais de duas décadas percorrendo o mercado de tintas, passando por empresas que nos moldaram e pessoas que nos inspiraram.
            </p>
            <p style={{ marginBottom: 20 }}>
              Chegou o momento em que todos esses aprendizados se encontraram e formaram a cor que sempre quisemos ver: <strong style={{ color: COLORS.darkBlue }}>a nossa própria organização.</strong>
            </p>
            <p style={{ marginBottom: 36 }}>
              Somos uma empresa de família, com alma de vizinhança. Acreditamos que transformar um ambiente começa com uma boa conversa, um atendimento de verdade e a cor certa.
            </p>
          </div>
        </RevealWrap>

        <RevealWrap delay={0.3}>
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.darkBlue}, #1a237e)`,
            borderRadius: 20, padding: "36px 32px", borderLeft: `5px solid ${COLORS.yellow}`,
          }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, fontStyle: "italic" }}>
              &quot;Colorir sonhos, identificando a necessidade e o desejo de cada cliente. Com atendimento humano, especificação correta e capacitação de profissionais.&quot;
            </p>
          </div>
        </RevealWrap>
      </div>
    </section>
  );
}

// ---- DIFERENCIAIS (glass cards) ----

function DiferenciaisSection() {
  return (
    <section id="diferenciais" className="section-pad" style={{
      background: `linear-gradient(180deg, ${COLORS.offWhite} 0%, #eef2f7 100%)`,
      padding: "100px 24px", position: "relative",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealWrap>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.blue, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Por Que a NAP?</p>
            <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: COLORS.darkBlue, fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
              Diferenciais que fazem a diferença de verdade.
            </h2>
          </div>
        </RevealWrap>

        <div className="diff-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {DIFERENCIAIS.map((item, i) => (
            <RevealWrap key={i} delay={i * 0.1}>
              <div className="glass-card" style={{
                background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
                borderRadius: 20, padding: 30, position: "relative", overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: `0 4px 24px ${item.color}12, 0 1px 3px rgba(0,0,0,0.06)`,
                transition: "all 0.4s ease",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }} />
                <div style={{ fontSize: 40, marginBottom: 16 }}>{item.emoji}</div>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 10 }}>{item.title}</h4>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            </RevealWrap>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- VALORES (timeline) ----

function ValoresSection() {
  return (
    <section id="valores" className="section-pad" style={{ background: "#fff", padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <RevealWrap>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.green, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>O que nos move</p>
            <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: COLORS.darkBlue, fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
              Nossos valores não estão na parede.<br />Estão em cada atendimento.
            </h2>
          </div>
        </RevealWrap>

        <div className="timeline" style={{ position: "relative", paddingLeft: 40 }}>
          {/* Vertical line */}
          <div className="timeline-line" style={{
            position: "absolute", left: 15, top: 0, bottom: 0, width: 3,
            background: `linear-gradient(180deg, ${COLORS.red}, ${COLORS.orange}, ${COLORS.yellow}, ${COLORS.green}, ${COLORS.blue})`,
            borderRadius: 4,
          }} />

          {VALORES.map((v, i) => (
            <RevealWrap key={i} delay={i * 0.12}>
              <div className="timeline-item" style={{
                position: "relative", marginBottom: i < VALORES.length - 1 ? 28 : 0,
                paddingLeft: 28,
              }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: -33, top: 8,
                  width: 30, height: 30, borderRadius: "50%",
                  background: v.color, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, boxShadow: `0 0 0 5px #fff, 0 0 16px ${v.color}40`,
                  zIndex: 2,
                }}>{v.emoji}</div>

                <div style={{
                  background: COLORS.offWhite, borderRadius: 16, padding: "22px 28px",
                  border: `1px solid #eee`,
                  transition: "all 0.3s ease",
                }}>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 800, color: v.color, marginBottom: 6 }}>{v.name}</h4>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </div>
            </RevealWrap>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- PINTORES ----

// ---- CALCULADORA M2 (PREMIUM) ----

const TINTA_RENDIMENTO_POR_LITRO = 10; // 1L cobre 10m2 em uma demao

// Animated number counter
function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(0);
  const prevTarget = useRef(0);
  useEffect(() => {
    const start = prevTarget.current;
    const end = target;
    if (start === end) return;
    let rafId;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = start + (end - start) * eased;
      setValue(current);
      if (progress < 1) rafId = requestAnimationFrame(animate);
      else prevTarget.current = end;
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);
  return value;
}

// Stepper for numeric inputs (portas, janelas)
function Stepper({ value, onChange, label, min = 0, max = 20 }) {
  return (
    <div>
      <label className="calc-label">{label}</label>
      <div className="calc-stepper">
        <button type="button" className="calc-stepper-btn" onClick={() => onChange(Math.max(min, value - 1))} aria-label="Diminuir">−</button>
        <div className="calc-stepper-value">{value}</div>
        <button type="button" className="calc-stepper-btn" onClick={() => onChange(Math.min(max, value + 1))} aria-label="Aumentar">+</button>
      </div>
    </div>
  );
}

function CalculadoraM2() {
  const [modo, setModo] = useState("parede");
  const [altura, setAltura] = useState("");
  const [largura, setLargura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [demaos, setDemaos] = useState(2);
  const [descontar, setDescontar] = useState(false);
  const [qtdPortas, setQtdPortas] = useState(0);
  const [qtdJanelas, setQtdJanelas] = useState(0);

  const parsedAlt = parseFloat(altura) || 0;
  const parsedLarg = parseFloat(largura) || 0;
  const parsedComp = parseFloat(comprimento) || 0;

  let areaBruta = 0;
  if (modo === "parede") {
    areaBruta = parsedAlt * parsedLarg;
  } else {
    areaBruta = 2 * parsedAlt * parsedLarg + 2 * parsedAlt * parsedComp;
  }

  const descontoPortas = descontar ? qtdPortas * 2.2 : 0;
  const descontoJanelas = descontar ? qtdJanelas * 1.5 : 0;
  const area = Math.max(0, areaBruta - descontoPortas - descontoJanelas);
  const litros = (area * demaos) / TINTA_RENDIMENTO_POR_LITRO;
  const litrosArredondado = Math.ceil(litros * 10) / 10;
  const galoes36 = Math.ceil(litrosArredondado / 3.6);
  const latas18 = Math.ceil(litrosArredondado / 18);

  const hasResult = area > 0;

  // Animated numbers
  const animatedArea = useCountUp(area);
  const animatedLitros = useCountUp(litrosArredondado);

  const wppMsg = `Olá! Fiz o cálculo pelo site da NAP:%0A%0AÁrea: ${area.toFixed(2)} m²%0ADemãos: ${demaos}%0ATinta necessária: ${litrosArredondado}L%0A%0AGostaria de um orçamento com essas medidas.`;
  const wppOrcamento = `https://wa.me/${WHATSAPP_NUMBER}?text=${wppMsg}`;

  return (
    <div className="calc-premium">
      {/* Animated gradient border */}
      <div className="calc-premium-glow" />

      <div className="calc-premium-inner">
        {/* Header */}
        <div className="calc-premium-header">
          <div className="calc-premium-icon">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="10" x2="10" y2="10" />
              <line x1="13" y1="10" x2="13.01" y2="10" />
              <line x1="16" y1="10" x2="16.01" y2="10" />
              <line x1="8" y1="14" x2="10" y2="14" />
              <line x1="13" y1="14" x2="13.01" y2="14" />
              <line x1="16" y1="14" x2="16.01" y2="14" />
              <line x1="8" y1="18" x2="10" y2="18" />
              <line x1="13" y1="18" x2="13.01" y2="18" />
              <line x1="16" y1="18" x2="16.01" y2="18" />
            </svg>
          </div>
          <div>
            <div className="calc-premium-tag">Ferramenta Exclusiva do Pintor</div>
            <h3 className="calc-premium-title">Calculadora de Área & Tinta</h3>
            <p className="calc-premium-subtitle">Informe as medidas e calculamos tudo automaticamente.</p>
          </div>
        </div>

        {/* Toggle modo — pill com indicador deslizante */}
        <div className="calc-pill">
          <div className="calc-pill-indicator" style={{ transform: modo === "parede" ? "translateX(0%)" : "translateX(100%)" }} />
          {[
            { v: "parede", label: "Parede única", icon: (
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
            ) },
            { v: "ambiente", label: "Ambiente completo", icon: (
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 21V8l9-5 9 5v13" /><path d="M9 21V12h6v9" /></svg>
            ) },
          ].map((m) => (
            <button key={m.v} type="button" onClick={() => setModo(m.v)} className={`calc-pill-btn ${modo === m.v ? "active" : ""}`}>
              {m.icon}
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Inputs dimensoes */}
        <div className={`calc-dims ${modo === "ambiente" ? "three" : "two"}`}>
          <div className="calc-field">
            <label className="calc-label">Altura</label>
            <div className="calc-input-wrap">
              <input type="number" step="0.1" min="0" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="2,80" className="calc-input-premium" />
              <span className="calc-unit">m</span>
            </div>
          </div>
          <div className="calc-field">
            <label className="calc-label">Largura</label>
            <div className="calc-input-wrap">
              <input type="number" step="0.1" min="0" value={largura} onChange={(e) => setLargura(e.target.value)} placeholder="4,50" className="calc-input-premium" />
              <span className="calc-unit">m</span>
            </div>
          </div>
          {modo === "ambiente" && (
            <div className="calc-field">
              <label className="calc-label">Comprimento</label>
              <div className="calc-input-wrap">
                <input type="number" step="0.1" min="0" value={comprimento} onChange={(e) => setComprimento(e.target.value)} placeholder="6,00" className="calc-input-premium" />
                <span className="calc-unit">m</span>
              </div>
            </div>
          )}
        </div>

        {/* Demaos selector */}
        <div className="calc-field" style={{ marginBottom: 20 }}>
          <label className="calc-label">Número de demãos</label>
          <div className="calc-demaos">
            {[1, 2, 3].map((n) => (
              <button key={n} type="button" onClick={() => setDemaos(n)} className={`calc-demaos-btn ${demaos === n ? "active" : ""}`}>
                <span className="calc-demaos-num">{n}</span>
                <span className="calc-demaos-txt">{n === 1 ? "demão" : "demãos"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Portas/janelas — expansivel */}
        <div className="calc-descontar">
          <label className="calc-switch">
            <input type="checkbox" checked={descontar} onChange={(e) => setDescontar(e.target.checked)} />
            <span className="calc-switch-track"><span className="calc-switch-thumb" /></span>
            <span className="calc-switch-label">Descontar portas e janelas</span>
          </label>

          <div className={`calc-descontar-content ${descontar ? "open" : ""}`}>
            <div className="calc-descontar-grid">
              <Stepper value={qtdPortas} onChange={setQtdPortas} label="Portas" />
              <Stepper value={qtdJanelas} onChange={setQtdJanelas} label="Janelas" />
            </div>
            <p className="calc-descontar-hint">Consideramos 2,2 m² por porta e 1,5 m² por janela (valores médios).</p>
          </div>
        </div>

        {/* Divisor */}
        <div className="calc-divider" />

        {/* Output — sempre presente, so ativa quando ha result */}
        <div className={`calc-result ${hasResult ? "active" : ""}`}>
          <div className="calc-result-shine" />

          <div className="calc-result-label">
            <span className="calc-result-dot" />
            Seu cálculo
          </div>

          <div className="calc-result-grid">
            <div className="calc-result-item primary">
              <div className="calc-result-key">Área Total</div>
              <div className="calc-result-value">
                <span className="calc-result-num">{hasResult ? animatedArea.toFixed(1) : "0.0"}</span>
                <span className="calc-result-suffix">m²</span>
              </div>
            </div>

            <div className="calc-result-divider" />

            <div className="calc-result-item">
              <div className="calc-result-key">Tinta Necessária</div>
              <div className="calc-result-value">
                <span className="calc-result-num">{hasResult ? animatedLitros.toFixed(1) : "0.0"}</span>
                <span className="calc-result-suffix">L</span>
              </div>
            </div>

            <div className="calc-result-divider" />

            <div className="calc-result-item sugestao">
              <div className="calc-result-key">Sugestão</div>
              <div className="calc-result-sug">
                <div className="calc-result-sug-main">{hasResult ? galoes36 : 0} <span>galão{galoes36 !== 1 ? "ões" : ""} 3,6L</span></div>
                <div className="calc-result-sug-alt">ou {hasResult ? latas18 : 0} lata{latas18 !== 1 ? "s" : ""} de 18L</div>
              </div>
            </div>
          </div>

          <a
            href={hasResult ? wppOrcamento : "#"}
            target={hasResult ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`calc-cta ${!hasResult ? "disabled" : ""}`}
            onClick={(e) => !hasResult && e.preventDefault()}
          >
            <span className="calc-cta-shine" />
            <svg width={20} height={20} viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            <span>Pedir orçamento com essas medidas</span>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="calc-cta-arrow">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>

          {!hasResult && <p className="calc-result-hint">Preencha as medidas para ver o resultado</p>}
        </div>
      </div>
    </div>
  );
}

// ---- PINTORES ----

const PINTOR_CARDS = [
  { emoji: "🔧", title: "Especificação Técnica", desc: "Acesse a biblioteca completa com informações de embalagens, rendimentos, aplicação e cores disponíveis de cada produto.", tab: "biblioteca" },
  { emoji: "📚", title: "Capacitação", desc: "Agenda de treinamentos, cursos online e presenciais. Evolua na profissão com conteúdo que realmente faz diferença na obra.", tab: "cursos" },
  { emoji: "🤝", title: "Parceria de Longo Prazo", desc: "Você faz parte e dá cor para a NAP Tintas. Ao se tornar parceiro, vira membro do Centro de Treinamento Colorindo com a NAP, com suporte em obras e empréstimo de ferramentas sem custo para agilizar a aplicação.", tab: "parceiros" },
  { emoji: "💎", title: "Programa de Indicação", desc: "Indique e ganhe. Comissão para cada cliente que você trouxer, bonificações exclusivas e preços diferenciados para parceiros cadastrados.", tab: "indicacao" },
];

function Pintores() {
  return (
    <section id="pintores" className="section-pad" style={{
      background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, #0d2f5e 100%)`,
      padding: "100px 24px", position: "relative", overflow: "hidden",
    }}>

      <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2, paddingTop: 20 }}>
        <RevealWrap>
          <div style={{
            display: "inline-block", padding: "8px 24px", borderRadius: 40,
            background: "rgba(249,168,37,0.15)", border: "1px solid rgba(249,168,37,0.3)",
            marginBottom: 24,
          }}>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>Espaço do Pintor</span>
          </div>
          <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: "#fff", fontWeight: 900, marginBottom: 12, lineHeight: 1.2 }}>
            Para quem vive de pintura, a NAP é parceira.
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(16px, 2vw, 20px)", color: COLORS.yellow, fontWeight: 700, marginBottom: 20, letterSpacing: "0.01em" }}>
            Centro de Treinamento e Capacitação — Colorindo com a NAP!
          </p>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 40px" }}>
            Profissionais da pintura encontram aqui mais do que os produtos. Encontram um ponto de apoio, orientação técnica, suporte em obras, capacitação e condições que fazem a diferença.
          </p>
        </RevealWrap>

        <div className="pintores-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 40, textAlign: "left" }}>
          {PINTOR_CARDS.map((item, i) => (
            <RevealWrap key={i} delay={i * 0.1}>
              <a
                href={`/centro-treinamento?tab=${item.tab}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pintor-card-link"
                style={{
                  display: "block", textDecoration: "none", height: "100%",
                }}
              >
                <div className="glass-card-dark pintor-card" style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16, padding: 24, transition: "all 0.3s ease",
                  backdropFilter: "blur(8px)", height: "100%", position: "relative",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ fontSize: 28 }}>{item.emoji}</div>
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={COLORS.yellow} strokeWidth={2.5} style={{ opacity: 0.7 }}>
                      <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</p>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: COLORS.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Acessar portal →
                  </span>
                </div>
              </a>
            </RevealWrap>
          ))}
        </div>

        <RevealWrap delay={0.4}>
          <CalculadoraM2 />
        </RevealWrap>

        <RevealWrap delay={0.5}>
          <div style={{ marginTop: 40 }}>
            <WhatsAppBtn text="Quero ser parceiro NAP" />
          </div>
        </RevealWrap>
      </div>
    </section>
  );
}

// ---- DEPOIMENTOS ----

const DEPOIMENTOS = [
  { name: "Osnir Z.", handle: "@osnir_zanardo", text: "Recomendo! Já fiz algumas melhorias com as ideias e tintas que trouxeram. Vai com tudo!", color: COLORS.blue },
  { name: "Vitincarvalhoo", handle: "@vitincarvalhoo", text: "Melhor loja de Sorocaba e região!", color: COLORS.green },
  { name: "Frangravalos", handle: "@frangravalos_", text: "Eu amo essa cor — escolhi pra minha casa nesse tom e ficou lindíssima!", color: COLORS.pink },
  { name: "Ana Claudia G.", handle: "@anaclaudia.garrido3", text: "Vocês se superam a cada vídeo! A loja é incrível.", color: COLORS.orange },
  { name: "Giselegaloni", handle: "@giselegaloni", text: "Sucesso! Estamos construindo — chegando nessa parte já vamos chamar vocês!", color: COLORS.yellow },
  { name: "Solange D.", handle: "@solangedutravieira", text: "Deus abençoe essa família tão querida!", color: COLORS.red },
  { name: "Veronica D.", handle: "@veronica.l.dourado", text: "Nossa, que tinta mágica! Ficou perfeito!", color: COLORS.blue },
  { name: "Privilela", handle: "@privilela__", text: "Perfeita essa tinta! Aprovadíssima!", color: COLORS.green },
  { name: "Danieliar", handle: "@danieliar", text: "Que Deus abençoe! Logo logo estaremos aí!", color: COLORS.orange },
  { name: "Lucia Carvalho", handle: "@luciacarvalho494", text: "Muito bom! Deus abençoe vocês!", color: COLORS.pink },
  { name: "Leandro M.", handle: "@leandro.martines.16", text: "Que top! Muito bom mesmo!", color: COLORS.yellow },
  { name: "Aline Amaral", handle: "@alineamaral.psicologia", text: "Estou apaixonada pela NAP Tintas. Parabéns a todos!", color: COLORS.red },
];

function DepoimentosSection() {
  return (
    <section id="depoimentos" className="section-pad" style={{
      position: "relative", overflow: "hidden",
      padding: "100px 24px",
    }}>
      {/* Video background */}
      <video autoPlay loop muted playsInline style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", zIndex: 0,
      }}>
        <source src="/depo-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay 45% */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "rgba(10, 14, 26, 0.72)",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <RevealWrap>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.yellow, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Depoimentos</p>
            <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: "#fff", fontWeight: 900, marginBottom: 14, lineHeight: 1.2 }}>
              O que nossos clientes dizem
            </h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Quem já nos conhece, recomenda. Veja o que estão falando sobre a NAP Tintas.
            </p>
          </div>
        </RevealWrap>

        <div className="depo-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14,
        }}>
          {DEPOIMENTOS.map((d, i) => (
            <RevealWrap key={i} delay={i * 0.05}>
              <div className="glow-border-wrap" style={{
                borderRadius: 16, padding: 2, position: "relative",
                overflow: "hidden", height: "100%",
              }}>
                <div className="glow-spinner" />
                <div className="depo-card" style={{
                  background: "rgba(13,27,62,0.88)",
                  borderRadius: 14, padding: "20px 18px",
                  backdropFilter: "blur(16px)",
                  transition: "all 0.3s ease",
                  display: "flex", flexDirection: "column", height: "100%",
                  position: "relative", zIndex: 2,
                }}>
                  {/* Text first — emphasis */}
                  <p style={{
                    fontFamily: "'Nunito', sans-serif", fontSize: 14,
                    color: "rgba(255,255,255,0.8)", lineHeight: 1.6,
                    fontStyle: "italic", flex: 1, marginBottom: 14,
                  }}>
                    &ldquo;{d.text}&rdquo;
                  </p>

                  {/* Stars + Name */}
                  <div style={{ display: "flex", gap: 2, marginBottom: 6 }}>
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width={13} height={13} viewBox="0 0 24 24" fill="#FFD700">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 800,
                    fontSize: 13, color: "rgba(255,255,255,0.9)",
                  }}>— {d.name}</div>
                </div>
              </div>
            </RevealWrap>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- CTA ----

function CTASection() {
  return (
    <section className="section-pad" style={{ background: "#fff", padding: "100px 24px", position: "relative" }}>

      <RevealWrap>
        <div style={{
          maxWidth: 800, margin: "0 auto", textAlign: "center",
          background: `linear-gradient(135deg, rgba(27,58,140,0.04), rgba(76,175,80,0.04), rgba(249,168,37,0.04))`,
          border: "1px solid #eee", borderRadius: 28, padding: "64px 32px",
          position: "relative", overflow: "hidden",
        }}>
          <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.orange, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Pronto pra transformar?</p>
          <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", color: COLORS.darkBlue, fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
            A cor perfeita está a uma conversa de distância.
          </h2>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#888", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px" }}>
            Fale com a nossa equipe pelo WhatsApp. Orçamento rápido, consultoria gratuita e atendimento que entende.
          </p>
          <WhatsAppBtn text="Chamar no WhatsApp" />
        </div>
      </RevealWrap>
    </section>
  );
}

// ---- ONDE ESTAMOS ----

function OndeEstamos() {
  return (
    <section id="contato" className="section-pad" style={{ background: COLORS.offWhite, padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <RevealWrap>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.blue, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Onde Estamos</p>
            <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: COLORS.darkBlue, fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
              Venha nos visitar.
            </h2>
          </div>
        </RevealWrap>

        <div className="contato-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
          {[
            { icon: "📍", title: "Endereço", lines: ["Rua Cônego André Pieroni, 371", "Jd. Guadalajara — Sorocaba/SP"] },
            { icon: "🕐", title: "Horário", lines: ["Seg a Sex: 8h às 18h", "Sábado: 8h às 13h"] },
            { icon: "📱", title: "Contato", lines: ["(15) 99999-9999", "@nap_tintas"] },
          ].map((item, i) => (
            <RevealWrap key={i} delay={i * 0.1}>
              <div className="glass-card" style={{
                background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
                borderRadius: 20, padding: 28, textAlign: "center",
                border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.title}</h4>
                {item.lines.map((line, j) => (
                  <p key={j} style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7 }}>{line}</p>
                ))}
              </div>
            </RevealWrap>
          ))}
        </div>

        <RevealWrap delay={0.3}>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.2!2d-47.48!3d-23.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMxJzEyLjAiUyA0N8KwMjgnNDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%" height="280" style={{ border: 0, display: "block" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="NAP Tintas — Sorocaba"
            />
          </div>
        </RevealWrap>
      </div>
    </section>
  );
}

// ---- FOOTER ----

function Footer() {
  return (
    <footer style={{ background: COLORS.darkBlue, padding: "48px 24px 32px", textAlign: "center", position: "relative" }}>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, paddingTop: 12 }}>
        <NAPLogo size={48} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 20 }}>
        {[
          { label: "Instagram", href: "https://instagram.com/nap_tintas", icon: "📸" },
          { label: "WhatsApp", href: WHATSAPP_URL, icon: "💬" },
        ].map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon" style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, textDecoration: "none", transition: "all 0.3s ease",
          }}>{s.icon}</a>
        ))}
      </div>

      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>
        Colorindo Sonhos desde 2026
      </p>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
        © 2026 NAP Tintas. Todos os direitos reservados. | Sorocaba/SP
      </p>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.12)", marginTop: 8 }}>
        Desenvolvido com <span className="heart-beat" style={{ display: "inline-block" }}>💛</span> por PulsarH.ai
      </p>
    </footer>
  );
}

// ---- MAIN ----

export default function Home() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <NavBar />
      <Hero />
      <Marquee />
      <HistoriaVideo />
      <Sobre />
      <DiferenciaisSection />
      <ValoresSection />
      <Pintores />
      <CTASection />
      <DepoimentosSection />
      <OndeEstamos />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
