import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Hammer, RefreshCw, Lightbulb } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function Servicos() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const servicos = [
    {
      icon: Scissors,
      title: "Corte e dobra de chapas",
      description: "Processamento de chapas em aço carbono com equipamentos de precisão, garantindo cortes exatos e dobras perfeitas para estruturas de implementos.",
      features: [
        "Corte a laser e guilhotina",
        "Dobra em prensa hidráulica",
        "Aço carbono SAE 1020/1045",
        "Tolerâncias rigorosas",
      ],
    },
    {
      icon: Hammer,
      title: "Montagem industrial",
      description: "Fabricação completa de implementos rodoviários, desde a estrutura até o acabamento final, com controle de qualidade em todas as etapas.",
      features: [
        "Soldas certificadas MIG/MAG",
        "Montagem de sistemas hidráulicos",
        "Instalação de componentes",
        "Testes de funcionamento",
      ],
    },
    {
      icon: RefreshCw,
      title: "Reforma e manutenção",
      description: "Revitalização completa de equipamentos antigos, recuperando a vida útil e performance com peças originais e mão de obra especializada.",
      features: [
        "Diagnóstico técnico completo",
        "Troca de componentes desgastados",
        "Pintura industrial",
        "Testes de segurança",
      ],
    },
    {
      icon: Lightbulb,
      title: "Projetos especiais",
      description: "Desenvolvimento de soluções customizadas para necessidades específicas, adaptando implementos existentes ou criando novos produtos sob medida.",
      features: [
        "Análise de viabilidade técnica",
        "Engenharia e projeto 3D",
        "Prototipagem",
        "Homologação e certificação",
      ],
    },
  ];

  return (
    <>
      <SEO 
        title="Serviços"
        description="Serviços especializados da Rodotec: corte e dobra de chapas, montagem industrial, manutenção preventiva e corretiva, e consultoria técnica para implementos rodoviários."
        keywords="serviços rodotec, manutenção implementos, montagem industrial, corte de chapas, consultoria técnica"
      />
      
      <div className="min-h-screen bg-[#020617] pt-28">
        <Navbar />
        <NewSideNav />
        <ScrollToTop />
        
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 pt-8">
          <Breadcrumbs items={[{ label: "Serviços" }]} />
        </div>
        
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 to-transparent" />
          
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 relative">
            <div className="max-w-4xl">
              <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">
                O que fazemos
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Nossos <span className="text-[#3B4BA8]">Serviços</span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                A Rodotec oferece uma linha completa de serviços especializados em implementos rodoviários, 
                desde a fabricação e montagem industrial até reformas e projetos customizados para sua operação.
              </p>
            </div>
          </div>
        </section>

        {/* Grid de Serviços */}
        <section className="py-16 sm:py-20 lg:py-28">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {servicos.map((servico, index) => (
                <div
                  key={index}
                  className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 hover:border-[#3B4BA8]/30 transition-all shadow-lg group"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-[#3B4BA8]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#3B4BA8] transition-all">
                    <servico.icon className="w-8 h-8 text-[#3B4BA8] group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">
                    {servico.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {servico.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {servico.features.map((feature, i) => (
                      <li key={i} className="text-gray-300 flex items-center gap-3 text-sm">
                        <div className="w-1.5 h-1.5 bg-[#3B4BA8] rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processo */}
        <section className="py-16 sm:py-20 bg-[#0B1220]/30">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="text-center mb-12 lg:mb-16">
              <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">
                Como trabalhamos
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Nosso <span className="text-[#3B4BA8]">processo</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  numero: "01",
                  titulo: "Análise técnica",
                  descricao: "Avaliação detalhada da necessidade e viabilidade do projeto",
                },
                {
                  numero: "02",
                  titulo: "Desenvolvimento",
                  descricao: "Elaboração do projeto técnico e orçamento detalhado",
                },
                {
                  numero: "03",
                  titulo: "Execução",
                  descricao: "Fabricação ou manutenção com controle rigoroso de qualidade",
                },
                {
                  numero: "04",
                  titulo: "Entrega",
                  descricao: "Instalação, testes finais e treinamento da equipe",
                },
              ].map((etapa, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3B4BA8]/20 rounded-2xl mb-6 border border-[#3B4BA8]/30">
                    <span className="text-[#3B4BA8] text-2xl font-bold">{etapa.numero}</span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3">{etapa.titulo}</h3>
                  <p className="text-gray-400 leading-relaxed">{etapa.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 lg:py-28">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="bg-gradient-to-br from-[#0B1220] to-[#020617] border border-[#3B4BA8]/20 rounded-3xl p-8 lg:p-12 text-center shadow-lg">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Está com dúvidas sobre qual serviço é ideal?
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                Nossa equipe técnica está pronta para avaliar sua necessidade e recomendar 
                a melhor solução para seu caso específico.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contato"
                  className="px-8 py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2 group shadow-lg"
                >
                  Fale conosco
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </Link>
                <Link
                  to="/orcamento"
                  className="px-8 py-4 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-white/40 transition-all font-medium"
                >
                  Solicitar orçamento
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

