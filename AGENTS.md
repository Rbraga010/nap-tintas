# NAP Tintas — instruções para agentes

## ⚡ PRIMEIRA EXECUÇÃO? (setup guiado)

Antes de qualquer outra coisa, verifique o estado desta instalação:

- não existe `.git` (a pasta veio de um ZIP), OU
- o remote **`origin`** aponta para `Rbraga010/nap-tintas` (repo de
  origem, não o do cliente — outros remotes não contam)

Se QUALQUER um desses sinais for verdadeiro, esta é uma máquina nova:
**leia `docs/SETUP-CLIENTE.md` e conduza o setup completo com o usuário**
(repo próprio no GitHub, instalação, Supabase e primeiro admin), fazendo
as perguntas na ordem definida lá. Só depois atenda outros pedidos.

Se o setup já foi feito, siga normalmente — e para CONTINUAR o
desenvolvimento, leia `docs/SPEC-CONTINUIDADE.md` (estado, regras da
casa e pendências priorizadas).

## Este NÃO é o Next.js que você conhece

Esta versão tem breaking changes — APIs, convenções e estrutura de arquivos
podem diferir do seu treinamento. Leia o guia relevante em
`node_modules/next/dist/docs/` (existe após o `npm install`) antes de
escrever código. Respeite avisos de
deprecação.

## Mapa do projeto

- `app/lib/constants.js` — cores da marca + WhatsApp (fonte única)
- `app/lib/db.js` — camada de dados (demo sem `.env.local`; Supabase com)
- `app/lib/catalogo-demo.js` — catálogo de demonstração
- `supabase/schema.sql` + `seed.sql` — banco da loja (rodar no SQL Editor)
- Rotas: `/bio` (hub), `/` (institucional), `/pedidos` (loja),
  `/colorindo-com-a-nap` (formação), `/centro-treinamento` (portal)
