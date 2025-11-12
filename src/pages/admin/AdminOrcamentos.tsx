import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { repository } from '@/data/repository';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Download } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type QuoteRequest = {
  id: string;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  company_name: string | null;
  product_interest: string | null;
  created_at: string;
};

export default function AdminOrcamentos() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = () => {
    const data = repository.getQuotes();
    setQuotes(data as QuoteRequest[]);
    setLoading(false);
  };

  const filteredQuotes = quotes.filter((q) =>
    q.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    q.customer_email.toLowerCase().includes(search.toLowerCase()) ||
    q.company_name?.toLowerCase().includes(search.toLowerCase())
  );

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

  const handleExportCSV = () => {
    const headers = ['Status', 'Nome', 'Email', 'Telefone', 'Empresa', 'Produto', 'Data'];
    const rows = filteredQuotes.map(q => [
      q.status,
      q.customer_name,
      q.customer_email,
      q.customer_phone,
      q.company_name || '',
      q.product_interest || '',
      new Date(q.created_at).toLocaleDateString('pt-BR'),
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orcamentos-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Orçamentos</h1>
            <p className="text-muted-foreground">Gerencie solicitações de orçamento</p>
          </div>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-border">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar orçamentos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredQuotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhum orçamento encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell>{getStatusBadge(quote.status)}</TableCell>
                    <TableCell>
                      <Link
                        to={`/admin/orcamentos/${quote.id}`}
                        className="font-medium hover:underline"
                      >
                        {quote.customer_name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{quote.company_name || '—'}</TableCell>
                    <TableCell className="text-muted-foreground">{quote.product_interest || '—'}</TableCell>
                    <TableCell className="text-muted-foreground">{quote.customer_phone}</TableCell>
                    <TableCell className="text-muted-foreground">{quote.customer_email}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDistanceToNow(new Date(quote.created_at), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
