import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Award, Wrench, TrendingUp, Check } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function QuemSomos() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const diferenciais = [
    {
      icon: Users,
      title: "Atendimento ágil",
      description: "Equipe dedicada para responder rapidamente às suas necessidades",
    },
    {
      icon: Award,
      title: "Equipe especializada",
      description: "Profissionais com anos de experiência em implementos rodoviários",
    },
    {
      icon: Wrench,
      title: "Projetos sob medida",
      description: "Desenvolvimento customizado para sua operação específica",
    },
    {
      icon: TrendingUp,
      title: "Qualidade e durabilidade",
      description: "Materiais de primeira linha e processos rigorosos de controle",
    },
  ];

  const valores = [
    "Mais de 12 anos de experiência no mercado",
    "Foco em qualidade, produtividade e competitividade",
    "Atuação em todo território nacional",
    "Compromisso com prazos e excelência técnica",
    "Suporte completo antes, durante e após a venda",
  ];

  return (
    <>
      <SEO 
        title="Quem Somos"
        description="Conheça a Rodotec, empresa sergipana com mais de 12 anos de experiência na fabricação de implementos rodoviários de alta qualidade. Especialistas em poliguindastes, carrocerias, caçambas e tanques."
        keywords="rodotec empresa, sobre rodotec, fábrica implementos sergipe, empresa implementos rodoviários"
      />
      
      <div className="min-h-screen bg-[#020617] pt-28">
        <Navbar />
        <NewSideNav />
        <ScrollToTop />
        
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 pt-8">
          <Breadcrumbs items={[{ label: "Quem Somos" }]} />
        </div>

        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 to-transparent" />
          
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text */}
              <div>
                <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">
                  Sobre a Rodotec
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                  Quem <span className="text-[#3B4BA8]">Somos</span>
                </h1>
                <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                  Empresa sergipana especializada em implementos rodoviários de alta performance, 
                  desenvolvendo soluções robustas para transporte, carga e operações pesadas.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Institucional */}
        <section className="py-16 sm:py-20 lg:py-28 bg-[#0B1220]/30">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text */}
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
                  Nossa <span className="text-[#3B4BA8]">trajetória</span>
                </h2>
                
                <div className="space-y-6 text-gray-400 leading-relaxed">
                  <p>
                    A <strong className="text-white">Rodotec Equipamentos Rodoviários</strong> é uma 
                    empresa brasileira com sede em Sergipe, especializada no desenvolvimento e fabricação 
                    de implementos sobre-chassi de alta qualidade. Há mais de uma década no mercado, 
                    consolidamos nossa posição como referência em soluções para transporte pesado.
                  </p>
                  
                  <p>
                    Nossa atuação abrange todo o território nacional, atendendo desde pequenas transportadoras 
                    até grandes empresas do agronegócio, construção civil e logística. Focamos em 
                    <strong className="text-white"> qualidade, produtividade e competitividade</strong>, 
                    oferecendo equipamentos que maximizam o retorno sobre o investimento de nossos clientes.
                  </p>
                  
                  <p>
                    Investimos continuamente em tecnologia, processos e capacitação da nossa equipe para 
                    garantir que cada implemento fabricado atenda aos mais altos padrões de segurança, 
                    durabilidade e desempenho. Nosso compromisso vai além da venda: oferecemos suporte 
                    técnico completo e assistência personalizada.
                  </p>
                </div>

                {/* Valores */}
                <div className="mt-10">
                  <ul className="space-y-3">
                    {valores.map((valor, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-[#3B4BA8] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                        <span>{valor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 sm:py-20 lg:py-28">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="text-center mb-12 lg:mb-16">
              <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">
                Por que escolher a Rodotec
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Nossos <span className="text-[#3B4BA8]">diferenciais</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {diferenciais.map((diferencial, index) => (
                <div
                  key={index}
                  className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 hover:border-[#3B4BA8]/30 transition-all shadow-lg group"
                >
                  <div className="w-14 h-14 bg-[#3B4BA8]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#3B4BA8] transition-all">
                    <diferencial.icon className="w-7 h-7 text-[#3B4BA8] group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3">{diferencial.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{diferencial.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="bg-gradient-to-br from-[#0B1220] to-[#020617] border border-[#3B4BA8]/20 rounded-3xl p-8 lg:p-12 text-center shadow-lg">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Conheça nossos produtos e soluções
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                Explore nossa linha completa de implementos rodoviários ou entre em contato 
                para um projeto personalizado.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/produtos"
                  className="px-8 py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2 group shadow-lg"
                >
                  Ver catálogo de produtos
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </Link>
                <Link
                  to="/contato"
                  className="px-8 py-4 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-white/40 transition-all font-medium"
                >
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>
        </section>

        <NewFooter />
      </div>
    </>
  );
}

