"use client";

import { useEffect, useState } from "react";

export default function ScrollTop({ threshold = 600 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className="scroll-top-btn"
      style={{
        position: "fixed",
        bottom: 96,
        right: 24,
        zIndex: 800,
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "none",
        background: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 22px rgba(13, 27, 62, 0.16)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "all 0.3s ease",
        overflow: "hidden",
      }}
    >
      <img
        src="/mascote-roda.jpg"
        alt=""
        aria-hidden
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))",
        }}
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
