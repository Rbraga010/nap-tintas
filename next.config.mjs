/** @type {import('next').NextConfig} */
const nextConfig = {
  // ancora o root do Turbopack neste projeto: ha um package-lock.json solto
  // em C:\Sistemas e a inferencia automatica escolhia o diretorio errado,
  // quebrando o React Client Manifest no dev (GET / 500)
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    // a porta de entrada do dominio e a BIO (o trafego vem do Instagram);
    // o institucional continua vivo em /institucional
    return [{ source: "/", destination: "/bio", permanent: false }];
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    }];
  },
};

export default nextConfig;
