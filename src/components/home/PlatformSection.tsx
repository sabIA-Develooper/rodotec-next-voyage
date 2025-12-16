import { Shield, Layers, Lock, TrendingUp } from "lucide-react";

export function PlatformSection() {
  const features = [
    {
      icon: Layers,
      title: "Resistência Estrutural",
      description: "Estruturas reforçadas com aço de alta resistência para operação intensa e rodovias exigentes",
      metric: "+30%",
      metricLabel: "mais reforço",
    },
    {
      icon: Shield,
      title: "Durabilidade no Dia a Dia",
      description: "Materiais e acabamento industrial pensados para muitos anos de uso contínuo",
      metric: "15+",
      metricLabel: "anos de vida útil",
    },
    {
      icon: Lock,
      title: "Segurança na Carga",
      description: "Sistemas que reduzem risco de tombamento, vazamentos e acidentes na estrada",
      metric: "100%",
      metricLabel: "testado",
    },
    {
      icon: TrendingUp,
      title: "Eficiência Logística",
      description: "Maior capacidade de carga útil, menos viagens e mais produtividade para sua frota",
      metric: "+20%",
      metricLabel: "produtividade",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden bg-[#020617]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">Por que escolher a Rodotec</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 font-bold tracking-tight leading-tight">
            <span className="text-white">Soluções para sua frota </span>
            <span className="text-[#3B4BA8]">trabalhar mais e parar menos</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Entregamos não apenas implementos, mas soluções completas para manter 
            sua operação rodando com máxima eficiência e segurança.
          </p>
        </div>

        {/* Grid de Cards - Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#0B1220] rounded-3xl p-6 lg:p-8 hover:bg-[#0D1528] transition-all group border border-white/5 hover:border-[#3B4BA8]/30 flex flex-col shadow-lg"
            >
              {/* Ícone */}
              <div className="w-14 h-14 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[#3B4BA8]/40 transition-all">
                <feature.icon className="w-7 h-7 text-[#3B4BA8]" strokeWidth={1.5} />
              </div>
              
              {/* Título */}
              <h3 className="text-white text-lg mb-3 font-semibold">{feature.title}</h3>
              
              {/* Descrição */}
              <p className="text-gray-400 mb-6 leading-relaxed text-sm flex-grow">{feature.description}</p>
              
              {/* Métrica */}
              <div className="pt-4 border-t border-white/5">
                <div className="text-[#3B4BA8] text-2xl font-bold mb-1">{feature.metric}</div>
                <div className="text-gray-500 text-xs uppercase tracking-wide">{feature.metricLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

