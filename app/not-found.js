import Link from "next/link";

export const metadata = {
  title: "Essa cor sumiu — Página não encontrada",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1000px ellipse at 50% 0%, #FFF8F0 0%, #FFFFFF 60%), linear-gradient(180deg, #FFFBF2 0%, #FFFFFF 40%, #FFF8F5 100%)",
        fontFamily: "'Nunito', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Respingos decorativos */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "#F9A825", opacity: 0.1, filter: "blur(3px)" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 260, height: 260, borderRadius: "50%", background: "#E91E93", opacity: 0.08, filter: "blur(3px)" }} />
      <div style={{ position: "absolute", top: "40%", left: -50, width: 180, height: 180, borderRadius: "50%", background: "#4CAF50", opacity: 0.07, filter: "blur(3px)" }} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 560,
          textAlign: "center",
        }}
      >
        {/* Mascote */}
        <div
          style={{
            position: "relative",
            width: 200,
            height: 200,
            margin: "0 auto 24px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, #1B3A8C, #4CAF50, #F9A825, #FF6D00, #E91E93, #C4277A, #1B3A8C)",
              filter: "blur(12px)",
              opacity: 0.3,
            }}
          />
          <img
            src="/mascote-roda.jpg"
            alt="Mascote NAP"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #fff",
              boxShadow: "0 14px 36px rgba(0,0,0,0.12)",
            }}
          />
        </div>

        {/* Número 404 colorido */}
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(60px, 14vw, 110px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            marginBottom: 12,
            background:
              "linear-gradient(135deg, #1B3A8C 0%, #4CAF50 25%, #F9A825 50%, #FF6D00 75%, #E91E93 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(22px, 4vw, 30px)",
            fontWeight: 900,
            color: "#0D1B3E",
            marginBottom: 10,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          Opa, essa cor sumiu!
        </h1>

        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 16,
            color: "#6b7280",
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          A página que você procura não existe ou foi pintada por cima. Mas calma, a gente te leva de volta pro caminho certo.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 50,
              background:
                "linear-gradient(135deg, #E91E93, #FF6D00)",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 15,
              fontWeight: 800,
              textDecoration: "none",
              letterSpacing: "0.01em",
              boxShadow: "0 8px 24px rgba(233,30,147,0.35)",
            }}
          >
            🏠 Voltar pra home
          </Link>
          <Link
            href="/bio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 50,
              background: "#fff",
              color: "#0D1B3E",
              border: "2px solid #F3F4F6",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 15,
              fontWeight: 800,
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            Ver todas as páginas
          </Link>
        </div>

        <p
          style={{
            marginTop: 40,
            fontFamily: "'Nunito', sans-serif",
            fontSize: 12,
            color: "#9CA3AF",
            fontStyle: "italic",
          }}
        >
          NAP Tintas · Colorindo Sonhos em Sorocaba/SP
        </p>
      </div>
    </div>
  );
}
