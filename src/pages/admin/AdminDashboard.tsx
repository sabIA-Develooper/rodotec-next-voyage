import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { repository } from '@/data/repository';
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

interface DashboardStats {
  total_products: number;
  active_products: number;
  draft_products: number;
  total_quotes: number;
  new_quotes: number;
  in_progress_quotes: number;
  completed_quotes: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    total_products: 0,
    active_products: 0,
    draft_products: 0,
    total_quotes: 0,
    new_quotes: 0,
    in_progress_quotes: 0,
    completed_quotes: 0,
  });

  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
    loadRecentQuotes();
    loadRecentProducts();
  }, []);

  const loadStats = () => {
    const products = repository.getProducts();
    const quotes = repository.getQuotes();

    setStats({
      total_products: products.length,
      active_products: products.filter(p => p.status === 'ACTIVE').length,
      draft_products: products.filter(p => p.status === 'DRAFT').length,
      total_quotes: quotes.length,
      new_quotes: quotes.filter(q => q.status === 'NEW').length,
      in_progress_quotes: quotes.filter(q => q.status === 'IN_PROGRESS').length,
      completed_quotes: quotes.filter(q => q.status === 'WON' || q.status === 'LOST').length,
    });
  };

  const loadRecentQuotes = () => {
    const quotes = repository.getQuotes();
    setRecentQuotes(quotes.slice(0, 5));
  };

  const loadRecentProducts = () => {
    const products = repository.getProducts();
    setRecentProducts(products.slice(0, 5));
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      NEW: { label: 'Novo', variant: 'default' },
      IN_PROGRESS: { label: 'Em andamento', variant: 'secondary' },
      WON: { label: 'Ganho', variant: 'default' },
      LOST: { label: 'Perdido', variant: 'destructive' },
    };
    const config = variants[status] || { label: status, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu negócio</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Orçamentos Novos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.new_quotes}</div>
              <p className="text-xs text-muted-foreground">Aguardando atendimento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.in_progress_quotes}</div>
              <p className="text-xs text-muted-foreground">Orçamentos em negociação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed_quotes}</div>
              <p className="text-xs text-muted-foreground">Ganhos ou perdidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active_products}</div>
              <p className="text-xs text-muted-foreground">{stats.draft_products} rascunhos</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Quotes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Orçamentos Recentes</CardTitle>
              <Link to="/admin/orcamentos">
                <Button variant="ghost" size="sm">
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentQuotes.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">Nenhum orçamento encontrado</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell>{getStatusBadge(quote.status)}</TableCell>
                      <TableCell>
                        <Link to={`/admin/orcamentos/${quote.id}`} className="hover:underline">
                          {quote.customer_name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{quote.company_name || '—'}</TableCell>
                      <TableCell className="text-muted-foreground">{quote.product_interest || '—'}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDistanceToNow(new Date(quote.created_at), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Produtos Atualizados Recentemente</CardTitle>
              <Link to="/admin/produtos">
                <Button variant="ghost" size="sm">
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentProducts.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">Nenhum produto encontrado</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Atualizado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Link to={`/admin/produtos/${product.id}`} className="hover:underline">
                          {product.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'ACTIVE' ? 'default' : 'secondary'}>
                          {product.status === 'ACTIVE' ? 'Ativo' : 'Rascunho'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{product.sku || '—'}</TableCell>
                      <TableCell>{product.stock_qty}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDistanceToNow(new Date(product.updated_at), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
