// Tipos para as entidades da API conforme documentação backend

export type ProductStatus = 'ACTIVE' | 'DRAFT';
export type QuoteStatus = 'novo' | 'em_contato' | 'concluido';
export type AdminRole = 'admin' | 'user';

// ============ PRODUTO ============
export interface MediaItem {
  arquivo: string;
  alt: string;
  principal: boolean;
}

export interface ProductDimensions {
  altura: number;
  largura: number;
  profundidade: number;
}

export interface ProductSpecifications {
  peso?: number;
  dimensoes?: ProductDimensions;
  cor?: string;
  material?: string;
  [key: string]: any;
}

export interface Product {
  _id: string;
  nome: string;
  descricao: string;
  categoria: {
    _id: string;
    nome: string;
  } | null;
  estoque: number;
  sku: string;
  imagens: MediaItem[];
  imagemPrincipal?: string;
  imagensUrls?: string[];
  especificacoes?: ProductSpecifications;
  tags?: string[];
  ativo: boolean;
  destaque: boolean;
  statusEstoque?: string;
  createdAt: string;
  updatedAt?: string;
}

// ============ CATEGORIA ============
export interface Category {
  _id: string;
  nome: string;
  descricao?: string;
  slug: string;
  ativa: boolean;
  imagem?: string;
  imagemUrl?: string;
  totalProdutos?: number;
  createdAt: string;
}

// ============ ORÇAMENTO ============
export interface QuoteRequest {
  _id: string;
  nome: string;
  telefone: string;
  email: string;
  empresa?: string | null;
  produto: {
    _id: string;
    nome: string;
    sku: string;
    imagemPrincipal?: string;
    imagensUrls?: string[];
    descricao?: string;
  } | string;
  mensagem: string;
  status: QuoteStatus;
  observacoes?: string | null;
  createdAt: string;
  updatedAt?: string;
  nomeExibicao?: string;
  isNovo?: boolean;
  statusBadge?: {
    cor: string;
    texto: string;
  };
}

// ============ USUÁRIO ============
export interface AdminUser {
  _id: string;
  email: string;
  nome: string;
  role: AdminRole;
  ativo: boolean;
  createdAt: string;
}

// ============ AUTENTICAÇÃO ============
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AdminUser;
  token: string;
}

// ============ RESPOSTA API ============
export interface ApiResponse<T> {
  sucesso?: boolean;
  success?: boolean;
  mensagem?: string;
  message?: string;
  dados?: T;
  data?: T;
}

export interface ApiError {
  sucesso?: boolean;
  success?: boolean;
  mensagem?: string;
  message?: string;
  erro?: string;
  error?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// ============ PAGINAÇÃO ============
export interface PaginatedResponse<T> {
  sucesso?: boolean;
  success?: boolean;
  dados: T[];
  paginacao?: {
    total: number;
    pagina: number;
    limite: number;
    paginas: number;
  };
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

// ============ DASHBOARD ============
export interface DashboardStats {
  total?: number;
  novos?: number;
  emContato?: number;
  concluidos?: number;
  ultimoMes?: number;
  taxaConclusao?: string;
  new_quotes?: number;
  in_progress_quotes?: number;
  completed_quotes?: number;
  active_products?: number;
  draft_products?: number;
  produtosMaisSolicitados?: Array<{
    produtoId: string;
    nome: string;
    sku: string;
    quantidade: number;
  }>;
  orcamentosRecentes?: number;
}

// ============ FILTROS ============
export interface ProductFilters {
  search?: string;
  categoria?: string;
  ativo?: boolean;
  destaque?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface QuoteFilters {
  search?: string;
  email?: string;
  status?: QuoteStatus;
  produto?: string;
  dataInicio?: string;
  dataFim?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

// ============ CRIAÇÃO DE PRODUTO ============
export interface CreateProductData {
  nome: string;
  descricao: string;
  categoria: string; // MongoDB ObjectId
  estoque: number;
  sku: string;
  imagens?: File[];
  especificacoes?: ProductSpecifications;
  tags?: string[];
  ativo?: boolean;
  destaque?: boolean;
}

// ============ CRIAÇÃO DE CATEGORIA ============
export interface CreateCategoryData {
  nome: string;
  descricao?: string;
  imagem?: File;
}

// ============ CRIAÇÃO DE ORÇAMENTO ============
export interface CreateQuoteData {
  nome: string;
  telefone: string;
  email: string;
  empresa?: string;
  produto: string; // ID do produto
  mensagem: string;
}
