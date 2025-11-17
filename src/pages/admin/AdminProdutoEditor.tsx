import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '@/services/api';
import type { Product, Category, ProductSpecifications } from '@/types/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Save, X, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  nome: string;
  descricao: string;
  categoria: string;
  estoque: number;
  sku: string;
  ativo: boolean;
  destaque: boolean;
  tags: string[];
  especificacoes?: ProductSpecifications;
}

export default function AdminProdutoEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: '',
    categoria: '',
    estoque: 0,
    sku: '',
    ativo: false,
    destaque: false,
    tags: [],
    especificacoes: {},
  });

  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([]);
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    loadCategories();
    if (isEditing && id) {
      loadProduct();
    } else {
      setLoading(false);
    }
  }, [id, isEditing]);

  const loadCategories = async () => {
    try {
      const res = await api.categories.list({ limit: 100 });
      setCategories(res.dados || []);
    } catch (e) {
      console.error('Erro ao carregar categorias:', e);
      toast.error('Erro ao carregar categorias');
    }
  };

  const loadProduct = async () => {
    if (!id) return;
    try {
      const product = await api.products.get(id);
      setFormData({
        nome: product.nome,
        descricao: product.descricao,
        categoria: product.categoria?._id || '',
        estoque: product.estoque,
        sku: product.sku,
        ativo: product.ativo,
        destaque: product.destaque,
        tags: product.tags || [],
        especificacoes: product.especificacoes,
      });

      // Carregar imagens existentes
      if (product.imagensUrls) {
        setExistingImages(product.imagensUrls);
      }

      // Converter especificações para array
      if (product.especificacoes) {
        const specsArray = Object.entries(product.especificacoes)
          .filter(([key]) => key !== 'peso' && key !== 'dimensoes')
          .map(([key, value]) => ({
            key,
            value: String(value),
          }));
        setSpecs(specsArray);
      }

      // Converter tags para string
      if (product.tags && product.tags.length > 0) {
        setTagsInput(product.tags.join(', '));
      }

      setLoading(false);
    } catch (error: any) {
      console.error('Error loading product:', error);
      toast.error(error.message || 'Produto não encontrado');
      navigate('/admin/produtos');
    }
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const maxFiles = 5;
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB

    const currentCount = selectedImages.length + existingImages.length;
    if (currentCount + files.length > maxFiles) {
      toast.error(`Máximo de ${maxFiles} imagens por produto`);
      return;
    }

    const newFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        toast.error(`Arquivo não suportado: ${file.name}`);
        continue;
      }
      if (file.size > maxSizeBytes) {
        toast.error(`Imagem muito grande (${file.name}). Máximo 5MB`);
        continue;
      }
      newFiles.push(file);
    }

    if (newFiles.length > 0) {
      setSelectedImages([...selectedImages, ...newFiles]);
      toast.success(`${newFiles.length} imagem(ns) adicionada(s)`);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleSave = async () => {
    // Validações
    if (!formData.nome?.trim() || formData.nome.length < 3) {
      toast.error('O nome do produto deve ter pelo menos 3 caracteres');
      return;
    }
    if (!formData.descricao?.trim() || formData.descricao.length < 10) {
      toast.error('A descrição deve ter pelo menos 10 caracteres');
      return;
    }
    if (!formData.categoria) {
      toast.error('Selecione uma categoria');
      return;
    }
    if (!formData.sku?.trim()) {
      toast.error('Informe o SKU do produto');
      return;
    }
    if (formData.ativo && selectedImages.length === 0 && existingImages.length === 0) {
      toast.error('Adicione ao menos uma imagem para ativar o produto');
      return;
    }

    setSaving(true);

    try {
      // Preparar FormData
      const fd = new FormData();
      fd.append('nome', formData.nome);
      fd.append('descricao', formData.descricao);
      fd.append('categoria', formData.categoria);
      fd.append('estoque', String(formData.estoque));
      fd.append('sku', formData.sku);
      fd.append('ativo', String(formData.ativo));
      fd.append('destaque', String(formData.destaque));

      // Adicionar imagens
      selectedImages.forEach((file) => {
        fd.append('imagens', file);
      });

      // Converter especificações para objeto
      const especificacoes: ProductSpecifications = {};
      specs.forEach((spec) => {
        if (spec.key.trim()) {
          especificacoes[spec.key.trim()] = spec.value.trim();
        }
      });
      fd.append('especificacoes', JSON.stringify(especificacoes));

      // Converter tags
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);
      fd.append('tags', JSON.stringify(tags));

      if (isEditing && id) {
        await api.products.update(id, fd);
        toast.success('Produto atualizado com sucesso');
        navigate('/admin/produtos');
      } else {
        const created = await api.products.create(fd);
        toast.success('Produto criado com sucesso');
        navigate('/admin/produtos', { state: { createdId: created._id } });
      }
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast.error(error.message || 'Erro ao salvar produto');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (confirm('Descartar alterações?')) {
      navigate('/admin/produtos');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/produtos">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {isEditing ? 'Editar produto' : 'Novo produto'}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDiscard}>
              <X className="h-4 w-4 mr-2" />
              Descartar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome do Produto *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição *</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder="Descrição completa do produto"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mídia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Label htmlFor="product-images" className="cursor-pointer">
                    <span className="text-sm font-medium">Clique para adicionar imagens</span>
                    <p className="text-xs text-muted-foreground mt-2">
                      Até 5 imagens, máximo 5 MB cada (JPG, PNG, GIF)
                    </p>
                  </Label>
                  <input
                    id="product-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFilesSelected(e.target.files)}
                    className="hidden"
                  />
                </div>

                {/* Imagens existentes */}
                {existingImages.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-sm text-muted-foreground mb-2 block">
                      Imagens atuais
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {existingImages.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`${formData.nome} - Imagem ${idx + 1}`}
                            className="aspect-square w-full object-cover rounded-md border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(idx)}
                            className="absolute top-2 right-2 bg-background/90 border rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remover imagem"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Novas imagens */}
                {selectedImages.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-sm text-muted-foreground mb-2 block">
                      Novas imagens (serão enviadas ao salvar)
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {selectedImages.map((file, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Nova imagem ${idx + 1}`}
                            className="aspect-square w-full object-cover rounded-md border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 bg-background/90 border rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remover imagem"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Especificações técnicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      placeholder="Nome"
                      value={spec.key}
                      onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    />
                    <Input
                      placeholder="Valor"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSpec(idx)}
                      aria-label="Remover especificação"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={handleAddSpec}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar especificação
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="eletrônico, notebook, trabalho"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use vírgulas para separar as tags
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ativo">Ativo</Label>
                  <Select
                    value={String(formData.ativo)}
                    onValueChange={(value) => setFormData({ ...formData, ativo: value === 'true' })}
                  >
                    <SelectTrigger id="ativo">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Inativo</SelectItem>
                      <SelectItem value="true">Ativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="destaque">Destaque</Label>
                  <Select
                    value={String(formData.destaque)}
                    onValueChange={(value) =>
                      setFormData({ ...formData, destaque: value === 'true' })
                    }
                  >
                    <SelectTrigger id="destaque">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Não</SelectItem>
                      <SelectItem value="true">Sim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Badge variant={formData.ativo ? 'default' : 'secondary'}>
                    {formData.ativo ? 'Ativo' : 'Inativo'}
                  </Badge>
                  {formData.destaque && (
                    <Badge variant="default" className="ml-2">
                      Destaque
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                  >
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estoque e SKU</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="SKU-000"
                  />
                </div>
                <div>
                  <Label htmlFor="estoque">Estoque *</Label>
                  <Input
                    id="estoque"
                    type="number"
                    value={formData.estoque}
                    onChange={(e) =>
                      setFormData({ ...formData, estoque: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
