import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="section-spacing bg-gradient-to-r from-slate-900 via-brand-700 to-slate-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 chevron-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand/20 via-transparent to-accent/20" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-8 leading-tight">
            Pronto para equipar sua<br />
            frota com mais<br />
            <span className="text-brand">desempenho?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Solicite um orçamento personalizado e descubra como podemos otimizar sua operação com engenharia de precisão e tecnologia de ponta.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contato">
              <Button size="lg" className="bg-white text-brand hover:bg-white/90 text-lg px-12 py-8 h-auto font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
                Pedir Orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contato">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 text-lg px-12 py-8 h-auto font-semibold backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Falar com Especialista
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

