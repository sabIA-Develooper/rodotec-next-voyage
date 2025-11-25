import { FileText, PenTool, Cog, Truck } from "lucide-react";

export function MethodSection() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Análise da Operação",
      description: "Entender tipo de carga, rota e necessidades específicas",
    },
    {
      number: "02",
      icon: PenTool,
      title: "Projeto do Implemento",
      description: "Definir configuração ideal e dimensionamento técnico",
    },
    {
      number: "03",
      icon: Cog,
      title: "Fabricação e Testes",
      description: "Produção industrial com inspeção e testes rigorosos",
    },
    {
      number: "04",
      icon: Truck,
      title: "Entrega e Suporte",
      description: "Entrega técnica e acompanhamento pós-venda",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[#020617] relative overflow-hidden">
      {/* Linha decorativa */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">Nossa Metodologia</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            <span className="text-white">Do projeto </span>
            <span className="text-[#3B4BA8]">à operação</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Processo estruturado que garante a qualidade e adequação do implemento 
            à sua operação específica
          </p>
        </div>

        {/* Timeline - Desktop horizontal, Mobile vertical */}
        <div className="relative">
          {/* Linha conectora horizontal - apenas desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3B4BA8] via-[#3B4BA8] to-[#3B4BA8] opacity-30" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Marcador na linha - apenas desktop */}
                <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#3B4BA8] border-4 border-[#020617] shadow-lg z-10" />

                {/* Card */}
                <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-6 lg:p-8 lg:mt-24 hover:bg-[#0D1528] hover:border-[#3B4BA8]/30 transition-all group shadow-lg">
                  {/* Número de fundo */}
                  <div className="text-[#3B4BA8]/10 text-5xl lg:text-6xl font-bold mb-5 lg:mb-6 group-hover:text-[#3B4BA8]/20 transition-colors leading-none">
                    {step.number}
                  </div>

                  {/* Ícone */}
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center mb-5 lg:mb-6 group-hover:border-[#3B4BA8]/40 transition-all">
                    <step.icon className="w-6 h-6 lg:w-7 lg:h-7 text-[#3B4BA8]" strokeWidth={1.5} />
                  </div>

                  {/* Título */}
                  <h3 className="text-white text-base lg:text-lg mb-2 lg:mb-3 font-semibold leading-tight">{step.title}</h3>

                  {/* Descrição */}
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

