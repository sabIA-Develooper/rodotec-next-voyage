import { Shield, TrendingUp, Zap, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

export const SolutionsSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand/5 -skew-x-12 transform translate-x-1/4" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-brand font-bold uppercase tracking-widest mb-2">Por que Rodotec</h2>
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            PLATAFORMA DE <span className="text-brand">SOLUÇÕES</span>
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Não entregamos apenas implementos. Entregamos eficiência operacional, segurança e rentabilidade para o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Feature - Large Card */}
          <Card className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-surface to-surface-2 border-border p-8 flex flex-col justify-between group hover:border-brand/50 transition-all duration-300">
            <div>
              <div className="bg-brand/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand/20 transition-colors">
                <TrendingUp className="h-8 w-8 text-brand" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Rentabilidade Maximizada</h4>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nossa engenharia foca na redução de tara utilizando materiais de alta resistência. Isso significa que você transporta mais carga líquida por viagem, aumentando diretamente o lucro da sua operação.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div>
                  <span className="block text-3xl font-bold text-white">40%</span>
                  <span className="text-sm text-muted-foreground">Menos Tara</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="block text-3xl font-bold text-white">+12%</span>
                  <span className="text-sm text-muted-foreground">Carga Líquida</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Secondary Feature 1 */}
          <Card className="bg-surface border-border p-6 hover:bg-surface-2 transition-colors group">
            <Shield className="h-10 w-10 text-brand mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-white mb-2">Estanqueidade Total</h4>
            <p className="text-muted-foreground">
              Processos de solda robotizada e testes rigorosos garantem zero vazamentos e proteção total da carga.
            </p>
          </Card>

          {/* Secondary Feature 2 */}
          <Card className="bg-surface border-border p-6 hover:bg-surface-2 transition-colors group">
            <Zap className="h-10 w-10 text-brand mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-white mb-2">Engenharia de Precisão</h4>
            <p className="text-muted-foreground">
              Projetos desenvolvidos em software 3D de última geração, garantindo encaixes perfeitos e durabilidade.
            </p>
          </Card>

          {/* Secondary Feature 3 */}
          <Card className="bg-surface border-border p-6 hover:bg-surface-2 transition-colors group">
            <Settings className="h-10 w-10 text-brand mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-white mb-2">Manutenção Simplificada</h4>
            <p className="text-muted-foreground">
              Componentes padronizados e de fácil acesso para reduzir o tempo de máquina parada na oficina.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
