# Pendências de Backend — NAP Tintas

> Documento vivo. Tudo que está aqui depende de backend/serviços externos e ficou como **fase 2** (após aprovação do cliente).

**Status do frontend:** completo e publicado.
**URL:** https://nap-tintas.vercel.app

---

## 🗂️ Estrutura de fases

| Fase | Escopo | Status |
|---|---|---|
| **1 — Frontend** | 5 rotas + componentes + identidade visual + SEO básico | ✅ Concluída |
| **2 — Integrações essenciais** | WhatsApp Business API, banco de dados, email transacional, analytics | ⏳ Aguarda aprovação |
| **3 — E-commerce completo** | Pagamento, frete, estoque, pedidos | ⏳ Fase 3 |
| **4 — IA & automação** | Chatbot, simulador de cor, CRM inteligente | ⏳ Fase 4 |

---

## 📋 FASE 2 — Integrações essenciais

### 1. Banco de dados (base pra tudo)
**Objetivo:** persistir dados de pintores parceiros, produtos, pedidos, leads.

**Sugestão técnica:**
- **PostgreSQL** no Supabase (free tier robusto, auth built-in, API REST automática)
- **Prisma ORM** pra modelagem e migrations
- Deploy alinhado com Vercel (mesmo ecossistema edge)

**Schemas iniciais:**
```prisma
model Pintor {
  id          String   @id @default(cuid())
  nome        String
  whatsapp    String   @unique
  cidade      String?
  experiencia String?  // "Sim, há anos" / "Estou começando" / "Quero aprender"
  origem      String   // "bio", "formacao", "pedido", etc.
  criadoEm    DateTime @default(now())
  cursos      InscricaoCurso[]
  pedidos     Pedido[]
}

model Produto {
  id          String   @id @default(cuid())
  nome        String
  marca       String
  categoria   String
  preco       Decimal
  rendimento  String?
  embalagem   String?
  corHex      String?
  estoque     Int      @default(0)
  destaque    Boolean  @default(false)
  ativo       Boolean  @default(true)
}

model Pedido {
  id          String   @id @default(cuid())
  pintorId    String?
  pintor      Pintor?  @relation(fields: [pintorId], references: [id])
  itens       ItemPedido[]
  total       Decimal
  status      String   // "novo", "confirmado", "pago", "entregue"
  fonte       String   // "whatsapp", "site"
  criadoEm    DateTime @default(now())
}

model Curso {
  id          String   @id @default(cuid())
  titulo      String
  categoria   String   // "tecnico", "gestao", "marketing"
  descricao   String
  duracao     String
  liberado    Boolean  @default(false)
  videoUrl    String?
  materiaisUrl String?
}

model Turma {
  id          String   @id @default(cuid())
  titulo      String
  data        DateTime
  vagas       Int
  inscritos  Int @default(0)
  status      String // "aberta", "encerrada", "realizada"
}
```

**Impacto frontend:** /pedidos, /centro-treinamento e os formulários de captura passam a gravar dados reais.

---

### 2. Formulário da /colorindo-com-a-nap com persistência
**Hoje:** abre WhatsApp com mensagem pré-preenchida.
**Precisa:**
- Endpoint `POST /api/leads` que grava no DB + dispara email pra NAP
- Double opt-in: confirmação por email (opcional mas profissional)
- **Integração com Brevo/Sendgrid** pra enviar email transacional

---

### 3. Cadastro de pintor parceiro
**Hoje:** botão WhatsApp genérico.
**Precisa:**
- Página `/cadastro-parceiro` com formulário completo (dados pessoais, CPF, CNPJ opcional, cidade, anos de experiência, portfolio)
- Upload de documentos (foto RG, comprovante de endereço)
- Aprovação manual via painel admin
- Email de confirmação ao aprovar

---

### 4. Autenticação de parceiros
**Objetivo:** login no `/centro-treinamento` pra liberar cursos bloqueados.

**Stack:**
- **Supabase Auth** (já vem com OTP por email/SMS)
- Middleware Next.js pra proteger rotas
- Sessão persistente

