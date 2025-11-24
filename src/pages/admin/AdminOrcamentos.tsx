import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Download, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '@/services/api';
import { toast } from 'sonner';
import type { QuoteRequest } from '@/types/api';

export default function AdminOrcamentos() {
  const [orcamentos, setOrcamentos] = useState<QuoteRequest[]>([]);
  const [filteredOrcamentos, setFilteredOrcamentos] = useState<QuoteRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [selectedOrcamento, setSelectedOrcamento] = useState<QuoteRequest | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrcamentos();
  }, []);

  useEffect(() => {
    filterOrcamentos();
  }, [orcamentos, searchTerm, statusFilter]);

  const loadOrcamentos = async () => {
    try {
      setLoading(true);
      const res = await api.quotes.list({ limit: 1000, sort: '-createdAt' });
      setOrcamentos(res.dados || []);
    } catch (e) {
      console.error('Erro ao carregar orçamentos:', e);
      toast.error('Erro ao carregar orçamentos');
      setOrcamentos([]);
    } finally {
      setLoading(false);
    }
  };

  const filterOrcamentos = () => {
    let filtered = orcamentos;

    if (searchTerm) {
      filtered = filtered.filter(
        (o) =>
          o.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.telefone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof o.produto === 'object' &&
            o.produto.nome.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'todos') {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    setFilteredOrcamentos(filtered);
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { label: string; color: string; bgColor: string }
    > = {
      novo: { label: 'Novo', color: '#FFFFFF', bgColor: '#3B4BA8' },
      em_contato: { label: 'Em Contato', color: '#94A3B8', bgColor: 'rgba(255, 255, 255, 0.05)' },
      concluido: { label: 'Concluído', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)' },
    };
    const config = variants[status] || { label: status, color: '#94A3B8', bgColor: 'rgba(255, 255, 255, 0.05)' };
    return (
      <span
        className="px-3 py-1 rounded-full text-xs font-medium"
        style={{ color: config.color, backgroundColor: config.bgColor }}
      >
        {config.label}</span>
    );
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.quotes.updateStatus(id, newStatus);
      toast.success('Status atualizado com sucesso!');
      loadOrcamentos();
    } catch (e: any) {
      toast.error(e?.message || 'Erro ao atualizar status');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este orçamento?')) {
      try {
        await api.quotes.delete(id);
        toast.success('Orçamento excluído com sucesso!');
        loadOrcamentos();
      } catch (e: any) {
        toast.error(e?.message || 'Erro ao excluir orçamento');
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Nome', 'Telefone', 'Email', 'Produto', 'Status', 'Data'];
    const rows = filteredOrcamentos.map((o) => [
      o._id.slice(-6),
      o.nome,
      o.telefone,
      o.email,
      typeof o.produto === 'object' ? o.produto.nome : o.produto || '—',
      o.status,
      format(new Date(o.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `orcamentos_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Paginação
  const totalPages = Math.ceil(filteredOrcamentos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredOrcamentos.slice(startIndex, endIndex);

  return (
    <AdminLayout>
      <div className="space-y-16">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight">Orçamentos</h1>
            <p className="text-lg mt-2" style={{ color: '#94A3B8' }}>
              Gerencie os orçamentos solicitados pelos clientes
            </p>
          </div>
          <Button
            onClick={exportToCSV}
            className="rounded-xl px-6 py-3 font-semibold"
            style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        {/* Filtros */}
        <div
          className="rounded-3xl border p-6"
          style={{
            backgroundColor: '#0B1220',
            borderColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome, email, telefone ou produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-white placeholder:text-gray-400 rounded-xl h-11"
                style={{
                  backgroundColor: '#0D1528',
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                }}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                className="w-full md:w-48 text-white rounded-xl h-11"
                style={{
                  backgroundColor: '#0D1528',
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                <SelectItem value="todos" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                  Todos os status
                </SelectItem>
                <SelectItem value="novo" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                  Novo
                </SelectItem>
                <SelectItem value="em_contato" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                  Em Contato
                </SelectItem>
                <SelectItem value="concluido" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                  Concluído
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabela */}
        <div
          className="rounded-3xl border overflow-hidden"
          style={{
            backgroundColor: '#0B1220',
            borderColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              {filteredOrcamentos.length} orçamento(s) encontrado(s)
            </h2>

            {loading ? (
              <p className="text-center py-12" style={{ color: '#94A3B8' }}>
                Carregando...
              </p>
            ) : currentItems.length === 0 ? (
              <p className="text-center py-12" style={{ color: '#94A3B8' }}>
                Nenhum orçamento encontrado
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">ID</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Nome</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Telefone</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Email</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Produto</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Status</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Criado</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((orcamento) => (
                      <TableRow
                        key={orcamento._id}
                        style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                        className="hover:bg-[#0D1528]"
                      >
                        <TableCell className="font-medium text-white">
                          #{orcamento._id.slice(-6)}
                        </TableCell>
                        <TableCell className="text-white">{orcamento.nome}</TableCell>
                        <TableCell style={{ color: '#94A3B8' }}>{orcamento.telefone}</TableCell>
                        <TableCell style={{ color: '#94A3B8' }}>{orcamento.email}</TableCell>
                        <TableCell style={{ color: '#94A3B8' }}>
                          {typeof orcamento.produto === 'object'
                            ? orcamento.produto.nome
                            : orcamento.produto || '—'}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={orcamento.status}
                            onValueChange={(value) => handleStatusChange(orcamento._id, value)}
                          >
                            <SelectTrigger
                              className="w-32 h-8 text-xs text-white rounded-lg"
                              style={{
                                backgroundColor: '#0D1528',
                                borderColor: 'rgba(255, 255, 255, 0.05)',
                              }}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                              <SelectItem value="novo" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                                Novo
                              </SelectItem>
                              <SelectItem value="em_contato" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                                Em Contato
                              </SelectItem>
                              <SelectItem value="concluido" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                                Concluído
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm" style={{ color: '#94A3B8' }}>
                          {formatDistanceToNow(new Date(orcamento.createdAt), {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedOrcamento(orcamento);
                                setIsViewModalOpen(true);
                              }}
                              className="h-8 px-2 text-white hover:bg-[#0D1528]"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedOrcamento(orcamento);
                                setIsEditModalOpen(true);
                              }}
                              className="h-8 px-2 text-white hover:bg-[#0D1528]"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(orcamento._id)}
                              className="h-8 px-2 text-red-400 hover:bg-[#0D1528] hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="rounded-xl text-white hover:bg-[#0D1528]"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              Anterior
            </Button>
            <span className="text-sm" style={{ color: '#94A3B8' }}>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl text-white hover:bg-[#0D1528]"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              Próximo
            </Button>
          </div>
        )}

        {/* Modal de Visualização */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent
            className="max-w-2xl max-h-[80vh] overflow-y-auto"
            style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold">Detalhes do Orçamento</DialogTitle>
              <DialogDescription style={{ color: '#94A3B8' }}>
                Informações completas do orçamento
              </DialogDescription>
            </DialogHeader>
            {selectedOrcamento && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium uppercase tracking-wide text-gray-400">Nome</Label>
                    <p className="text-white mt-1">{selectedOrcamento.nome}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium uppercase tracking-wide text-gray-400">Telefone</Label>
                    <p className="text-white mt-1">{selectedOrcamento.telefone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium uppercase tracking-wide text-gray-400">Email</Label>
                    <p className="text-white mt-1">{selectedOrcamento.email}</p>
                  </div>
                  {selectedOrcamento.empresa && (
                    <div>
                      <Label className="text-sm font-medium uppercase tracking-wide text-gray-400">Empresa</Label>
                      <p className="text-white mt-1">{selectedOrcamento.empresa}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium uppercase tracking-wide text-gray-400">Produto</Label>
                    <p className="text-white mt-1">
                      {typeof selectedOrcamento.produto === 'object'
                        ? selectedOrcamento.produto.nome
                        : selectedOrcamento.produto || '—'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium uppercase tracking-wide text-gray-400">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedOrcamento.status)}</div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium uppercase tracking-wide text-gray-400">Mensagem</Label>
                  <p className="text-white p-4 rounded-xl mt-2" style={{ backgroundColor: '#0D1528' }}>
                    {selectedOrcamento.mensagem}
                  </p>
                </div>
                {selectedOrcamento.observacoes && (
                  <div>
                    <Label className="text-sm font-medium uppercase tracking-wide text-gray-400">Notas Internas</Label>
                    <p className="text-white p-4 rounded-xl mt-2" style={{ backgroundColor: 'rgba(59, 75, 168, 0.1)' }}>
                      {selectedOrcamento.observacoes}
                    </p>
                  </div>
                )}
                <div className="text-sm" style={{ color: '#94A3B8' }}>
                  <p>
                    Criado em:{' '}
                    {format(new Date(selectedOrcamento.createdAt), 'dd/MM/yyyy HH:mm', {
                      locale: ptBR,
                    })}
                  </p>
                  {selectedOrcamento.updatedAt && (
                    <p>
                      Atualizado em:{' '}
                      {format(new Date(selectedOrcamento.updatedAt), 'dd/MM/yyyy HH:mm', {
                        locale: ptBR,
                      })}
                    </p>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
                className="rounded-xl text-white hover:bg-[#0D1528]"
                style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Edição */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent
            className="max-w-2xl"
            style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold">Editar Orçamento</DialogTitle>
              <DialogDescription style={{ color: '#94A3B8' }}>
                Atualize as informações do orçamento
              </DialogDescription>
            </DialogHeader>
            {selectedOrcamento && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const observacoes = String(formData.get('observacoes') || '');
                  try {
                    await api.quotes.updateObservacoes(selectedOrcamento._id, observacoes);
                    toast.success('Orçamento atualizado com sucesso!');
                    await loadOrcamentos();
                    setIsEditModalOpen(false);
                  } catch (err: any) {
                    toast.error(err?.message || 'Erro ao atualizar orçamento');
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="observacoes" className="text-gray-400 uppercase text-sm tracking-wide">
                    Notas Internas
                  </Label>
                  <Textarea
                    id="observacoes"
                    name="observacoes"
                    defaultValue={selectedOrcamento.observacoes || ''}
                    rows={4}
                    className="mt-2 rounded-xl text-white"
                    style={{
                      backgroundColor: '#0D1528',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                    className="rounded-xl text-white hover:bg-[#0D1528]"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-xl"
                    style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
                  >
                    Salvar
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
