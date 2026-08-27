# SPEC DE SETUP — agente de instalação da loja NAP Tintas

> **Para o agente (Claude Code, Codex ou similar):** você é o instalador
> guiado deste projeto. Sua missão é sair de uma pasta recém-baixada e
> chegar em: repo próprio do cliente no GitHub, site rodando local,
> Supabase conectado e primeiro admin criado. Conduza o usuário passo a
> passo, UMA fase por vez, validando cada uma antes de seguir.

## Regras invioláveis

1. **Nunca peça, digite ou armazene senhas/chaves em chat.** Logins
   (GitHub, Supabase, Vercel) são feitos PELO USUÁRIO no navegador; você
   apenas dispara o fluxo e espera.
2. **Pergunte antes de criar qualquer coisa em conta de terceiros**
   (repo, projeto, deploy). Nada de ação irreversível sem confirmação.
3. **Valide cada fase com um teste real** (comando/HTTP) antes de
   declarar concluída. Silêncio não é sucesso.
4. Se algo falhar, diagnostique e explique em 1 frase antes de tentar de
   novo. Não repita comandos às cegas.

## Fase 0 — Diagnóstico (execute, não pergunte)

```bash
node -v          # precisa ser >= 20; se não houver, guie a instalação em nodejs.org
git --version    # se não houver git, use o caminho ZIP na Fase 1
git remote -v    # inexistente (ZIP) ou Rbraga010 (clone de origem)?
ls .env.local    # existe? então o Supabase já foi ligado
```

Apresente ao usuário um resumo do estado e o plano das fases restantes.

## Fase 1 — Perguntas de abertura (faça TODAS antes de agir)

1. "Qual conta do GitHub vamos usar — você já está logado no `gh` desta
   máquina?" (`gh auth status`; se não: `gh auth login --web` e o usuário
   autoriza no navegador)
2. "Que nome quer para o repositório? (sugestão: `nap-tintas`) Privado ou
   público?"
3. "Você já tem conta/projeto no Supabase, ou criamos agora?"
4. "Quer carregar o catálogo de exemplo no banco (22 produtos + 4
   banners), ou começar vazio?" (recomende: carregar — o admin edita depois)
5. "Vamos configurar o deploy na Vercel agora ou depois?" (deploy é
   opcional nesta instalação)

## Fase 2 — Repo próprio do cliente

**Se a pasta veio de ZIP (sem `.git`):**
```bash
git init -b main && git add -A && git commit -m "chore: importa site NAP Tintas"
gh repo create <NOME> --private --source=. --push
```

**Se veio de clone do repo de origem (`Rbraga010/nap-tintas`):**
```bash
gh repo create <NOME> --private --source=. --push   # cria E aponta o remote novo
# se o gh reclamar do remote existente:
git remote rename origin origem-pulsarh
gh repo create <NOME> --private --source=. --remote origin --push
```

✅ Validação: `gh repo view <NOME> --json url -q .url` responde a URL nova.

## Fase 3 — Rodar local

```bash
npm install
npm run dev    # porta 3000 (se ocupada: npm run dev -- -p 3001)
```
✅ Validação: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/bio`
responde `200`. Avise: "o site já funciona em modo demo".

## Fase 4 — Supabase (o banco da loja)

Guie o usuário NO NAVEGADOR (você não tem acesso ao dashboard dele):

1. supabase.com → login (conta DELE) → **New project**
   (região `South America (São Paulo)`; a senha do banco é dele, não sua)
2. **SQL Editor → New query** → peça pra colar o conteúdo de
   `supabase/schema.sql` → Run. (Você pode abrir o arquivo e copiar pro
   clipboard dele se a ferramenta permitir.)
3. Se a resposta da pergunta 4 foi "carregar": repetir com `supabase/seed.sql`.
4. **Storage → New bucket** → nome `midia` → marcar **Public**.
5. **Settings → API** → o usuário copia URL e anon key; crie o arquivo:
   ```bash
   cp .env.example .env.local
   # e edite .env.local com os dois valores que o USUÁRIO colar no chat
   # (URL e anon key são publicáveis por design — o RLS protege os dados;
   #  ainda assim, jamais peça a service_role key)
   ```
6. Reinicie o `npm run dev`.

✅ Validação (sem SDK, direto na API REST):
```bash
curl -s "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/produtos?select=id,nome&limit=1" \
  -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY"
# deve responder um JSON com 1 produto (se seed) ou [] (se vazio) — nunca erro
```

## Fase 5 — Primeiro admin

1. Dashboard → **Authentication → Users → Add user** (e-mail/senha do dono
   — ele digita, você não vê).
2. Peça o **User ID** exibido na lista e rode no SQL Editor:
   ```sql
   insert into admins (user_id, nome) values ('<ID>', '<Nome do dono>');
   ```
✅ Validação: `select count(*) from admins;` retorna 1.

## Fase 6 — (Opcional) Deploy Vercel

Somente se a resposta da pergunta 5 foi "agora":
```bash
npx vercel login        # usuário autoriza no navegador
npx vercel link         # criar projeto novo na conta DELE
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production    # idem pra ANON_KEY
npx vercel --prod
```
✅ Validação: a URL de produção responde 200 em `/bio`.

## Encerramento — imprima este resumo preenchido

```
✅ SETUP CONCLUÍDO
Repo:      github.com/<conta>/<nome>
Local:     <pasta> (npm run dev)
Supabase:  projeto <nome> — schema ok, seed <sim/não>, bucket midia ok
Admin:     <e-mail do dono>
Deploy:    <URL de produção ou "pendente">
Próximos:  trocar o WhatsApp placeholder em app/lib/constants.js ·
           painel Super Admin (ver docs/ROADMAP quando existir)
```
