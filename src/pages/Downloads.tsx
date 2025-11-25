import { useState } from 'react';
import { Search, FileText, Download, Eye } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { NewFooter } from '@/components/NewFooter';
import { NewSideNav } from '@/components/NewSideNav';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Downloads() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('recente');

  const downloads = [
    {
      id: 1,
      name: 'Catálogo Geral Rodotec 2024',
      category: 'catalogos',
      description: 'Catálogo completo com todos os produtos Rodotec',
      format: 'PDF',
      size: '12.5 MB',
      date: '2024-03-01',
    },
    {
      id: 2,
      name: 'Ficha Técnica - Carroceria Plataforma',
      category: 'fichas-tecnicas',
      description: 'Especificações técnicas detalhadas',
      format: 'PDF',
      size: '2.1 MB',
      date: '2024-02-28',
    },
    {
      id: 3,
      name: 'Manual de Operação - Reboque Tanque',
      category: 'manuais',
      description: 'Manual completo de operação e manutenção',
      format: 'PDF',
      size: '8.3 MB',
      date: '2024-02-25',
    },
    {
      id: 4,
      name: 'Certificado ISO 9001:2015',
      category: 'certificacoes',
      description: 'Certificação de gestão da qualidade',
      format: 'PDF',
      size: '1.2 MB',
      date: '2024-02-20',
    },
    {
      id: 5,
      name: 'Imagens Técnicas - Implementos',
      category: 'imagens',
      description: 'Pacote de imagens em alta resolução',
      format: 'ZIP',
      size: '45.8 MB',
      date: '2024-02-15',
    },
    {
      id: 6,
      name: 'Ficha Técnica - Reboque Sider',
      category: 'fichas-tecnicas',
      description: 'Especificações e dimensões',
      format: 'PDF',
      size: '1.8 MB',
      date: '2024-02-10',
    },
  ];

  const categories = [
    { value: 'todos', label: 'Todos' },
    { value: 'catalogos', label: 'Catálogos' },
    { value: 'fichas-tecnicas', label: 'Fichas Técnicas' },
    { value: 'manuais', label: 'Manuais' },
    { value: 'certificacoes', label: 'Certificações' },
    { value: 'imagens', label: 'Imagens' },
  ];

  const filteredDownloads = downloads
    .filter((item) => {
      const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'recente') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-background pt-20">
      <Navbar />
      <NewSideNav />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Centro de Downloads
            </h1>
            <p className="text-xl text-muted-foreground">
              Acesse catálogos, manuais, fichas técnicas e certificações da Rodotec.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar arquivos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recente">Mais recente</SelectItem>
                <SelectItem value="nome">Nome (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto">
                {categories.map((cat) => (
                  <TabsTrigger key={cat.value} value={cat.value} className="text-xs md:text-sm">
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Downloads List */}
      <section className="py-12 container mx-auto px-4">
        {filteredDownloads.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum arquivo encontrado.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDownloads.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                        <Badge variant="outline">{item.format}</Badge>
                        <span>{item.size}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato com nossa equipe para solicitar documentos específicos ou esclarecer dúvidas.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Falar com Suporte
          </Button>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}
