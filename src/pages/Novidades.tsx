import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Tag } from 'lucide-react';
import Header from '@/components/Header';
import { ImprovedFooter } from '@/components/ImprovedFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Novidades() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  const posts = [
    {
      id: 1,
      title: 'Nova Linha de Carrocerias Lançada em 2024',
      excerpt: 'Conheça nossa mais recente inovação em carrocerias para transporte de cargas pesadas.',
      category: 'produtos',
      date: '2024-03-15',
      image: '/placeholder.svg',
      slug: 'nova-linha-carrocerias-2024',
    },
    {
      id: 2,
      title: 'Rodotec na Fenatran 2024',
      excerpt: 'Estivemos presentes na maior feira de transporte da América Latina.',
      category: 'companhia',
      date: '2024-03-10',
      image: '/placeholder.svg',
      slug: 'rodotec-fenatran-2024',
    },
    {
      id: 3,
      title: 'Tendências do Mercado de Transporte Rodoviário',
      excerpt: 'Análise das principais tendências que moldam o futuro do transporte de cargas.',
      category: 'mercado',
      date: '2024-03-05',
      image: '/placeholder.svg',
      slug: 'tendencias-transporte-rodoviario',
    },
    {
      id: 4,
      title: 'Implementos Sustentáveis: O Futuro é Verde',
      excerpt: 'Como a Rodotec está investindo em processos mais sustentáveis.',
      category: 'companhia',
      date: '2024-02-28',
      image: '/placeholder.svg',
      slug: 'implementos-sustentaveis',
    },
    {
      id: 5,
      title: 'Dicas de Manutenção para Reboques',
      excerpt: 'Guia completo para manter seu reboque sempre em perfeito estado.',
      category: 'produtos',
      date: '2024-02-20',
      image: '/placeholder.svg',
      slug: 'dicas-manutencao-reboques',
    },
    {
      id: 6,
      title: 'Economia Brasileira e o Setor de Transporte',
      excerpt: 'Impactos econômicos no setor de transportes e perspectivas futuras.',
      category: 'mercado',
      date: '2024-02-15',
      image: '/placeholder.svg',
      slug: 'economia-setor-transporte',
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = activeFilter === 'todos' || post.category === activeFilter;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categoryLabels: Record<string, string> = {
    todos: 'Todos',
    produtos: 'Produtos',
    mercado: 'Mercado',
    companhia: 'Companhia',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Novidades Rodotec
            </h1>
            <p className="text-xl text-muted-foreground">
              Fique por dentro das últimas notícias, lançamentos e tendências do setor de transporte rodoviário.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar notícias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full md:w-auto">
              <TabsList className="grid w-full md:w-auto grid-cols-4">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="produtos">Produtos</TabsTrigger>
                <TabsTrigger value="mercado">Mercado</TabsTrigger>
                <TabsTrigger value="companhia">Companhia</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 container mx-auto px-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma notícia encontrada.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.id} to={`/novidades/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="uppercase text-xs">
                        {categoryLabels[post.category]}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Quer receber nossas novidades?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Fique por dentro de lançamentos, eventos e conteúdos exclusivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>

      <ImprovedFooter />
    </div>
  );
}
