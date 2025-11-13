import { orcamentosSeed } from './orcamentosSeed';

// Utility functions
export function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function now(): string {
  return new Date().toISOString();
}

// Storage keys
const KEYS = {
  ORCAMENTOS: 'rodotec:orcamentos',
  SETTINGS: 'rodotec:settings',
};

// Settings interface
export interface Settings {
  empresa: {
    nome: string;
    cnpj: string;
    endereco: string;
    telefone: string;
    email: string;
  };
  aparencia: {
    corPrimaria: string;
    corFundo: string;
    logoUrl: string | null;
    faviconUrl: string | null;
  };
  notificacoes: {
    avisarNovosOrcamentos: boolean;
  };
  usuarios: Array<{
    id: string;
    nome: string;
    email: string;
    role: string;
  }>;
}

// Default settings
const defaultSettings: Settings = {
  empresa: {
    nome: 'RODOTEC',
    cnpj: '00.000.000/0000-00',
    endereco: 'Rua Exemplo, 123 - Cidade/UF',
    telefone: '(00) 0000-0000',
    email: 'contato@rodotec.com.br',
  },
  aparencia: {
    corPrimaria: '#0D47A1',
    corFundo: '#FFFFFF',
    logoUrl: null,
    faviconUrl: null,
  },
  notificacoes: {
    avisarNovosOrcamentos: true,
  },
  usuarios: [
    {
      id: 'admin-1',
      nome: 'Administrador',
      email: 'admin@rodotec.com.br',
      role: 'admin',
    },
  ],
};

// Local storage helpers
class LocalDataLayer {
  // Initialize with default data if empty
  init() {
    if (typeof window === 'undefined') return;
    
    const orcamentos = localStorage.getItem(KEYS.ORCAMENTOS);
    if (!orcamentos) {
      localStorage.setItem(KEYS.ORCAMENTOS, JSON.stringify(orcamentosSeed));
    }

    const settings = localStorage.getItem(KEYS.SETTINGS);
    if (!settings) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(defaultSettings));
    }
  }

  // ============ ORÇAMENTOS ============
  getOrcamentos(filters?: { search?: string; status?: string }): any[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEYS.ORCAMENTOS);
    let orcamentos: any[] = raw ? JSON.parse(raw) : [];

    if (filters?.search) {
      const s = filters.search.toLowerCase();
      orcamentos = orcamentos.filter(o =>
        o.nome.toLowerCase().includes(s) ||
        o.email.toLowerCase().includes(s) ||
        o.telefone.toLowerCase().includes(s) ||
        o.produto.toLowerCase().includes(s)
      );
    }
    if (filters?.status) {
      orcamentos = orcamentos.filter(o => o.status === filters.status);
    }

    return orcamentos.sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
  }

  getOrcamento(id: string): any | null {
    const orcamentos = this.getOrcamentos();
    return orcamentos.find(o => o.id === id) || null;
  }

  createOrcamento(data: Partial<any>): any {
    if (typeof window === 'undefined') throw new Error('Cannot create orcamento on server');
    const orcamentos = this.getOrcamentos();
    const orcamento: any = {
      id: uid(),
      nome: data.nome || '',
      telefone: data.telefone || '',
      email: data.email || '',
      produto: data.produto || '',
      quantidade: data.quantidade || 1,
      mensagem: data.mensagem || '',
      status: data.status || 'novo',
      notasInternas: data.notasInternas || '',
      criadoEm: now(),
      atualizadoEm: now(),
    };
    orcamentos.push(orcamento);
    localStorage.setItem(KEYS.ORCAMENTOS, JSON.stringify(orcamentos));
    return orcamento;
  }

  updateOrcamento(id: string, data: Partial<any>): any | null {
    if (typeof window === 'undefined') return null;
    const orcamentos = this.getOrcamentos();
    const index = orcamentos.findIndex(o => o.id === id);
    if (index === -1) return null;

    orcamentos[index] = {
      ...orcamentos[index],
      ...data,
      atualizadoEm: now(),
    };
    localStorage.setItem(KEYS.ORCAMENTOS, JSON.stringify(orcamentos));
    return orcamentos[index];
  }

  deleteOrcamento(id: string): boolean {
    if (typeof window === 'undefined') return false;
    const orcamentos = this.getOrcamentos();
    const filtered = orcamentos.filter(o => o.id !== id);
    if (filtered.length === orcamentos.length) return false;
    localStorage.setItem(KEYS.ORCAMENTOS, JSON.stringify(filtered));
    return true;
  }

  // ============ CONFIGURAÇÕES ============
  getSettings(): Settings {
    if (typeof window === 'undefined') return defaultSettings;
    const raw = localStorage.getItem(KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : defaultSettings;
  }

  updateSettings(data: Partial<Settings>): Settings {
    if (typeof window === 'undefined') return defaultSettings;
    const current = this.getSettings();
    const updated = { ...current, ...data };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  }

  // Export data
  exportData(): string {
    if (typeof window === 'undefined') return '{}';
    return JSON.stringify({
      orcamentos: this.getOrcamentos(),
      settings: this.getSettings(),
    }, null, 2);
  }

  // Import data
  importData(jsonString: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const data = JSON.parse(jsonString);
      if (data.orcamentos) localStorage.setItem(KEYS.ORCAMENTOS, JSON.stringify(data.orcamentos));
      if (data.settings) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(data.settings));
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }

  // Reset data
  reset() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEYS.ORCAMENTOS);
    localStorage.removeItem(KEYS.SETTINGS);
    this.init();
  }
}

export const localDataLayer = new LocalDataLayer();

// Auto-initialize on import
if (typeof window !== 'undefined') {
  localDataLayer.init();
}