**Mudanças no frontend:**
- Botão "Entrar" no header do /centro-treinamento (hoje é mockado)
- Gate nos cursos bloqueados: redireciona pra login
- Dashboard do pintor: cursos em andamento, favoritos, histórico

---

### 5. E-commerce /pedidos — conexão real
**Hoje:** produtos mockados + localStorage + finalização no WhatsApp.

**Passos pra virar e-commerce de verdade:**
1. **Produtos do DB** substituem os mockados (CRUD admin pra NAP cadastrar)
2. **Checkout real:**
   - Cliente preenche dados (nome, endereço, telefone)
   - Escolhe forma de pagamento
   - Escolhe frete (ou retira na loja)
3. **Gateway de pagamento:**
   - **Mercado Pago** ou **Asaas** (melhor pro mercado BR, aceita PIX, boleto, cartão)
   - **Stripe** se quiser internacional
4. **Cálculo de frete:** integração Correios API (ou tabela fixa inicialmente)
5. **Emissão de nota fiscal** (Bling/NFe.io)
6. **Notificações por email** em cada estágio (pedido criado, pago, enviado)
7. **Painel admin** pra NAP gerenciar pedidos (pode ser o próprio Supabase Studio ou um dashboard custom)

---

### 6. WhatsApp Business API (oficial)
**Hoje:** links `wa.me/...` abrem conversa manual.
**Ganho com API oficial:**
- Mensagens automáticas de confirmação de pedido
- Respostas rápidas programadas
- Chatbot básico pro "em horário comercial/fora do horário"
- Atendimento multi-atendente (toda equipe NAP responde o mesmo número)

**Stack:**
- Meta Business API + Meta Cloud API (free tier generoso)
- Ou **Z-API** / **Twilio** (intermediários mais fáceis de configurar)

---

### 7. Analytics e tracking de conversão
**Hoje:** nada instalado.
**Precisa:**
- **Vercel Analytics** (free tier, sem cookies) — Core Web Vitals + visitas
- **Google Analytics 4** — funil de conversão detalhado
- **Meta Pixel** — remarketing no Facebook/Instagram Ads
- **Eventos customizados:**
  - `click_whatsapp` (qual CTA originou)
  - `add_to_cart` (produto, valor)
  - `form_submit_formacao`
  - `course_locked_click` (qual curso)
  - `scroll_depth` (50%, 75%, 100%)
  - `card_bio_click` (qual card da bio)
- **Hotjar/Microsoft Clarity** (gratuitos) pra heatmap

---

### 8. Newsletter / captura de leads
**Objetivo:** construir lista de marketing.

**Stack:**
- **Brevo** (ex-Sendinblue, gratuito até 300/dia) ou **Mailchimp**
- Modal sutil na home após 30s ou scroll 50%
- Formulário de "Quero receber ofertas" simples no footer
- Integração com o DB (double opt-in)
- Tag automática por origem (bio, pedidos, formacao)

---

## 📋 FASE 3 — E-commerce avançado

### 9. Gestão de estoque em tempo real
- Redução de estoque ao fechar pedido
- Alerta de estoque baixo pra NAP
- "Últimas X unidades" no produto

### 10. Sistema tintométrico digital
- Catálogo real de cores das marcas (Suvinil, Coral, etc.)
- Cliente escolhe cor exata → vai pro orçamento
- Integra com produto no carrinho

### 11. Cálculo de frete automático
- Correios API (PAC/Sedex)
- Frete grátis acima de X valor
- Retirada na loja (0 custo)
- Entrega própria em Sorocaba (tabela por bairro)

### 12. Cupons e promoções
- Cadastro de cupons no admin
- "Primeira compra 10% off"
- Cupom específico pra parceiros cadastrados

### 13. Programa de fidelidade
- Pontos por compra
- Troca de pontos por desconto/brinde
- Níveis: Cliente → Parceiro → Parceiro Premium

### 14. Indicação com comissão
- Cada pintor parceiro tem código único
- Cliente usa código → pintor ganha comissão
- Dashboard do pintor mostra indicações + ganhos

---

## 📋 FASE 4 — IA & automação

### 15. Simulador de cor com foto
- Cliente faz upload de foto da parede
- IA (Segment Anything / Meta) identifica parede
- Aplica cor NAP escolhida virtualmente
- Gera preview + link pra comprar

