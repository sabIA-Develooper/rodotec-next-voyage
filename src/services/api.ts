import type {
  LoginRequest,
  LoginResponse,
  Product,
  QuoteRequest,
  Category,
  DashboardStats,
  ProductFilters,
  QuoteFilters,
  PaginatedResponse,
  ApiResponse,
  CreateProductData,
  CreateQuoteData,
} from '@/types/api';

// Configuração da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Classe para erros da API
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper para fazer requisições
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('auth_token');

  const headers: HeadersInit = {
    ...options.headers,
  };

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  if (!isFormData) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.mensagem || errorData.message || 'Erro na requisição',
      response.status,
      errorData.errors
    );
  }

  // Parse seguro: evita erro em respostas 204/sem corpo
  const text = await response.text().catch(() => '');
  try {
    return text ? JSON.parse(text) : ({} as T);
  } catch {
    return text as unknown as T;
  }
}

// Helper para extrair dados da resposta (suporta ambos formatos)
function extractData<T>(response: ApiResponse<T>): T {
  return (response.dados || response.data) as T;
}

// ============ AUTENTICAÇÃO ============

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const payload = { email: credentials.email, senha: credentials.password };
    const response = await fetchApi<ApiResponse<LoginResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const data = extractData(response);

    // Salvar token no localStorage
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }

    return data;
  },

  register: async (data: {
    email: string;
    senha: string;
    nome: string;
    role?: 'admin' | 'user';
  }): Promise<LoginResponse> => {
    const response = await fetchApi<ApiResponse<LoginResponse>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const responseData = extractData(response);

    if (responseData.token) {
      localStorage.setItem('auth_token', responseData.token);
    }

    return responseData;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('auth_token');
  },

  getCurrentUser: async () => {
    const response = await fetchApi<ApiResponse<LoginResponse['user']>>('/auth/me');
    return extractData(response);
  },

  updateProfile: async (data: {
    nome?: string;
    email?: string;
    senhaAtual?: string;
    novaSenha?: string;
  }) => {
    const response = await fetchApi<ApiResponse<LoginResponse['user']>>('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return extractData(response);
  },
};

// ============ DASHBOARD ============

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await fetchApi<ApiResponse<DashboardStats>>('/quotes/stats');
    return extractData(response);
  },

  getRecentQuotes: async (limit = 5): Promise<QuoteRequest[]> => {
    const response = await fetchApi<PaginatedResponse<QuoteRequest>>(
      `/quotes?limit=${limit}&sort=-createdAt`
    );
    return response.dados;
  },

  getRecentProducts: async (limit = 5): Promise<Product[]> => {
    const response = await fetchApi<PaginatedResponse<Product>>(
      `/products?limit=${limit}&sort=-createdAt`
    );
    return response.dados;
  },
};

// ============ PRODUTOS ============

