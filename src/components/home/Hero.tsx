import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-truck.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Implementos Rodotec"
          className="h-full w-full object-cover opacity-60"
        />
        {/* Gradient Overlay - Industrial Dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-brand-100 uppercase tracking-wider">Tecnologia Industrial Avançada</span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl tracking-tight mb-6">
            ENGENHARIA QUE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-100">
              MOVE O FUTURO
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 md:text-2xl max-w-2xl mb-10 leading-relaxed border-l-4 border-brand pl-6">
            Soluções em implementos rodoviários com menor tara, maior vida útil e a robustez que sua operação exige.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/produtos">
              <Button size="lg" className="btn-hero w-full sm:w-auto text-lg h-14">
                Ver Linha de Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contato">
              <Button
                size="lg"
                variant="outline"
                className="btn-hero-secondary w-full sm:w-auto text-lg h-14"
              >
                Falar com Especialista
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Diagonal Cut */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-background diagonal-section-top z-20"></div>
    </section>
  );
};