### 16. Chatbot técnico
- Treinado nas fichas técnicas dos produtos
- Responde: "Qual tinta pra box de banheiro?", "Quanto rende 3,6L em 50m²?"
- Integra WhatsApp oficial

### 17. Calculadora de tinta com foto
- Cliente foto de ambiente → IA estima m²
- Sugere produto + quantidade automaticamente
- Adiciona ao carrinho

### 18. Gerador de posts pro pintor parceiro
- Pintor envia antes/depois
- IA gera legenda + arte com logo NAP
- Pintor baixa/posta no Instagram dele
- Co-marketing orgânico

### 19. CRM inteligente
- IA analisa padrão de compra de cada parceiro
- Prediz quando vai precisar reabastecer
- Dispara WhatsApp automático: "Oi João, vi que você tá na 3ª semana de obra, quer reabastecer?"

### 20. Voice commerce
- Cliente manda áudio no WhatsApp: "quero 2 galões de látex branco e 1 massa corrida"
- IA transcreve + monta pedido + envia link de pagamento
- Atendimento 24h sem pessoa

---

## 🔐 Itens operacionais obrigatórios

### Conformidade LGPD
- [x] Banner de consentimento (feito no frontend)
- [ ] **Política de Privacidade** redigida e publicada em `/privacidade`
- [ ] **Termos de Uso** em `/termos`
- [ ] DPO designado (pode ser a NAP)
- [ ] Canal pra titular exercer direitos (email dedicado)
- [ ] Registro de tratamento de dados (ROPA)

### Segurança
- [ ] HTTPS forçado (já tem via Vercel)
- [ ] Rate limiting em endpoints (Upstash ou Vercel)
- [ ] Validação server-side em todos os forms
- [ ] Sanitização contra XSS/SQL injection (Prisma já protege)
- [ ] CORS configurado
- [ ] Headers de segurança (CSP, X-Frame-Options)

### Monitoramento
- [ ] **Sentry** (free tier) pra erros em produção
- [ ] Uptime monitoring (UptimeRobot/BetterStack)
- [ ] Logs estruturados (Vercel Logs + Axiom)

---

## 🎯 Proposta de sequência

**Sprint 1 (2 semanas)** — Base de dados + captura de leads
- Supabase + Prisma configurados
- Schemas Pintor, Produto, Lead criados
- Formulário /colorindo-com-a-nap grava no DB + dispara email
- Newsletter ativo

**Sprint 2 (2 semanas)** — Autenticação + /centro-treinamento real
- Supabase Auth
- Login de parceiros
- Liberação de cursos
- Dashboard básico do pintor

**Sprint 3 (3 semanas)** — E-commerce funcional
- Produtos do DB
- Checkout Mercado Pago (PIX + cartão)
- Cálculo de frete Correios
- Emails transacionais
- Painel admin básico

**Sprint 4 (2 semanas)** — Operação
- WhatsApp Business API
- Analytics completo (GA4 + Meta Pixel)
- Políticas LGPD publicadas
- Monitoramento (Sentry)

**Total estimado da Fase 2+3:** ~9 semanas

**Fase 4 (IA):** sob demanda conforme validação do produto

---

## 💰 Custos mensais estimados (fase 2 em produção)

| Serviço | Plano | Custo/mês |
|---|---|---|
| Vercel | Hobby (ou Pro se tráfego alto) | R$ 0 — R$ 100 |
| Supabase | Free ou Pro | R$ 0 — R$ 125 |
| Brevo (email) | Free (300/dia) ou Starter | R$ 0 — R$ 125 |
| Mercado Pago | Por transação (~4% por venda) | Variável |
| Meta WhatsApp Cloud | 1000 conversas grátis/mês | R$ 0 — variável |
| Sentry | Free tier | R$ 0 |
| Dominio `.com.br` | anual | R$ 50/ano |
| **Total fixo mensal** | | **R$ 0 — R$ 350** |

Com R$ 350/mês + ~4% sobre vendas, a operação completa fica de pé.

---

*Última atualização: 2026-04-20*
*Mantido por: Rodrigo Braga / PulsarH.ai*
