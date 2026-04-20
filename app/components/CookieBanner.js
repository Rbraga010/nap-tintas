"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nap_cookie_consent_v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        // Pequeno delay pra não atropelar o carregamento inicial
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, ts: Date.now() }));
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 950,
        maxWidth: 460,
        marginLeft: "auto",
        marginRight: "auto",
        background: "#fff",
        border: "1.5px solid #F3F4F6",
        borderRadius: 18,
        padding: "18px 20px",
        boxShadow: "0 18px 40px rgba(13, 27, 62, 0.18)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        fontFamily: "'Nunito', sans-serif",
        animation: "cookieSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{ fontSize: 28, lineHeight: 1 }}>🍪</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            id="cookie-banner-title"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 15,
              fontWeight: 900,
              color: "#0D1B3E",
              marginBottom: 4,
              letterSpacing: "-0.01em",
            }}
          >
            A gente usa cookies pra melhorar sua visita
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              lineHeight: 1.55,
            }}
          >
            Cookies essenciais pra navegação e, com seu aceite, pra entender o que você gostou. Nada de invasão — só pra colorir melhor sua experiência.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          onClick={accept}
          style={{
            padding: "10px 20px",
            borderRadius: 40,
            background: "linear-gradient(135deg, #E91E93, #FF6D00)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Poppins', sans-serif",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.01em",
            boxShadow: "0 4px 14px rgba(233,30,147,0.3)",
          }}
        >
          Aceitar e continuar
        </button>
      </div>

      <style jsx>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
