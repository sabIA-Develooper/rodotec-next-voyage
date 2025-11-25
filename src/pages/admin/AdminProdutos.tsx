import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '@/services/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Image as ImageIcon, Grid3x3, List } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';
import type { Product, Category } from '@/types/api';

export default function AdminProdutos() {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [categoryId, setCategoryId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [sort, setSort] = useState<string>('created_desc');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    const createdId = (location.state as any)?.createdId;
    if (createdId) {
      const created = products.find((p) => p._id === createdId);
      if (created) {
        import('sonner').then(({ toast }) => toast.success('Produto criado com sucesso'));
      }
    }
  }, [location.state, products]);

  const loadProducts = async () => {
    try {
      const res = await api.products.list({ limit: 1000 });
      setProducts(res.dados || []);
    } catch (e) {
      console.error('Erro ao carregar produtos:', e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await api.categories.list({ limit: 100 });
      setCategories(res.dados || []);
    } catch (e) {
      console.error('Erro ao carregar categorias:', e);
      setCategories([]);
    }
  };

  const handleDeleteProduct = async (id: string, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir o produto "${nome}"?`)) {
      return;
    }

    try {
      await api.products.delete(id);
      toast.success('Produto excluído com sucesso');
      loadProducts();
    } catch (error: any) {
      console.error('Erro ao excluir produto:', error);
      toast.error(error?.message || 'Erro ao excluir produto');
    }
  };

  const filteredProducts = useMemo(() => {
    let list = products.slice();
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter((p) => p.nome.toLowerCase().includes(s));
    }
    if (categoryId && categoryId !== 'all') {
      list = list.filter((p) => p.categoria?._id === categoryId);
    }
    if (status && status !== 'all') {
      list = list.filter((p) => (p.ativo ? 'ativo' : 'inativo') === status);
    }
    switch (sort) {
      case 'name_asc':
        list.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'created_asc':
        list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        break;
      case 'created_desc':
      default:
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
    }
    return list;
  }, [products, search, categoryId, status, sort]);

  const perPage = view === 'grid' ? 12 : 20;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pagedProducts = filteredProducts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const createdId = (location.state as any)?.createdId as string | undefined;

  return (
    <AdminLayout>
      <div className="space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight">Produtos</h1>
            <p className="text-lg mt-2" style={{ color: '#94A3B8' }}>
              Gerencie seu catálogo de produtos
            </p>
          </div>
          <Link to="/admin/produtos/novo">
            <Button
              className="rounded-xl px-6 py-3 font-semibold"
              style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar produto
            </Button>
          </Link>
        </div>

        {/* Filtros */}
        <div
          className="rounded-3xl border p-6"
          style={{
            backgroundColor: '#0B1220',
            borderColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 text-white placeholder:text-gray-400 rounded-xl h-11"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              </div>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger
                  className="text-white rounded-xl h-11"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <SelectItem value="all" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                    Todas
                  </SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c._id} value={c._id} className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                      {c.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger
                  className="text-white rounded-xl h-11"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <SelectItem value="all" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                    Todos
                  </SelectItem>
                  <SelectItem value="ativo" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                    Ativo
                  </SelectItem>
                  <SelectItem value="inativo" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                    Inativo
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger
                  className="text-white rounded-xl h-11 w-48"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <SelectItem value="created_desc" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                    Mais recentes
                  </SelectItem>
                  <SelectItem value="created_asc" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                    Mais antigos
                  </SelectItem>
                  <SelectItem value="name_asc" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                    Nome (A→Z)
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button
                  variant={view === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('list')}
                  className={`rounded-xl ${
                    view === 'list'
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#0D1528]'
                  }`}
                  style={
                    view === 'list'
                      ? { backgroundColor: '#3B4BA8' }
                      : { backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.05)' }
                  }
                >
                  <List className="h-4 w-4 mr-2" />
                  Lista
                </Button>
                <Button
                  variant={view === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('grid')}
                  className={`rounded-xl ${
                    view === 'grid'
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#0D1528]'
                  }`}
                  style={
                    view === 'grid'
                      ? { backgroundColor: '#3B4BA8' }
                      : { backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.05)' }
                  }
                >
                  <Grid3x3 className="h-4 w-4 mr-2" />
                  Grid
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div
          className="rounded-3xl border overflow-hidden"
          style={{
            backgroundColor: '#0B1220',
            borderColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              {filteredProducts.length} produto(s) encontrado(s)
            </h2>

            {loading ? (
              <p className="text-center py-12" style={{ color: '#94A3B8' }}>
                Carregando...
              </p>
            ) : pagedProducts.length === 0 ? (
              <p className="text-center py-12" style={{ color: '#94A3B8' }}>
                Nenhum produto encontrado
              </p>
            ) : view === 'list' ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: 'rgba(255, 255, 255, 0.05)', backgroundColor: 'transparent' }}>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Imagem</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Título</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Status</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Criado</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagedProducts.map((product) => {
                      const imgUrl = typeof product.imagemPrincipal === 'string'
                        ? product.imagemPrincipal
                        : product.imagemPrincipal?.url ||
                          (product.imagensUrls?.[0]
                            ? (typeof product.imagensUrls[0] === 'string'
                              ? product.imagensUrls[0]
                              : product.imagensUrls[0].url || product.imagensUrls[0])
                            : null);

                      return (
                        <TableRow
                          key={product._id}
                          style={{ borderColor: 'rgba(255, 255, 255, 0.05)', backgroundColor: 'transparent' }}
                          className={`hover:bg-[#0D1528] ${
                            createdId === product._id ? 'ring-2 ring-[#3B4BA8]' : ''
                          }`}
                        >
                          <TableCell style={{ backgroundColor: 'transparent' }}>
                            {imgUrl ? (
                              <img
                                src={imgUrl}
                                alt={product.nome}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            ) : (
                              <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: '#0D1528' }}
                              >
                                <ImageIcon className="h-5 w-5 text-gray-500" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell style={{ backgroundColor: 'transparent' }}>
                            <Link
                              to={`/admin/produtos/${product._id}`}
                              className="font-medium text-white hover:underline"
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
                            {formatDistanceToNow(new Date(product.createdAt), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </TableCell>
                          <TableCell className="text-right" style={{ backgroundColor: 'transparent' }}>
                            <div className="flex items-center justify-end gap-2">
                              <Link to={`/admin/produtos/${product._id}`}>
                                <Button variant="ghost" size="sm" className="text-white hover:bg-[#0D1528]">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProduct(product._id, product.nome)}
                                className="text-red-400 hover:bg-[#0D1528] hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pagedProducts.map((product) => {
                  const imgUrl = typeof product.imagemPrincipal === 'string'
                    ? product.imagemPrincipal
                    : product.imagemPrincipal?.url ||
                      (product.imagensUrls?.[0]
                        ? (typeof product.imagensUrls[0] === 'string'
                          ? product.imagensUrls[0]
                          : product.imagensUrls[0].url || product.imagensUrls[0])
                        : null);

                  return (
                    <div
                      key={product._id}
                      className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                        createdId === product._id ? 'ring-2 ring-[#3B4BA8]' : ''
                      }`}
                      style={{
                        backgroundColor: '#0D1528',
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <div className="aspect-video w-full overflow-hidden" style={{ backgroundColor: '#020617' }}>
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={product.nome}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ color: '#94A3B8' }}>
                            <div className="text-center">
                              <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                              <p className="text-sm">Sem imagem</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <Link
                          to={`/admin/produtos/${product._id}`}
                          className="font-semibold text-white hover:underline block"
                        >
                          {product.nome}
                        </Link>
                        <div className="flex items-center justify-between">
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
                          <span className="text-xs" style={{ color: '#94A3B8' }}>
                            {formatDistanceToNow(new Date(product.createdAt), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Link to={`/admin/produtos/${product._id}`} className="flex-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full rounded-xl text-white hover:bg-[#0D1528]"
                              style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product._id, product.nome)}
                            className="text-red-400 hover:bg-[#0D1528] hover:text-red-300 rounded-xl"
                            style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div
              className="p-6 border-t flex justify-center"
              style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(Math.max(1, currentPage - 1));
                      }}
                      className="text-white hover:bg-[#0D1528] rounded-xl"
                      style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                    const p = idx + 1;
                    return (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={p === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(p);
                          }}
                          className={`rounded-xl ${
                            p === currentPage
                              ? 'text-white'
                              : 'text-gray-400 hover:text-white hover:bg-[#0D1528]'
                          }`}
                          style={
                            p === currentPage
                              ? { backgroundColor: '#3B4BA8' }
                              : { borderColor: 'rgba(255, 255, 255, 0.05)' }
                          }
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(Math.min(totalPages, currentPage + 1));
                      }}
                      className="text-white hover:bg-[#0D1528] rounded-xl"
                      style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
