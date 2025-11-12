// Tipos locais para o repositório offline
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  sku: string | null;
  price: number | null;
  stock_qty: number;
  status: 'ACTIVE' | 'DRAFT';
  category_id: string;
  images: string[];
  technical_specs: Record<string, string>;
  dimensions: {
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
  };
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface QuoteRequest {
  id: string;
  status: 'NEW' | 'IN_PROGRESS' | 'WON' | 'LOST';
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  company_name: string | null;
  product_interest: string | null;
  message: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DownloadAsset {
  id: string;
  title: string;
  category: 'CATALOG' | 'TECHNICAL' | 'MANUAL' | 'CERTIFICATION' | 'IMAGE';
  description: string | null;
  file_url: string;
  file_size: number;
  file_type: string;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  category: 'PRODUCT' | 'MARKET' | 'COMPANY';
  summary: string;
  content: string;
  cover_image: string | null;
  author: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Distributor {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}
