"use client";

import { useState, useEffect } from "react";
import {
  COLORS,
  WHATSAPP_NUMBER,
  WhatsAppBtn,
  RevealWrap,
  CalculadoraM2,
  FloatingWhatsApp,
} from "../page";

// Mensagem base pra CTAs que nao sao da calculadora/turmas
const WPP_BASE = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const WPP_CONHECER = WPP_BASE(
  "Oi! Quero conhecer o Centro Colorindo com a NAP!"
);

// ---- DATA ----

const PILARES = [
  {
    icon: "🎨",
    color: COLORS.blue,
    title: "Técnica",
    subtitle: "Aplicação que dura e acabamento que encanta.",
    desc: "Do preparo da parede ao acabamento premium. A gente te mostra o jeito certo de aplicar cada produto, especificar o material ideal pra cada obra e dominar efeitos decorativos que diferenciam seu trabalho.",
  },
  {
    icon: "💼",
    color: COLORS.orange,
    title: "Gestão",
    subtitle: "Organize sua obra. Saiba quanto você ganha.",
    desc: "Orçamento profissional, rotina de obra, precificação justa e controle básico de finanças. Chega de trabalhar duro sem saber se sobrou dinheiro no final do mês.",
  },
  {
    icon: "💰",
    color: COLORS.pink,
    title: "Vendas",
    subtitle: "Cobre o que seu trabalho vale.",
    desc: "Como apresentar seu projeto pro cliente, negociar sem medo, fechar o orçamento e deixar porta aberta pra indicação. Pintar bem é metade — vender bem é a outra.",
  },
];

const FAMILIA = [
  {
    icon: "🤝",
    color: COLORS.blue,
    title: "Apoio técnico em obra",
    desc: "Travou numa dúvida? Manda no WhatsApp da NAP. A gente responde rápido e te ajuda a resolver antes do cliente reclamar.",
  },
  {
    icon: "🛠️",
    color: COLORS.green,
    title: "Empréstimo de equipamento",
    desc: "Precisa de compressora, lixadeira ou pulverizadora? Parceiro NAP leva sem pagar nada. Usa na obra, devolve, pronto.",
  },
  {
    icon: "🎯",
    color: COLORS.yellow,
    title: "Indicação de cliente",
    desc: "Quem vai na nossa loja pedindo pintor, a gente indica você. Cliente qualificado, obra certa, sem atravessador.",
  },
  {
    icon: "💬",
    color: COLORS.orange,
    title: "Consultoria ao cliente final",
    desc: "O cliente vai escolhendo cor e material com a gente. Você chega pra aplicar já com tudo resolvido.",
  },
  {
    icon: "💎",
    color: COLORS.pink,
    title: "Programa de comissão",
    desc: "Indica a NAP pros seus clientes e ganha comissão + condições diferenciadas. Quem indica, cresce junto.",
  },
  {
    icon: "👥",
    color: COLORS.red,
    title: "Comunidade de parceiros",
    desc: "Grupo de pintores NAP trocando dicas, indicando obra, ajudando um ao outro. Aqui ninguém fica sozinho.",
  },
];

const TURMAS = [
  {
    mes: "TURMA DE MAIO",
    title: "Técnica de Aplicação Premium",
    meta: "8 horas · Manhã + tarde",
    msg: "Oi! Quero reservar vaga na turma de Técnica de Aplicação Premium.",
  },
  {
    mes: "TURMA DE JUNHO",
    title: "Gestão e Precificação para Pintor",
    meta: "4 horas · Manhã",
    msg: "Oi! Quero reservar vaga na turma de Gestão e Precificação.",
  },
  {
    mes: "TURMA DE JULHO",
    title: "Vendas e Apresentação de Projetos",
    meta: "6 horas · Dia inteiro",
    msg: "Oi! Quero reservar vaga na turma de Vendas e Apresentação de Projetos.",
  },
  {
    mes: "TURMA DE AGOSTO",
    title: "Efeitos Decorativos e Acabamentos",
    meta: "8 horas · Manhã + tarde",
    msg: "Oi! Quero reservar vaga na turma de Efeitos Decorativos.",
  },
];

