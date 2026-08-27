# NAP Tintas — site + loja online

Site institucional, link bio, formação de pintores, portal do parceiro e
loja online da **NAP Tintas** (Sorocaba/SP). Next.js (App Router) + Supabase.

**Produção:** https://nap-tintas.vercel.app · **Hub:** [/bio](https://nap-tintas.vercel.app/bio)

## Rotas

| Rota | O que é |
|---|---|
| `/bio` | Link da bio do Instagram — hub de navegação + carrossel de ofertas |
| `/` | Site institucional |
| `/pedidos` | Loja online (carrinho finaliza no WhatsApp) |
| `/colorindo-com-a-nap` | Landing da Formação de pintores |
| `/centro-treinamento` | Portal do Pintor Parceiro |

## 🤖 Instalação com agente (recomendado)

Tem **Claude Code** ou **Codex** na máquina? Abra esta pasta nele e diga:

> **"Faça o setup deste projeto."**

O agente lê `docs/SETUP-CLIENTE.md` e conduz tudo — repo próprio no GitHub,
instalação, Supabase e primeiro admin — fazendo as perguntas na ordem certa.

## Como rodar (passo a passo manual)

```bash
# 1. Clone (ou baixe o ZIP e extraia)
git clone https://github.com/Rbraga010/nap-tintas.git
cd nap-tintas

# 2. Instale as dependências (Node 20+)
npm install

# 3. Rode em desenvolvimento
npm run dev
# abre em http://localhost:3000 — funciona já, em MODO DEMO
```

**Modo demo:** sem configuração extra, a loja usa o catálogo de exemplo
(`app/lib/catalogo-demo.js`). Perfeito pra avaliar o site.

## Ligando o banco de dados (Supabase)

1. Crie uma conta gratuita em [supabase.com](https://supabase.com) e um novo projeto.
2. No painel do projeto: **SQL Editor → New query** → cole o conteúdo de
   [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
3. Repita com [`supabase/seed.sql`](supabase/seed.sql) (carrega o catálogo inicial).
4. Em **Storage**, crie um bucket público chamado `midia` (fotos de produtos/banners).
5. Copie `.env.example` para `.env.local` e preencha com os valores de
   **Settings → API** (URL e anon key).
6. Reinicie o `npm run dev`. Pronto: a loja passa a ler produtos e banners do banco.

### Criando o primeiro admin
1. **Authentication → Users → Add user** (e-mail + senha do dono da loja).
2. **SQL Editor**: `insert into admins (user_id, nome) values ('<id do usuário>', 'Nome');`
   (o id aparece na lista de usuários). O painel Super Admin usa esse acesso.

## Deploy (Vercel)

Projeto conectado ao GitHub: push na branch padrão (`master` neste repo;
`main` num repo criado do zero) = deploy automático.
Configure as mesmas variáveis do `.env.local` em
**Vercel → Settings → Environment Variables** quando ativar o Supabase.

## Arquitetura de dados

- `app/lib/constants.js` — cores da marca e WhatsApp (fonte única)
- `app/lib/supabase.js` — cliente (null em modo demo)
- `app/lib/db.js` — camada de dados: `getProdutos()`, `getBanners(slot)`,
  `cadastrarCliente()` — mesmas funções nos dois modos
- `app/lib/catalogo-demo.js` — catálogo de demonstração (espelho do schema)
- `supabase/schema.sql` — tabelas produtos, banners, clientes, pedidos,
  admins + RLS (leitura pública da vitrine, escrita só admin)

## Pendências conhecidas

- WhatsApp é placeholder (`5515999999999`) — trocar em `app/lib/constants.js`
- Painel Super Admin (produtos + banners) em desenvolvimento
