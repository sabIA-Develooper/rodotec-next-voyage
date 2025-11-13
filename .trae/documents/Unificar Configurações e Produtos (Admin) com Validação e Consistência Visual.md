## Objetivo
Reescrever e alinhar visual e funcionalmente a página de Configurações e a área de Produtos (criação/edição/listagem) ao padrão atual do Admin (tema claro azul/branco), sem alterar a lógica de dados, garantindo validação, persistência, feedback claro e navegação fluida.

## Stack e Convenções
- React + TypeScript + Tailwind (já em uso)
- Componentes UI existentes (Button, Badge, Card, Table, Select, Dialog)
- Formulários com react-hook-form usando `src/components/ui/form.tsx` (já presente)
- Persistência com `repository` (produtos) e `localDataLayer` (configurações)
- Toasters com `sonner`

## Configurações (Admin)
1. Padronização Visual
- Trocar cabeçalhos para `text-slate-900 font-semibold`, espaçamento 8/12/16/24 e cards `bg-surface border border-slate-200 rounded-2xl shadow-sm`.
- Inputs/Select/Switch com `border-slate-300` e focus ring visível (`focus-visible:ring-2 ring-brand ring-offset-2`).
2. Validação e Acessibilidade
- Migrar para react-hook-form: campos Empresa (nome, cnpj, endereco, telefone, email) e Aparência (corPrimaria, corFundo, logoUrl, faviconUrl).
- Mensagens de erro com `FormMessage`; descrição auxiliar com `FormDescription`.
- Link WhatsApp (`wa.me`) gerado a partir do telefone (prefixo 55 quando ausente).
3. Persistência e Feedback
- `localDataLayer.updateSettings(settings)` no submit com `toast.success`/`toast.error` e botões “Salvar”/“Cancelar”.
- Pré-carregar valores via `getSettings()` e reset opcional do formulário.

## Produtos (Admin)
1. Editor de Produto (criação/edição)
- Migrar para react-hook-form mantendo o estado de mídia e specs.
- Validações:
  - `title`: obrigatório (≥3 chars)
  - `category_id`: obrigatório
  - `status`: `DRAFT` ou `ACTIVE` (se `ACTIVE`, exigir ao menos 1 imagem)
  - `price`: opcional, se presente numérico ≥0
  - `sku`: opcional
- Campos: título/slug, descrições (curta/detalhada), categoria, preço, estoque, SKU, mídia (upload com DataURL), specs, dimensões, SEO.
- Submit:
  - `repository.createProduct(data)` quando novo; `repository.updateProduct(id, data)` quando editando.
  - Toast de sucesso/erro; redirecionar para `/admin/produtos` após criação, com destaque do novo item (location.state).
2. Listagem de Produtos (Admin)
- Ao montar, continuar usando `repository.getProducts()`.
- Se `location.state.createdId` presente, exibir `toast.success('Produto criado')`, rolar até o item e realçar brevemente.
- Garantir consistência de tabela (cabeçalho claro, zebra rows, hover claro) e chips: `ACTIVE` (default), `DRAFT` → variante `statusDraft`.
- Busca/filtros/ordenação já implementados; manter semântica de `Select` (sem `value=''`).

## Mensagens e Navegação
- Sonner para feedback (criação/atualização/erro).
- Botões e links padronizados; ações principais sempre visíveis no topo da página.
- Navegação: Editor → Listagem após criar; Edição permanece na página com confirmação.

## Arquivos Alvo
- `src/pages/admin/AdminConfiguracoes.tsx` (RHF + estilo + persistência)
- `src/pages/admin/AdminProdutoEditor.tsx` (RHF + validações + submit + redirect)
- `src/pages/admin/AdminProdutos.tsx` (toast ao retornar e destaque do novo item)

## Verificação
- Fluxo: abrir Editor → preencher → criar → listar e ver novo produto.
- Formulário Configurações: erros visíveis, salvar e recarregar; WhatsApp abrindo corretamente.
- Lighthouse/axe: foco visível e contraste (botões/chips/tabela cabeçalho ≥ 4.5:1).

## Entrega
- Atualizações em arquivos listados; sem alterações na lógica de dados.
- Mensagens de sucesso/erro consistentes; navegação fluida.

Confirma que devo aplicar estas mudanças? Se sim, executo e valido com toasts e verificação visual nas páginas correspondentes.