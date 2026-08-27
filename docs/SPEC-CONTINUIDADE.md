# SPEC DE CONTINUIDADE — para o próximo agente

> Você está assumindo o site + loja da **NAP Tintas** (Sorocaba/SP).
> Este documento diz o que já existe, como trabalhamos e onde continuar.
> Leia também o `AGENTS.md` (raiz) e o `README.md`.

## Estado atual (27/08/2026)

Tudo abaixo está NO AR em https://nap-tintas.vercel.app (deploy
automático: push na `master` do GitHub → Vercel).

- **/bio** — hub de navegação (porta de entrada oficial do Instagram):
  carrossel coverflow de ofertas no topo (gerido pelo admin), 3 cards
  (Pedido → Institucional → Formação) e destaque do Pintor Parceiro
- **/** — institucional · **/colorindo-com-a-nap** — LP da Formação ·
  **/centro-treinamento** — portal do parceiro (área de membros fake
  aguardando fase própria) · **/pedidos** — LOJA v3 · **/admin** — Super Admin
- **Loja v3**: estantes por categoria deslizando pro lado, pills-âncora,
  busca, banner coverflow (máx 5, o MESMO conjunto da bio), card com
  foto/marca/nome(bold)/descrição/unidade/preço com De-Para
- **Super Admin**: produtos (CRUD completo + Preço De), estantes
  (categorias dinâmicas), banners (conjunto ÚNICO bio+loja, slot "bio"), clientes (mini-CRM: CRUD,
  observações internas, WhatsApp clicável, histórico/total por cliente)
  e pedidos (leitura, com nome do cliente).
  Sem banco = modo demo (localStorage versionado `DEMO_V`); com Supabase
  = login real + RLS
- **Design system**: tokens no `:root` do `globals.css` (tipografia de
  10 degraus, container, seção fluida, sombras/easing); fontes
  self-hosted via next/font (Poppins display / Nunito body)

## Como o dono do projeto trabalha (regras da casa)

1. **Entrega em DEV → avaliação → só então commit/push.** Nunca
   commite/pushe sem OK explícito do responsável (push = deploy).
2. Feedbacks dele são diretos e visuais; aplicar, verificar no browser
   (DOM + medidas reais) e mostrar. Ele avalia em produção.
3. Blocos pequenos: fatie trabalho grande e entregue por partes.
4. Next.js 16 com breaking changes: leia `node_modules/next/dist/docs/`
   antes de usar APIs que você "conhece".
5. O dev server local usa `npm run dev` (o `turbopack.root` está fixado
   no `next.config.mjs` — não remova).

## Arquitetura de dados (leia antes de mexer na loja/admin)

- `app/lib/constants.js` — cores + WhatsApp (fonte única)
- `app/lib/db.js` — TODA leitura/escrita passa por aqui. Modo demo
  (localStorage, chaves versionadas por `DEMO_V` — **suba a versão se
  mudar o shape do catálogo**) e modo Supabase com fallback pro demo
- `app/lib/catalogo-demo.js` — catálogo exemplo (espelho do schema)
- `app/components/OfertasCarrossel.js` — carrossel coverflow único
  (bio + loja); classes CSS `.bio-ofertas*` no globals
- `supabase/schema.sql` + `seed.sql` — banco completo com RLS
- `docs/SETUP-CLIENTE.md` — setup agêntico de máquina nova
- `docs/TRANSFERENCIA.md` — handoff de contas pro cliente

## Pendências conhecidas (comece por aqui)

1. ~~WhatsApp real~~ FEITO — (15) 99813-7222 em `app/lib/constants.js`.
   ~~Assets premium~~ FEITO — capa `hero-cans.jpg` + vídeo `hero-video.mp4`.
2. **Material real do dono para tirar os rótulos "ilustrativo"**: os
   números e promessas do site (+20 anos, +2.000 cores, consultoria,
   entrega) foram VALIDADOS pelo dono em 28/08/2026 — fato confirmado.
   Falta apenas o que não se valida, se substitui: depoimentos reais
   autorizados (LP da formação), pintores parceiros reais com foto
   própria (vitrine do portal — hoje são exemplos com foto de banco de
   imagem, rotulados), datas reais das turmas quando houver agenda, e o
   embed real do Google Maps (ficha do Google Business). Ao receber cada
   material, trocar o conteúdo E remover o rótulo correspondente.
3. **Ativar Supabase real do cliente** — roteiro pronto em
   `docs/SETUP-CLIENTE.md`; criar primeiro admin (README).
4. **Fotos reais dos produtos** — o card v3 e o admin já suportam
   `imagem_url`/upload; catálogo com foto vende mais.
5. **Detalhe do produto** — clicar no card poderia abrir modal/página
   com descrição longa e galeria (campo `descricao` já existe).
6. **Gestão de status de pedido** no admin (novo → atendido → cancelado)
   — hoje a aba Pedidos é só leitura.
7. **Portal do Pintor** (`/centro-treinamento`) é vitrine com conteúdo
   fake — fase futura: membros reais (Supabase Auth já está no projeto).
8. **Analytics** — nada instalado; medir funil bio → loja → WhatsApp.
9. **Domínio próprio + e-mail** — ver `docs/TRANSFERENCIA.md`.

## O que NÃO fazer

- Não recriar constantes/cores locais (importe de `lib/constants`).
- Não acessar Supabase direto das páginas (sempre via `lib/db.js`).
- Não adicionar font-size/família fora dos tokens do `:root`.
- Não abrir rota interna com `target="_blank"` (decisão de navegação).
- Não commitar `.env.local` (o `.gitignore` protege; `.env.example` é o
  espelho público).
