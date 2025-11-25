import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function PoliticaPrivacidade() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <SEO 
        title="Política de Privacidade"
        description="Política de Privacidade da Rodotec. Saiba como coletamos, usamos e protegemos seus dados pessoais de acordo com a LGPD."
        keywords="política de privacidade rodotec, lgpd, proteção de dados"
      />
      
      <div className="min-h-screen bg-[#020617] pt-20">
        <Navbar />
        <NewSideNav />
        <ScrollToTop />
        
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 pt-8">
          <Breadcrumbs items={[{ label: "Política de Privacidade" }]} />
        </div>
        
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 to-transparent" />
          
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 relative">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#3B4BA8]" strokeWidth={1.5} />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Política de <span className="text-[#3B4BA8]">Privacidade</span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                A RODOTEC – Equipamentos Rodoviários valoriza e protege a privacidade dos visitantes 
                e clientes de nosso site. Esta política descreve como coletamos, utilizamos e protegemos 
                suas informações pessoais.
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
                <h2 className="text-2xl font-bold text-white mb-4">1. Quais dados coletamos</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Coletamos informações que você nos fornece diretamente ao preencher formulários 
                    de contato, solicitação de orçamento ou ao interagir com nosso site, incluindo:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Nome completo</li>
                    <li>Nome da empresa</li>
                    <li>Endereço de e-mail</li>
                    <li>Número de telefone ou WhatsApp</li>
                    <li>Cidade e estado de localização</li>
                    <li>Informações sobre o tipo de implemento de interesse</li>
                    <li>Mensagens e comunicações enviadas através de nossos canais</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">
                    Também coletamos automaticamente dados de navegação, como endereço IP, tipo de 
                    navegador, páginas visitadas e tempo de permanência no site, através de cookies 
                    e tecnologias similares.
                  </p>
                </div>
              </div>

              {/* Seção 2 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">2. Como utilizamos os dados</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    As informações coletadas são utilizadas para as seguintes finalidades:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Responder a solicitações de orçamento e contatos comerciais</li>
                    <li>Fornecer informações sobre nossos produtos e serviços</li>
                    <li>Melhorar a experiência do usuário em nosso site</li>
                    <li>Enviar comunicações comerciais e institucionais (com seu consentimento)</li>
                    <li>Cumprir obrigações legais e regulatórias</li>
                    <li>Análise estatística para melhoria de nossos processos</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">
                    Não utilizamos seus dados pessoais para fins diferentes dos informados nesta 
                    política sem obter seu consentimento prévio.
                  </p>
                </div>
              </div>

              {/* Seção 3 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">3. Compartilhamento de informações</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    A RODOTEC não vende, aluga ou comercializa seus dados pessoais com terceiros. 
                    Podemos compartilhar informações apenas nas seguintes situações:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Com prestadores de serviços que nos auxiliam nas operações do site (hospedagem, 
                        análise de dados), sob rigorosos acordos de confidencialidade</li>
                    <li>Com parceiros comerciais autorizados, apenas quando necessário para atender 
                        sua solicitação</li>
                    <li>Quando exigido por lei ou ordem judicial</li>
                    <li>Para proteger nossos direitos legais, segurança ou propriedade</li>
                  </ul>
                </div>
              </div>

              {/* Seção 4 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">4. Segurança dos dados</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Implementamos medidas técnicas e organizacionais adequadas para proteger suas 
                    informações pessoais contra acesso não autorizado, perda, destruição ou alteração. 
                    Isso inclui:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Criptografia de dados sensíveis durante a transmissão (SSL/TLS)</li>
                    <li>Controles de acesso restritos aos colaboradores autorizados</li>
                    <li>Monitoramento contínuo de segurança de nossos sistemas</li>
                    <li>Backups regulares e procedimentos de recuperação</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">
                    Embora nos esforcemos para proteger seus dados, nenhum método de transmissão 
                    pela internet é 100% seguro. Recomendamos que você também tome precauções ao 
                    compartilhar informações online.
                  </p>
                </div>
              </div>

              {/* Seção 5 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">5. Direitos do titular dos dados</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    De acordo com a Lei Geral de Proteção de Dados (LGPD), você possui os seguintes 
                    direitos em relação aos seus dados pessoais:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li><strong className="text-white">Confirmação e acesso:</strong> Saber se tratamos seus dados e solicitar cópia deles</li>
                    <li><strong className="text-white">Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
                    <li><strong className="text-white">Anonimização ou eliminação:</strong> Solicitar a exclusão de dados desnecessários ou excessivos</li>
                    <li><strong className="text-white">Portabilidade:</strong> Solicitar a transferência de seus dados para outro fornecedor</li>
                    <li><strong className="text-white">Revogação do consentimento:</strong> Retirar seu consentimento para tratamento de dados</li>
                    <li><strong className="text-white">Oposição:</strong> Se opor ao tratamento de dados em determinadas situações</li>
                  </ul>
                  <p className="mt-4">
                    Para exercer qualquer desses direitos, entre em contato através do e-mail:{" "}
                    <a href="mailto:privacidade@rodotecse.com.br" className="text-[#3B4BA8] hover:underline">
                      privacidade@rodotecse.com.br
                    </a>
                  </p>
                </div>
              </div>

              {/* Seção 6 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">6. Cookies e tecnologias similares</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Nosso site utiliza cookies e tecnologias similares para melhorar sua experiência 
                    de navegação. Cookies são pequenos arquivos de texto armazenados no seu dispositivo 
                    que nos ajudam a:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Lembrar suas preferências e configurações</li>
                    <li>Entender como você interage com nosso site</li>
                    <li>Analisar o tráfego e comportamento dos visitantes</li>
                    <li>Melhorar o desempenho e funcionalidade do site</li>
                  </ul>
                  <p className="mt-4">
                    Você pode gerenciar ou desativar cookies através das configurações do seu navegador. 
                    No entanto, isso pode afetar algumas funcionalidades do site.
                  </p>
                </div>
              </div>

              {/* Seção 7 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">7. Retenção de dados</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades 
                    para as quais foram coletados, incluindo:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Atendimento de solicitações e prestação de serviços</li>
                    <li>Cumprimento de obrigações legais e regulatórias</li>
                    <li>Resolução de disputas e aplicação de acordos</li>
                  </ul>
                  <p className="mt-4">
                    Após esse período, os dados serão excluídos ou anonimizados de forma segura, 
                    exceto quando a legislação exigir sua manutenção por prazo superior.
                  </p>
                </div>
              </div>

              {/* Seção 8 */}
              <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">8. Alterações nesta política</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Esta Política de Privacidade pode ser atualizada periodicamente para refletir 
                    mudanças em nossas práticas ou em exigências legais. A versão mais recente estará 
                    sempre disponível nesta página, com a data da última atualização indicada no topo.
                  </p>
                  <p>
                    Recomendamos que você revise esta política regularmente. Caso sejam feitas alterações 
                    significativas, notificaremos você através de avisos em nosso site ou por e-mail.
                  </p>
                </div>
              </div>

              {/* Seção 9 */}
              <div className="bg-gradient-to-br from-[#3B4BA8]/10 to-[#3B4BA8]/5 border border-[#3B4BA8]/20 rounded-3xl p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-white mb-4">9. Canal de contato</h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos 
                    seus dados pessoais, entre em contato conosco:
                  </p>
                  <div className="mt-6 space-y-3 text-white">
                    <p>
                      <strong className="text-[#3B4BA8]">E-mail de Privacidade:</strong>{" "}
                      <a href="mailto:privacidade@rodotecse.com.br" className="hover:underline">
                        privacidade@rodotecse.com.br
                      </a>
                    </p>
                    <p>
                      <strong className="text-[#3B4BA8]">E-mail Geral:</strong>{" "}
                      <a href="mailto:contato@rodotecse.com.br" className="hover:underline">
                        contato@rodotecse.com.br
                      </a>
                    </p>
                    <p>
                      <strong className="text-[#3B4BA8]">Telefone:</strong>{" "}
                      <a href="tel:+557932412329" className="hover:underline">
                        (79) 3241-2329
                      </a>
                    </p>
                    <p>
                      <strong className="text-[#3B4BA8]">Endereço:</strong>{" "}
                      R. S Pq Dos Farois, 169 - Lot. Itacanema II, Nossa Sra. do Socorro - SE, 49160-000
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-6">
                    A RODOTEC está comprometida em responder suas solicitações no prazo máximo 
                    de 15 dias úteis, conforme estabelecido pela legislação vigente.
                  </p>
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

