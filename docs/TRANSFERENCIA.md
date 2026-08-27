# GUIA DE TRANSFERÊNCIA — entregando o projeto ao cliente

> Roteiro pro dia da entrega: o que sai da estrutura PulsarH e passa a
> viver nas contas do cliente. Ordem pensada pra nunca derrubar o site.

## O princípio

Cada serviço deve terminar **na conta do dono do negócio** (e-mail dele),
com a PulsarH mantendo acesso de colaborador enquanto durar o contrato.
Nada de conta emprestada: se um dia os caminhos se separarem, o site,
o banco e o domínio continuam com o cliente.

## Checklist, na ordem

### 1. GitHub (o código)
- Caminho recomendado: na máquina do cliente, rodar o setup agêntico
  (`docs/SETUP-CLIENTE.md`) — cria repo próprio na conta dele já com
  tudo. A PulsarH entra como colaborador (Settings → Collaborators).
- Alternativa: transferir este repositório (Settings → Danger Zone →
  Transfer ownership) — mantém histórico e issues.

### 2. Supabase (o banco)
- Projeto criado NA CONTA do cliente (o setup agêntico guia).
- Convidar a PulsarH como membro da organização (Dashboard → Settings →
  Team) enquanto houver manutenção contratada.
- Guardar em local seguro DO CLIENTE: senha do banco e Service Role Key
  (nunca no repo, nunca no chat).

### 3. Vercel (a hospedagem)
- Cliente cria conta (login com o GitHub dele) → importa o repo dele →
  deploy automático configurado.
- Environment Variables: `NEXT_PUBLIC_SUPABASE_URL` e
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` (as mesmas do `.env.local`).
- O projeto `nap-tintas` na conta PulsarH pode ser pausado/removido
  depois que o domínio apontar pro novo.

### 4. Domínio próprio (ex.: naptintas.com.br)
- Registrar no registro.br NA CONTA/CPF-CNPJ do cliente.
- Apontar pro projeto Vercel do cliente (a Vercel mostra os registros
  exatos em Settings → Domains: A no apex + CNAME no www). O passo a
  passo completo do registro.br está na Fase 7 da `docs/SETUP-CLIENTE.md`
  (atenção: no registro.br o apex é o campo nome EM BRANCO, não "@").
- Atualizar `SITE_URL` nos `layout.js` e o `metadataBase` (buscar por
  `nap-tintas.vercel.app` no código).

### 5. E-mail profissional (opcional, recomendado)
- Zoho Mail gratuito no domínio próprio (contato@naptintas.com.br
  como caixa principal + pedidos@ como alias — padrão da casa).
- Atalho comprovado que destrava o plano Forever Free:
  `https://workplace.zoho.com/signup?type=org&plan=free`
- Passo a passo completo (verificação, MX/SPF/DKIM, teste real de envio
  e recebimento) na Fase 8 da `docs/SETUP-CLIENTE.md`.

### 6. Claude Code / Codex do cliente
- Instalar na máquina do cliente, abrir a pasta do projeto.
- O `AGENTS.md` já orienta qualquer agente; a continuidade do
  desenvolvimento está em `docs/SPEC-CONTINUIDADE.md`.

### 7. Últimos ajustes de identidade
- WhatsApp real em `app/lib/constants.js` (um lugar só).
- Instagram conferido (`nap_tintas`).
- Primeiro admin criado no Supabase (README, seção "primeiro admin").

## O que a PulsarH entrega junto
- Este repositório completo, com specs (`docs/`) e schema (`supabase/`).
- Acessos revisados: nada crítico na conta PulsarH ao final.
- Sessão de treinamento do Super Admin (produtos, estantes, banners).
