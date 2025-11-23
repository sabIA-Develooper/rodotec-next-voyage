import { Truck, MapPin, Star } from "lucide-react";

export function TrustSection() {
  const stats = [
    {
      icon: Truck,
      value: "2000+",
      label: "Frotas atendidas em todo o Brasil",
      color: "text-brand"
    },
    {
      icon: MapPin,
      value: "50+",
      label: "Pontos de venda e distribuidores",
      color: "text-accent"
    },
    {
      icon: Star,
      value: "4.9",
      label: "Avaliação média dos clientes",
      color: "text-warning",
      sublabel: "5 estrelas"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-background via-slate-900 to-background relative overflow-hidden">
      {/* Background pattern e shapes */}
      <div className="absolute inset-0 industrial-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="glass-dark rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Números que comprovam<br />nossa confiança
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Resultados reais de uma empresa que investe em tecnologia, qualidade e relacionamento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center space-y-4"
                >
                  <div className="flex justify-center mb-4">
                    <div className={`rounded-2xl bg-white/10 p-6 ${stat.color}`}>
                      <Icon className="h-12 w-12" />
                    </div>
                  </div>
                  <div className={`font-heading text-5xl md:text-6xl font-extrabold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  {stat.sublabel && (
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                      ))}
                    </div>
                  )}
                  <p className="text-lg text-white/80">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

