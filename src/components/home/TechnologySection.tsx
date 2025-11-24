import { CheckCircle2, Cpu, Layers, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const TechnologySection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-brand font-bold uppercase tracking-widest mb-2">Tecnologia & Inovação</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              PROCESSOS INDUSTRIAIS <br />
              DE <span className="text-brand">ÚLTIMA GERAÇÃO</span>
            </h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Investimos constantemente em automação e qualificação técnica. Nossa fábrica opera com os mais modernos padrões da indústria 4.0, garantindo repetibilidade, precisão e qualidade superior em cada implemento.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-surface-2 p-3 rounded-lg h-fit">
                  <Cpu className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Corte a Laser e Dobra CNC</h4>
                  <p className="text-muted-foreground">Precisão milimétrica no corte e conformação das peças, garantindo encaixes perfeitos e estrutura mais rígida.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-surface-2 p-3 rounded-lg h-fit">
                  <PenTool className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Solda Robotizada</h4>
                  <p className="text-muted-foreground">Cordões de solda uniformes e com penetração controlada, eliminando falhas humanas e aumentando a resistência.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-surface-2 p-3 rounded-lg h-fit">
                  <Layers className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Pintura Eletrostática</h4>
                  <p className="text-muted-foreground">Acabamento superior com alta resistência a corrosão e intempéries, garantindo o visual de novo por muito mais tempo.</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link to="/tecnologia">
                <Button variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">
                  Conhecer Nossa Fábrica
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visuals - Abstract Tech Representation */}
          <div className="relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-12">
                <div className="bg-surface p-6 rounded-2xl border border-border shadow-2xl">
                  <div className="text-4xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Digitalizado</div>
                </div>
                <div className="bg-brand p-6 rounded-2xl shadow-2xl shadow-brand/20">
                  <div className="text-4xl font-bold text-white mb-1">ISO</div>
                  <div className="text-sm text-white/80">9001:2015</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-2 p-6 rounded-2xl border border-border/50 shadow-2xl">
                  <div className="text-4xl font-bold text-white mb-1">4.0</div>
                  <div className="text-sm text-muted-foreground">Indústria</div>
                </div>
                <div className="bg-surface p-6 rounded-2xl border border-border shadow-2xl">
                  <div className="text-4xl font-bold text-white mb-1">24h</div>
                  <div className="text-sm text-muted-foreground">Monitoramento</div>
                </div>
              </div>
            </div>

            {/* Decorative Grid Behind */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0 transform rotate-3 scale-110" />
          </div>

        </div>
      </div>
    </section>
  );
};
