import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function TermosUso() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SEO 
        title="Termos de Uso"
        description="Termos e Condições de Uso do site da Rodotec. Leia as regras e diretrizes para utilização dos nossos serviços online."
        keywords="termos de uso rodotec, condições de uso, regras do site"
      />
      
      <div className="min-h-screen bg-[#020617] pt-28">
        <Navbar />
        <NewSideNav />
        <ScrollToTop />
        
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 pt-8">
          <Breadcrumbs items={[{ label: "Termos de Uso" }]} />
        </div>
        
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 to-transparent" />
          
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 relative">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#3B4BA8]" strokeWidth={1.5} />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Termos de <span className="text-[#3B4BA8]">Uso</span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                Bem-vindo ao site da RODOTEC – Equipamentos Rodoviários. Ao acessar e utilizar este site, 
                você concorda com os termos e condições descritos abaixo. Por favor, leia atentamente 
                antes de continuar.
              </p>
              <p className="text-gray-500 text-sm mt-4">
                Última atualização: 24 de novembro de 2024
              </p>
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="max-w-4xl space-y-12">
              
              {/* Seção 1 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Ao acessar e utilizar o site da RODOTEC (www.rodotecse.com.br), você aceita 
                    estar vinculado a estes Termos de Uso, todas as leis e regulamentos aplicáveis, 
                    e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.
                  </p>
                  <p>
                    Se você não concordar com algum destes termos, está proibido de usar ou acessar 
                    este site. Os materiais contidos neste site são protegidos pelas leis de direitos 
                    autorais e marcas comerciais aplicáveis.
                  </p>
                </div>
              </div>

              {/* Seção 2 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">2. Uso Permitido do Site</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Este site destina-se a fornecer informações sobre os produtos e serviços da RODOTEC 
                    e permitir a comunicação entre a empresa e potenciais clientes. Você concorda em:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Utilizar o site apenas para fins legítimos e comerciais</li>
                    <li>Não usar o site de maneira que possa danificar, desabilitar ou prejudicar o servidor</li>
                    <li>Não tentar obter acesso não autorizado ao site, contas de usuários ou sistemas de computador</li>
                    <li>Fornecer informações verdadeiras, precisas e atualizadas ao preencher formulários</li>
                    <li>Não utilizar o site para transmitir material ilegal, ofensivo ou prejudicial</li>
                    <li>Não realizar engenharia reversa, descompilar ou desmontar qualquer parte do site</li>
                  </ul>
                </div>
              </div>

              {/* Seção 3 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">3. Propriedade Intelectual</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Todo o conteúdo presente neste site, incluindo mas não se limitando a textos, 
                    gráficos, logotipos, ícones, imagens, áudio, vídeo, downloads e softwares, é 
                    propriedade da RODOTEC ou de seus fornecedores de conteúdo e está protegido por 
                    leis brasileiras e internacionais de direitos autorais e propriedade intelectual.
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>A marca "RODOTEC" e todos os logotipos relacionados são marcas registradas</li>
                    <li>É proibida a reprodução, distribuição ou uso comercial do conteúdo sem autorização prévia</li>
                    <li>O download de materiais é permitido apenas para uso pessoal e não comercial</li>
                    <li>Qualquer uso não autorizado pode violar direitos autorais, marcas registradas e outras leis</li>
                  </ul>
                </div>
              </div>

              {/* Seção 4 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">4. Informações sobre Produtos e Serviços</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    As informações sobre produtos e serviços disponíveis neste site são fornecidas 
                    para fins informativos e podem estar sujeitas a alterações sem aviso prévio:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Especificações técnicas, dimensões e características são aproximadas</li>
                    <li>Imagens e fotografias são meramente ilustrativas e podem não representar exatamente o produto final</li>
                    <li>Preços, quando mencionados, não constituem oferta vinculante</li>
                    <li>A disponibilidade de produtos está sujeita a confirmação</li>
                    <li>Todos os contratos são firmados presencialmente na fábrica após análise técnica detalhada</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">
                    Para informações precisas e atualizadas, entre em contato diretamente com nossa 
                    equipe comercial.
                  </p>
                </div>
              </div>

              {/* Seção 5 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">5. Solicitações de Orçamento</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Ao enviar uma solicitação de orçamento através do nosso site:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Você autoriza a RODOTEC a entrar em contato através dos dados fornecidos</li>
                    <li>O orçamento fornecido não constitui proposta formal vinculante</li>
                    <li>Valores, especificações e prazos estão sujeitos a confirmação</li>
                    <li>A RODOTEC se reserva o direito de aceitar ou recusar qualquer solicitação</li>
                    <li>Contratos só são válidos quando formalizados por escrito e assinados por ambas as partes</li>
                    <li>Condições comerciais finais serão definidas presencialmente na fábrica</li>
                  </ul>
                </div>
              </div>

              {/* Seção 6 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">6. Links para Sites de Terceiros</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Este site pode conter links para sites de terceiros fornecidos apenas para sua 
                    conveniência. A RODOTEC não controla nem endossa esses sites e não se responsabiliza:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Pelo conteúdo, precisão ou opiniões expressas nesses sites</li>
                    <li>Por quaisquer práticas de privacidade ou políticas de terceiros</li>
                    <li>Por danos ou perdas causados pelo uso de sites de terceiros</li>
                    <li>Pela disponibilidade ou funcionamento de links externos</li>
                  </ul>
                  <p className="mt-4">
                    Ao acessar sites de terceiros, você o faz por sua própria conta e risco e deve 
                    consultar os termos e condições desses sites.
                  </p>
                </div>
              </div>

              {/* Seção 7 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">7. Limitação de Responsabilidade</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    A RODOTEC e seus diretores, funcionários ou agentes não serão responsáveis por:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou 
                        incapacidade de uso deste site</li>
                    <li>Interrupções, erros ou omissões no funcionamento do site</li>
                    <li>Perda de dados ou lucros cessantes decorrentes do uso do site</li>
                    <li>Vírus ou outros componentes prejudiciais transmitidos através do site</li>
                    <li>Imprecisões ou erros em qualquer conteúdo disponibilizado</li>
                  </ul>
                  <p className="mt-4">
                    O site é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas, 
                    incluindo mas não se limitando a garantias de comercialização ou adequação a um 
                    propósito específico.
                  </p>
                </div>
              </div>

              {/* Seção 8 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">8. Disponibilidade do Site</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Embora nos esforcemos para manter o site disponível 24 horas por dia, 7 dias por semana:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Não garantimos que o site estará sempre disponível ou livre de erros</li>
                    <li>Podemos suspender, retirar ou descontinuar qualquer parte do site sem aviso prévio</li>
                    <li>Manutenções programadas ou emergenciais podem causar indisponibilidade temporária</li>
                    <li>Não seremos responsáveis por qualquer perda decorrente de indisponibilidade do site</li>
                  </ul>
                </div>
              </div>

              {/* Seção 9 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">9. Modificações dos Termos</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    A RODOTEC se reserva o direito de revisar e alterar estes Termos de Uso a qualquer 
                    momento, a seu exclusivo critério. Ao continuar a usar o site após a publicação de 
                    alterações, você concorda com os termos revisados.
                  </p>
                  <p>
                    É sua responsabilidade revisar periodicamente estes termos para estar ciente de 
                    quaisquer alterações. A data da última atualização será sempre indicada no topo 
                    desta página.
                  </p>
                </div>
              </div>

              {/* Seção 10 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">10. Lei Aplicável e Foro</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Estes Termos de Uso são regidos e interpretados de acordo com as leis da República 
                    Federativa do Brasil, sem considerar conflitos de disposições legais.
                  </p>
                  <p>
                    Fica eleito o foro da Comarca de Nossa Senhora do Socorro, Estado de Sergipe, 
                    para dirimir quaisquer controvérsias oriundas destes Termos de Uso, renunciando 
                    as partes a qualquer outro, por mais privilegiado que seja.
                  </p>
                </div>
              </div>

              {/* Seção 11 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">11. Disposições Gerais</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <ul className="space-y-3">
                    <li>
                      <strong className="text-white">Totalidade do Acordo:</strong> Estes termos constituem 
                      o acordo integral entre você e a RODOTEC em relação ao uso do site.
                    </li>
                    <li>
                      <strong className="text-white">Independência das Cláusulas:</strong> Se qualquer 
                      disposição destes termos for considerada inválida ou inexequível, as demais 
                      disposições permanecerão em pleno vigor e efeito.
                    </li>
                    <li>
                      <strong className="text-white">Cessão:</strong> Você não pode ceder ou transferir 
                      seus direitos e obrigações sob estes termos sem o consentimento prévio por escrito 
                      da RODOTEC.
                    </li>
                    <li>
                      <strong className="text-white">Renúncia:</strong> A falha da RODOTEC em exercer 
                      ou fazer cumprir qualquer direito ou disposição destes termos não constituirá 
                      renúncia a tal direito ou disposição.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Seção 12 */}
              <div className="bg-gradient-to-br from-[#3B4BA8]/10 to-[#3B4BA8]/5 border border-[#3B4BA8]/20 rounded-3xl p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-white mb-4">12. Contato</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Se você tiver dúvidas sobre estes Termos de Uso ou sobre o funcionamento do site, 
                    entre em contato conosco:
                  </p>
                  <div className="mt-6 space-y-3 text-white">
                    <p>
                      <strong className="text-[#3B4BA8]">Razão Social:</strong> RODOTEC Equipamentos Rodoviários Ltda.
                    </p>
                    <p>
                      <strong className="text-[#3B4BA8]">E-mail:</strong>{" "}
                      <a href="mailto:vendas@rodotecse.com.br" className="hover:underline">
                        vendas@rodotecse.com.br
                      </a>
                    </p>
                    <p>
                      <strong className="text-[#3B4BA8]">Telefone:</strong>{" "}
                      <a href="tel:+5579991412582" className="hover:underline">
                        (79) 99141-2582
                      </a>
                    </p>
                    <p>
                      <strong className="text-[#3B4BA8]">Endereço:</strong>{" "}
                      R. S Pq Dos Farois, 169 - Lot. Itacanema II, Nossa Sra. do Socorro - SE, 49160-000
                    </p>
                    <p>
                      <strong className="text-[#3B4BA8]">Horário de atendimento:</strong>{" "}
                      Segunda a Sexta: 8h às 18h
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <NewFooter />
      </div>
    </>
  );
}

