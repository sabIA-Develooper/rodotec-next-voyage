import { FileText, Wrench, Factory, Truck } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Análise Técnica",
    description: "Entendemos sua operação para recomendar a configuração ideal.",
    icon: FileText
  },
  {
    id: 2,
    title: "Engenharia",
    description: "Projeto detalhado e validação técnica antes da produção.",
    icon: Wrench
  },
  {
    id: 3,
    title: "Fabricação",
    description: "Processo industrial com controle de qualidade rigoroso.",
    icon: Factory
  },
  {
    id: 4,
    title: "Entrega Técnica",
    description: "Treinamento e acompanhamento para início da operação.",
    icon: Truck
  }
];

export const ProcessSection = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-brand font-bold uppercase tracking-widest mb-2">Nosso Método</h2>
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-white">
            DO PROJETO À <span className="text-brand">ESTRADA</span>
          </h3>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-surface-2 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6 group-hover:border-brand group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 bg-background">
                    <Icon className="h-8 w-8 text-muted-foreground group-hover:text-brand transition-colors" />
                  </div>

                  <div className="absolute top-0 right-0 -mr-4 -mt-4 w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-sm font-bold text-white border border-background">
                    {step.id}
                  </div>

                  <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
