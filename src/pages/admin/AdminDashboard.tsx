import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Package,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { DashboardStats, QuoteRequest, Product } from '@/types/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    novos: 0,
    emContato: 0,
    concluidos: 0,
    active_products: 0,
    draft_products: 0,
  });

  const [recentQuotes, setRecentQuotes] = useState<QuoteRequest[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Carrega estatísticas de orçamentos
      const statsData = await api.quotes.getStats();

      // Buscar contagem de produtos ativos e inativos
      const [activeProductsRes, inactiveProductsRes] = await Promise.all([
        api.products.list({ ativo: true, limit: 1 }).catch(() => ({ dados: [] })),
        api.products.list({ ativo: false, limit: 1 }).catch(() => ({ dados: [] })),
      ]);

      // Backend retorna { total, novos, emContato, concluidos, ultimoMes, taxaConclusao, ... }
      setStats({
        novos: statsData.novos || 0,
        emContato: statsData.emContato || 0,
        concluidos: statsData.concluidos || 0,
        active_products: activeProductsRes.paginacao?.total || activeProductsRes.dados?.length || 0,
        draft_products: inactiveProductsRes.paginacao?.total || inactiveProductsRes.dados?.length || 0,
        taxaConclusao: statsData.taxaConclusao,
      });

      // Carrega orçamentos recentes
      const quotesData = await api.dashboard.getRecentQuotes(5);
      setRecentQuotes(quotesData || []);

      // Carrega produtos recentes
      const productsData = await api.dashboard.getRecentProducts(5);
      setRecentProducts(productsData || []);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { label: string; color: string; bgColor: string }
    > = {
      novo: { label: 'Novo', color: '#FFFFFF', bgColor: '#3B4BA8' },
      em_contato: { label: 'Em contato', color: '#94A3B8', bgColor: 'rgba(255, 255, 255, 0.05)' },
      concluido: { label: 'Concluído', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)' },
    };
    const config = variants[status] || { label: status, color: '#94A3B8', bgColor: 'rgba(255, 255, 255, 0.05)' };
    return (
      <span
        className="px-3 py-1 rounded-full text-xs font-medium"
        style={{ color: config.color, backgroundColor: config.bgColor }}
      >
        {config.label}
      </span>
    );
  };

  const StatCard = ({ icon: Icon, title, value, subtitle }: {
    icon: typeof FileText;
    title: string;
    value: number;
    subtitle: string;
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="rounded-3xl p-8 border transition-all duration-300"
        style={{
          backgroundColor: '#0B1220',
          borderColor: isHovered ? '#3B4BA8' : 'rgba(255, 255, 255, 0.05)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 0 20px rgba(59, 75, 168, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-row items-center justify-between pb-2">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{title}</h3>
          <Icon className="h-5 w-5" style={{ color: '#3B4BA8' }} />
        </div>
        <div>
          <div className="text-4xl font-extrabold text-white tracking-tight">{value}</div>
          <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>{subtitle}</p>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-16">
        <div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-lg mt-2" style={{ color: '#94A3B8' }}>Visão geral do seu negócio</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={FileText}
            title="Orçamentos Novos"
            value={stats.novos || 0}
            subtitle="Aguardando atendimento"
          />
          <StatCard
            icon={Clock}
            title="Em Andamento"
            value={stats.emContato || 0}
            subtitle="Orçamentos em negociação"
          />
          <StatCard
            icon={CheckCircle}
            title="Concluídos"
            value={stats.concluidos || 0}
            subtitle={stats.taxaConclusao ? `${stats.taxaConclusao}% de taxa` : 'Total concluídos'}
          />
          <StatCard
            icon={Package}
            title="Produtos Ativos"
            value={stats.active_products || 0}
            subtitle={`${stats.draft_products || 0} rascunhos`}
          />
        </div>

        {/* Recent Quotes */}
        <div
          className="rounded-3xl border overflow-hidden"
          style={{
            backgroundColor: '#0B1220',
            borderColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Orçamentos Recentes</h2>
              <Link to="/admin/orcamentos">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-[#0D1528] group"
                  style={{ color: '#3B4BA8' }}
                >
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {loading ? (
              <p className="text-center py-12" style={{ color: '#94A3B8' }}>Carregando...</p>
            ) : recentQuotes.length === 0 ? (
              <p className="text-center py-12" style={{ color: '#94A3B8' }}>Nenhum orçamento encontrado</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: 'rgba(255, 255, 255, 0.05)', backgroundColor: 'transparent' }}>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Status</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Cliente</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Empresa</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Produto</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentQuotes.map((quote) => (
                      <TableRow key={quote._id} style={{ borderColor: 'rgba(255, 255, 255, 0.05)', backgroundColor: 'transparent' }} className="hover:bg-[#0D1528]">
                        <TableCell style={{ backgroundColor: 'transparent' }}>{getStatusBadge(quote.status)}</TableCell>
                        <TableCell style={{ backgroundColor: 'transparent' }}>
                          <Link
                            to={`/admin/orcamentos/${quote._id}`}
                            className="hover:underline font-medium"
                            style={{ color: '#3B4BA8' }}
                          >
                            {quote.nome}
                          </Link>
                        </TableCell>
                        <TableCell style={{ color: '#94A3B8', backgroundColor: 'transparent' }}>
                          {quote.empresa || '—'}
                        </TableCell>
                        <TableCell style={{ color: '#94A3B8', backgroundColor: 'transparent' }}>
                          {typeof quote.produto === 'object' ? quote.produto.nome : '—'}
                        </TableCell>
                        <TableCell className="text-sm" style={{ color: '#94A3B8', backgroundColor: 'transparent' }}>
                          {formatDistanceToNow(new Date(quote.createdAt), {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div
          className="rounded-3xl border overflow-hidden"
          style={{
            backgroundColor: '#0B1220',
            borderColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Produtos Atualizados Recentemente</h2>
              <Link to="/admin/produtos">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-[#0D1528] group"
                  style={{ color: '#3B4BA8' }}
                >
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {loading ? (
              <p className="text-center py-12" style={{ color: '#94A3B8' }}>Carregando...</p>
            ) : recentProducts.length === 0 ? (
              <p className="text-center py-12" style={{ color: '#94A3B8' }}>Nenhum produto encontrado</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: 'rgba(255, 255, 255, 0.05)', backgroundColor: 'transparent' }}>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Título</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Status</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Atualizado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentProducts.map((product) => (
                      <TableRow key={product._id} style={{ borderColor: 'rgba(255, 255, 255, 0.05)', backgroundColor: 'transparent' }} className="hover:bg-[#0D1528]">
                        <TableCell style={{ backgroundColor: 'transparent' }}>
                          <Link
                            to={`/admin/produtos/${product._id}`}
                            className="hover:underline font-medium"
                            style={{ color: '#3B4BA8' }}
                          >
                            {product.nome}
                          </Link>
                        </TableCell>
                        <TableCell style={{ backgroundColor: 'transparent' }}>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={
                              product.ativo
                                ? { color: '#FFFFFF', backgroundColor: '#3B4BA8' }
                                : { color: '#94A3B8', backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                            }
                          >
                            {product.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm" style={{ color: '#94A3B8', backgroundColor: 'transparent' }}>
                          {product.updatedAt
                            ? formatDistanceToNow(new Date(product.updatedAt), {
                                addSuffix: true,
                                locale: ptBR,
                              })
                            : formatDistanceToNow(new Date(product.createdAt), {
                                addSuffix: true,
                                locale: ptBR,
                              })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
