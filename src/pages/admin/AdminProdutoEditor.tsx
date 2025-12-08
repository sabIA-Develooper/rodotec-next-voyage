import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '@/services/api';
import type { Product, Category, ProductSpecifications } from '@/types/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
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
        // Garantir que especificacoes seja um objeto (pode vir como string do backend)
        let specsObj: ProductSpecifications = {};
        if (typeof product.especificacoes === 'string') {
          try {
            specsObj = JSON.parse(product.especificacoes);
          } catch (e) {
            console.error('Erro ao fazer parse de especificacoes:', e);
          }
        } else {
          specsObj = product.especificacoes;
        }

        const specsArray = Object.entries(specsObj)
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
          <p style={{ color: '#94A3B8' }}>Carregando...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-16">
        <div className="flex items-center gap-4">
          <Link to="/admin/produtos">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#0D1528] rounded-xl"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              {isEditing ? 'Editar produto' : 'Novo produto'}
            </h1>
            <p className="text-lg mt-2" style={{ color: '#94A3B8' }}>
              {isEditing ? 'Atualize as informações do produto' : 'Adicione um novo produto ao catálogo'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleDiscard}
              className="rounded-xl text-white hover:bg-[#0D1528]"
              style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <X className="h-4 w-4 mr-2" />
              Descartar
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl px-6 py-3 font-semibold"
              style={{ backgroundColor: '#3B4BA8', color: '#FFFFFF' }}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            <div
              className="rounded-3xl border p-8"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Informações básicas</h2>
                <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
                  Configure os dados principais do produto
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="nome" className="text-gray-400 uppercase text-sm tracking-wide">
                    Nome do Produto *
                  </Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Nome do produto"
                    className="mt-2 text-white rounded-xl"
                    style={{
                      backgroundColor: '#0D1528',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="descricao" className="text-gray-400 uppercase text-sm tracking-wide">
                    Descrição *
                  </Label>
                  <div className="mt-2">
                    <RichTextEditor
                      content={formData.descricao}
                      onChange={(content) => {
                        console.log('📝 HTML gerado pelo editor:', content);
                        setFormData({ ...formData, descricao: content });
                      }}
                      placeholder="Descrição completa do produto com formatação rica..."
                      darkMode={true}
                    />
                  </div>
                  <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
                    Use a barra de ferramentas para formatar o texto, adicionar links e imagens
                  </p>

                  {/* DEBUG: Mostra o HTML gerado */}
                  {formData.descricao && (
                    <details className="mt-4 p-4 rounded-xl" style={{ backgroundColor: '#0D1528', borderColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid' }}>
                      <summary className="cursor-pointer text-sm font-medium text-[#3B4BA8] hover:text-[#4C5EBF]">
                        🔍 Ver HTML gerado (debug)
                      </summary>
                      <pre className="mt-2 text-xs text-white overflow-x-auto p-2 rounded" style={{ backgroundColor: '#020617' }}>
                        {formData.descricao}
                      </pre>
                    </details>
                  )}
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
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Mídia</h2>
                <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
                  Adicione imagens do produto
                </p>
              </div>
              <div>
                <div
                  className="border-2 border-dashed rounded-xl p-8 text-center transition-colors hover:border-[#3B4BA8] cursor-pointer"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <Label htmlFor="product-images" className="cursor-pointer">
                    <span className="text-sm font-medium text-white">Clique para adicionar imagens</span>
                    <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
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
                  <div className="mt-6">
                    <Label className="text-sm mb-2 block text-gray-400 uppercase tracking-wide">
                      Imagens atuais
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {existingImages.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`${formData.nome} - Imagem ${idx + 1}`}
                            className="aspect-square w-full object-cover rounded-xl border"
                            style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(idx)}
                            className="absolute top-2 right-2 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            aria-label="Remover imagem"
                          >
                            <X className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Novas imagens */}
                {selectedImages.length > 0 && (
                  <div className="mt-6">
                    <Label className="text-sm mb-2 block text-gray-400 uppercase tracking-wide">
                      Novas imagens (serão enviadas ao salvar)
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {selectedImages.map((file, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Nova imagem ${idx + 1}`}
                            className="aspect-square w-full object-cover rounded-xl border"
                            style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            aria-label="Remover imagem"
                          >
                            <X className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className="rounded-3xl border p-8"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Especificações técnicas</h2>
                <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
                  Adicione detalhes técnicos do produto
                </p>
              </div>
              <div className="space-y-4">
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      placeholder="Nome"
                      value={spec.key}
                      onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                      className="text-white rounded-xl"
                      style={{
                        backgroundColor: '#0D1528',
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                    />
                    <Input
                      placeholder="Valor"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                      className="text-white rounded-xl"
                      style={{
                        backgroundColor: '#0D1528',
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSpec(idx)}
                      aria-label="Remover especificação"
                      className="text-red-400 hover:bg-[#0D1528] hover:text-red-300 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={handleAddSpec}
                  className="rounded-xl text-white hover:bg-[#0D1528]"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar especificação
                </Button>
              </div>
            </div>

            <div
              className="rounded-3xl border p-8"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Tags</h2>
                <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
                  Palavras-chave para facilitar a busca
                </p>
              </div>
              <div>
                <Label htmlFor="tags" className="text-gray-400 uppercase text-sm tracking-wide">
                  Tags (separadas por vírgula)
                </Label>
                <Input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="eletrônico, notebook, trabalho"
                  className="mt-2 text-white rounded-xl"
                  style={{
                    backgroundColor: '#0D1528',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
                <p className="text-xs mt-2" style={{ color: '#94A3B8' }}>
                  Use vírgulas para separar as tags
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div
              className="rounded-3xl border p-8"
              style={{
                backgroundColor: '#0B1220',
                borderColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Status</h2>
                <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
                  Defina a visibilidade do produto
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ativo" className="text-gray-400 uppercase text-sm tracking-wide">
                    Ativo
                  </Label>
                  <Select
                    value={String(formData.ativo)}
                    onValueChange={(value) => setFormData({ ...formData, ativo: value === 'true' })}
                  >
                    <SelectTrigger
                      id="ativo"
                      className="mt-2 text-white rounded-xl"
                      style={{
                        backgroundColor: '#0D1528',
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <SelectItem value="false" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                        Inativo
                      </SelectItem>
                      <SelectItem value="true" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                        Ativo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="destaque" className="text-gray-400 uppercase text-sm tracking-wide">
                    Destaque
                  </Label>
                  <Select
                    value={String(formData.destaque)}
                    onValueChange={(value) =>
                      setFormData({ ...formData, destaque: value === 'true' })
                    }
                  >
                    <SelectTrigger
                      id="destaque"
                      className="mt-2 text-white rounded-xl"
                      style={{
                        backgroundColor: '#0D1528',
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <SelectItem value="false" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                        Não
                      </SelectItem>
                      <SelectItem value="true" className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]">
                        Sim
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={
                      formData.ativo
                        ? { color: '#FFFFFF', backgroundColor: '#3B4BA8' }
                        : { color: '#94A3B8', backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                    }
                  >
                    {formData.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                  {formData.destaque && (
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ color: '#FFFFFF', backgroundColor: '#3B4BA8' }}
                    >
                      Destaque
                    </span>
                  )}
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
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Organização</h2>
                <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>
                  Classifique o produto
                </p>
              </div>
              <div>
                <Label htmlFor="categoria" className="text-gray-400 uppercase text-sm tracking-wide">
                  Categoria *
                </Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                >
                  <SelectTrigger
                    id="categoria"
                    className="mt-2 text-white rounded-xl"
                    style={{
                      backgroundColor: '#0D1528',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: '#0B1220', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat._id}
                        value={cat._id}
                        className="text-white hover:bg-[#0D1528] focus:bg-[#0D1528]"
                      >
                        {cat.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
