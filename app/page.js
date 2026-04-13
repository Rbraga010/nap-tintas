"use client";

import { useState, useEffect } from "react";

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
  { emoji: "🎨", title: "Sistema Tintométrico", desc: "Mais de 2.000 opções de cores misturadas na hora. O tom exato que você quer, sem erro, sem desperdício.", color: COLORS.blue },
  { emoji: "💬", title: "Consultoria Personalizada", desc: "Nossa equipe orienta de verdade. Desde tons neutros até cores vibrantes e efeitos decorativos.", color: COLORS.green },
  { emoji: "🪣", title: "Portfólio Completo", desc: "Tintas internas e externas, primers, texturas, efeitos decorativos e todos os acessórios. Tudo em um só lugar.", color: COLORS.orange },
  { emoji: "🚚", title: "Entrega em Sorocaba", desc: "Comprou, a gente leva. Entrega disponível para Sorocaba e região. Sem complicação.", color: COLORS.pink },
  { emoji: "⭐", title: "+20 Anos de Experiência", desc: "Duas décadas de mercado formaram nosso olhar técnico e nossa capacidade de orientação.", color: COLORS.yellow },
  { emoji: "👨‍👩‍👧‍👦", title: "Atendimento Familiar", desc: "Aqui você é recebido como gente, não como número. Somos uma loja de família.", color: COLORS.red },
];

// ---- COMPONENTS ----

