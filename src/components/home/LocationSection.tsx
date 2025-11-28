import { MapPin, Phone, Clock, Navigation } from "lucide-react";

export function LocationSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[#020617] relative overflow-hidden" id="localizacao">
      {/* Linha decorativa */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">Nossa Localização</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            <span className="text-white">Onde </span>
            <span className="text-[#3B4BA8]">estamos</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            A Rodotec atende todo o Brasil a partir de sua unidade em Sergipe. 
            Os contratos são fechados presencialmente em nossa fábrica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Mapa Google Maps Embed */}
          <div className="bg-[#0B1220] border border-white/5 rounded-3xl overflow-hidden shadow-lg order-2 lg:order-1 relative">
            {/* Google Maps iframe */}
            <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
              <iframe
                src="https://maps.google.com/maps?q=Rua+S+Parque+dos+Farois,+169,+Loteamento+Itacanema+II,+Nossa+Senhora+do+Socorro,+SE,+49160-000,+Brazil&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Rodotec - Nossa Senhora do Socorro, SE"
                className="w-full h-full"
              />
            </div>

            {/* Info box no mapa */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#020617]/95 backdrop-blur-md border border-[#3B4BA8]/30 rounded-2xl p-4 lg:p-6 shadow-lg">
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#3B4BA8]/15 rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#3B4BA8]/30">
                  <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-[#3B4BA8]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base lg:text-lg mb-1">Unidade Rodotec</h3>
                  <p className="text-gray-300 text-sm mb-1">Nossa Senhora do Socorro</p>
                  <p className="text-[#3B4BA8] text-xs uppercase tracking-wide font-medium">Região Metropolitana de Aracaju • SE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de contato */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* Endereço */}
            <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-6 lg:p-8 hover:bg-[#0D1528] hover:border-[#3B4BA8]/30 transition-all group shadow-lg">
              <div className="flex items-start gap-4 lg:gap-5">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-[#3B4BA8]/40 transition-all">
                  <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-[#3B4BA8]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-3">Endereço</h3>
                  <p className="text-gray-400 leading-relaxed">
                    R. S Pq Dos Farois, 169 - Lot. Itacanema II, Nossa Sra. do Socorro - SE, 49160-000
                  </p>
                </div>
              </div>
            </div>

            {/* Telefone */}
            <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-6 lg:p-8 hover:bg-[#0D1528] hover:border-[#3B4BA8]/30 transition-all group shadow-lg">
              <div className="flex items-start gap-4 lg:gap-5">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-[#3B4BA8]/40 transition-all">
                  <Phone className="w-6 h-6 lg:w-7 lg:h-7 text-[#3B4BA8]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-3">Telefone</h3>
                  <a 
                    href="tel:+557932412329"
                    className="text-gray-400 hover:text-[#3B4BA8] transition-colors block leading-relaxed"
                  >
                    (79) 3241-2329
                  </a>
                  <a 
                    href="mailto:contato@rodotecse.com.br"
                    className="text-gray-400 hover:text-[#3B4BA8] transition-colors text-sm"
                  >
                    contato@rodotecse.com.br
                  </a>
                </div>
              </div>
            </div>

            {/* Horário */}
            <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-6 lg:p-8 hover:bg-[#0D1528] hover:border-[#3B4BA8]/30 transition-all group shadow-lg">
              <div className="flex items-start gap-4 lg:gap-5">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-[#3B4BA8]/40 transition-all">
                  <Clock className="w-6 h-6 lg:w-7 lg:h-7 text-[#3B4BA8]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-3">Horário</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Segunda a Sexta: 08h às 18h<br />
                    Sábado: 08h às 12h
                  </p>
                </div>
              </div>
            </div>

            {/* Botão CTA */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Rua+S+Parque+dos+Farois,+169,+Loteamento+Itacanema+II,+Nossa+Senhora+do+Socorro,+SE,+49160-000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-2xl transition-all font-medium flex items-center justify-center gap-2 group shadow-lg"
            >
              <Navigation className="w-5 h-5 group-hover:rotate-45 transition-transform" strokeWidth={2} />
              Ver rota no mapa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

