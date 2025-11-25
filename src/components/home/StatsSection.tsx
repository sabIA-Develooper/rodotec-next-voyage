import { Package, Calendar, Star } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Package,
      value: "2000+",
      label: "Implementos entregues",
      sublabel: "em todo território nacional",
    },
    {
      icon: Calendar,
      value: "12+",
      label: "Anos de atuação",
      sublabel: "no segmento rodoviário",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Avaliação média",
      sublabel: "dos nossos clientes",
      showStars: true,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[#020617]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
        {/* Card Principal */}
        <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 sm:p-12 lg:p-20 relative overflow-hidden shadow-lg">
          {/* Barra superior decorativa */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3B4BA8] to-transparent opacity-50" />
          
          {/* Padrão de fundo sutil */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12 lg:mb-20">
              <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">Confiança Comprovada</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4 font-bold tracking-tight leading-tight">
                Números que mostram a força da Rodotec
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Mais de uma década de experiência transformada em implementos 
                de alta performance e clientes satisfeitos
              </p>
            </div>

            {/* Stats Grid - Responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  {/* Icon Container */}
                  <div className="inline-flex w-16 h-16 lg:w-20 lg:h-20 bg-[#3B4BA8]/10 border border-[#3B4BA8]/30 rounded-2xl items-center justify-center mb-6 group-hover:border-[#3B4BA8]/50 transition-all">
                    <stat.icon className="w-8 h-8 lg:w-9 lg:h-9 text-[#3B4BA8]" strokeWidth={1.5} />
                  </div>

                  {/* Value */}
                  <div className="text-5xl lg:text-6xl text-white mb-3 font-bold">{stat.value}</div>

                  {/* Stars if applicable */}
                  {stat.showStars && (
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#3B4BA8] text-[#3B4BA8]" />
                      ))}
                    </div>
                  )}

                  {/* Label */}
                  <p className="text-white text-lg font-semibold mb-2">{stat.label}</p>
                  <p className="text-gray-500 text-sm">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
