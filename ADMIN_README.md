# RODOTEC - Admin Web

Sistema administrativo completo para gerenciamento da RODOTEC, desenvolvido com Vite + React + TypeScript + Tailwind CSS + shadcn/ui + Supabase.

## 🎨 Interface

Visual inspirado no Shopify Polaris com identidade própria:
- Layout limpo e profissional
- Topbar fixa com logo, pesquisa e avatar
- Sidebar com 11 seções de navegação
- Tema claro com tipografia legível
- Cards com bordas suaves e sombras leves

## 📊 Funcionalidades Implementadas

### Dashboard (/admin)
- **KPIs de Orçamentos**: Novos, Em andamento, Concluídos
- **KPIs de Produtos**: Ativos e Rascunhos
- **Últimos 5 orçamentos** com link direto
- **Últimos 5 produtos** alterados

### Gestão de Produtos

#### Lista de Produtos (/admin/produtos)
- Tabela com busca por título ou SKU
- Colunas: Título, Status, SKU, Preço, Estoque, Atualizado
- Ordenação por data de atualização
- Botão "Adicionar produto"

#### Editor de Produtos (/admin/produtos/novo e /admin/produtos/:id)
Layout de **duas colunas estilo Shopify**:

**Coluna Principal (grande):**
- Título e Descrição
- Mídia (arrastar/soltar para upload)
- Preço (BRL)
- Estoque: SKU, código de barras, quantidade, permitir vender sem estoque
- Frete: peso, dimensões, país de origem, código SH
- SEO: título, descrição, slug automático

**Coluna Lateral (estreita):**
- Status (Ativo/Rascunho)
- Publicação (toggle Site)
- Organização: Tipo, Fabricante, Categoria, Tags
- Modelo de tema: "Produto padrão"

### Gestão de Orçamentos

#### Lista de Orçamentos (/admin/orcamentos)
- Tabela com colunas: Status, Nome, Empresa, Produto, Telefone, E-mail, Data
- **Filtros**: por Status (Novo, Em andamento, Contatado, Ganho, Perdido)
- **Busca**: por nome, empresa, email, telefone
- Linhas clicáveis para abrir detalhes

#### Detalhes do Orçamento (/admin/orcamentos/:id)
Layout de **duas colunas**:

**Coluna Principal:**
- Informações do contato (nome, empresa, email, telefone)
- Produto de interesse (com link se existir no catálogo)
- Mensagem do cliente
- Notas internas (rich text)
- Timeline de eventos

**Coluna Lateral:**
- Status (dropdown editável)
- Responsável (input texto)
- Informações adicionais (consentimento LGPD, origem)

### Integração Pública

#### Formulário de Contato (/contato)
- Integrado com Supabase
- Campos: nome, empresa, email, telefone, produto, mensagem
- Checkbox de consentimento LGPD
- Criação automática de orçamento com status "NEW"
- Toast de sucesso/erro

## 🗂️ Estrutura de Rotas

```
/admin/login                    → Login
/admin                          → Dashboard
/admin/produtos                 → Lista de produtos
/admin/produtos/novo            → Novo produto
/admin/produtos/:id             → Editar produto
/admin/orcamentos               → Lista de orçamentos
/admin/orcamentos/:id           → Detalhes do orçamento
/admin/colecoes                 → Coleções (placeholder)
/admin/estoque                  → Estoque (placeholder)
/admin/clientes                 → Clientes (placeholder)
/admin/marketing                → Marketing (placeholder)
/admin/conteudo                 → Conteúdo (placeholder)
/admin/markets                  → Markets (placeholder)
/admin/analises                 → Análises (placeholder)
/admin/configuracoes            → Configurações (placeholder)
```

## 🗄️ Banco de Dados (Supabase)

### Tabelas Principais

**products**
- Informações completas do produto
- Status (ACTIVE/DRAFT)
- Mídia em JSON
- Relacionamento com categoria
- SEO e tags

**quote_requests**
- Dados do contato
- Produto de interesse
- Status (NEW, IN_PROGRESS, CONTACTED, WON, LOST)
- Responsável e notas internas
- Timeline automática

**categories**
- Categorias de produtos

**collections**
- Coleções de produtos

**admin_profiles + user_roles**
- Gestão de usuários admin
- Roles (admin/editor)

### Seeds Incluídos

✅ **6 produtos de exemplo** com dados completos
✅ **5 orçamentos** em diferentes status
✅ **4 categorias** (Carrocerias, Reboques, Implementos, Acessórios)
✅ **3 coleções** (Frigorífica, Carga Seca, Graneleira)

## 🚀 Como Usar

### 1. Configurar Supabase

```bash
# Iniciar Supabase local (se necessário)
npx supabase start

# Aplicar migrações
npx supabase db reset
```

### 2. Criar Usuário Admin

Via Supabase Dashboard:
1. Auth → Users → Add user
2. Pegar o user_id
3. Executar SQL:
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('seu-user-id-aqui', 'admin');
```

### 3. Rodar o Projeto

```bash
npm install
npm run dev
```

### 4. Acessar o Admin

1. Abrir http://localhost:5173/admin/login
2. Fazer login com o usuário criado
3. Explorar o dashboard!

## 📝 Próximos Passos (Opcional)

### Upload de Mídia
- Integrar Supabase Storage para upload de imagens
- Componente de drag & drop funcional
- Preview e reordenação de imagens

### Funcionalidades Avançadas
- Exportação CSV de orçamentos
- Geração de PDF do orçamento
- Ações em massa (produtos e orçamentos)
- Variantes de produtos
- Gestão de coleções
- Gestão de estoque
- Relatórios e análises

### Outras Seções
- Implementar páginas placeholder (Clientes, Marketing, etc.)
- Sistema de notificações
- Histórico de alterações
- Logs de auditoria

## 🎯 Tecnologias Utilizadas

- **Vite** - Build tool
- **React 18** - UI Library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Supabase** - Backend (Auth + Database + Storage)
- **React Router** - Routing
- **date-fns** - Date formatting
- **lucide-react** - Icons
- **sonner** - Toast notifications

## 📄 Licença

Projeto proprietário da RODOTEC.