const FERRAMENTAS = [
  {
    icon: "🧮",
    color: COLORS.blue,
    title: "Calculadora de Obra & Tinta",
    desc: "Coloca as medidas do ambiente e a gente calcula a quantidade exata de tinta, número de galões de 3,6L ou latas de 18L. Orçamento preciso, zero desperdício.",
    label: "Abrir calculadora",
    isCalc: true,
  },
  {
    icon: "🛠️",
    color: COLORS.green,
    title: "Solicitação de Equipamento",
    desc: "Precisa de uma ferramenta pra obra? Preenche o formulário com o que você vai usar e a data, retira na loja. Parceiro NAP pega e devolve, sem burocracia.",
    label: "Solicitar equipamento",
    href: WPP_BASE("Oi! Quero solicitar empréstimo de equipamento."),
  },
  {
    icon: "📄",
    color: COLORS.orange,
    title: "Termo de Responsabilidade",
    desc: "Termo padrão da NAP pra formalizar empréstimo de equipamento e registrar a parceria. Documento simples, proteção pra todo mundo.",
    label: "Baixar termo (PDF)",
    href: "#",
    comingSoon: true,
  },
  {
    icon: "📚",
    color: COLORS.pink,
    title: "Biblioteca Técnica",
    desc: "Fichas de cada produto da NAP: rendimento, modo de aplicação, tempo de secagem, cores disponíveis. Tudo que você precisa consultar antes da obra.",
    label: "Acessar biblioteca",
    href: "/centro-treinamento?tab=biblioteca",
    external: true,
  },
];

const DEPOIMENTOS = [
  {
    iniciais: "JM",
    nome: "José Martins",
    meta: "Pintor há 10 anos · Sorocaba",
    texto:
      "Eu trabalho com pintura há 10 anos e nunca tinha visto uma loja tratar pintor assim. A NAP é diferente. Aprendi a precificar direito e hoje cobro o valor certo sem medo.",
  },
  {
    iniciais: "RS",
    nome: "Ricardo Silva",
    meta: "Pintor há 7 anos · Votorantim",
    texto:
      "Pedi uma compressora emprestada num sábado de manhã e saí da loja com ela no mesmo dia. Na obra, ainda tive apoio técnico no WhatsApp. É outro patamar.",
  },
  {
    iniciais: "AC",
    nome: "André Costa",
    meta: "Pintor há 5 anos · Sorocaba",
    texto:
      "A formação é muito boa, mas o que mais mudou minha rotina foi a comunidade. Tem pintor indicando obra pra mim e eu indicando pra eles. A gente cresce junto.",
  },
];

const LOCAL_ITEMS = [
  {
    icon: "📍",
    title: "Endereço",
    lines: [
      "Rua Cônego André Pieroni, 371",
      "Jd. Guadalajara — Sorocaba/SP",
    ],
  },
  {
    icon: "🕐",
    title: "Horário de Funcionamento",
    lines: ["Segunda a Sexta: 8h às 18h", "Sábado: 8h às 13h"],
  },
  {
    icon: "📱",
    title: "Contato direto",
    lines: ["(15) 99999-9999", "@nap_tintas"],
  },
];

// ---- COMPONENTS ----

function TopColorBar() {
  return (
    <div
      className="ccn-top-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 5,
        zIndex: 9999,
        background: `linear-gradient(90deg, ${COLORS.blue} 0%, ${COLORS.green} 20%, ${COLORS.yellow} 40%, ${COLORS.orange} 60%, ${COLORS.pink} 80%, #C4277A 100%)`,
      }}
    />
  );
}

function Logo() {
  return (
    <div className="ccn-logo-area" style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <img
        src="/nap-logo.jpg"
        alt="NAP Tintas"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <div>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "1.4rem",
            color: COLORS.darkBlue,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          NAP
        </div>
        <div
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.7rem",
            color: COLORS.pink,
            letterSpacing: "0.3em",
            lineHeight: 1,
            marginTop: 2,
          }}
        >
          TINTAS
        </div>
      </div>
    </div>
  );
}

