"use client";

import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Vim pelo site da NAP Tintas e gostaria de saber mais!`;

// NAP brand colors extracted from their visual identity
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

// NAP "pigmentos" — brand values
const PIGMENTOS = [
  { name: "Colorir", color: "#1B3A8C", icon: "🎨", desc: "Dar vida e cor a cada projeto, transformando ambientes com personalidade." },
  { name: "Solucionar", color: "#4CAF50", icon: "🔧", desc: "Encontrar a solução certa pra cada necessidade — do pintor ao cliente final." },
  { name: "Capacitar", color: "#F9A825", icon: "📚", desc: "Capacitar os profissionais da pintura, os que transformam sonhos em realidade." },
];

const VALORES = [
  { name: "Sonho", color: "#FF6D00", emoji: "✨" },
  { name: "Amor", color: "#D32F2F", emoji: "❤️" },
  { name: "Família", color: "#E91E93", emoji: "👨‍👩‍👧‍👦" },
];

const CATALOG = [
  {
    id: "tintas",
    title: "Tintas",
    subtitle: "Látex, acrílica, esmalte e mais",
    emoji: "🎨",
    color: "#1B3A8C",
    items: ["Tinta Látex Premium", "Acrílica Semi-Brilho", "Esmalte Sintético", "Tinta Epóxi", "Tinta para Piso", "Tinta Econômica"],
  },
  {
    id: "texturas",
    title: "Texturas & Efeitos",
    subtitle: "Grafiato, rústico, cimento queimado",
    emoji: "✨",
    color: "#F9A825",
    items: ["Grafiato Riscado", "Textura Rústica", "Textura Projetada", "Marmorato", "Cimento Queimado", "Efeito Camurça"],
  },
  {
    id: "massas",
    title: "Massas & Preparação",
    subtitle: "Massa corrida, selador, fundo",
    emoji: "🪣",
    color: "#4CAF50",
    items: ["Massa Corrida PVA", "Massa Acrílica", "Selador Acrílico", "Fundo Preparador", "Aguarrás", "Thinner"],
  },
  {
    id: "ferramentas",
    title: "Ferramentas",
    subtitle: "Rolos, pincéis, lixas, acessórios",
    emoji: "🖌️",
    color: "#FF6D00",
    items: ["Rolo de Lã 23cm", "Trincha Profissional", "Bandeja para Pintura", "Lixa d'Água", "Fita Crepe", "Desempenadeira"],
  },
];

const BRANDS = ["Suvinil", "Coral", "Sherwin-Williams", "Lukscolor", "Eucatex", "Renner", "Iquine", "Anjo"];

// ---- COMPONENTS ----

function WhatsAppBtn({ text = "Fale Conosco", small = false }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: small ? 8 : 10,
        background: "#25D366", color: "#fff",
        padding: small ? "12px 20px" : "16px 36px",
        borderRadius: 60, fontSize: small ? 14 : 17, fontWeight: 700,
        textDecoration: "none", letterSpacing: "0.01em",
        boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
        transition: "all 0.3s ease", fontFamily: "'Nunito', sans-serif",
        border: "none", cursor: "pointer",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.3)"; }}
    >
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
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
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

// NAP Logo SVG recreation (color wheel + text)
function NAPLogo({ size = 40 }) {
  const s = size;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{
        width: s, height: s, borderRadius: "50%", position: "relative", overflow: "hidden",
        background: `conic-gradient(
          ${COLORS.red} 0deg, ${COLORS.orange} 50deg, ${COLORS.yellow} 100deg,
          ${COLORS.green} 160deg, ${COLORS.blue} 220deg, #7B1FA2 280deg,
          ${COLORS.pink} 330deg, ${COLORS.red} 360deg
        )`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: s * 0.35, height: s * 0.35, borderRadius: "50%", background: "#fff",
        }} />
      </div>
      <div>
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: s * 0.55,
          color: COLORS.darkBlue, letterSpacing: "0.08em", lineHeight: 1,
        }}>NAP</div>
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: s * 0.22,
          color: COLORS.darkBlue, letterSpacing: "0.35em", lineHeight: 1, marginTop: 1,
        }}>TINTAS</div>
      </div>
    </div>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { label: "Início", href: "#hero" },
    { label: "Quem Somos", href: "#sobre" },
    { label: "Produtos", href: "#catalogo" },
    { label: "Pintores", href: "#pintores" },
    { label: "Contato", href: "#contato" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
      padding: scrolled ? "10px 0" : "16px 0",
      background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
      backdropFilter: "blur(20px)",
      transition: "all 0.4s ease",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#hero" style={{ textDecoration: "none" }}><NAPLogo size={38} /></a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="nav-desk">
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{
              color: COLORS.darkBlue, textDecoration: "none", fontSize: 14, fontWeight: 700,
              fontFamily: "'Nunito', sans-serif", letterSpacing: "0.02em",
              transition: "color 0.3s", opacity: 0.7,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = COLORS.blue; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.color = COLORS.darkBlue; }}
            >{l.label}</a>
          ))}
          <WhatsAppBtn text="WhatsApp" small />
        </div>
        <button className="nav-mob-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", fontSize: 28, cursor: "pointer", color: COLORS.darkBlue, padding: 4,
        }}>{menuOpen ? "✕" : "☰"}</button>
      </div>
      {menuOpen && (
        <div className="nav-mob-menu" style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)",
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: COLORS.darkBlue, textDecoration: "none", fontSize: 16, fontWeight: 700,
              fontFamily: "'Nunito', sans-serif", padding: "8px 0",
            }}>{l.label}</a>
          ))}
          <WhatsAppBtn text="Fale no WhatsApp" small />
        </div>
      )}
    </nav>
  );
}

// Paint splash SVG decorative element
function PaintSplash({ color, style: s }) {
  return (
    <div style={{ position: "absolute", ...s, opacity: 0.6 }}>
      <svg width="180" height="80" viewBox="0 0 180 80" fill="none">
        <ellipse cx="90" cy="40" rx="88" ry="32" fill={color} opacity="0.8" />
        <ellipse cx="70" cy="35" rx="60" ry="25" fill={color} />
        <circle cx="150" cy="30" r="18" fill={color} opacity="0.6" />
        <circle cx="30" cy="50" r="12" fill={color} opacity="0.5" />
      </svg>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", background: "#fff",
    }}>
      <PaintSplash color={COLORS.orange} style={{ top: "-20px", left: "-40px", transform: "rotate(-15deg)" }} />
      <PaintSplash color={COLORS.green} style={{ top: "30px", right: "-60px", transform: "rotate(20deg)" }} />
      <PaintSplash color={COLORS.pink} style={{ bottom: "60px", left: "-30px", transform: "rotate(10deg)" }} />
      <PaintSplash color={COLORS.blue} style={{ bottom: "20px", right: "-40px", transform: "rotate(-25deg)" }} />
      <PaintSplash color={COLORS.yellow} style={{ top: "45%", left: "5%", transform: "rotate(5deg) scale(0.7)" }} />
      <PaintSplash color={COLORS.red} style={{ top: "35%", right: "3%", transform: "rotate(-10deg) scale(0.6)" }} />

      <div style={{
        position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 800,
        animation: "fadeUp 0.8s ease-out",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <NAPLogo size={70} />
        </div>

        <h1 style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(32px, 6vw, 56px)",
          fontWeight: 900, color: COLORS.darkBlue, lineHeight: 1.1,
          letterSpacing: "-0.02em", marginBottom: 8,
        }}>
          Venha colorir com a
        </h1>
        <h1 style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(36px, 7vw, 64px)",
          fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24,
          background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.green}, ${COLORS.yellow}, ${COLORS.orange}, ${COLORS.red}, ${COLORS.pink})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          NAP Tintas!
        </h1>

        <p style={{
          fontFamily: "'Nunito', sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "#555", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 20px",
        }}>
          Mais de 20 anos de experiência no mercado de Tintas. Consultoria para identificar as necessidades dos nossos clientes e capacitação dos profissionais da Pintura.
        </p>

        <p style={{
          fontFamily: "'Nunito', sans-serif", fontSize: 17, fontWeight: 700,
          color: COLORS.darkBlue, marginBottom: 36, fontStyle: "italic",
        }}>
          &quot;Os que Transformam Sonhos em Realidades.&quot;
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <WhatsAppBtn text="Pedir Orçamento" />
          <a href="#catalogo" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "16px 32px", borderRadius: 60,
            border: `2px solid ${COLORS.blue}`, color: COLORS.blue,
            fontSize: 17, fontWeight: 700, textDecoration: "none",
            fontFamily: "'Nunito', sans-serif", transition: "all 0.3s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.blue; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.blue; }}
          >Ver Produtos ↓</a>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {VALORES.map((v) => (
            <div key={v.name} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "10px 20px", borderRadius: 40,
              background: `${v.color}12`, border: `1.5px solid ${v.color}30`,
              fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 700,
              color: v.color,
            }}>
              {v.emoji} {v.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { number: "20+", label: "Anos de experiência", color: COLORS.blue },
    { number: "3.000+", label: "Clientes satisfeitos", color: COLORS.green },
    { number: "500+", label: "Pintores parceiros", color: COLORS.orange },
    { number: "2.000+", label: "Tons disponíveis", color: COLORS.pink },
  ];
  return (
    <section style={{
      background: COLORS.darkBlue, padding: "56px 24px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, textAlign: "center", position: "relative", zIndex: 2 }}>
        {stats.map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 44, fontWeight: 900, color: s.color }}>{s.number}</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.orange, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Quem Somos</p>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", color: COLORS.darkBlue, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Como nasceu a NAP Tintas?
          </h2>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "#666", lineHeight: 1.8, maxWidth: 650, margin: "0 auto" }}>
            Como no processo fascinante da mistura das cores, de pigmentos básicos, para a criação de novos tons — a NAP Tintas nasceu através de pigmentos essenciais que surgiram em nossos corações.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 64 }}>
          {PIGMENTOS.map((p) => (
            <div key={p.name} style={{
              background: "#fff", borderRadius: 20, padding: 36,
              border: `2px solid ${p.color}18`,
              boxShadow: `0 8px 32px ${p.color}10`,
              transition: "all 0.4s ease", textAlign: "center",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${p.color}20`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 32px ${p.color}10`; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: p.color }} />
              <div style={{ fontSize: 48, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 24, fontWeight: 900, color: p.color, marginBottom: 12 }}>{p.name}</h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16, color: "#666", lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{
          background: `linear-gradient(135deg, ${COLORS.darkBlue}, #1a237e)`,
          borderRadius: 24, padding: "48px 36px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Direcionados e nutridos por pigmentos de
            </p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
              {VALORES.map((v) => (
                <div key={v.name} style={{
                  padding: "14px 32px", borderRadius: 50,
                  background: v.color, color: "#fff",
                  fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 900,
                  boxShadow: `0 4px 20px ${v.color}50`,
                }}>
                  {v.emoji} {v.name}
                </div>
              ))}
            </div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
              Com acolhimento, cuidado, alegria, respeito e confiança. Uma gestão <strong style={{ color: "#fff" }}>Colaborativa, Próspera e Humana.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Catalog() {
  const [active, setActive] = useState(null);
  return (
    <section id="catalogo" style={{ background: COLORS.offWhite, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.blue, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Nossos Produtos</p>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", color: COLORS.darkBlue, fontWeight: 900, marginBottom: 16 }}>Tudo pra sua obra</h2>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#888", maxWidth: 480, margin: "0 auto" }}>
            Das melhores marcas do mercado. Consulte disponibilidade e preços pelo WhatsApp.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {CATALOG.map((cat, i) => (
            <div key={cat.id} onClick={() => setActive(active === i ? null : i)} style={{
              background: "#fff", border: `2px solid ${active === i ? cat.color + "40" : "#eee"}`,
              borderRadius: 18, padding: 28, cursor: "pointer",
              transition: "all 0.4s ease", position: "relative", overflow: "hidden",
              boxShadow: active === i ? `0 8px 30px ${cat.color}15` : "0 2px 12px rgba(0,0,0,0.04)",
            }}
              onMouseEnter={(e) => { if (active !== i) e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
              onMouseLeave={(e) => { if (active !== i) e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: cat.color, opacity: active === i ? 1 : 0.3, transition: "opacity 0.3s" }} />
              <div style={{ fontSize: 36, marginBottom: 14 }}>{cat.emoji}</div>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 6 }}>{cat.title}</h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#999", marginBottom: active === i ? 18 : 0 }}>{cat.subtitle}</p>

              <div style={{ maxHeight: active === i ? 400 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
                <div style={{ borderTop: "1px solid #eee", paddingTop: 14 }}>
                  {cat.items.map((item, j) => (
                    <div key={j} style={{
                      fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#555", padding: "8px 0",
                      borderBottom: j < cat.items.length - 1 ? "1px solid #f5f5f5" : "none",
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                  <div style={{ marginTop: 16 }}>
                    <WhatsAppBtn text="Consultar Preços" small />
                  </div>
                </div>
              </div>

              {active !== i && <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#bbb", marginTop: 10 }}>Toque para ver produtos →</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pintores() {
  return (
    <section id="pintores" style={{
      background: `linear-gradient(135deg, ${COLORS.darkBlue} 0%, #0d2f5e 100%)`,
      padding: "100px 24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{
          display: "inline-block", padding: "8px 24px", borderRadius: 40,
          background: "rgba(249,168,37,0.15)", border: "1px solid rgba(249,168,37,0.3)",
          marginBottom: 24,
        }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            🖌️ Espaço do Pintor
          </span>
        </div>

        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", color: "#fff", fontWeight: 900, marginBottom: 16 }}>
          Pintor, você é nosso parceiro
        </h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 40px" }}>
          Os profissionais da pintura são os que transformam sonhos em realidade. Na NAP Tintas, valorizamos quem está na obra todo dia. Condições especiais, atendimento prioritário e capacitação.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 40 }}>
          {[
            { emoji: "💰", title: "Preço diferenciado", desc: "Condições especiais pra quem compra com frequência" },
            { emoji: "📦", title: "Entrega na obra", desc: "Levamos direto pra onde você tá trabalhando" },
            { emoji: "📚", title: "Capacitação", desc: "Treinamentos e dicas de técnicas de pintura" },
            { emoji: "⭐", title: "Programa de fidelidade", desc: "Quanto mais compra, mais vantagem acumula" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: 24, textAlign: "left",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.emoji}</div>
              <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{item.title}</h4>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <WhatsAppBtn text="Quero ser parceiro NAP" />
      </div>
    </section>
  );
}

function Marcas() {
  return (
    <section style={{ background: "#fff", padding: "64px 24px", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 28 }}>Marcas que trabalhamos</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
          {BRANDS.map((b, i) => (
            <div key={i} style={{
              padding: "12px 24px", borderRadius: 10,
              border: "1.5px solid #eee", fontFamily: "'Nunito', sans-serif",
              fontSize: 15, color: "#666", fontWeight: 700,
              transition: "all 0.3s ease", cursor: "default",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.blue + "40"; e.currentTarget.style.color = COLORS.blue; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.color = "#666"; }}
            >{b}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Diferenciais() {
  return (
    <section style={{ background: COLORS.offWhite, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {[
            { emoji: "🏪", title: "Atendimento presencial", desc: "Equipe treinada pra ajudar na escolha de produto, cor e quantidade.", color: COLORS.blue },
            { emoji: "🎨", title: "Sistema tintométrico", desc: "Preparamos a cor exata que você precisa. Mais de 2.000 tons.", color: COLORS.green },
            { emoji: "🚚", title: "Entrega na obra", desc: "Levamos direto pra sua obra com agilidade e cuidado.", color: COLORS.orange },
            { emoji: "💬", title: "Consultoria gratuita", desc: "Ajudamos a calcular rendimento, escolher produtos e combinações.", color: COLORS.pink },
          ].map((item, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 16, padding: 28,
              borderLeft: `4px solid ${item.color}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              transition: "transform 0.3s ease",
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.emoji}</div>
              <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 8 }}>{item.title}</h4>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#888", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{
        maxWidth: 800, margin: "0 auto", textAlign: "center",
        background: `linear-gradient(135deg, rgba(27,58,140,0.04) 0%, rgba(76,175,80,0.04) 50%, rgba(249,168,37,0.04) 100%)`,
        border: "2px solid #eee", borderRadius: 28, padding: "64px 36px",
        position: "relative", overflow: "hidden",
      }}>
        <PaintSplash color={COLORS.orange} style={{ top: -30, right: -60, transform: "rotate(15deg) scale(0.6)", opacity: 0.2 }} />
        <PaintSplash color={COLORS.blue} style={{ bottom: -20, left: -50, transform: "rotate(-10deg) scale(0.5)", opacity: 0.2 }} />

        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 38px)", color: COLORS.darkBlue, fontWeight: 900, marginBottom: 16 }}>
            Pronto pra transformar seu espaço?
          </h2>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#888", lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
            Fale com a gente pelo WhatsApp. Manda o projeto, a metragem e a ideia — a gente cuida do resto.
          </p>
          <WhatsAppBtn text="Chamar no WhatsApp" />

          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
            {[
              { icon: "📍", label: "Rua das Tintas, 123\n[Bairro] — [Cidade/UF]" },
              { icon: "🕐", label: "Seg a Sex: 8h–18h\nSáb: 8h–13h" },
              { icon: "📞", label: "(XX) XXXXX-XXXX\n@nap_tintas" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#999", lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: COLORS.darkBlue, padding: "32px 24px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: `conic-gradient(${COLORS.red} 0deg, ${COLORS.orange} 50deg, ${COLORS.yellow} 100deg, ${COLORS.green} 160deg, ${COLORS.blue} 220deg, #7B1FA2 280deg, ${COLORS.pink} 330deg, ${COLORS.red} 360deg)`,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff", margin: "9px auto 0" }} />
          </div>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 16, color: "#fff", letterSpacing: "0.06em" }}>NAP <span style={{ fontWeight: 400, letterSpacing: "0.2em", fontSize: 11 }}>TINTAS</span></span>
        </div>
      </div>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
        © 2026 NAP Tintas — Todos os direitos reservados
      </p>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.15)", marginTop: 6 }}>
        Desenvolvido com 💛 por PulsarH.ai
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <NavBar />
      <Hero />
      <Stats />
      <Sobre />
      <Catalog />
      <Diferenciais />
      <Pintores />
      <Marcas />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
