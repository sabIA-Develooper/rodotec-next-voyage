import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";
import { motion, AnimatePresence } from "motion/react";

interface Representante {
  empresa: string;
  endereco: string;
  cep: string;
  telefone: string;
  contatos: { nome: string; email: string }[];
}

export default function Representantes() {
  const [expandedState, setExpandedState] = useState<string | null>("SE");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const representantes: Record<string, Representante[]> = {
    SE: [
      {
        empresa: "RODOTEC EQUIPAMENTOS RODOVIÁRIOS LTDA.",
        endereco: "Rod. BR 101 Km 92, s/n – Parque dos Faróis",
        cep: "Nossa Senhora do Socorro/SE – CEP: 49160-000",
        telefone: "(79) 99141-2582",
        contatos: [
          { nome: "Watson Luiz (Kiko)", email: "vendas@rodotecse.com.br" },
          { nome: "Rodrigo Moreira", email: "vendas1@rodotecse.com.br" },
        ],
      },
      {
        empresa: "RODOPEÇAS LTDA.",
        endereco: "Rod. BR 101 Km 92, s/n – Parque dos Faróis",
        cep: "Nossa Senhora do Socorro/SE – CEP: 49160-000",
        telefone: "(79) 3216-1709",
        contatos: [{ nome: "Fábio Gois", email: "fabio@rodosergipe.com.br" }],
      },
    ],
    BA: [
      {
        empresa: "BAHIA IMPLEMENTOS RODOVIÁRIOS LTDA.",
        endereco: "Rua Manoel da Costa Falcão, 2155 A, CIS – Tomba (Antiga Avenida Sudene)",
        cep: "Feira de Santana/BA – CEP: 44063-640",
        telefone: "(75) 3622-9444",
        contatos: [
          { nome: "Flávia Santos", email: "bahiaimplementos@bahiaimplementos.com.br" },
          { nome: "José Carlos", email: "carlos@bahiaimplementos.com.br" },
        ],
      },
      {
        empresa: "CARROCERIAS BAHIA LTDA.",
        endereco: "Via Urbana, 2.200 – Cia Sul",
        cep: "Simões Filho/BA – CEP: 43700-000",
        telefone: "(71) 3301-9001",
        contatos: [
          { nome: "Juramar", email: "juramar@bahiaimplementos.com.br" },
          { nome: "Alberto Gomes", email: "albertogomes@bahiaimplementos.com.br" },
        ],
      },
    ],
    ES: [
      {
        empresa: "RODOPAZ IMPLEMENTOS RODOVIÁRIOS LTDA.",
        endereco: "Rod. BR 262 Km 11,5, s/n – Bairro Canaã",
        cep: "Viana/ES – CEP: 29135-000",
        telefone: "(27) 3344-7550",
        contatos: [{ nome: "Fabiano Bispo", email: "fabiano@bahiaimplementos.com.br" }],
      },
    ],
    MG: [
      {
        empresa: "LL IMPLEMENTOS RODOVIÁRIOS E SERVIÇOS LTDA. – ME",
        endereco: "Rua Manoel Baptista dos Santos, 61 – Jardim Atalaia",
        cep: "Governador Valadares/MG – CEP: 35042-570",
        telefone: "(33) 3221-5355",
        contatos: [{ nome: "Luciano Martins", email: "" }],
      },
      {
        empresa: "RODOLÂNDIA MECÂNICA DE IMPL. ROD. LTDA.",
        endereco: "Av. José Andraus Gassani, 6265 – Distrito Industrial",
        cep: "Uberlândia/MG – CEP: 38402-324",
        telefone: "(34) 3213-7100",
        contatos: [{ nome: "José Almeida", email: "executivo@mgimplementos.com.br" }],
      },
    ],
  };

  const estados = [
    { sigla: "SE", nome: "Sergipe" },
    { sigla: "BA", nome: "Bahia" },
    { sigla: "ES", nome: "Espírito Santo" },
    { sigla: "MG", nome: "Minas Gerais" },
  ];

  const toggleState = (sigla: string) => {
    setExpandedState(expandedState === sigla ? null : sigla);
  };

  return (
    <>
      <SEO 
        title="Representantes"
        description="Encontre o representante Rodotec mais próximo de você. Atendemos todo o Brasil com uma rede de parceiros especializados em implementos rodoviários."
        keywords="representantes rodotec, distribuidores rodotec, revendedores implementos, onde comprar rodotec"
      />
      
      <div className="min-h-screen bg-[#020617] pt-28">
        <Navbar />
        <NewSideNav />
        <ScrollToTop />
        
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 pt-8">
          <Breadcrumbs items={[{ label: "Representantes" }]} />
        </div>

        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 to-transparent" />
          
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 relative">
            <div className="max-w-4xl">
              <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">
                Rede de distribuição
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Nossos <span className="text-[#3B4BA8]">Representantes</span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                A Rodotec atende diversos estados do Brasil através de uma rede de representantes 
                qualificados. Encontre o mais próximo de você e receba atendimento especializado.
              </p>
            </div>
          </div>
        </section>

        {/* Lista de Representantes por Estado */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-4">
                {estados.map((estado) => (
                  <div
                    key={estado.sigla}
                    className="bg-[#0B1220] border border-white/5 rounded-3xl overflow-hidden shadow-lg"
                  >
                    {/* Header do Estado */}
                    <button
                      onClick={() => toggleState(estado.sigla)}
                      className="w-full px-6 py-6 lg:px-8 lg:py-7 flex items-center justify-between hover:bg-[#0D1528] transition-colors group"
                      aria-expanded={expandedState === estado.sigla}
                      aria-controls={`estado-${estado.sigla}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#3B4BA8]/10 border border-[#3B4BA8]/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span className="text-[#3B4BA8] text-xl font-bold">{estado.sigla}</span>
                        </div>
                        <div className="text-left">
                          <h2 className="text-white text-xl lg:text-2xl font-bold">{estado.nome}</h2>
                          <p className="text-gray-400 text-sm mt-1">
                            {representantes[estado.sigla].length} representante
                            {representantes[estado.sigla].length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-[#3B4BA8] transition-transform ${
                          expandedState === estado.sigla ? "rotate-180" : ""
                        }`}
                        strokeWidth={2}
                      />
                    </button>

                    {/* Conteúdo Expandível */}
                    <AnimatePresence>
                      {expandedState === estado.sigla && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          id={`estado-${estado.sigla}`}
                        >
                          <div className="px-6 pb-6 lg:px-8 lg:pb-8 space-y-6">
                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            
                            {representantes[estado.sigla].map((rep, index) => (
                              <div
                                key={index}
                                className="bg-[#020617] border border-white/5 rounded-2xl p-6 lg:p-8"
                              >
                                <h3 className="text-white text-lg font-bold mb-4">{rep.empresa}</h3>
                                
                                <div className="space-y-4">
                                  {/* Endereço */}
                                  <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#3B4BA8] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                                    <div>
                                      <p className="text-gray-400 text-sm mb-1">Endereço</p>
                                      <p className="text-white">{rep.endereco}</p>
                                      <p className="text-gray-300 text-sm mt-1">{rep.cep}</p>
                                    </div>
                                  </div>

                                  {/* Telefone */}
                                  <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-[#3B4BA8] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                                    <div>
                                      <p className="text-gray-400 text-sm mb-1">Telefone</p>
                                      <a 
                                        href={`tel:${rep.telefone.replace(/\D/g, '')}`}
                                        className="text-white hover:text-[#3B4BA8] transition-colors"
                                      >
                                        {rep.telefone}
                                      </a>
                                    </div>
                                  </div>

                                  {/* Contatos */}
                                  <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-[#3B4BA8] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                                    <div>
                                      <p className="text-gray-400 text-sm mb-2">
                                        Contato{rep.contatos.length > 1 ? "s" : ""}
                                      </p>
                                      <div className="space-y-2">
                                        {rep.contatos.map((contato, idx) => (
                                          <div key={idx}>
                                            <p className="text-white font-medium">{contato.nome}</p>
                                            {contato.email && (
                                              <a 
                                                href={`mailto:${contato.email}`}
                                                className="text-gray-300 hover:text-[#3B4BA8] transition-colors text-sm break-all"
                                              >
                                                {contato.email}
                                              </a>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Orçamento */}
        <section className="py-16 sm:py-20 bg-[#0B1220]/30">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0B1220] to-[#020617] border border-[#3B4BA8]/20 rounded-3xl p-8 lg:p-12 text-center shadow-lg">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Precisa de um <span className="text-[#3B4BA8]">orçamento</span>?
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                Entre em contato com um de nossos representantes ou solicite um orçamento 
                personalizado para seu projeto de implemento rodoviário.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/orcamento"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium gap-2 group shadow-lg"
                >
                  Solicitar orçamento
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </Link>
                <Link
                  to="/contato"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-white/40 transition-all font-medium"
                >
                  Entrar em contato
                </Link>
              </div>
            </div>
          </div>
        </section>

        <NewFooter />
      </div>
    </>
  );
}