function NavBarCcn() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: "A Formação", href: "#formacao" },
    { label: "Família NAP", href: "#familia" },
    { label: "Turmas", href: "#turmas" },
    { label: "Onde Estamos", href: "#local" },
  ];
  return (
    <nav
      className="ccn-nav"
      style={{
        position: "fixed",
        top: 5,
        left: 0,
        right: 0,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
        zIndex: 1000,
        transition: "all 0.3s",
      }}
    >
      <div
        className="ccn-nav-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="#hero" style={{ textDecoration: "none" }}>
          <Logo />
        </a>
        <ul
          className="ccn-nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  textDecoration: "none",
                  color: COLORS.darkBlue,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  transition: "color 0.2s",
                }}
                className="ccn-nav-link"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={WPP_CONHECER}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#25D366",
                color: "#fff",
                padding: "0.7rem 1.4rem",
                borderRadius: 50,
                fontSize: "0.85rem",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 3px 15px rgba(37,211,102,0.3)",
                transition: "all 0.3s",
              }}
              className="ccn-nav-cta"
            >
              💬 Fale Conosco
            </a>
          </li>
        </ul>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ccn-hamburger"
          aria-label="Menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 6,
          }}
        >
          <span
            style={{
              width: 26,
              height: 3,
              background: COLORS.darkBlue,
              borderRadius: 3,
              transition: "all 0.2s",
            }}
          />
          <span
            style={{
              width: 26,
              height: 3,
              background: COLORS.darkBlue,
              borderRadius: 3,
              transition: "all 0.2s",
            }}
          />
          <span
            style={{
              width: 26,
              height: 3,
              background: COLORS.darkBlue,
              borderRadius: 3,
              transition: "all 0.2s",
            }}
          />
        </button>
      </div>
      {menuOpen && (
        <div
          className="ccn-mob-menu"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: COLORS.darkBlue,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                padding: "0.5rem 0",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WPP_CONHECER}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: "#25D366",
              color: "#fff",
              padding: "0.8rem 1.4rem",
              borderRadius: 50,
              fontSize: "0.9rem",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            💬 Fale Conosco
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="ccn-hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #FFFBF2 0%, #FFF8F0 50%, #FFF 100%)",
        paddingTop: 80,
      }}
    >
      {/* Splashes decorativos */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: COLORS.yellow,
            opacity: 0.12,
            filter: "blur(2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: COLORS.pink,
            opacity: 0.12,
            filter: "blur(2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "60%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: COLORS.green,
            opacity: 0.08,
            filter: "blur(2px)",
          }}
        />
      </div>

      <div
        className="ccn-hero-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          width: "100%",
        }}
      >
        <div>
          <RevealWrap>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                color: COLORS.pink,
                padding: "0.5rem 1.1rem",
                borderRadius: 50,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1.5rem",
                boxShadow: "0 2px 15px rgba(233,30,147,0.12)",
              }}
              className="ccn-hero-badge"
            >
              <span
                className="ccn-badge-dot"
                style={{
                  width: 8,
                  height: 8,
                  background: COLORS.pink,
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
              🎨 Formação Colorindo com a NAP
            </div>
          </RevealWrap>

          <RevealWrap delay={0.1}>
            <h1
              className="ccn-hero-h1"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                color: COLORS.darkBlue,
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              Aqui, pintor é{" "}
              <span
                className="ccn-highlight"
                style={{
                  position: "relative",
                  color: COLORS.pink,
                  display: "inline-block",
                }}
              >
                da família.
              </span>
            </h1>
          </RevealWrap>

          <RevealWrap delay={0.2}>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "1.2rem",
                lineHeight: 1.7,
                color: "#4a5568",
                marginBottom: "2rem",
                maxWidth: 560,
              }}
              className="ccn-hero-sub"
            >
              A NAP criou uma formação pra quem vive de pintar em Sorocaba e
              região. Técnica, gestão, vendas e uma família inteira de apoio do
              seu lado — na loja, na obra, no dia a dia.
            </p>
          </RevealWrap>

          <RevealWrap delay={0.3}>
            <div
              className="ccn-hero-ctas"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <a
                href={WPP_CONHECER}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#25D366",
                  color: "#fff",
                  padding: "1.1rem 2rem",
                  borderRadius: 60,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 6px 25px rgba(37,211,102,0.35)",
                  transition: "all 0.3s",
                }}
                className="ccn-btn-primary"
              >
                💬 Quero conhecer o Centro
              </a>
              <a
                href="#formacao"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#fff",
                  color: COLORS.darkBlue,
                  padding: "1.1rem 2rem",
                  borderRadius: 60,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                  border: "2px solid #e5e7eb",
                  transition: "all 0.3s",
                }}
                className="ccn-btn-secondary"
              >
                Ver a Formação ↓
              </a>
            </div>
          </RevealWrap>

          <RevealWrap delay={0.4}>
            <div
              className="ccn-hero-features"
              style={{
                display: "flex",
                gap: "1.5rem",
                marginTop: "2.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { icon: "🎓", label: "Formação completa" },
                { icon: "🛠️", label: "Empréstimo de equipamento" },
                { icon: "🎯", label: "Indicação de cliente" },
                { icon: "🤝", label: "Apoio em obra" },
              ].map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#4a5568",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>
          </RevealWrap>
        </div>

        <RevealWrap delay={0.3}>
          <div
            className="ccn-mascot-card"
            style={{
              width: "100%",
              maxWidth: 420,
              margin: "0 auto",
              background: "#fff",
              borderRadius: 30,
              padding: "2rem",
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.green}, ${COLORS.yellow}, ${COLORS.orange}, ${COLORS.pink}, #C4277A)`,
              }}
            />
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                background: "linear-gradient(135deg, #f0f4ff, #fff0f8)",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "5rem",
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
                marginBottom: "1rem",
              }}
            >
              🎨👷
            </div>
            <div style={{ textAlign: "center" }}>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: COLORS.darkBlue,
                  marginBottom: 4,
                }}
              >
                Oi, pintor!
              </h3>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "0.9rem",
                  color: "#6b7280",
                }}
              >
                Vem conhecer o centro.
              </p>
            </div>
          </div>
        </RevealWrap>
      </div>
    </section>
  );
}