function WhatsAppBtn({ text = "Fale Conosco", small = false }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="wpp-btn"
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

function NAPLogo({ size = 40, light = false }) {
  const s = size;
  const textColor = light ? "#fff" : COLORS.darkBlue;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{
        width: s, height: s, borderRadius: "50%", position: "relative", overflow: "hidden",
        background: `conic-gradient(
          ${COLORS.red} 0deg, ${COLORS.orange} 50deg, ${COLORS.yellow} 100deg,
          ${COLORS.green} 160deg, ${COLORS.blue} 220deg, #7B1FA2 280deg,
          ${COLORS.pink} 330deg, ${COLORS.red} 360deg
        )`,
        boxShadow: light ? "0 2px 20px rgba(255,255,255,0.3)" : "0 2px 12px rgba(0,0,0,0.2)",
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: s * 0.35, height: s * 0.35, borderRadius: "50%", background: "#fff",
        }} />
      </div>
      <div>
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: s * 0.55,
          color: textColor, letterSpacing: "0.08em", lineHeight: 1,
        }}>NAP</div>
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: s * 0.22,
          color: textColor, letterSpacing: "0.35em", lineHeight: 1, marginTop: 1,
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
    { label: "Sobre", href: "#sobre" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Valores", href: "#valores" },
    { label: "Pintores", href: "#pintores" },
    { label: "Contato", href: "#contato" },
  ];
  const navTextColor = scrolled ? COLORS.darkBlue : "#fff";
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
      padding: scrolled ? "10px 0" : "16px 0",
      background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(10,14,26,0.6)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      transition: "all 0.4s ease",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#hero" style={{ textDecoration: "none" }}><NAPLogo size={36} light={!scrolled} /></a>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="nav-desk">
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{
              color: navTextColor, textDecoration: "none", fontSize: 14, fontWeight: 700,
              fontFamily: "'Nunito', sans-serif", letterSpacing: "0.02em",
              transition: "all 0.4s ease", opacity: 0.8,
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

function Hero() {
  return (
    <section id="hero" className="hero-section" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url(/hero-cans.jpg)",
        backgroundSize: "cover", backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }} />
      {/* Subtle right-side gradient for text readability */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(90deg, rgba(13,27,62,0.15) 0%, rgba(13,27,62,0.5) 40%, rgba(13,27,62,0.85) 65%, rgba(13,27,62,0.92) 100%)",
      }} />

      <div className="hero-inner" style={{
        position: "relative", zIndex: 2,
        maxWidth: 1200, margin: "0 auto", width: "100%",
        padding: "120px 48px 80px",
        display: "flex", alignItems: "center", justifyContent: "flex-end",
      }}>
        <div className="hero-copy" style={{
          maxWidth: 520, animation: "fadeUp 0.8s ease-out",
          textAlign: "right",
        }}>
          <h1 className="hero-h1" style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(30px, 4.5vw, 52px)",
            fontWeight: 900, color: "#fff", lineHeight: 1.12,
            letterSpacing: "-0.02em", marginBottom: 24,
          }}>
            A cor que <em style={{ fontStyle: "italic", color: COLORS.yellow }}>transforma</em> o seu espaço começa com uma <em style={{ fontStyle: "italic", color: COLORS.green }}>boa conversa</em>.
          </h1>

          <p className="hero-sub" style={{
            fontFamily: "'Nunito', sans-serif", fontSize: "clamp(15px, 1.8vw, 18px)",
            color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 40,
          }}>
            Mais de 20 anos de experiência no mercado de tintas. Mais de 2.000 opções de cores misturadas na hora. Consultoria personalizada que vai além do balcão.
          </p>

          <div className="hero-ctas" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <WhatsAppBtn text="Peça seu Orçamento" />
            <a href="#sobre" className="btn-secondary" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 32px", borderRadius: 60,
              border: "2px solid rgba(255,255,255,0.35)", color: "#fff",
              fontSize: 17, fontWeight: 700, textDecoration: "none",
              fontFamily: "'Nunito', sans-serif", transition: "all 0.3s ease",
              backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.08)",
            }}>Conheça a NAP</a>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section style={{
      background: COLORS.darkBlue, padding: "20px 0", overflow: "hidden",
      borderTop: `3px solid ${COLORS.blue}`, borderBottom: `3px solid ${COLORS.blue}`,
    }}>
      <div className="marquee-track" style={{
        display: "flex", gap: 48, whiteSpace: "nowrap",
        animation: "marqueeScroll 15s linear infinite",
      }}>
        {repeated.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
          }}>
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <span style={{
              fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 700,
              color: "rgba(255,255,255,0.7)", textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>{item.text}</span>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 20, marginLeft: 8 }}>|</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HistoriaVideo() {
  return (
    <section style={{ width: "100%", lineHeight: 0 }}>
      <img
        src="/hero-bg.gif"
        alt="NAP Tintas — Pigmentos que nos movem: Colorir, Solucionar, Capacitar, Sonho, Amor, Família"
        style={{ width: "100%", display: "block", objectFit: "cover" }}
      />
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="section-pad" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.orange, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Nossa História</p>
          <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: COLORS.darkBlue, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.2 }}>
            Nascemos de paixão. Crescemos com propósito.
          </h2>
        </div>

        <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#555", lineHeight: 1.85 }}>
          <p style={{ marginBottom: 20 }}>
            A NAP Tintas foi construída <strong style={{ color: COLORS.darkBlue }}>pincelada a pincelada</strong>. Mais de duas décadas percorrendo o mercado de tintas, passando por empresas que nos moldaram e pessoas que nos inspiraram. Cada etapa foi um pigmento a mais na formação da nossa base.
          </p>
          <p style={{ marginBottom: 20 }}>
            Chegou o momento em que todos esses aprendizados se encontraram e formaram a cor que sempre quisemos ver: <strong style={{ color: COLORS.darkBlue }}>a nossa própria organização.</strong>
          </p>
          <p style={{ marginBottom: 36 }}>
            Somos uma empresa de família, com alma de vizinhança. Acreditamos que transformar um ambiente começa com uma boa conversa, um atendimento de verdade e a cor certa.
          </p>
        </div>

        <div style={{
          background: `linear-gradient(135deg, ${COLORS.darkBlue}, #1a237e)`,
          borderRadius: 20, padding: "36px 32px", position: "relative",
          borderLeft: `5px solid ${COLORS.yellow}`,
        }}>
          <p style={{
            fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.9)",
            lineHeight: 1.7, fontStyle: "italic",
          }}>
            &quot;Colorir sonhos, identificando a necessidade e o desejo de cada cliente. Com atendimento humano, especificação correta e capacitação de profissionais.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}

