import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Circle, Check, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ProductDetailSkeleton } from "@/components/LoadingSkeleton";
import api from "@/services/api";
import type { Product } from "@/types/api";

export default function NewProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const loadProduct = async () => {
    if (!slug) return;
    
    try {
      setIsLoading(true);
      const productData = await api.products.get(slug);
      setProduct(productData);
      
      // Load related products from same category
      if (productData.categoria?._id) {
        const res = await api.products.list({ 
          ativo: true, 
          categoria: productData.categoria._id,
          limit: 4 
        });
        setRelatedProducts((res.dados || []).filter(p => p._id !== productData._id).slice(0, 3));
      }
    } catch (e) {
      console.error('Erro ao carregar produto:', e);
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <NewSideNav />
        <ProductDetailSkeleton />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <NewSideNav />
        <div className="min-h-screen bg-[#020617] pt-20 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0B1220] rounded-full border border-white/10 mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Produto não encontrado</h1>
            <p className="text-gray-400 mb-6">O produto que você está procurando não existe ou foi removido.</p>
            <Link 
              to="/produtos" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#020617]"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      </>
    );
  }

  const images = product.imagensUrls
    ? product.imagensUrls.map((img: any) => typeof img === 'string' ? img : img.url || img)
    : (product.imagemPrincipal
      ? [typeof product.imagemPrincipal === 'string'
        ? product.imagemPrincipal
        : product.imagemPrincipal.url || product.imagemPrincipal]
      : []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <SEO 
        title={product.nome}
        description={product.descricao || `Conheça o ${product.nome} da Rodotec. Implemento rodoviário de alta qualidade.`}
        keywords={`${product.nome}, ${product.categoria?.nome || ''}, implementos rodoviários`}
        ogImage={images[0]}
        ogType="product"
      />

      <div className="min-h-screen bg-[#020617] pt-20">
        <Navbar />
        <NewSideNav />
        <ScrollToTop />
        
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <Breadcrumbs 
            items={[
              { label: "Produtos", path: "/produtos" },
              { label: product.categoria?.nome || "", path: product.categoria?._id ? `/produtos?categoria=${product.categoria._id}` : "/produtos" },
              { label: product.nome }
            ]}
            className="mb-8"
          />

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-24">
            {/* Images */}
            <div>
              {/* Main Image */}
              <div className="bg-[#0B1220] rounded-3xl overflow-hidden border border-white/5 mb-4 shadow-lg relative group">
                {images.length > 0 ? (
                  <>
                    <ImageWithFallback
                      src={images[currentImageIndex]}
                      alt={`${product.nome} - Imagem ${currentImageIndex + 1} de ${images.length}`}
                      className="w-full h-[400px] lg:h-[500px] object-cover"
                      loading="eager"
                    />
                    
                    {/* Image Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#020617]/80 hover:bg-[#020617] backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:opacity-100"
                          aria-label="Imagem anterior"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#020617]/80 hover:bg-[#020617] backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:opacity-100"
                          aria-label="Próxima imagem"
                        >
                          <ChevronRightIcon className="w-5 h-5" />
                        </button>

                        {/* Image Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] ${
                                currentImageIndex === index ? "bg-[#3B4BA8] w-6" : "bg-white/40"
                              }`}
                              aria-label={`Ver imagem ${index + 1}`}
                              aria-current={currentImageIndex === index}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-[400px] lg:h-[500px] bg-[#020617] flex items-center justify-center">
                    <span className="text-gray-500">Sem imagem</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-4" role="list" aria-label="Miniaturas das imagens">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-2xl overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#020617] ${
                        currentImageIndex === index
                          ? "border-[#3B4BA8] shadow-lg"
                          : "border-white/10 hover:border-white/30"
                      }`}
                      aria-label={`Ver imagem ${index + 1}`}
                      aria-pressed={currentImageIndex === index}
                      role="listitem"
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${product.nome} - Miniatura ${index + 1}`}
                        className="w-full h-24 object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {/* Category Tag */}
              {product.categoria && (
                <div className="mb-4">
                  <span className="px-4 py-2 bg-[#3B4BA8]/20 border border-[#3B4BA8]/30 text-[#3B4BA8] text-sm font-medium rounded-full uppercase tracking-wide">
                    {product.categoria.nome}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                {product.nome}
              </h1>

              {/* Description */}
              {product.descricao && (
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {product.descricao}
                </p>
              )}

              {/* SKU */}
              {product.sku && (
                <p className="text-gray-500 text-sm mb-6 font-mono">SKU: {product.sku}</p>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/orcamento"
                  state={{ productName: product.nome }}
                  className="flex-1 px-6 py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2 group shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#020617]"
                >
                  Solicitar orçamento
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
                </Link>
                <Link
                  to="/contato"
                  className="flex-1 px-6 py-4 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-white/40 transition-all font-medium text-center focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[#020617]"
                >
                  Falar com especialista
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-16 lg:mb-24">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
                Outros implementos da linha <span className="text-[#3B4BA8]">{product.categoria?.nome}</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {relatedProducts.map((relatedProduct) => {
                  const relatedImages = relatedProduct.imagensUrls
                    ? relatedProduct.imagensUrls.map((img: any) => typeof img === 'string' ? img : img.url || img)
                    : (relatedProduct.imagemPrincipal
                      ? [typeof relatedProduct.imagemPrincipal === 'string'
                        ? relatedProduct.imagemPrincipal
                        : relatedProduct.imagemPrincipal.url || relatedProduct.imagemPrincipal]
                      : []);
                  
                  return (
                    <Link
                      key={relatedProduct._id}
                      to={`/produtos/${relatedProduct._id}`}
                      className="group bg-[#0B1220] rounded-3xl overflow-hidden border border-white/5 hover:border-[#3B4BA8]/30 transition-all shadow-lg hover:shadow-xl block focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#020617]"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={relatedImages[0] || "https://via.placeholder.com/400x300"}
                          alt={relatedProduct.nome}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent" />
                      </div>
                      
                      <div className="p-6">
                        {relatedProduct.categoria && (
                          <div className="mb-3">
                            <span className="px-3 py-1 bg-[#3B4BA8]/20 text-[#3B4BA8] text-xs font-medium rounded-full">
                              {relatedProduct.categoria.nome}
                            </span>
                          </div>
                        )}
                        <h3 className="text-white text-lg font-bold mb-2">{relatedProduct.nome}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{relatedProduct.descricao || ''}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-[#0B1220] to-[#020617] border border-[#3B4BA8]/20 rounded-3xl p-8 lg:p-12 text-center shadow-lg">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Quer saber se este implemento é ideal para a sua operação?
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Fale com nossa equipe técnica e tire todas as dúvidas antes de fechar seu projeto. 
                Oferecemos consultoria especializada sem compromisso.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/orcamento"
                  state={{ productName: product.nome }}
                  className="px-8 py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2 group shadow-lg focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#020617]"
                >
                  Solicitar orçamento
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} aria-hidden="true" />
                </Link>
                <Link
                  to="/contato"
                  className="px-8 py-4 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-white/40 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[#020617]"
                >
                  Falar com especialista
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