function SectionTag({ children }) {
  return (
    <span
      className="ccn-section-tag"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 800,
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        color: COLORS.pink,
        marginBottom: "1rem",
      }}
    >
      <span
        style={{
          width: 20,
          height: 3,
          background: COLORS.pink,
          borderRadius: 2,
        }}
      />
      {children}
    </span>
  );
}

function SectionTitle({ children, style }) {
  return (
    <h2
      className="ccn-section-title"
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 900,
        lineHeight: 1.15,
        color: COLORS.darkBlue,
        marginBottom: "1.5rem",
        letterSpacing: "-0.02em",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function SectionIntro({ children, style }) {
  return (
    <p
      className="ccn-section-intro"
      style={{
        fontFamily: "'Nunito', sans-serif",
        fontSize: "1.1rem",
        lineHeight: 1.7,
        color: "#4a5568",
        maxWidth: 720,
        marginBottom: "3rem",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function VideoSection() {
  return (
    <section
      className="ccn-section ccn-video-section"
      style={{
        padding: "6rem 2rem",
        background: COLORS.offWhite,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealWrap>
          <SectionTag>Em 1 minuto</SectionTag>
          <SectionTitle>Deixa a gente te mostrar como é.</SectionTitle>
          <SectionIntro style={{ marginLeft: "auto", marginRight: "auto" }}>
            Um minuto pra você entender o que é a Formação Colorindo com a NAP
            e por que ela foi feita pra você.
          </SectionIntro>
        </RevealWrap>

        <RevealWrap delay={0.1}>
          <div
            className="ccn-video-embed"
            style={{
              maxWidth: 900,
              margin: "2rem auto 0",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              aspectRatio: "16 / 9",
              position: "relative",
              cursor: "pointer",
              background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.pink} 50%, ${COLORS.orange} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
            role="button"
            tabIndex={0}
            onClick={() =>
              alert("Vídeo institucional em produção — em breve!")
            }
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  color: COLORS.pink,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s",
                  margin: "0 auto",
                }}
                className="ccn-video-play"
              >
                ▶
              </div>
              <div
                style={{
                  marginTop: "1rem",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                }}
              >
                Vídeo: Formação Colorindo com a NAP
              </div>
            </div>
          </div>
        </RevealWrap>
      </div>
    </section>
  );
}

function FormacaoSection() {
  return (
    <section
      id="formacao"
      className="ccn-section"
      style={{ padding: "6rem 2rem", background: "#fff" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealWrap>
          <SectionTag>A Formação</SectionTag>
          <SectionTitle>Tudo que pintor precisa saber pra crescer.</SectionTitle>
          <SectionIntro>
            A Formação Colorindo com a NAP foi pensada pra te preparar em 3
            frentes que fazem toda a diferença no seu dia a dia.
          </SectionIntro>
        </RevealWrap>

        <div
          className="ccn-pilares-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {PILARES.map((p, i) => (
            <RevealWrap key={i} delay={i * 0.1}>
              <div
                className="ccn-pilar-card"
                style={{
                  background: "#fff",
                  borderRadius: 24,
                  padding: "2.5rem 2rem",
                  border: "2px solid #f0f2f5",
                  transition: "all 0.3s",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 5,
                    background: p.color,
                    borderRadius: "24px 24px 0 0",
                  }}
                />
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    marginBottom: "1.5rem",
                    background: `${p.color}1a`,
                  }}
                >
                  {p.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: COLORS.darkBlue,
                    marginBottom: "0.4rem",
                  }}
                >
                  {p.title}
                </h3>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: COLORS.pink,
                    marginBottom: "1rem",
                  }}
                >
                  {p.subtitle}
                </div>
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    color: "#6b7280",
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </RevealWrap>
          ))}
        </div>
      </div>
    </section>
  );
}

function FamiliaSection() {
  return (
    <section
      id="familia"
      className="ccn-section"
      style={{
        padding: "6rem 2rem",
        background: "linear-gradient(135deg, #FFFBF2 0%, #FFF0F5 100%)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealWrap>
          <SectionTag>Família NAP</SectionTag>
          <SectionTitle>
            A formação é o começo. A família dura pra sempre.
          </SectionTitle>
          <SectionIntro>
            Quando você entra pra Formação Colorindo com a NAP, você vira
            parceiro. E parceiro NAP tem uma família inteira do lado — todo
            dia, em toda obra.
          </SectionIntro>
        </RevealWrap>

        <div
          className="ccn-familia-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {FAMILIA.map((f, i) => (
            <RevealWrap key={i} delay={i * 0.06}>
              <div
                className="ccn-familia-card"
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "2rem 1.8rem",
                  transition: "all 0.3s",
                  border: "1px solid rgba(0,0,0,0.04)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                    marginBottom: "1.2rem",
                    background: `${f.color}1a`,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: COLORS.darkBlue,
                    marginBottom: "0.6rem",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.92rem",
                    lineHeight: 1.65,
                    color: "#6b7280",
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </RevealWrap>
          ))}
        </div>
      </div>
    </section>
  );
}

