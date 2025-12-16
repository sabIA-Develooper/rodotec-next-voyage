import { ArrowRight, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function ProductsSection() {
  const products = [
    {
      title: "Poliguindastes",
      slug: "poliguindaste-rp-16",
      image: "https://images.unsplash.com/photo-1693064203616-2e78760f5df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMHRydWNrJTIwZXF1aXBtZW50JTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NjM5NTg0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Solução eficiente para coleta e transporte de caçambas estacionárias em áreas urbanas",
      bullets: [
        "Sistema hidráulico de alta performance",
        "Operação rápida e segura",
        "Descarga automatizada",
      ],
    },
    {
      title: "Carrocerias",
      slug: "carroceria-graneleira-12m",
      image: "https://images.unsplash.com/photo-1649372708980-1efce0ffb7bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHRydWNrJTIwdHJhbnNwb3J0fGVufDF8fHx8MTc2MzkzODc5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Estruturas leves e resistentes para transporte de grãos, carga geral e pallets",
      bullets: [
        "Maior capacidade de carga útil",
        "Construção em aço de alta resistência",
        "Diversos tamanhos disponíveis",
      ],
    },
    {
      title: "Caçambas Basculantes",
      slug: "cacamba-basculante-20m3",
      image: "https://images.unsplash.com/photo-1723369962510-e1bf627435e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW1wJTIwdHJ1Y2slMjBjb25zdHJ1Y3Rpb24lMjBzaXRlfGVufDF8fHx8MTc2Mzk1ODQzOXww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Ideal para transporte de agregados, terra e materiais de construção com descarga por basculamento",
      bullets: [
        "Estrutura ultra reforçada",
        "Sistema de basculamento eficiente",
        "Proteção contra corrosão",
      ],
    },
    {
      title: "Tanques",
      slug: "tanque-pipa-15000l",
      image: "https://images.unsplash.com/photo-1693064203616-2e78760f5df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF2eSUyMHRydWNrJTIwZXF1aXBtZW50JTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NjM5NTg0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Soluções especializadas para transporte de líquidos, combustíveis e projetos customizados",
      bullets: [
        "Construção em aço inox ou carbono",
        "Certificações de segurança",
        "Projetos sob medida",
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[#020617] relative overflow-hidden" id="produtos">
      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">Nossas Linhas de Produtos</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
                <span className="text-white">Implementos para </span>
                <span className="text-[#3B4BA8]">operação pesada</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Equipamentos robustos projetados para maximizar a produtividade 
                e segurança da sua frota em qualquer tipo de operação.
              </p>
            </div>
            <Link to="/produtos" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group font-medium whitespace-nowrap">
              Ver catálogo completo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Grid de Produtos - Responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative bg-[#0B1220] rounded-3xl overflow-hidden transition-all border border-white/5 hover:border-[#3B4BA8]/30 shadow-lg"
            >
              {/* Imagem */}
              <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/80 to-transparent" />
                
                {/* Título sobre a imagem */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl sm:text-3xl font-bold">{product.title}</h3>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6 lg:p-8">
                {/* Descrição */}
                <p className="text-gray-400 mb-6 leading-relaxed">{product.description}</p>

                {/* Bullets */}
                <ul className="space-y-3 mb-8">
                  {product.bullets.map((bullet, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3 text-sm">
                      <Circle className="w-1.5 h-1.5 fill-[#3B4BA8] text-[#3B4BA8] mt-1.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link 
                  to={`/produtos/${product.slug}`}
                  className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-[#3B4BA8] hover:border-[#3B4BA8] transition-all font-medium text-sm flex items-center justify-center gap-2 group/btn"
                >
                  Ver detalhes
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

