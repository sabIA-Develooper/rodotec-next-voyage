import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '@/services/api';
import type { QuoteRequest } from '@/types/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  Save,
  ExternalLink,
  Mail,
  Phone,
  Building,
  Package,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusLabels: Record<string, string> = {
  novo: 'Novo',
  em_contato: 'Em Contato',
  concluido: 'Concluído',
};

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  novo: 'default',
  em_contato: 'secondary',
  concluido: 'outline',
};

export default function AdminOrcamentoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [quote, setQuote] = useState<QuoteRequest | null>(null);

  const [status, setStatus] = useState<'novo' | 'em_contato' | 'concluido'>('novo');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    loadQuote();
  }, [id]);

  const loadQuote = async () => {
    if (!id) return;

    try {
      const data = await api.quotes.get(id);
      setQuote(data);
      setStatus(data.status);
      setObservacoes(data.observacoes || '');
      setLoading(false);
    } catch (error: any) {
      console.error('Error loading quote:', error);
      toast.error('Erro ao carregar orçamento');
      navigate('/admin/orcamentos');
    }
  };

  const handleSave = async () => {
    if (!id) return;

    setSaving(true);

    try {
      // Atualizar status
      await api.quotes.updateStatus(id, status);

      // Atualizar observações
      if (observacoes !== (quote?.observacoes || '')) {
        await api.quotes.updateObservacoes(id, observacoes);
      }

      toast.success('Orçamento atualizado com sucesso');
      loadQuote();
    } catch (error: any) {
      console.error('Error saving quote:', error);
      toast.error(error.message || 'Erro ao salvar orçamento');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <p style={{ color: '#94A3B8' }}>Carregando...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!quote) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <p style={{ color: '#94A3B8' }}>Orçamento não encontrado</p>
        </div>
      </AdminLayout>
    );
  }

  const hasChanges =
    status !== quote.status || observacoes !== (quote.observacoes || '');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/orcamentos">
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#0D1528] rounded-xl">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Orçamento #{quote._id.slice(-6)}</h1>
            <p className="text-sm" style={{ color: '#94A3B8' }}>
              Criado em {format(new Date(quote.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="rounded-xl"
            style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className="rounded-3xl border p-8"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Informações do contato</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-1 text-gray-400">
                      <FileText className="h-4 w-4" />
                      Nome
                    </div>
                    <p className="text-white">{quote.nome}</p>
                  </div>
                  {quote.empresa && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium mb-1 text-gray-400">
                        <Building className="h-4 w-4" />
                        Empresa
                      </div>
                      <p className="text-white">{quote.empresa}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-1 text-gray-400">
                      <Mail className="h-4 w-4" />
                      E-mail
                    </div>
                    <a href={`mailto:${quote.email}`} className="hover:underline" style={{ color: '#3B4BA8' }}>
                      {quote.email}
                    </a>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-1 text-gray-400">
                      <Phone className="h-4 w-4" />
                      Telefone
                    </div>
                    <a href={`tel:${quote.telefone}`} className="hover:underline" style={{ color: '#3B4BA8' }}>
                      {quote.telefone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-3xl border p-8"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Produto de interesse</h2>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-400" />
                  <p className="font-medium text-white">
                    {typeof quote.produto === 'object' ? quote.produto.nome : quote.produto}
                  </p>
                  {typeof quote.produto === 'object' && quote.produto._id && (
                    <Link to={`/admin/produtos/${quote.produto._id}`} className="ml-auto">
                      <Button variant="ghost" size="sm" className="text-white hover:bg-[#0D1528]">
                        Ver produto <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  )}
                </div>
            </div>

            {quote.mensagem && (
              <div
                className="rounded-3xl border p-8"
                style={{
                  backgroundColor: '#0B1220',
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Mensagem</h2>
                <p className="whitespace-pre-wrap text-white">{quote.mensagem}</p>
              </div>
            )}

            <div
              className="rounded-3xl border p-8"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Notas internas</h2>
              <Textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Adicione observações internas sobre este orçamento..."
                rows={6}
                className="text-white rounded-xl"
                style={{
                  backgroundColor: '#0D1528',
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                }}
              />
            </div>

            <div
              className="rounded-3xl border p-8"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Timeline</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(59, 75, 168, 0.2)' }}
                    >
                      <CheckCircle className="h-4 w-4" style={{ color: '#3B4BA8' }} />
                    </div>
                    <div className="flex-1 w-0.5 mt-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-white">Orçamento criado</p>
                    <p className="text-sm" style={{ color: '#94A3B8' }}>
                      {format(new Date(quote.createdAt), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>

                {quote.updatedAt && quote.updatedAt !== quote.createdAt && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="h-8 w-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(59, 75, 168, 0.2)' }}
                      >
                        <CheckCircle className="h-4 w-4" style={{ color: '#3B4BA8' }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">Última atualização</p>
                      <p className="text-sm" style={{ color: '#94A3B8' }}>
                        {format(new Date(quote.updatedAt), "dd/MM/yyyy 'às' HH:mm", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            <div
              className="rounded-3xl border p-8"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Status</h2>
              <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                <SelectTrigger
                  className="text-white rounded-xl"
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
              <div className="mt-3">
                <Badge variant={statusColors[status]}>{statusLabels[status]}</Badge>
              </div>
            </div>

            <div
              className="rounded-3xl border p-8"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Informações adicionais</h2>
              <div className="space-y-3">
                {quote.empresa && (
                  <div>
                    <p className="text-sm font-medium text-gray-400">Empresa</p>
                    <p className="text-sm text-white">{quote.empresa}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-400">ID do Orçamento</p>
                  <p className="text-sm font-mono" style={{ color: '#94A3B8' }}>{quote._id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
