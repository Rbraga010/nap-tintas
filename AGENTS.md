# NAP Tintas — instruções para agentes

## ⚡ PRIMEIRA EXECUÇÃO? (setup guiado)

Antes de qualquer outra coisa, verifique o estado desta instalação:

- **NÃO existe `.env.local`** na raiz, OU
- o remote do git é `Rbraga010/nap-tintas` (repo de origem, não o do cliente), OU
- não existe `node_modules/`

Se QUALQUER um desses sinais for verdadeiro, esta é uma máquina nova:
**leia `docs/SETUP-CLIENTE.md` e conduza o setup completo com o usuário**
(repo próprio no GitHub, instalação, Supabase e primeiro admin), fazendo
as perguntas na ordem definida lá. Só depois atenda outros pedidos.

Se o setup já foi feito, siga normalmente.

## Este NÃO é o Next.js que você conhece

Esta versão tem breaking changes — APIs, convenções e estrutura de arquivos
podem diferir do seu treinamento. Leia o guia relevante em
`node_modules/next/dist/docs/` antes de escrever código. Respeite avisos de
deprecação.

## Mapa do projeto

- `app/lib/constants.js` — cores da marca + WhatsApp (fonte única)
- `app/lib/db.js` — camada de dados (demo sem `.env.local`; Supabase com)
- `app/lib/catalogo-demo.js` — catálogo de demonstração
- `supabase/schema.sql` + `seed.sql` — banco da loja (rodar no SQL Editor)
- Rotas: `/bio` (hub), `/` (institucional), `/pedidos` (loja),
  `/colorindo-com-a-nap` (formação), `/centro-treinamento` (portal)
