import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#020617]" id="home">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1723369962510-e1bf627435e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW1wJTIwdHJ1Y2slMjBjb25zdHJ1Y3Rpb24lMjBzaXRlfGVufDF8fHx8MTc2Mzk1ODQzOXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Implementos rodoviários Rodotec"
          className="w-full h-full object-cover"
        />
        {/* Gradiente forte da esquerda para direita - legibilidade máxima */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/98 via-40% to-[#020617]/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full mb-6 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-[#3B4BA8] animate-pulse" />
            <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">Implementos rodoviários para operação pesada</span>
          </div>

          {/* Main Title */}
          <h1 className="mb-8">
            <div className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight tracking-tight">
              EQUIPAMENTOS QUE
            </div>
            <div className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight tracking-tight">
              LEVAM SUA CARGA
            </div>
            <div className="text-[#3B4BA8] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              MAIS LONGE
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-10 leading-relaxed max-w-2xl">
            Poliguindastes, carrocerias, caçambas e tanques projetados para trabalhar mais, 
            parar menos e garantir o máximo de segurança e eficiência na estrada.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link 
              to="/produtos"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
            >
              Ver linha de produtos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </Link>
            <Link 
              to="/contato"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-white/40 transition-all font-medium backdrop-blur-sm text-center"
            >
              Falar com especialista
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3B4BA8]/10 border border-[#3B4BA8]/30 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-[#3B4BA8]" strokeWidth={2.5} />
              </div>
              <span className="text-gray-400">+30% de reforço estrutural</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3B4BA8]/10 border border-[#3B4BA8]/30 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-[#3B4BA8]" strokeWidth={2.5} />
              </div>
              <span className="text-gray-400">Referência no Nordeste</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3B4BA8]/10 border border-[#3B4BA8]/30 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-[#3B4BA8]" strokeWidth={2.5} />
              </div>
              <span className="text-gray-400">+12 anos de experiência</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-xs uppercase tracking-widest">Role para explorar</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}

