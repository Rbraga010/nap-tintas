/** @type {import('next').NextConfig} */
const nextConfig = {
  // ancora o root do Turbopack neste projeto: ha um package-lock.json solto
  // em C:\Sistemas e a inferencia automatica escolhia o diretorio errado,
  // quebrando o React Client Manifest no dev (GET / 500)
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
