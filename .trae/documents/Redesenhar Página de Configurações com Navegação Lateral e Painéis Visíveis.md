## Objetivo
Redesenhar `Configurações` para um layout com navegação lateral e painéis lado a lado, mantendo todas as opções visíveis (sem rolagem vertical em ≥1366×768), com estilo consistente à segunda imagem (admin azul claro), sem alterar a lógica de dados.

## Diretrizes Visuais
- Tipografia: títulos `text-slate-900 font-semibold`; corpo `text-slate-700`.
- Cards: `bg-surface border border-slate-200 rounded-2xl shadow-sm`.
- Espaçamentos: 8/12/16/24; foco: `focus-visible:ring-2 ring-brand ring-offset-2`.
- Sidebar: `bg-brand-700`, itens `text-white` com hover `bg-brand-600`; ativo `bg-white/10`.

## Layout
- Estrutura em 3 áreas:
  1) Cabeçalho (título/subtítulo);
  2) Sidebar fixa (seções: Empresa, Aparência, Notificações, Usuários);
  3) Grade de painéis 2×2, exibindo simultaneamente as quatro seções.
- Cada painel ajusta conteúdo para caber em 768px de altura total (redução de espaçamento e inputs em largura responsiva).
- Navegação: clicar no item da sidebar foca (scrollIntoView) no painel correspondente sem rolagem geral (saltos com âncoras), mantendo visibilidade.

## Funcionalidade
- Manter handlers existentes (persistência por `localDataLayer.updateSettings`); uploads (logo/favicon) em DataURL.
- Inputs com validação leve (campos obrigatórios) e mensagens via `sonner`.
- Acessibilidade: ordem de tab consistente entre painéis; todos os controles com `focus-visible`.

## Implementação Técnica
- `src/pages/admin/AdminConfiguracoes.tsx`:
  - Reorganizar em layout com `aside` (sidebar) e `main` com grid 2×2.
  - Criar âncoras/refs por seção e botões da sidebar que chamam `ref.scrollIntoView({ block: 'center' })` (sem rolagem de página; posicionamento garantido por grid).
  - Ajustar classes dos cards e inputs ao novo padrão.
- Sem alterações na lógica de dados; manter `updateSettings`, toasts, e uploads.

## Testes
- Responsividade: 1366×768 (sem rolagem); 1440×900; 1920×1080; em <1280 colapsa para 2×1 mantendo visibilidade via redução de espaçamento.
- Acessibilidade: contraste AA, foco visível, navegação por teclado entre sidebar e painéis.
- Consistência: comparação visual com a imagem referência (barra superior azul, sidebar, cards claros, divisões nítidas).

## Entregáveis
- Página `Configurações` redesenhada com sidebar e painéis visíveis simultaneamente.
- Documentação breve das mudanças de layout (estrutura, classes usadas e decisões de acessibilidade).
- Relatório de testes de usabilidade (tamanhos de tela, checklist de contraste e navegação por teclado).

Posso aplicar o redesign agora, ajustar os painéis para caberem no viewport padrão e entregar a documentação e relatório de testes após validar no navegador?