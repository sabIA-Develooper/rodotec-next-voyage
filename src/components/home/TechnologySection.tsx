import { PenTool, Factory, Shield, Award, Clock, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function TechnologySection() {
  const processes = [
    {
      icon: PenTool,
      title: "Projeto e Engenharia",
      description: "Dimensionamento técnico correto para cada aplicação e tipo de operação",
    },
    {
      icon: Factory,
      title: "Processo de Fabricação",
      description: "Corte e dobra CNC, solda de qualidade industrial e inspeção rigorosa",
    },
    {
      icon: Shield,
      title: "Acabamento e Proteção",
      description: "Pintura resistente, proteção anticorrosiva e durabilidade comprovada",
    },
  ];

  const certifications = [
    {
      icon: Clock,
      value: "+12 anos",
      label: "Experiência no mercado",
    },
    {
      icon: CheckCircle,
      value: "100%",
      label: "Implementos testados",
    },
    {
      icon: Award,
      value: "ISO 9001",
      label: "Processos certificados",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[#020617] relative overflow-hidden" id="tecnologia">
      {/* Linha decorativa */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Background Image com overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1586333109867-812586269a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwd2VsZGluZyUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzYzOTU4NDQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Fábrica"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 relative z-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">Processos Industriais</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            <span className="text-white">Tecnologia a serviço da </span>
            <span className="text-[#3B4BA8]">estrada</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Processos industriais modernos e controle de qualidade rigoroso garantem 
            a resistência e durabilidade que sua operação exige.
          </p>
        </div>

        {/* Grid Layout - Responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Processos - 2 colunas em desktop */}
          <div className="lg:col-span-2 space-y-6">
            {processes.map((process, index) => (
              <div
                key={index}
                className="bg-[#0B1220] rounded-3xl p-6 lg:p-8 hover:bg-[#0D1528] transition-all group border border-white/5 hover:border-[#3B4BA8]/30 shadow-lg"
              >
                <div className="flex items-start gap-4 lg:gap-6">
                  {/* Ícone */}
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-[#3B4BA8]/40 transition-all">
                    <process.icon className="w-7 h-7 lg:w-8 lg:h-8 text-[#3B4BA8]" strokeWidth={1.5} />
                  </div>
                  
                  {/* Conteúdo */}
                  <div>
                    <h3 className="text-white text-lg lg:text-xl mb-2 lg:mb-3 font-semibold">{process.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{process.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certificações - 1 coluna */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">Nossos Números</h3>
              <p className="text-gray-400 text-sm">Qualidade e experiência comprovadas</p>
            </div>
            
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-[#0B1220] rounded-3xl p-6 border border-[#3B4BA8]/20 hover:border-[#3B4BA8]/40 transition-all shadow-lg"
              >
                <div className="w-12 h-12 bg-[#3B4BA8]/10 rounded-2xl flex items-center justify-center mb-4">
                  <cert.icon className="w-6 h-6 text-[#3B4BA8]" strokeWidth={1.5} />
                </div>
                <div className="text-3xl text-white font-bold mb-2">{cert.value}</div>
                <div className="text-gray-400 text-sm">{cert.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
