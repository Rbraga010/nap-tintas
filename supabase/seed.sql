-- ============================================================
-- SEED INICIAL — catalogo demo da NAP (gerado de lib/catalogo-demo.js)
-- Rode APOS o schema.sql. Ajuste precos/produtos a vontade no admin.
-- ============================================================

insert into produtos (cat, marca, nome, rendimento, embalagem, preco, cor, swatch, destaque, ordem) values
  ('tintas', 'Suvinil', 'Látex Premium Branco Neve', '350 m²/galão', 'Galão 3,6L', 189.90, '#1B3A8C', '#FAFAFA', true, 1),
  ('tintas', 'Coral', 'Acrílica Fachada Anti-Mofo', '280 m²/galão', 'Galão 3,6L', 239.90, '#4CAF50', '#E8F5E9', false, 2),
  ('tintas', 'Sherwin-Williams', 'Esmalte Sintético Brilho', '200 m²/galão', 'Galão 3,6L', 159.90, '#D32F2F', '#D32F2F', false, 3),
  ('tintas', 'Lukscolor', 'Tinta Epóxi Piso Industrial', '160 m²/galão', 'Galão 3,6L', 329.90, '#0D1B3E', '#37474F', true, 4),
  ('tintas', 'Suvinil', 'Ultrabranco Fosco para Teto', '420 m²/galão', 'Lata 18L', 589.90, '#1B3A8C', '#FFFFFF', false, 5),
  ('tintas', 'Eucatex', 'Látex Rosa Chá Econômica', '300 m²/galão', 'Galão 3,6L', 129.90, '#E91E93', '#FCE4EC', false, 6),
  ('tintas', 'Coral', 'Acrílica Amarelo Manteiga', '280 m²/galão', 'Galão 3,6L', 219.90, '#F9A825', '#FFF59D', false, 7),
  ('tintas', 'Iquine', 'Látex Azul Anil Profundo', '290 m²/galão', 'Galão 3,6L', 199.90, '#1B3A8C', '#1B3A8C', false, 8),
  ('texturas', 'Quartzolit', 'Grafiato Riscado Branco', '20 m²/lata', 'Lata 25kg', 189.00, '#F9A825', '#F5F5DC', true, 9),
  ('texturas', 'Suvinil', 'Textura Rústica Projetada', '15 m²/lata', 'Lata 18L', 349.90, '#FF6D00', '#D7CCC8', false, 10),
  ('texturas', 'Coral', 'Efeito Cimento Queimado', '25 m²/kit', 'Kit 5kg', 279.00, '#0D1B3E', '#9E9E9E', false, 11),
  ('texturas', 'Suvinil', 'Marmorato Decorativo', '18 m²/kit', 'Kit 5kg', 399.00, '#E91E93', '#EFEBE9', false, 12),
  ('massas', 'Quartzolit', 'Massa Corrida PVA', '35 m²/galão', 'Balde 25kg', 69.90, '#4CAF50', '#FAFAFA', false, 13),
  ('massas', 'Suvinil', 'Massa Acrílica Externa', '30 m²/galão', 'Balde 25kg', 119.90, '#1B3A8C', '#F5F5F5', false, 14),
  ('massas', 'Coral', 'Selador Acrílico Universal', '180 m²/galão', 'Galão 3,6L', 89.90, '#F9A825', '#FFFDE7', false, 15),
  ('massas', 'Lukscolor', 'Fundo Preparador Parede', '220 m²/galão', 'Galão 3,6L', 99.90, '#FF6D00', '#FFF3E0', false, 16),
  ('acessorios', 'Atlas', 'Rolo de Lã 23cm + Cabo', '—', 'Unidade', 29.90, '#D32F2F', '#FFF8E1', false, 17),
  ('acessorios', 'Tigre', 'Trincha Profissional 2\', '—', 'Unidade', 19.90, '#FF6D00', '#FFF3E0', false, 18),
  ('acessorios', 'Condor', 'Kit Bandeja + Rolo + Cabo', '—', 'Kit completo', 49.90, '#4CAF50', '#E8F5E9', true, 19),
  ('acessorios', 'Tigre', 'Fita Crepe 18mm × 50m', '—', 'Rolo', 12.90, '#F9A825', '#FFF8E1', false, 20),
  ('acessorios', '3M', 'Lixa d''Água Grão 220 (10un)', '—', 'Pacote 10 folhas', 24.90, '#0D1B3E', '#ECEFF1', false, 21),
  ('acessorios', 'Atlas', 'Desempenadeira Aço Inox', '—', 'Unidade', 34.90, '#E91E93', '#FCE4EC', false, 22);

insert into banners (slot, titulo, alt, imagem_url, href, ordem) values
  ('bio', 'Tinta Acrílica Premium 18L', 'Oferta: Tinta Acrílica Premium 18L por R$ 289,90', '/ofertas/oferta-1.webp', '/pedidos', 1),
  ('bio', 'Esmalte Sintético 3,6L', 'Oferta: Esmalte Sintético 3,6L por R$ 94,90', '/ofertas/oferta-2.webp', '/pedidos', 2),
  ('bio', 'Kit Pintura Completo', 'Oferta: Kit Pintura Completo por R$ 59,90', '/ofertas/oferta-3.webp', '/pedidos', 3),
  ('bio', 'Textura Rústica 25kg', 'Oferta: Textura Rústica 25kg por R$ 149,90', '/ofertas/oferta-4.webp', '/pedidos', 4);
