import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Circle, Search, X, Filter, SlidersHorizontal } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductCardSkeleton } from "@/components/LoadingSkeleton";
import api from "@/services/api";
import type { Product, Category } from "@/types/api";

export default function NewProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const res = await api.products.list({ ativo: true, limit: 1000 });
      setProducts(res.dados || []);
    } catch (e) {
      console.error('Erro ao carregar produtos:', e);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await api.categories.list({ ativa: true, limit: 100 });
      setCategories(res.dados || []);
    } catch (e) {
      console.error('Erro ao carregar categorias:', e);
      setCategories([]);
    }
  };

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory !== "all") {
      filtered = filtered.filter(p => p.categoria?._id === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.nome.toLowerCase().includes(query) ||
        (p.sku || '').toLowerCase().includes(query) ||
        (p.descricao || '').toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, activeCategory, searchQuery]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <>
      <SEO 
        title="Catálogo de Produtos"
        description="Conheça os implementos rodoviários da Rodotec: poliguindastes, carrocerias, caçambas basculantes, tanques e plataformas. Equipamentos desenvolvidos com tecnologia nacional e qualidade certificada."
        keywords="implementos rodoviários, poliguindaste, carroceria, caçamba basculante, tanque pipa, plataforma auto socorro, equipamentos para caminhão"
      />

      <div className="min-h-screen bg-[#020617] pt-20">
        <Navbar />
        <NewSideNav />
        <ScrollToTop />
        <WhatsAppButton />
        
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <Breadcrumbs 
            items={[{ label: "Produtos" }]}
            className="mb-8"
          />

          {/* Header */}
          <div className="mb-12 lg:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Catálogo de <span className="text-[#3B4BA8]">implementos rodoviários</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-3xl leading-relaxed">
              Conheça as soluções da Rodotec para carga, transporte e operação pesada. 
              Equipamentos desenvolvidos com tecnologia nacional e qualidade certificada.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar produtos por nome, SKU ou descrição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-[#0B1220] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B4BA8] focus:ring-2 focus:ring-[#3B4BA8]/20 transition-all"
                aria-label="Buscar produtos"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] rounded"
                  aria-label="Limpar busca"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Search Results Count */}
            {searchQuery && (
              <p className="text-gray-400 text-sm mt-3">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              </p>
            )}
          </div>

          {/* Filter Toggle (Mobile) */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-[#0B1220] text-white rounded-lg border border-white/10 hover:bg-[#0D1528] transition-all focus:outline-none focus:ring-2 focus:ring-[#3B4BA8]"
              aria-expanded={showFilters}
              aria-controls="filter-section"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
            </button>
          </div>

          {/* Filters */}
          {(showFilters || window.innerWidth >= 1024) && (
            <div 
              id="filter-section"
              className="mb-12"
              role="group"
              aria-label="Filtros de categoria"
            >
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-4 h-4 text-gray-400" aria-hidden="true" />
                <span className="text-gray-400 text-sm font-medium">Filtrar por categoria:</span>
              </div>
              <div className="flex flex-wrap gap-3 lg:gap-4">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`px-5 py-2.5 rounded-full transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#020617] ${
                    activeCategory === "all"
                      ? "bg-[#3B4BA8] text-white shadow-lg"
                      : "bg-[#0B1220] text-gray-400 hover:bg-[#0D1528] hover:text-white border border-white/5"
                  }`}
                  aria-pressed={activeCategory === "all"}
                >
                  Todas
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category._id)}
                    className={`px-5 py-2.5 rounded-full transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#020617] ${
                      activeCategory === category._id
                        ? "bg-[#3B4BA8] text-white shadow-lg"
                        : "bg-[#0B1220] text-gray-400 hover:bg-[#0D1528] hover:text-white border border-white/5"
                    }`}
                    aria-pressed={activeCategory === category._id}
                    aria-label={`Filtrar por ${category.nome}`}
                  >
                    {category.nome}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="mb-20" role="region" aria-label="Lista de produtos">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product, index) => {
                  const images = product.imagensUrls
                    ? product.imagensUrls.map((img: any) => typeof img === 'string' ? img : img.url || img)
                    : (product.imagemPrincipal
                      ? [typeof product.imagemPrincipal === 'string'
                        ? product.imagemPrincipal
                        : product.imagemPrincipal.url || product.imagemPrincipal]
                      : []);
                  
                  return (
                    <div
                      key={product._id}
                      className="group bg-[#0B1220] rounded-3xl overflow-hidden border border-white/5 hover:border-[#3B4BA8]/30 transition-all shadow-lg hover:shadow-xl"
                    >
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <ImageWithFallback
                          src={images[0] || "https://via.placeholder.com/400x300"}
                          alt={`${product.nome} - ${product.descricao || ''}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/60 to-transparent" />
                        
                        {/* Category Tag */}
                        {product.categoria && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-[#3B4BA8]/90 backdrop-blur-sm text-white text-xs font-medium rounded-full uppercase tracking-wide">
                              {product.categoria.nome}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8">
                        <h3 className="text-white text-xl lg:text-2xl font-bold mb-3">
                          {product.nome}
                        </h3>

                        {/* Description - renderiza HTML mas trunca visualmente */}
                        <div
                          className="text-gray-400 mb-6 leading-relaxed line-clamp-2
                            prose prose-sm prose-invert max-w-none
                            prose-p:text-gray-400 prose-p:my-0
                            prose-li:text-gray-400 prose-li:my-0
                            prose-strong:text-white prose-strong:font-semibold
                            [&>*]:my-0 [&>*]:leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: product.descricao || 'Implemento rodoviário de alta qualidade'
                          }}
                        />

                        {/* SKU */}
                        {product.sku && (
                          <p className="text-gray-500 text-xs mb-4 font-mono">SKU: {product.sku}</p>
                        )}

                        {/* CTA */}
                        <Link
                          to={`/produtos/${product._id}`}
                          className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-[#3B4BA8] hover:border-[#3B4BA8] transition-all font-medium text-sm flex items-center justify-center gap-2 group/btn focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#0B1220]"
                          aria-label={`Ver detalhes do ${product.nome}`}
                        >
                          Ver detalhes
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0B1220] rounded-full border border-white/10 mb-6">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Não encontramos produtos que correspondam aos seus critérios de busca. 
                  Tente ajustar os filtros ou fazer uma nova busca.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="px-6 py-3 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#020617]"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-12 text-center shadow-lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Não encontrou exatamente o que procura?
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                A Rodotec também desenvolve soluções sob medida. Fale com nossa equipe técnica 
                e peça um projeto personalizado para sua operação específica.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contato"
                  className="px-8 py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2 group shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#0B1220]"
                >
                  Falar com especialista
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
                </Link>
                <Link
                  to="/orcamento"
                  className="px-8 py-4 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-white/40 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[#0B1220]"
                >
                  Solicitar orçamento
                </Link>
              </div>
            </div>
          </div>
        </div>

        <NewFooter />
      </div>
    </>
  );
}

