import type {
  Product,
  QuoteRequest,
  DownloadAsset,
  NewsPost,
  Distributor,
  Category,
} from './types';
import { seedData } from './seed';

// Utility functions
export function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function now(): string {
  return new Date().toISOString();
}

// Storage keys
const KEYS = {
  PRODUCTS: 'rodotec:products',
  QUOTES: 'rodotec:quotes',
  DOWNLOADS: 'rodotec:downloads',
  NEWS: 'rodotec:news',
  DISTRIBUTORS: 'rodotec:distributors',
  CATEGORIES: 'rodotec:categories',
  INITIALIZED: 'rodotec:initialized',
};

class LocalRepository {
  // Initialize with seed data if empty
  init() {
    if (typeof window === 'undefined') return;
    
    const initialized = localStorage.getItem(KEYS.INITIALIZED);
    if (!initialized) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(seedData.products));
      localStorage.setItem(KEYS.QUOTES, JSON.stringify(seedData.quotes));
      localStorage.setItem(KEYS.DOWNLOADS, JSON.stringify(seedData.downloads));
      localStorage.setItem(KEYS.NEWS, JSON.stringify(seedData.news));
      localStorage.setItem(KEYS.DISTRIBUTORS, JSON.stringify(seedData.distributors));
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(seedData.categories));
      localStorage.setItem(KEYS.INITIALIZED, 'true');
    }
  }

  // Reset to seed data
  reset() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEYS.INITIALIZED);
    this.init();
  }

  // Export all data
  exportData(): string {
    if (typeof window === 'undefined') return '{}';
    return JSON.stringify({
      products: this.getProducts(),
      quotes: this.getQuotes(),
      downloads: this.getDownloads(),
      news: this.getNews(),
      distributors: this.getDistributors(),
      categories: this.getCategories(),
    }, null, 2);
  }

  // Import data
  importData(jsonString: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const data = JSON.parse(jsonString);
      if (data.products) localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(data.products));
      if (data.quotes) localStorage.setItem(KEYS.QUOTES, JSON.stringify(data.quotes));
      if (data.downloads) localStorage.setItem(KEYS.DOWNLOADS, JSON.stringify(data.downloads));
      if (data.news) localStorage.setItem(KEYS.NEWS, JSON.stringify(data.news));
      if (data.distributors) localStorage.setItem(KEYS.DISTRIBUTORS, JSON.stringify(data.distributors));
      if (data.categories) localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(data.categories));
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }

  // ============ PRODUCTS ============
  getProducts(filters?: { search?: string; status?: string; category_id?: string }): Product[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.PRODUCTS);
    let products: Product[] = raw ? JSON.parse(raw) : [];

    if (filters?.search) {
      const s = filters.search.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(s) ||
        p.sku?.toLowerCase().includes(s)
      );
    }
    if (filters?.status) {
      products = products.filter(p => p.status === filters.status);
    }
    if (filters?.category_id) {
      products = products.filter(p => p.category_id === filters.category_id);
    }

    return products.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
  }

  getProduct(id: string): Product | null {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  }

  createProduct(data: Partial<Product>): Product {
    if (typeof window === 'undefined') throw new Error('Cannot create product on server');
    const products = this.getProducts();
    const product: Product = {
      id: uid(),
      title: data.title || 'Novo Produto',
      slug: data.slug || slugify(data.title || 'novo-produto'),
      description: data.description || '',
      short_description: data.short_description || '',
      sku: data.sku || null,
      price: data.price || null,
      stock_qty: data.stock_qty || 0,
      status: data.status || 'DRAFT',
      category_id: data.category_id || 'cat-geral',
      images: data.images || [],
      technical_specs: data.technical_specs || {},
      dimensions: data.dimensions || {},
      seo_title: data.seo_title || null,
      seo_description: data.seo_description || null,
      created_at: now(),
      updated_at: now(),
    };
    products.push(product);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    return product;
  }

  updateProduct(id: string, data: Partial<Product>): Product | null {
    if (typeof window === 'undefined') return null;
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...data,
      updated_at: now(),
    };
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    return products[index];
  }

  deleteProduct(id: string): boolean {
    if (typeof window === 'undefined') return false;
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(filtered));
    return true;
  }

  // ============ QUOTES ============
  getQuotes(filters?: { search?: string; status?: string }): QuoteRequest[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.QUOTES);
    let quotes: QuoteRequest[] = raw ? JSON.parse(raw) : [];

    if (filters?.search) {
      const s = filters.search.toLowerCase();
      quotes = quotes.filter(q =>
        q.customer_name.toLowerCase().includes(s) ||
        q.customer_email.toLowerCase().includes(s) ||
        q.company_name?.toLowerCase().includes(s)
      );
    }
    if (filters?.status) {
      quotes = quotes.filter(q => q.status === filters.status);
    }

    return quotes.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  getQuote(id: string): QuoteRequest | null {
    const quotes = this.getQuotes();
    return quotes.find(q => q.id === id) || null;
  }

  createQuote(data: Partial<QuoteRequest>): QuoteRequest {
    if (typeof window === 'undefined') throw new Error('Cannot create quote on server');
    const quotes = this.getQuotes();
    const quote: QuoteRequest = {
      id: uid(),
      status: data.status || 'NEW',
      customer_name: data.customer_name || '',
      customer_email: data.customer_email || '',
      customer_phone: data.customer_phone || '',
      company_name: data.company_name || null,
      product_interest: data.product_interest || null,
      message: data.message || null,
      internal_notes: data.internal_notes || null,
      created_at: now(),
      updated_at: now(),
    };
    quotes.push(quote);
    localStorage.setItem(KEYS.QUOTES, JSON.stringify(quotes));
    return quote;
  }

  updateQuote(id: string, data: Partial<QuoteRequest>): QuoteRequest | null {
    if (typeof window === 'undefined') return null;
    const quotes = this.getQuotes();
    const index = quotes.findIndex(q => q.id === id);
    if (index === -1) return null;

    quotes[index] = {
      ...quotes[index],
      ...data,
      updated_at: now(),
    };
    localStorage.setItem(KEYS.QUOTES, JSON.stringify(quotes));
    return quotes[index];
  }

  deleteQuote(id: string): boolean {
    if (typeof window === 'undefined') return false;
    const quotes = this.getQuotes();
    const filtered = quotes.filter(q => q.id !== id);
    if (filtered.length === quotes.length) return false;
    localStorage.setItem(KEYS.QUOTES, JSON.stringify(filtered));
    return true;
  }

  // ============ DOWNLOADS ============
  getDownloads(filters?: { search?: string; category?: string }): DownloadAsset[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.DOWNLOADS);
    let downloads: DownloadAsset[] = raw ? JSON.parse(raw) : [];

    if (filters?.search) {
      const s = filters.search.toLowerCase();
      downloads = downloads.filter(d =>
        d.title.toLowerCase().includes(s) ||
        d.description?.toLowerCase().includes(s)
      );
    }
    if (filters?.category) {
      downloads = downloads.filter(d => d.category === filters.category);
    }

    return downloads.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  getDownload(id: string): DownloadAsset | null {
    const downloads = this.getDownloads();
    return downloads.find(d => d.id === id) || null;
  }

  createDownload(data: Partial<DownloadAsset>): DownloadAsset {
    if (typeof window === 'undefined') throw new Error('Cannot create download on server');
    const downloads = this.getDownloads();
    const download: DownloadAsset = {
      id: uid(),
      title: data.title || 'Novo Download',
      category: data.category || 'CATALOG',
      description: data.description || null,
      file_url: data.file_url || '#',
      file_size: data.file_size || 0,
      file_type: data.file_type || 'pdf',
      download_count: 0,
      created_at: now(),
      updated_at: now(),
    };
    downloads.push(download);
    localStorage.setItem(KEYS.DOWNLOADS, JSON.stringify(downloads));
    return download;
  }

  updateDownload(id: string, data: Partial<DownloadAsset>): DownloadAsset | null {
    if (typeof window === 'undefined') return null;
    const downloads = this.getDownloads();
    const index = downloads.findIndex(d => d.id === id);
    if (index === -1) return null;

    downloads[index] = {
      ...downloads[index],
      ...data,
      updated_at: now(),
    };
    localStorage.setItem(KEYS.DOWNLOADS, JSON.stringify(downloads));
    return downloads[index];
  }

  deleteDownload(id: string): boolean {
    if (typeof window === 'undefined') return false;
    const downloads = this.getDownloads();
    const filtered = downloads.filter(d => d.id !== id);
    if (filtered.length === downloads.length) return false;
    localStorage.setItem(KEYS.DOWNLOADS, JSON.stringify(filtered));
    return true;
  }

  // ============ NEWS ============
  getNews(filters?: { search?: string; category?: string }): NewsPost[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.NEWS);
    let news: NewsPost[] = raw ? JSON.parse(raw) : [];

    if (filters?.search) {
      const s = filters.search.toLowerCase();
      news = news.filter(n =>
        n.title.toLowerCase().includes(s) ||
        n.summary.toLowerCase().includes(s)
      );
    }
    if (filters?.category) {
      news = news.filter(n => n.category === filters.category);
    }

    return news.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  getNewsPost(id: string): NewsPost | null {
    const news = this.getNews();
    return news.find(n => n.id === id) || null;
  }

  createNewsPost(data: Partial<NewsPost>): NewsPost {
    if (typeof window === 'undefined') throw new Error('Cannot create news on server');
    const news = this.getNews();
    const post: NewsPost = {
      id: uid(),
      title: data.title || 'Nova Notícia',
      slug: data.slug || slugify(data.title || 'nova-noticia'),
      category: data.category || 'COMPANY',
      summary: data.summary || '',
      content: data.content || '',
      cover_image: data.cover_image || null,
      author: data.author || 'RODOTEC',
      published_at: data.published_at || null,
      created_at: now(),
      updated_at: now(),
    };
    news.push(post);
    localStorage.setItem(KEYS.NEWS, JSON.stringify(news));
    return post;
  }

  updateNewsPost(id: string, data: Partial<NewsPost>): NewsPost | null {
    if (typeof window === 'undefined') return null;
    const news = this.getNews();
    const index = news.findIndex(n => n.id === id);
    if (index === -1) return null;

    news[index] = {
      ...news[index],
      ...data,
      updated_at: now(),
    };
    localStorage.setItem(KEYS.NEWS, JSON.stringify(news));
    return news[index];
  }

  deleteNewsPost(id: string): boolean {
    if (typeof window === 'undefined') return false;
    const news = this.getNews();
    const filtered = news.filter(n => n.id !== id);
    if (filtered.length === news.length) return false;
    localStorage.setItem(KEYS.NEWS, JSON.stringify(filtered));
    return true;
  }

  // ============ DISTRIBUTORS ============
  getDistributors(filters?: { search?: string; country?: string }): Distributor[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.DISTRIBUTORS);
    let distributors: Distributor[] = raw ? JSON.parse(raw) : [];

    if (filters?.search) {
      const s = filters.search.toLowerCase();
      distributors = distributors.filter(d =>
        d.name.toLowerCase().includes(s) ||
        d.city.toLowerCase().includes(s) ||
        d.state.toLowerCase().includes(s)
      );
    }
    if (filters?.country) {
      distributors = distributors.filter(d => d.country === filters.country);
    }

    return distributors.sort((a, b) => a.name.localeCompare(b.name));
  }

  getDistributor(id: string): Distributor | null {
    const distributors = this.getDistributors();
    return distributors.find(d => d.id === id) || null;
  }

  createDistributor(data: Partial<Distributor>): Distributor {
    if (typeof window === 'undefined') throw new Error('Cannot create distributor on server');
    const distributors = this.getDistributors();
    const distributor: Distributor = {
      id: uid(),
      name: data.name || 'Novo Distribuidor',
      city: data.city || '',
      state: data.state || '',
      country: data.country || 'Brasil',
      contact_name: data.contact_name || null,
      phone: data.phone || null,
      email: data.email || null,
      address: data.address || null,
      lat: data.lat || null,
      lng: data.lng || null,
      created_at: now(),
      updated_at: now(),
    };
    distributors.push(distributor);
    localStorage.setItem(KEYS.DISTRIBUTORS, JSON.stringify(distributors));
    return distributor;
  }

  updateDistributor(id: string, data: Partial<Distributor>): Distributor | null {
    if (typeof window === 'undefined') return null;
    const distributors = this.getDistributors();
    const index = distributors.findIndex(d => d.id === id);
    if (index === -1) return null;

    distributors[index] = {
      ...distributors[index],
      ...data,
      updated_at: now(),
    };
    localStorage.setItem(KEYS.DISTRIBUTORS, JSON.stringify(distributors));
    return distributors[index];
  }

  deleteDistributor(id: string): boolean {
    if (typeof window === 'undefined') return false;
    const distributors = this.getDistributors();
    const filtered = distributors.filter(d => d.id !== id);
    if (filtered.length === distributors.length) return false;
    localStorage.setItem(KEYS.DISTRIBUTORS, JSON.stringify(filtered));
    return true;
  }

  // ============ CATEGORIES ============
  getCategories(): Category[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.CATEGORIES);
    return raw ? JSON.parse(raw) : [];
  }

  getCategory(id: string): Category | null {
    const categories = this.getCategories();
    return categories.find(c => c.id === id) || null;
  }
}

export const repository = new LocalRepository();

// Auto-initialize on import
if (typeof window !== 'undefined') {
  repository.init();
}
