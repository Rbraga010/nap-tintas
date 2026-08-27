-- ============================================================
-- SEED INICIAL — catalogo demo da NAP (gerado de lib/catalogo-demo.js)
-- Rode APOS o schema.sql. Ajuste precos/produtos a vontade no admin.
-- ============================================================

insert into categorias (id, label, emoji, ordem) values
  ('tintas', 'Tintas', '🪣', 1),
  ('texturas', 'Texturas', '✨', 2),
  ('massas', 'Massas & Fundos', '🧱', 3),
  ('acessorios', 'Acessórios', '🖌️', 4);

insert into produtos (cat, marca, nome, rendimento, embalagem, preco, preco_de, cor, swatch, descricao, destaque, ordem) values
  ('tintas', 'Suvinil', 'Látex Premium Branco Neve', 'até 40 m²/demão', 'Galão 3,6L', 189.90, 219.90, '#1B3A8C', '#FAFAFA', 'Cobertura impecável para paredes e tetos internos', true, 1),
  ('tintas', 'Coral', 'Acrílica Fachada Antimofo', 'até 35 m²/demão', 'Galão 3,6L', 239.90, null, '#4CAF50', '#E8F5E9', 'Protege a fachada contra mofo, chuva e sol forte', false, 2),
  ('tintas', 'Sherwin-Williams', 'Esmalte Sintético Brilho', 'até 30 m²/demão', 'Galão 3,6L', 159.90, null, '#D32F2F', '#D32F2F', 'Brilho profissional para portões, grades e metais', false, 3),
  ('tintas', 'Lukscolor', 'Tinta Epóxi Piso Industrial', 'até 25 m²/demão', 'Galão 3,6L', 329.90, null, '#0D1B3E', '#37474F', 'Resistência industrial para pisos de garagem e oficina', true, 4),
  ('tintas', 'Suvinil', 'Ultrabranco Fosco para Teto', 'até 200 m²/demão', 'Lata 18L', 589.90, null, '#1B3A8C', '#FFFFFF', 'O branco absoluto que ilumina qualquer teto', false, 5),
  ('tintas', 'Eucatex', 'Látex Rosa Chá Econômica', 'até 35 m²/demão', 'Galão 3,6L', 129.90, null, '#E91E93', '#FCE4EC', 'Cor suave e lavável para renovar o quarto gastando pouco', false, 6),
  ('tintas', 'Coral', 'Acrílica Amarelo Manteiga', 'até 35 m²/demão', 'Galão 3,6L', 219.90, null, '#F9A825', '#FFF59D', 'Amarelo acolhedor que aquece salas e cozinhas', false, 7),
  ('tintas', 'Iquine', 'Látex Azul Anil Profundo', 'até 40 m²/demão', 'Galão 3,6L', 199.90, null, '#1B3A8C', '#1B3A8C', 'Azul profundo premium para paredes de destaque', false, 8),
  ('texturas', 'Quartzolit', 'Grafiato Riscado Branco', '20 m²/lata', 'Lata 25kg', 189.00, 219.00, '#F9A825', '#F5F5DC', 'Efeito riscado clássico para fachadas com personalidade', true, 9),
  ('texturas', 'Suvinil', 'Textura Rústica Projetada', '15 m²/lata', 'Lata 18L', 349.90, null, '#FF6D00', '#D7CCC8', 'Textura projetada que valoriza muros e áreas externas', false, 10),
  ('texturas', 'Coral', 'Efeito Cimento Queimado', '12 m²/kit', 'Kit 5kg', 279.00, null, '#0D1B3E', '#9E9E9E', 'Acabamento rústico sofisticado para áreas internas', false, 11),
  ('texturas', 'Suvinil', 'Marmorato Decorativo', '10 m²/kit', 'Kit 5kg', 399.00, null, '#E91E93', '#EFEBE9', 'Efeito mármore luxuoso para paredes de destaque', false, 12),
  ('massas', 'Quartzolit', 'Massa Corrida PVA', '35 m²/balde', 'Balde 25kg', 69.90, null, '#4CAF50', '#FAFAFA', 'Nivela paredes internas e deixa tudo pronto pra pintar', false, 13),
  ('massas', 'Suvinil', 'Massa Acrílica Externa', '30 m²/balde', 'Balde 25kg', 119.90, null, '#1B3A8C', '#F5F5F5', 'Prepara e uniformiza superfícies externas exigentes', false, 14),
  ('massas', 'Coral', 'Selador Acrílico Universal', 'até 45 m²/demão', 'Galão 3,6L', 89.90, null, '#F9A825', '#FFFDE7', 'Sela a parede nova e economiza tinta na primeira demão', false, 15),
  ('massas', 'Lukscolor', 'Fundo Preparador Parede', 'até 50 m²/demão', 'Galão 3,6L', 99.90, null, '#FF6D00', '#FFF3E0', 'Firma a superfície e garante aderência da tinta', false, 16),
  ('acessorios', 'Atlas', 'Rolo de Lã 23cm + Cabo', '—', 'Unidade', 29.90, null, '#D32F2F', '#FFF8E1', 'Maciez e alto rendimento na aplicação de látex', false, 17),
  ('acessorios', 'Tigre', 'Trincha Profissional 2"', '—', 'Unidade', 19.90, null, '#FF6D00', '#FFF3E0', 'Cerdas firmes para recortes precisos e cantos limpos', false, 18),
  ('acessorios', 'Condor', 'Kit Bandeja + Rolo + Cabo', '—', 'Kit completo', 49.90, 69.90, '#4CAF50', '#E8F5E9', 'Kit completo pra começar a pintura sem faltar nada', true, 19),
  ('acessorios', 'Tigre', 'Fita Crepe 18mm × 50m', '—', 'Rolo', 12.90, null, '#F9A825', '#FFF8E1', 'Protege o chão e os móveis durante toda a obra', false, 20),
  ('acessorios', '3M', 'Lixa d''Água Grão 220 (10un)', '—', 'Pacote 10 folhas', 24.90, null, '#0D1B3E', '#ECEFF1', 'Acabamento fino em massa e repintura, uso com água', false, 21),
  ('acessorios', 'Atlas', 'Desempenadeira Aço Inox', '—', 'Unidade', 34.90, null, '#E91E93', '#FCE4EC', 'Aplica massa e textura por igual, com cabo firme', false, 22);

insert into banners (slot, titulo, alt, imagem_url, href, ordem) values
  ('bio', 'Tinta Acrílica Premium 18L', 'Oferta: Tinta Acrílica Premium 18L por R$ 289,90', '/ofertas/oferta-1.webp', '/pedidos', 1),
  ('bio', 'Esmalte Sintético 3,6L', 'Oferta: Esmalte Sintético 3,6L por R$ 94,90', '/ofertas/oferta-2.webp', '/pedidos', 2),
  ('bio', 'Kit Pintura Completo', 'Oferta: Kit Pintura Completo por R$ 59,90', '/ofertas/oferta-3.webp', '/pedidos', 3),
  ('bio', 'Textura Rústica 25kg', 'Oferta: Textura Rústica 25kg por R$ 149,90', '/ofertas/oferta-4.webp', '/pedidos', 4);
