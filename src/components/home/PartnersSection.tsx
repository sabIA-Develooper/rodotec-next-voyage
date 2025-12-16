export function PartnersSection() {
  const partners = [
    {
      name: "TKA",
      logo: "/images/partners/tka.png",
      alt: "Logo TKA"
    },
    {
      name: "SILPA",
      logo: "/images/partners/silpa.png",
      alt: "Logo SILPA"
    }
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" id="partners">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0B1220] to-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,75,168,0.08),transparent_50%)]" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-block mb-4">
            <span className="text-[#3B4BA8] text-sm font-semibold tracking-wider uppercase px-4 py-2 bg-[#3B4BA8]/10 rounded-full border border-[#3B4BA8]/20">
              Parcerias
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
            Empresas que confiam na{" "}
            <span className="text-[#3B4BA8]">RODOTEC</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Parceiros estratégicos que compartilham nosso compromisso com qualidade e inovação no setor de implementos rodoviários.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="group relative bg-gradient-to-br from-[#0B1220] to-[#0D1528] border border-white/5 rounded-3xl p-8 sm:p-12 lg:p-16 flex items-center justify-center hover:border-[#3B4BA8]/30 hover:shadow-[0_0_40px_rgba(59,75,168,0.15)] transition-all duration-500 min-h-[280px] sm:min-h-[360px]"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards',
                opacity: 0
              }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#3B4BA8]/0 to-[#3B4BA8]/0 group-hover:from-[#3B4BA8]/5 group-hover:to-transparent transition-all duration-500" />

              {/* Logo Container */}
              <div className="relative w-full h-56 sm:h-72 lg:h-80 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                  style={{
                    imageRendering: 'crisp-edges'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes for animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