function TurmasSection() {
  return (
    <section
      id="turmas"
      className="ccn-section"
      style={{ padding: "6rem 2rem", background: "#fff" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealWrap>
          <SectionTag>Próximas Turmas</SectionTag>
          <SectionTitle>Venha conhecer. Venha fazer parte.</SectionTitle>
          <SectionIntro>
            Turmas com vagas limitadas. Todas as formações acontecem
            presencialmente no nosso Centro de Treinamento em Sorocaba.
            Parceiros NAP têm prioridade.
          </SectionIntro>
        </RevealWrap>

        <div
          className="ccn-turmas-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {TURMAS.map((t, i) => (
            <RevealWrap key={i} delay={i * 0.08}>
              <div
                className="ccn-turma-card"
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "2rem 1.8rem",
                  border: "2px solid #f0f2f5",
                  transition: "all 0.3s",
                  position: "relative",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: COLORS.darkBlue,
                    color: "#fff",
                    padding: "0.4rem 1rem",
                    borderRadius: 50,
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    marginBottom: "1rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  📅 {t.mes}
                </div>
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: COLORS.darkBlue,
                    marginBottom: "0.6rem",
                    lineHeight: 1.3,
                  }}
                >
                  {t.title}
                </h3>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.85rem",
                    color: "#6b7280",
                    marginBottom: "1rem",
                  }}
                >
                  {t.meta}
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: COLORS.green,
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      background: COLORS.green,
                      borderRadius: "50%",
                    }}
                  />
                  Inscrições abertas
                </div>
                <a
                  href={WPP_BASE(t.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ccn-turma-btn"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#f8f9fb",
                    color: COLORS.darkBlue,
                    padding: "0.9rem",
                    borderRadius: 50,
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  Quero reservar minha vaga
                </a>
              </div>
            </RevealWrap>
          ))}
        </div>

        <RevealWrap delay={0.3}>
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              padding: "1.5rem",
              background: "#f8f9fb",
              borderRadius: 16,
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.9rem",
              color: "#6b7280",
              fontStyle: "italic",
            }}
          >
            Todas as turmas acontecem no Centro de Treinamento Colorindo com a
            NAP.
            <br />
            As datas exatas são confirmadas no WhatsApp após o cadastro.
          </div>
        </RevealWrap>
      </div>
    </section>
  );
}

