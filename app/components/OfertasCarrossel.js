"use client";

// ============================================================
// CARROSSEL DE OFERTAS (coverflow) — compartilhado bio + loja (Bloco 5)
// Slide central + vizinhos espiando nas laterais, setas abaixo, autoplay
// com pausa em hover/toque e loop infinito blindado contra aba oculta.
// Os banners vem da camada de dados. Bio e Loja usam o MESMO conjunto
// (slot "bio", aba unica "Banners" no admin — decisao do Rodrigo, 28/08).
// Maximo 5 por regra.
// ============================================================
import { useEffect, useState } from "react";
import { OFERTAS } from "../lib/catalogo-demo";
import { getBanners } from "../lib/db";

export default function OfertasCarrossel({ slot = "bio", fallbackSlot = null, max = 5, inicialDemo = false }) {
  const [ofertas, setOfertas] = useState(
    inicialDemo ? OFERTAS.slice(0, max).map((o) => ({ ...o, href: "/pedidos" })) : []
  );
  const [pos, setPos] = useState(1);
  const [noTrans, setNoTrans] = useState(false);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    let vivo = true;
    (async () => {
      let b = await getBanners(slot);
      if (!b.length && fallbackSlot) b = await getBanners(fallbackSlot);
      if (vivo) setOfertas(b.slice(0, max));
    })();
    return () => { vivo = false; };
  }, [slot, fallbackSlot, max]);

  const N = ofertas.length;

  // incremento blindado: se o snap do clone nao rodou (aba oculta nao
  // dispara transitionend), normaliza aqui mesmo
  const ir = (delta) => setPos((p) => {
    let n = p + delta;
    if (n > N + 1) n -= N;
    if (n < 0) n += N;
    return n;
  });

  useEffect(() => {
    if (pausado || N < 2) return;
    const t = setInterval(() => {
      if (!document.hidden) ir(1);
    }, 4200);
    return () => clearInterval(t);
  }, [pausado, N]);

  const onEnd = () => {
    if (pos === N + 1) { setNoTrans(true); setPos(1); }
    else if (pos === 0) { setNoTrans(true); setPos(N); }
  };
  useEffect(() => {
    if (!noTrans) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setNoTrans(false)));
    return () => cancelAnimationFrame(id);
  }, [noTrans]);

  if (!N) return null;

  const track = [ofertas[N - 1], ...ofertas, ofertas[0]];
  const ativo = ((pos - 1) % N + N) % N;

  return (
    <div className="bio-ofertas-wrap">
      <div
        className="bio-ofertas-frame"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onTouchStart={() => setPausado(true)}
        onTouchEnd={() => setPausado(false)}
      >
        <div
          className="bio-ofertas-track"
          onTransitionEnd={onEnd}
          style={{
            left: `calc(${7 - pos * 86}% - ${pos * 12}px)`,
            transition: noTrans ? "none" : undefined,
          }}
        >
          {track.map((o, i) => (
            <a
              key={i}
              href={o.href || "/pedidos"}
              className={`bio-oferta-slide ${i === pos ? "ativa" : ""}`}
              aria-label={o.alt}
              tabIndex={i === pos ? 0 : -1}
            >
              <img src={o.src} alt={o.alt} loading={i <= 2 ? "eager" : "lazy"} />
            </a>
          ))}
        </div>
      </div>
      {N > 1 && (
        <div className="bio-ofertas-nav">
          <button type="button" aria-label="Oferta anterior" onClick={() => ir(-1)}>‹</button>
          <div className="bio-ofertas-dots" aria-hidden>
            {ofertas.map((_, i) => (
              <span key={i} className={i === ativo ? "on" : ""} />
            ))}
          </div>
          <button type="button" aria-label="Próxima oferta" onClick={() => ir(1)}>›</button>
        </div>
      )}
    </div>
  );
}
