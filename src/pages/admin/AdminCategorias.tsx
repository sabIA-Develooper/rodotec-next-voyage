import { useEffect, useState } from 'react';
import api from '@/services/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Category } from '@/types/api';

export default function AdminCategorias() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await api.categories.list({ limit: 1000 });
      setCategories(res.dados || []);
    } catch (e) {
      console.error('Erro ao carregar categorias:', e);
      toast.error('Erro ao carregar categorias');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({ nome: '', descricao: '' });
    setSelectedImage(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      nome: category.nome,
      descricao: category.descricao || '',
    });
    setSelectedImage(null);
    setImagePreview(category.imagemUrl || null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim()) {
      toast.error('O nome da categoria é obrigatório');
      return;
    }

    setSaving(true);

    try {
      const fd = new FormData();
      fd.append('nome', formData.nome);
      if (formData.descricao) {
        fd.append('descricao', formData.descricao);
      }
      if (selectedImage) {
        fd.append('imagem', selectedImage);
      }

      if (editingCategory) {
        await api.categories.update(editingCategory._id, fd);
        toast.success('Categoria atualizada com sucesso');
      } else {
        await api.categories.create(fd);
        toast.success('Categoria criada com sucesso');
      }

      setIsModalOpen(false);
      loadCategories();
    } catch (error: any) {
      console.error('Erro ao salvar categoria:', error);
      toast.error(error?.message || 'Erro ao salvar categoria');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir a categoria "${nome}"?`)) {
      return;
    }

    try {
      await api.categories.delete(id);
      toast.success('Categoria excluída com sucesso');
      loadCategories();
    } catch (error: any) {
      console.error('Erro ao excluir categoria:', error);
      toast.error(error?.message || 'Erro ao excluir categoria');
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir a imagem desta categoria?')) {
      return;
    }

    try {
      await api.categories.deleteImage(id);
      toast.success('Imagem excluída com sucesso');
      loadCategories();
    } catch (error: any) {
      console.error('Erro ao excluir imagem:', error);
      toast.error(error?.message || 'Erro ao excluir imagem');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight">Categorias</h1>
            <p className="text-lg mt-2" style={{ color: '#94A3B8' }}>
              Gerencie as categorias dos produtos
            </p>
          </div>
          <Button
            onClick={openCreateModal}
            className="rounded-xl px-6 py-3 font-semibold"
            style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar categoria
          </Button>
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
              {categories.length} categoria(s) encontrada(s)
            </h2>

            {loading ? (
              <p className="text-center py-12" style={{ color: '#94A3B8' }}>
                Carregando...
              </p>
            ) : categories.length === 0 ? (
              <p className="text-center py-12" style={{ color: '#94A3B8' }}>
                Nenhuma categoria encontrada
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: 'rgba(255, 255, 255, 0.05)', backgroundColor: 'transparent' }}>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Imagem</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Nome</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Descrição</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Status</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Total Produtos</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide">Criado</TableHead>
                      <TableHead className="text-gray-400 uppercase text-xs tracking-wide text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow
                        key={category._id}
                        style={{ borderColor: 'rgba(255, 255, 255, 0.05)', backgroundColor: 'transparent' }}
                        className="hover:bg-[#0D1528]"
                      >
                        <TableCell style={{ backgroundColor: 'transparent' }}>
                          {category.imagemUrl ? (
                            <img
                              src={category.imagemUrl}
                              alt={category.nome}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div
                              className="w-16 h-16 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: '#0D1528' }}
                            >
                              <ImageIcon className="h-6 w-6 text-gray-500" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-semibold text-white" style={{ backgroundColor: 'transparent' }}>{category.nome}</TableCell>
                        <TableCell className="max-w-xs truncate" style={{ color: '#94A3B8', backgroundColor: 'transparent' }}>
                          {category.descricao || '—'}
                        </TableCell>
                        <TableCell style={{ backgroundColor: 'transparent' }}>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={
                              category.ativa
                                ? { color: '#FFFFFF', backgroundColor: '#3B4BA8' }
                                : { color: '#94A3B8', backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                            }
                          >
                            {category.ativa ? 'Ativa' : 'Inativa'}
                          </span>
                        </TableCell>
                        <TableCell className="text-white" style={{ backgroundColor: 'transparent' }}>{category.totalProdutos || 0}</TableCell>
                        <TableCell className="text-sm" style={{ color: '#94A3B8', backgroundColor: 'transparent' }}>
                          {formatDistanceToNow(new Date(category.createdAt), {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </TableCell>
                        <TableCell className="text-right" style={{ backgroundColor: 'transparent' }}>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditModal(category)}
                              className="text-white hover:bg-[#0D1528]"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {category.imagemUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteImage(category._id)}
                                className="text-orange-400 hover:bg-[#0D1528] hover:text-orange-300"
                              >
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(category._id, category.nome)}
                              className="text-red-400 hover:bg-[#0D1528] hover:text-red-300"
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

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent
            className="max-w-2xl"
            style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <DialogHeader>
              <DialogTitle className="text-white text-2xl font-bold">
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </DialogTitle>
              <DialogDescription style={{ color: '#94A3B8' }}>
                {editingCategory
                  ? 'Atualize as informações da categoria'
                  : 'Preencha os dados para criar uma nova categoria'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-gray-400 uppercase text-sm tracking-wide">
                  Nome *
                </Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Nome da categoria"
                  required
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao" className="text-gray-400 uppercase text-sm tracking-wide">
                  Descrição
                </Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descrição da categoria"
                  rows={3}
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imagem" className="text-gray-400 uppercase text-sm tracking-wide">
                  Imagem
                </Label>
                <Input
                  id="imagem"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
                <p className="text-xs" style={{ color: '#94A3B8' }}>
                  Formatos aceitos: JPG, PNG, GIF. Máximo 5MB
                </p>
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                      style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                    />
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl text-white hover:bg-[#0D1528]"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl"
                  style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
                >
                  {saving ? 'Salvando...' : editingCategory ? 'Atualizar' : 'Criar'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