function FerramentasSection({ onOpenCalc }) {
  return (
    <section
      className="ccn-section"
      style={{ padding: "6rem 2rem", background: COLORS.offWhite }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealWrap>
          <SectionTag>Ferramentas da Família</SectionTag>
          <SectionTitle>Ferramentas que facilitam sua obra todo dia.</SectionTitle>
          <SectionIntro>
            Parceiro NAP tem acesso a ferramentas exclusivas. Sem complicação,
            sem custo.
          </SectionIntro>
        </RevealWrap>

        <div
          className="ccn-ferramentas-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {FERRAMENTAS.map((f, i) => (
            <RevealWrap key={i} delay={i * 0.08}>
              <div
                className="ccn-ferramenta-card"
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "2.5rem 2rem",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  transition: "all 0.3s",
                  border: "1px solid rgba(0,0,0,0.04)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 60,
                    height: 60,
                    borderRadius: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.8rem",
                    background: `${f.color}1a`,
                  }}
                >
                  {f.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: COLORS.darkBlue,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      color: "#6b7280",
                      marginBottom: "1rem",
                    }}
                  >
                    {f.desc}
                  </p>
                  {f.isCalc ? (
                    <button
                      onClick={onOpenCalc}
                      className="ccn-ferr-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: COLORS.pink,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        padding: 0,
                      }}
                    >
                      {f.label} →
                    </button>
                  ) : (
                    <a
                      href={f.href}
                      target={f.external || !f.comingSoon ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (f.comingSoon) {
                          e.preventDefault();
                          alert("Documento em preparação. Em breve!");
                        }
                      }}
                      className="ccn-ferr-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: COLORS.pink,
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        textDecoration: "none",
                      }}
                    >
                      {f.label} →
                    </a>
                  )}
                </div>
              </div>
            </RevealWrap>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConversaSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const nome = form.nome.value.trim();
    const wpp = form.wpp.value.trim();
    const experiencia = form.experiencia.value;
    const mensagem = form.mensagem.value.trim();
    const receber = form.receber.checked;

    const linhas = [
      "Oi NAP! Quero conhecer a Formação Colorindo com a NAP.",
      "",
      `Nome: ${nome}`,
      `WhatsApp: ${wpp}`,
      `Experiência: ${experiencia}`,
      `Mensagem: ${mensagem || "(sem mensagem)"}`,
    ];
    if (receber) {
      linhas.push("");
      linhas.push("Quero receber as próximas turmas no WhatsApp.");
    }

    const texto = linhas.join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
      "_blank"
    );
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    form.reset();
  }

  return (
    <section
      className="ccn-section"
      style={{ padding: "6rem 2rem", background: "#fff" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealWrap>
          <SectionTag>Bate-papo Direto</SectionTag>
          <SectionTitle>
            Quer entrar pra família NAP? Bora conversar.
          </SectionTitle>
          <SectionIntro>
            Chama no WhatsApp ou preenche o formulário. A gente responde
            rápido, sem robô e sem enrolação. Aqui é gente conversando com
            gente.
          </SectionIntro>
        </RevealWrap>

        <div
          className="ccn-conversa-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            marginTop: "2rem",
            alignItems: "start",
          }}
        >
          <RevealWrap>
            <div
              className="ccn-wpp-mascote-card"
              style={{
                background: "linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 100%)",
                borderRadius: 24,
                padding: "2rem 1.5rem 1.5rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                border: "2px solid rgba(37,211,102,0.15)",
              }}
            >
              {/* Respingos decorativos */}
              <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "#25D366", opacity: 0.08, filter: "blur(2px)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "#F9A825", opacity: 0.08, filter: "blur(2px)", pointerEvents: "none" }} />

              <img
                src="/mascote-whatsapp.jpg"
                alt="Mascote NAP pintando WhatsApp"
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  maxWidth: 320,
                  height: "auto",
                  margin: "0 auto 0.5rem",
                  display: "block",
                  position: "relative",
                  zIndex: 1,
                  mixBlendMode: "multiply",
                }}
              />
              <h3
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 900,
                  marginBottom: "0.4rem",
                  color: "#064E3B",
                  letterSpacing: "-0.01em",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                Chama no Zap!
              </h3>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "0.95rem",
                  color: "#047857",
                  marginBottom: "1.25rem",
                  position: "relative",
                  zIndex: 2,
                  lineHeight: 1.5,
                }}
              >
                Conversa rápida e direta com gente da NAP.<br />Sem robô, sem enrolação.
              </p>
              <a
                href={WPP_CONHECER}
                target="_blank"
                rel="noopener noreferrer"
                className="ccn-btn-wp-big"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#25D366",
                  color: "#fff",
                  padding: "0.95rem 2rem",
                  borderRadius: 50,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                Chamar no WhatsApp →
              </a>
            </div>
          </RevealWrap>

          <RevealWrap delay={0.1}>
            <div
              style={{
                background: "#f8f9fb",
                borderRadius: 24,
                padding: "2.5rem 2rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: COLORS.darkBlue,
                  marginBottom: "1.5rem",
                }}
              >
                Deixa seu contato
              </h3>
              <form onSubmit={handleSubmit} className="ccn-form">
                <FormField label="Seu nome">
                  <input
                    name="nome"
                    type="text"
                    required
                    placeholder="Como a gente te chama?"
                    className="ccn-input"
                  />
                </FormField>
                <FormField label="WhatsApp / Telefone">
                  <input
                    name="wpp"
                    type="tel"
                    required
                    placeholder="(15) 99999-9999"
                    className="ccn-input"
                  />
                </FormField>
                <FormField label="Você já é pintor?">
                  <select name="experiencia" required className="ccn-input">
                    <option value="">Escolha...</option>
                    <option value="Sim, há anos">Sim, há anos</option>
                    <option value="Estou começando">Estou começando</option>
                    <option value="Quero aprender">Quero aprender</option>
                  </select>
                </FormField>
                <FormField label="Conta pra gente o que você procura">
                  <textarea
                    name="mensagem"
                    placeholder="Escreve do jeito que você quiser..."
                    className="ccn-input"
                    style={{ minHeight: 100, resize: "vertical" }}
                  />
                </FormField>
                <label
                  className="ccn-form-check"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    margin: "1rem 0",
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "0.85rem",
                    color: "#6b7280",
                    cursor: "pointer",
                  }}
                >
                  <input
                    name="receber"
                    type="checkbox"
                    defaultChecked
                    style={{ marginTop: 3, accentColor: COLORS.pink }}
                  />
                  <span>
                    Quero receber as próximas turmas no WhatsApp
                  </span>
                </label>
                <button
                  type="submit"
                  className="ccn-form-submit"
                  style={{
                    width: "100%",
                    background: COLORS.pink,
                    color: "#fff",
                    padding: "1rem",
                    border: "none",
                    borderRadius: 50,
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {sent ? "✓ Abrindo WhatsApp..." : "Enviar pra NAP"}
                </button>
              </form>
            </div>
          </RevealWrap>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "block",
          fontFamily: "'Nunito', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 700,
          color: COLORS.darkBlue,
          marginBottom: 4,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function DepoimentosSection() {
  return (
    <section
      className="ccn-section"
      style={{ padding: "6rem 2rem", background: COLORS.offWhite }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealWrap>
          <SectionTag>Quem já é da família</SectionTag>
          <SectionTitle>
            O que os pintores parceiros estão dizendo.
          </SectionTitle>
        </RevealWrap>

        <div
          className="ccn-dep-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {DEPOIMENTOS.map((d, i) => (
            <RevealWrap key={i} delay={i * 0.1}>
              <div
                className="ccn-dep-card"
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "2rem",
                  position: "relative",
                  transition: "all 0.3s",
                  height: "100%",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    left: "1.5rem",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "4rem",
                    color: COLORS.pink,
                    opacity: 0.2,
                    lineHeight: 1,
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: "#2d3748",
                    marginBottom: "1.5rem",
                    paddingTop: "1.5rem",
                  }}
                >
                  {d.texto}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.orange})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      flexShrink: 0,
                    }}
                  >
                    {d.iniciais}
                  </div>
                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.95rem",
                        color: COLORS.darkBlue,
                      }}
                    >
                      {d.nome}
                    </strong>
                    <span
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "0.8rem",
                        color: "#6b7280",
                      }}
                    >
                      {d.meta}
                    </span>
                  </div>
                </div>
              </div>
            </RevealWrap>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocalSection() {
  return (
    <section
      id="local"
      className="ccn-section"
      style={{ padding: "6rem 2rem", background: "#fff" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <RevealWrap>
          <SectionTag>Onde a gente te espera</SectionTag>
          <SectionTitle>
            Venha conhecer o Centro Colorindo com a NAP.
          </SectionTitle>
          <SectionIntro>
            A porta da NAP tá aberta. Passa na loja, conhece o centro, toma um
            café com a gente. Aqui pintor é recebido como gente da casa.
          </SectionIntro>
        </RevealWrap>

        <div
          className="ccn-local-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            marginTop: "2rem",
          }}
        >
          <RevealWrap>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {LOCAL_ITEMS.map((l, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    padding: "1.5rem",
                    background: "#f8f9fb",
                    borderRadius: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      flexShrink: 0,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    {l.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.95rem",
                        fontWeight: 800,
                        color: COLORS.darkBlue,
                        marginBottom: 4,
                      }}
                    >
                      {l.title}
                    </h4>
                    {l.lines.map((line, j) => (
                      <p
                        key={j}
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: "0.9rem",
                          color: "#6b7280",
                          lineHeight: 1.5,
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RevealWrap>

          <RevealWrap delay={0.15}>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                height: 400,
                background: "#e0e0e0",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.7!2d-47.45!3d-23.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUnVhIEPDtG5lZ28gQW5kcsOpIFBpZXJvbmksIDM3MSAtIEpkIEd1YWRhbGFqYXJhLCBTb3JvY2FiYSAtIFNQ!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização NAP Tintas"
              />
            </div>
          </RevealWrap>
        </div>
      </div>
    </section>
  );
}

function CtaFinalSection() {
  return (
    <section
      className="ccn-cta-final"
      style={{
        background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.pink} 50%, ${COLORS.orange} 100%)`,
        color: "#fff",
        textAlign: "center",
        padding: "5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-10%",
          width: 500,
          height: 500,
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: 400,
          height: 400,
          background: "rgba(255,255,255,0.08)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <RevealWrap>
          <span
            className="ccn-section-tag"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.85)",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                width: 20,
                height: 3,
                background: "rgba(255,255,255,0.85)",
                borderRadius: 2,
              }}
            />
            Última chamada
          </span>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Pronto pra entrar pra família?
          </h2>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "1.15rem",
              maxWidth: 600,
              margin: "0 auto 2.5rem",
              opacity: 0.95,
            }}
          >
            Vem conhecer o Centro Colorindo com a NAP. Conversa rápida pra
            gente te contar como funciona e te receber como parceiro.
          </p>
          <a
            href={WPP_CONHECER}
            target="_blank"
            rel="noopener noreferrer"
            className="ccn-btn-cta-big"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "#fff",
              color: COLORS.pink,
              padding: "1.3rem 2.8rem",
              borderRadius: 60,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: "1.1rem",
              textDecoration: "none",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              transition: "all 0.3s",
            }}
          >
            💬 Quero conhecer o Centro
          </a>
          <p
            style={{
              marginTop: "2rem",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.95rem",
              opacity: 0.85,
            }}
          >
            Ou passa lá: Rua Cônego André Pieroni, 371 — Sorocaba/SP
          </p>
        </RevealWrap>
      </div>
    </section>
  );
}

function FooterCcn() {
  return (
    <footer
      style={{
        background: COLORS.darkBlue,
        color: "rgba(255,255,255,0.7)",
        padding: "3rem 2rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "1.5rem",
            color: "#fff",
            marginBottom: "0.5rem",
          }}
        >
          NAP Tintas
        </div>
        <div
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
            opacity: 0.8,
          }}
        >
          Formação profissionalizante pra pintor parceiro NAP
        </div>
        <div
          className="ccn-footer-links"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.9rem",
            }}
            className="ccn-footer-link"
          >
            Site institucional
          </a>
          <a
            href="https://instagram.com/nap_tintas"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.9rem",
            }}
            className="ccn-footer-link"
          >
            Instagram
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.9rem",
            }}
            className="ccn-footer-link"
          >
            WhatsApp
          </a>
          <a
            href="#local"
            style={{
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "0.9rem",
            }}
            className="ccn-footer-link"
          >
            Endereço
          </a>
        </div>
        <div
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "0.8rem",
            opacity: 0.5,
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          © 2026 NAP Tintas. Colorindo sonhos desde 2026. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}

function CalcModal({ open, onClose }) {
  // Lock body scroll when modal open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="ccn-calc-modal"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(10,14,26,0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        overflowY: "auto",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: 760,
          width: "100%",
          margin: "auto",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            position: "absolute",
            top: -12,
            right: -12,
            zIndex: 10,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#fff",
            border: "none",
            fontSize: "1.3rem",
            cursor: "pointer",
            color: COLORS.darkBlue,
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}
        >
          ✕
        </button>
        <CalculadoraM2 />
      </div>
    </div>
  );
}

// ---- MAIN PAGE ----

export default function ColorindoComANapPage() {
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <TopColorBar />
      <NavBarCcn />
      <Hero />
      <VideoSection />
      <FormacaoSection />
      <FamiliaSection />
      <TurmasSection />
      <FerramentasSection onOpenCalc={() => setCalcOpen(true)} />
      <ConversaSection />
      <DepoimentosSection />
      <LocalSection />
      <CtaFinalSection />
      <FooterCcn />
      <FloatingWhatsApp />
      <CalcModal open={calcOpen} onClose={() => setCalcOpen(false)} />
    </div>
  );
}