function DiferenciaisSection() {
  return (
    <section id="diferenciais" className="section-pad" style={{ background: COLORS.offWhite, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.blue, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Por Que a NAP?</p>
          <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: COLORS.darkBlue, fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
            Diferenciais que fazem a diferença de verdade.
          </h2>
        </div>

        <div className="diff-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {DIFERENCIAIS.map((item, i) => (
            <div key={i} className="diff-card" style={{
              background: "#fff", borderRadius: 16, padding: 28,
              borderTop: `4px solid ${item.color}`,
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
              transition: "transform 0.3s ease",
            }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{item.emoji}</div>
              <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 10 }}>{item.title}</h4>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#777", lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValoresSection() {
  return (
    <section id="valores" className="section-pad" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.green, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>O que nos move</p>
          <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: COLORS.darkBlue, fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
            Nossos valores não estão na parede. Estão em cada atendimento.
          </h2>
        </div>

        <div className="valores-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {VALORES.map((v, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 16,
              padding: 24, borderRadius: 16,
              background: COLORS.offWhite, border: `1px solid #eee`,
              transition: "transform 0.3s ease",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `${v.color}14`, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, flexShrink: 0,
              }}>{v.emoji}</div>
              <div>
                <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 17, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 6 }}>{v.name}</h4>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#777", lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pintores() {
  return (
    <section id="pintores" className="section-pad" style={{
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
            Espaço do Pintor
          </span>
        </div>

        <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: "#fff", fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
          Para quem vive de pintura, a NAP é parceira.
        </h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 40px" }}>
          Profissionais de pintura encontram aqui mais do que produtos. Encontram um ponto de apoio, orientação técnica e condições que fazem a diferença na rotina.
        </p>

        <div className="pintores-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 40, textAlign: "left" }}>
          {[
            { emoji: "🔧", title: "Especificação técnica", desc: "Orientação sobre o produto certo para cada tipo de superfície e acabamento." },
            { emoji: "💰", title: "Condições especiais", desc: "Preços e prazos diferenciados para profissionais cadastrados." },
            { emoji: "📚", title: "Capacitação", desc: "Conteúdo e treinamentos para evoluir na profissão." },
            { emoji: "🤝", title: "Relacionamento de longo prazo", desc: "Não é venda, é parceria. Você indica, a gente retribui." },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16, padding: 24,
              transition: "all 0.3s ease",
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.emoji}</div>
              <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{item.title}</h4>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{
          display: "inline-block", padding: "14px 28px", borderRadius: 14,
          background: "rgba(249,168,37,0.15)", border: "1px solid rgba(249,168,37,0.3)",
          marginBottom: 32,
        }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: COLORS.yellow, fontWeight: 700 }}>
            Cadastre-se — Condições exclusivas para pintores profissionais
          </span>
        </div>
        <br />
        <WhatsAppBtn text="Quero ser parceiro NAP" />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-pad" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{
        maxWidth: 800, margin: "0 auto", textAlign: "center",
        background: `linear-gradient(135deg, rgba(27,58,140,0.05) 0%, rgba(76,175,80,0.05) 50%, rgba(249,168,37,0.05) 100%)`,
        border: "2px solid #eee", borderRadius: 24, padding: "64px 32px",
      }}>
        <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.orange, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Pronto pra transformar?</p>
        <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", color: COLORS.darkBlue, fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
          A cor perfeita está a uma conversa de distância.
        </h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#888", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px" }}>
          Fale com a nossa equipe pelo WhatsApp. Orçamento rápido, consultoria gratuita e atendimento que entende o que você precisa.
        </p>
        <WhatsAppBtn text="Chamar no WhatsApp" />
      </div>
    </section>
  );
}

function OndeEstamos() {
  return (
    <section id="contato" className="section-pad" style={{ background: COLORS.offWhite, padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="tag" style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: COLORS.blue, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 800, marginBottom: 12 }}>Onde Estamos</p>
          <h2 className="section-title" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", color: COLORS.darkBlue, fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
            Venha nos visitar.
          </h2>
        </div>

        <div className="contato-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { icon: "📍", title: "Endereço", lines: ["Rua Cônego André Pieroni, 371", "Jardim Guadalajara — Sorocaba/SP"] },
            { icon: "🕐", title: "Horário", lines: ["Seg a Sex: 8h às 18h", "Sábado: 8h às 13h"] },
            { icon: "📱", title: "Contato", lines: ["(15) 99999-9999", "@nap_tintas"] },
          ].map((item, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 16, padding: 28, textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
              <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 800, color: COLORS.darkBlue, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.title}</h4>
              {item.lines.map((line, j) => (
                <p key={j} style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#777", lineHeight: 1.7 }}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: COLORS.darkBlue, padding: "36px 24px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <NAPLogo size={30} light />
      </div>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
        Colorindo Sonhos desde 2026
      </p>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
        © 2026 NAP Tintas. Todos os direitos reservados. | Sorocaba/SP
      </p>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.15)", marginTop: 8 }}>
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
      <Marquee />
      <HistoriaVideo />
      <Sobre />
      <DiferenciaisSection />
      <ValoresSection />
      <Pintores />
      <CTASection />
      <OndeEstamos />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
