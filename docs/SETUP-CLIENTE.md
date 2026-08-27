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

**Pré-requisitos da máquina** — se você está lendo isto, o Claude
Code/Codex já está instalado; garanta o resto ANTES da Fase 1, guiando a
instalação do que faltar (nunca prossiga com ferramenta faltando):
- Node.js 20+ (https://nodejs.org, versão LTS)
- git (https://git-scm.com)
- gh CLI (https://cli.github.com)

```bash
node -v          # precisa ser >= 20; se não houver, guie a instalação em nodejs.org
git --version    # se não houver git, use o caminho ZIP na Fase 1
gh --version     # sem gh CLI? guie a instalação: https://cli.github.com
git remote -v    # inexistente (ZIP) ou Rbraga010 (clone de origem)?
ls .env.local    # existe? então o Supabase já foi ligado
```
(No PowerShell, prefira `Test-Path .env.local` — o `ls` de arquivo
inexistente despeja erro verboso.)

Apresente ao usuário um resumo do estado e o plano das fases restantes.

## Fase 0.5 — INVENTÁRIO: o cliente já tem coisa no ar? (OBRIGATÓRIO)

⚠️ **A armadilha mais cara deste setup**: presumir que o cliente parte do
zero. Na prática o dono do negócio quase sempre JÁ tem algum pedaço no ar
(um site antigo publicado por outra pessoa, um domínio registrado, um
e-mail profissional funcionando). Criar tudo do zero por cima disso gera
projeto duplicado, site velho voltando sozinho e, no pior caso, e-mail
derrubado. **Levante o que existe antes de criar qualquer coisa.**

Pergunte ao dono, uma a uma, e ANOTE:

1. "Você já tem um site no ar hoje? Em que endereço?" (mesmo que velho ou
   feio — é o que o Google e os clientes conhecem)
2. "Já tem domínio próprio registrado? Em que empresa (registro.br,
   GoDaddy, HostGator…) e em nome de quem?"
3. "Usa e-mail no domínio (contato@seudominio)? Por qual serviço?"
   → **se a resposta for sim, o e-mail é INTOCÁVEL**: qualquer mexida em
   DNS precisa preservar MX/SPF/DKIM (veja a Fase 7)
4. "Já tem conta na Vercel? E no GitHub? Quem publicou o site atual?"

Depois confirme por fora, sem depender da memória dele:

```bash
# quem responde pelo domínio hoje e o que existe de e-mail
nslookup -type=NS  <dominio>
nslookup -type=MX  <dominio>
nslookup -type=TXT <dominio>           # SPF
# o site atual (title revela se é loja de verdade ou página de estacionamento)
curl -sI https://<dominio> | head -20
```

**Regra de ouro do brownfield: ATUALIZE o que existe, não duplique.**
Se já há projeto na Vercel servindo o domínio, publique NELE (a Fase 6
vira "atualizar projeto existente"). Se já há repo, aponte o deploy para
o repo novo em vez de deixar dois publicando no mesmo lugar.

⚠️ **Vínculo git órfão** — o erro silencioso mais comum: você publica por
CLI, fica lindo, e semanas depois o site VELHO reaparece sozinho porque o
projeto Vercel continuava ligado a um repositório antigo com deploy
automático. Cheque e resolva antes de encerrar:

```bash
npx vercel project ls        # ou o painel: Settings → Git
```
Se houver repo antigo ligado: suba o código para o repo NOVO do cliente e
religue o projeto nele (Settings → Git → Disconnect, depois Connect), ou
desconecte o git de vez. Nunca deixe dois repos publicando no mesmo projeto.

## Fase 1 — Perguntas de abertura (faça TODAS antes de agir)

1. "Qual conta do GitHub vamos usar — você já está logado no `gh` desta
   máquina?" (`gh auth status`; se não: `gh auth login --web` e o usuário
   autoriza no navegador; se ele nem TIVER conta, guie a criação em
   https://github.com/signup antes)
2. "Que nome quer para o repositório? (sugestão: `nap-tintas`) Privado ou
   público?" — se a Fase 0.5 achou um repo antigo publicando o site,
   diga isso a ele: o certo é UM repo, o novo, ligado ao deploy
3. "Você já tem conta/projeto no Supabase, ou criamos agora?"
4. "Quer carregar o catálogo de exemplo no banco (22 produtos + 4
   banners), ou começar vazio?" (recomende: carregar — o admin edita depois)
5. "Vamos configurar o deploy na Vercel agora ou depois?" (deploy é
   opcional nesta instalação)
6. "Você já tem (ou quer registrar) um domínio próprio, tipo
   naptintas.com.br? E quer e-mail profissional nesse domínio?"
   (define se as Fases 7 e 8 entram no plano)

## Fase 2 — Repo próprio do cliente

**Se a pasta veio de ZIP (sem `.git`):**
```bash
git init -b main && git add -A && git commit -m "chore: importa site NAP Tintas"
gh repo create <NOME> --private --source=. --push
# (--private/--public conforme a resposta da pergunta 2)
```

**Se veio de clone do repo de origem (`Rbraga010/nap-tintas`):**
```bash
gh repo create <NOME> --private --source=. --push   # cria E aponta o remote novo
# se o gh reclamar do remote existente:
git remote rename origin origem-pulsarh
gh repo create <NOME> --private --source=. --remote origin --push
```

✅ Validação: `gh repo view <NOME> --json url -q .url` responde a URL
nova. O remote antigo pode ficar como `origem-pulsarh` (o gatilho do
AGENTS.md só olha o `origin`).

## Fase 3 — Rodar local

```bash
npm install
npm run dev    # porta 3000 (se ocupada: npm run dev -- -p 3001)
# atenção: o dev BLOQUEIA este terminal — rode as validações seguintes
# em outro terminal (ou rode o dev em background)
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

✅ Validação (sem SDK, direto na API REST — os valores estão DENTRO do
`.env.local`, não são variáveis do shell; leia o arquivo e substitua):
```bash
curl -s "<URL_DO_PROJETO>/rest/v1/produtos?select=id,nome&limit=1" -H "apikey: <ANON_KEY>"
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

Somente se a resposta da pergunta 5 foi "agora".

**Caminho recomendado (garante push = deploy automático):** o usuário
importa o repo pelo painel — https://vercel.com/new → Import Git
Repository → escolhe o repo criado na Fase 2 → cola as duas env vars
(`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`, os mesmos
valores do `.env.local`) → Deploy.

Alternativa por CLI (conecte o GitHub ao final, senão push NÃO deploya):
```bash
npx vercel login        # usuário autoriza no navegador
npx vercel link         # criar projeto novo na conta DELE
# env add lê o valor de forma interativa; em shell não-interativo use:
#   echo "<valor>" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production    # idem pra ANON_KEY
npx vercel --prod
npx vercel git connect  # liga o repo: push na branch padrão = deploy
```
✅ Validação: a URL de produção responde 200 em `/bio` E um push de teste
dispara deploy novo no painel da Vercel.

## Fase 7 — (Opcional) Domínio próprio: registro.br → Vercel

Somente se a resposta da pergunta 6 incluiu domínio. Pré-requisito: Fase 6
concluída (o domínio aponta pro projeto Vercel do cliente).

1. **Registro**: se o domínio ainda não existe, o DONO registra em
   https://registro.br com o CPF/CNPJ DELE e paga com o cartão DELE — você
   nunca conduz pagamento; apenas aguarde e confirme "registrado".
2. **Na Vercel**: projeto → Settings → Domains → Add → digite o domínio
   (ex.: `naptintas.com.br`) e também o `www.`. A Vercel exibirá os
   registros DNS exatos (um `A` para a raiz e um `CNAME` para o `www`).
   **Use os valores que a tela mostrar** — eles mudam com o tempo, não use
   valores decorados de outros tutoriais.
3. **No registro.br** (dono logado; login é dele). Dois caminhos, e a
   escolha muda o resto:

   **(a) O domínio usa DNS de terceiro (Cloudflare, HostGator, GoDaddy…)?**
   O mais seguro é adicionar os registros LÁ MESMO, no painel de quem já
   hospeda a zona: o e-mail continua intocado e não há janela de
   indisponibilidade. Só migre para o DNS do registro.br se o dono quiser
   centralizar de fato.

   **(b) Migrando para o DNS do registro.br** (botão "Utilizar DNS do
   Registro.br") — ⚠️ **avise o dono ANTES**, porque isto acontece:
   - a zona antiga é **descartada na hora**: site E e-mail param até você
     recadastrar tudo (por isso capture MX/SPF/DKIM ANTES, veja abaixo);
   - a publicação **não é imediata**: o registro.br entra numa janela de
     transição de ~2h e, enquanto ela durar, o painel aceita e guarda a
     zona ("Zona DNS atualizada com sucesso!") mas os servidores
     autoritativos continuam respondendo a zona de domínio estacionado
     (`MX 0 (root)`, `v=spf1 -all`). **Salvar de novo NÃO adianta** —
     confirmado em teste: o serial do SOA não muda. Só o tempo resolve;
   - nessa janela também **não dá para voltar** para o DNS de terceiro,
     nem para o modo básico (bloqueio de ~2h). Não há botão de desfazer.
   - **Faça essa migração fora do horário comercial**, com o dono ciente
     de que site e e-mail ficam fora do ar por até ~2h. Mensagens
     recebidas nesse período costumam ser reentregues (servidores sérios
     tentam por ~48h), mas não conte com isso para e-mail crítico.

   **Antes de migrar, CAPTURE a zona antiga inteira** (é a sua rede de
   segurança — sem isso, o e-mail do cliente morre):
   ```bash
   nslookup -type=MX  <dominio> 8.8.8.8
   nslookup -type=TXT <dominio> 8.8.8.8                      # SPF
   nslookup -type=TXT <selector>._domainkey.<dominio> 8.8.8.8  # DKIM
   ```
   Descubra os selectors DKIM pelo serviço de e-mail em uso (Titan usa
   `titan1`, Zoho usa `zoho`/`zmail`, Google usa `google`); teste também
   `default._domainkey`, comum em migrações antigas. Chaves DKIM são
   longas e truncam no `nslookup` — no Windows use
   `Resolve-DnsName -Type TXT <nome> -Server 8.8.8.8` e junte as partes
   (`$_.Strings -join ""`) para copiar o valor COMPLETO.

   Depois, em **"Configurar zona DNS"** → modo avançado:
   - registro `A`: campo nome **em branco** (é a raiz; o registro.br NÃO
     aceita `@`), valor = o IP que a Vercel mostrou (pode haver mais de
     um; cadastre todos)
   - registro `CNAME`: nome `www`, valor = o host que a Vercel mostrou
   - **se você migrou do caminho (b), recadastre TAMBÉM todo o e-mail
     capturado**: cada MX com sua prioridade (ex.: `10 mx1.titan.email`,
     `20 mx2.titan.email`), o TXT do SPF na raiz, e um TXT por chave
     DKIM (nome = `<selector>._domainkey`). Confira valor por valor
     contra a captura antes de salvar.
   - ⚠️ se a zona já tiver registros (MX/TXT de e-mail), **não apague
     nada** — apenas adicione os do site.
   - salvar. No caminho (a) publica em ~1 minuto; no caminho (b) só
     depois da janela de transição terminar.
4. **No código**: busque `nap-tintas.vercel.app` no repositório
   (`metadataBase`/URLs nos `layout.js`) e troque pelo domínio novo;
   commit e push (a Vercel redeploya sozinha).

✅ Validação — **só declare pronto com o servidor autoritativo
respondendo**, nunca com base na mensagem de sucesso do painel:
```bash
# 1. a zona publicou mesmo? (pergunte a quem responde pelo domínio)
nslookup -type=NS <dominio> a.dns.br            # descobre os autoritativos
nslookup -type=A  <dominio> <autoritativo>      # tem que devolver o IP da Vercel
nslookup -type=MX <dominio> <autoritativo>      # tem que devolver o e-mail do cliente
# 2. o site responde no domínio?
curl -sI https://<dominio> | head -3            # 200 ou 308 pro www
curl -sI https://www.<dominio> | head -3        # 200
```
E a Vercel mostra "Valid Configuration" nos dois hosts (o certificado
HTTPS sai sozinho em alguns minutos). **Se o e-mail foi migrado, o teste
final é humano**: peça ao dono para mandar uma mensagem de fora para
`contato@<dominio>`, confirmar o recebimento e RESPONDER. Sem esse
ida-e-volta, não afirme que o e-mail está funcionando.

## Fase 8 — (Opcional) E-mail profissional @dominio (Zoho Mail grátis)

Somente com a Fase 7 concluída. **Antes de criar qualquer coisa**: se a
Fase 0.5 mostrou que o domínio JÁ tem e-mail funcionando (Titan, Google
Workspace, Zoho, cPanel…), **não crie nada** — o trabalho aqui é só ter
preservado MX/SPF/DKIM na Fase 7. Criar um segundo provedor de e-mail no
mesmo domínio quebra a entrega das mensagens.

⚠️ Se o e-mail existente vier embutido numa hospedagem que o cliente vai
cancelar (Titan/HostGator, e-mail de cPanel), avise: **cancelar a
hospedagem derruba o e-mail**. Nesse caso migre para o Zoho ANTES do
cancelamento, seguindo os passos abaixo.

Padrão da casa NAP: caixa principal **`contato@`** e alias **`pedidos@`**
(confirme com o dono se quer outros).

1. **Conta Zoho** no plano Forever Free (até 5 caixas):
   `https://workplace.zoho.com/signup?type=org&plan=free`
   — esta URL destrava o plano gratuito que o site esconde. O dono cria a
   conta com o e-mail pessoal dele e digita as senhas; você nunca as vê.
2. **Verificar o domínio**: o Zoho fornece um TXT
   (`zoho-verification=...`). Adicione na zona do registro.br (nome em
   branco, tipo TXT) e clique em verificar no painel Zoho.
3. **Registros de e-mail**, na MESMA zona (nome em branco, convivem com o
   A/CNAME do site — nunca remova os existentes):
   - MX: `mx.zoho.com` (prioridade 10), `mx2.zoho.com` (20),
     `mx3.zoho.com` (50)
   - TXT/SPF: `v=spf1 include:zohomail.com ~all` — se já existir um TXT
     começando com `v=spf1`, **mescle** no existente, nunca crie um segundo
   - DKIM: gere no painel Zoho (Admin → domínio → DKIM) e crie o TXT com o
     nome/selector exato que ele mostrar
4. **Criar as caixas** (`contato@`) e o alias (`pedidos@`) no painel Zoho;
   acesso do dia a dia em `mail.zoho.com` e nos apps Zoho Mail
   (Android/iOS, entrando por "login pelo site da empresa").

✅ Validação: envie um e-mail de teste do Gmail pessoal do dono para
`contato@<dominio>`, confirme o recebimento no webmail e RESPONDA,
confirmando que a resposta chegou no Gmail. Só então declare concluído.


## Encerramento — imprima este resumo preenchido

```
✅ SETUP CONCLUÍDO
Repo:      github.com/<conta>/<nome>
Local:     <pasta> (npm run dev)
Supabase:  projeto <nome> — schema ok, seed <sim/não>, bucket midia ok
Admin:     <e-mail do dono>
Deploy:    <URL de produção ou "pendente">
Domínio:   <dominio próprio ou "pendente (Fase 7)">
E-mail:    <contato@dominio ou "pendente (Fase 8)">
Próximos:  ver docs/SPEC-CONTINUIDADE.md (backlog e regras da casa)
```
