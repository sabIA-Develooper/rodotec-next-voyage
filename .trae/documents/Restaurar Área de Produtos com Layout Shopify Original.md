## Objetivo
Replicar fielmente a área de produtos (listagem e detalhe) conforme a versão original na Shopify, mantendo organização, interações, layout visual, responsividade e fluxos de navegação.

## Levantamento de Referência
1. Identificar o tema Shopify original (ex.: Debut/Dawn) e versão.
2. Coletar HTML/CSS/JS de páginas de coleção e produto via Wayback/Web Archive para garantir fidelidade visual.
3. Catalogar elementos: barra de filtros, alternância grid/lista, cartões, modais (quick view/filtros), paginação, breadcrumbs, breakpoints e paleta de cores.

## Mapeamento para o Código Atual
1. Dados: usar `repository.getProducts()` e `repository.getCategories()` para produtos/categorias; manter persistência local.
2. Pontos de integração:
   - `src/pages/Produtos.tsx`: listagem pública
   - `src/components/ProductCard.tsx`: card de produto
   - `src/pages/ProdutoDetalhe.tsx`: página de produto
3. UI base: utilizar Tailwind e componentes atuais; ajustar classes para espelhar a marcação original Shopify.

## Listagem de Produtos
1. Estrutura HTML/CSS idêntica à Shopify:
   - Header da listagem com busca, filtros por categoria/preço/disponibilidade e ordenação.
   - Barra lateral/overlay mobile para filtros, com os mesmos seletores e classes.
2. Exibição grid/list:
   - Alternância com os mesmos controles e comportamento.
   - Layout de cartões e linhas igual ao tema Shopify.
3. Filtros e busca:
   - Categoria, faixa de preço, disponibilidade, busca por nome/SKU.
   - Ordenação por nome, preço e data (asc/desc), igual à referência.
4. Paginação:
   - Mesmo padrão visual e interação da Shopify (client-side com dados locais).
5. Desempenho:
   - Memoização, paginação, lazy loading de imagens.

## Cartões de Produto
1. Campos e composição: imagem principal, título, preço/SKU, badges e CTAs conforme Shopify.
2. Efeitos visuais: hovers, sombras, escalas e espaçamentos idênticos.
3. Acessibilidade: `alt`, foco, aria labels.

## Modais e Interações JS
1. Quick View (se presente no original): abrir modal com informações essenciais.
2. Filtros em modal no mobile: abertura/fechamento, animações e foco.
3. Galeria/zoom de imagens (se presente): replicar controles e transições.

## Página de Produto (Detalhe)
1. Hero com galeria, título, descrição e CTAs conforme Shopify.
2. Especificações técnicas e seções (accordion, blocos informativos) espelhando a referência.
3. Downloads/CTA e ações sticky mobile reproduzindo layout e comportamento.

## Responsividade e Acessibilidade
1. Recriar breakpoints do tema Shopify (xs/sm/md/lg/xl) e regras CSS equivalentes.
2. Garantir navegação por teclado e uso de roles/aria de acordo com os componentes originais.

## Fluxos de Navegação
1. Breadcrumbs, links de retorno para coleção/categorias, deep links de produto.
2. Preservar rotas existentes e a experiência de navegação da Shopify.

## Verificação
1. Comparação visual: screenshots lado a lado com a referência Shopify.
2. Testes funcionais: filtros, busca, ordenação, alternância grid/lista, modais.
3. Lighthouse (performance/acessibilidade) para checagem de paridade.

## Entregáveis
1. Atualizações nos arquivos:
   - `src/pages/Produtos.tsx` (estrutura, filtros, grid/lista, paginação)
   - `src/components/ProductCard.tsx` (layout visual Shopify)
   - `src/pages/ProdutoDetalhe.tsx` (galeria/hero/sections)
2. CSS/Classes ajustadas para espelhar fielmente o tema Shopify (evitar libs novas).
3. Nenhum elemento extra além do que existia na Shopify; nenhuma remoção do que existia.

Confirma que devo prosseguir com esta implementação fiel ao tema Shopify original? Caso tenha referência específica do tema/URL, eu a usarei como fonte primária imediatamente.