export const productsApi = {
  list: async (filters?: ProductFilters): Promise<PaginatedResponse<Product>> => {
    const params = new URLSearchParams();

    if (filters?.search) params.append('search', filters.search);
    if (filters?.categoria) params.append('categoria', filters.categoria);
    if (filters?.ativo !== undefined) params.append('ativo', String(filters.ativo));
    if (filters?.destaque !== undefined) params.append('destaque', String(filters.destaque));
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.sort) params.append('sort', filters.sort);

    const query = params.toString() ? `?${params.toString()}` : '';
    const response = await fetchApi<PaginatedResponse<Product>>(`/products${query}`);
    return response;
  },

  get: async (id: string): Promise<Product> => {
    const response = await fetchApi<ApiResponse<Product>>(`/products/${id}`);
    return extractData(response);
  },

  create: async (data: FormData | CreateProductData): Promise<Product> => {
    const isFD = typeof FormData !== 'undefined' && data instanceof FormData;

    const response = await fetchApi<ApiResponse<Product>>('/products', {
      method: 'POST',
      body: isFD ? (data as FormData) : JSON.stringify(data),
    });

    return extractData(response);
  },

  update: async (id: string, data: FormData | Partial<Product>): Promise<Product> => {
    const isFD = typeof FormData !== 'undefined' && data instanceof FormData;

    const response = await fetchApi<ApiResponse<Product>>(`/products/${id}`, {
      method: 'PUT',
      body: isFD ? (data as FormData) : JSON.stringify(data),
    });

    return extractData(response);
  },

  delete: async (id: string): Promise<void> => {
    await fetchApi(`/products/${id}`, { method: 'DELETE' });
  },

  updateStock: async (id: string, estoque: number): Promise<Product> => {
    const response = await fetchApi<ApiResponse<Product>>(`/products/${id}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ estoque }),
    });
    return extractData(response);
  },

  deleteImage: async (id: string, imageId: string): Promise<void> => {
    await fetchApi(`/products/${id}/images/${imageId}`, { method: 'DELETE' });
  },
};

// ============ ORÇAMENTOS ============

export const quotesApi = {
  list: async (filters?: QuoteFilters): Promise<PaginatedResponse<QuoteRequest>> => {
    const params = new URLSearchParams();

    if (filters?.search) params.append('search', filters.search);
    if (filters?.email) params.append('email', filters.email);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.produto) params.append('produto', filters.produto);
    if (filters?.dataInicio) params.append('dataInicio', filters.dataInicio);
    if (filters?.dataFim) params.append('dataFim', filters.dataFim);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.sort) params.append('sort', filters.sort);

    const query = params.toString() ? `?${params.toString()}` : '';
    const response = await fetchApi<PaginatedResponse<QuoteRequest>>(`/quotes${query}`);
    return response;
  },

  get: async (id: string): Promise<QuoteRequest> => {
    const response = await fetchApi<ApiResponse<QuoteRequest>>(`/quotes/${id}`);
    return extractData(response);
  },

  create: async (data: CreateQuoteData): Promise<QuoteRequest> => {
    const response = await fetchApi<ApiResponse<QuoteRequest>>('/quotes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return extractData(response);
  },

  updateStatus: async (id: string, status: string): Promise<QuoteRequest> => {
    const response = await fetchApi<ApiResponse<QuoteRequest>>(`/quotes/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return extractData(response);
  },

  updateObservacoes: async (id: string, observacoes: string): Promise<QuoteRequest> => {
    const response = await fetchApi<ApiResponse<QuoteRequest>>(`/quotes/${id}/observacoes`, {
      method: 'PATCH',
      body: JSON.stringify({ observacoes }),
    });
    return extractData(response);
  },

  delete: async (id: string): Promise<void> => {
    await fetchApi(`/quotes/${id}`, { method: 'DELETE' });
  },

  getStats: async (): Promise<DashboardStats> => {
    const response = await fetchApi<ApiResponse<DashboardStats>>('/quotes/stats');
    return extractData(response);
  },

  exportCSV: async (filters?: QuoteFilters): Promise<Blob> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);

    const query = params.toString() ? `?${params.toString()}` : '';
    const token = localStorage.getItem('auth_token');

    const response = await fetch(`${API_BASE_URL}/quotes/export${query}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!response.ok) {
      throw new ApiError('Erro ao exportar CSV', response.status);
    }

    return response.blob();
  },
};

// ============ CATEGORIAS ============

export const categoriesApi = {
  list: async (filters?: {
    page?: number;
    limit?: number;
    ativa?: boolean;
  }): Promise<PaginatedResponse<Category>> => {
    const params = new URLSearchParams();

    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.ativa !== undefined) params.append('ativa', String(filters.ativa));

    const query = params.toString() ? `?${params.toString()}` : '';
    const response = await fetchApi<PaginatedResponse<Category>>(`/categories${query}`);
    return response;
  },

  get: async (id: string): Promise<Category> => {
    const response = await fetchApi<ApiResponse<Category>>(`/categories/${id}`);
    return extractData(response);
  },

  create: async (data: FormData | { nome: string; descricao?: string }): Promise<Category> => {
    const isFD = typeof FormData !== 'undefined' && data instanceof FormData;

    const response = await fetchApi<ApiResponse<Category>>('/categories', {
      method: 'POST',
      body: isFD ? (data as FormData) : JSON.stringify(data),
    });

    return extractData(response);
  },

  update: async (id: string, data: FormData | Partial<Category>): Promise<Category> => {
    const isFD = typeof FormData !== 'undefined' && data instanceof FormData;

    const response = await fetchApi<ApiResponse<Category>>(`/categories/${id}`, {
      method: 'PUT',
      body: isFD ? (data as FormData) : JSON.stringify(data),
    });

    return extractData(response);
  },

  delete: async (id: string): Promise<void> => {
    await fetchApi(`/categories/${id}`, { method: 'DELETE' });
  },

  deleteImage: async (id: string): Promise<void> => {
    await fetchApi(`/categories/${id}/image`, { method: 'DELETE' });
  },
};

// ============ UPLOAD DE MÍDIA ============

export const mediaApi = {
  upload: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!response.ok) {
      throw new ApiError('Erro ao fazer upload', response.status);
    }

    const data = await response.json();
    return extractData(data);
  },

  delete: async (url: string): Promise<void> => {
    await fetchApi('/media', {
      method: 'DELETE',
      body: JSON.stringify({ url }),
    });
  },
};

// ============ HEALTH CHECK ============

export const healthApi = {
  check: async (): Promise<{ success: boolean; message: string; timestamp: string }> => {
    return await fetchApi('/health');
  },
};

export default {
  auth: authApi,
  dashboard: dashboardApi,
  products: productsApi,
  quotes: quotesApi,
  categories: categoriesApi,
  media: mediaApi,
  health: healthApi,
};
