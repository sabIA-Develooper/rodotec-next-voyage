import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";
import api from "@/services/api";
import type { Product } from "@/types/api";
import { toast } from "sonner";

export default function NewOrcamento() {
  const location = useLocation();
  const productName = location.state?.productName;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productType: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.products.list({ ativo: true, limit: 100 });
      setProducts(res.dados || []);
    } catch (e) {
      console.error('Erro ao carregar produtos:', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validação básica
      if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        setIsSubmitting(false);
        return;
      }

      // Enviar para API
      await api.quotes.createPublic({
        nome: formData.name,
        telefone: formData.phone,
        email: formData.email,
        empresa: formData.company || undefined,
        produto: formData.productType || undefined,
        mensagem: formData.message,
      });

      setIsSubmitted(true);
      toast.success('Pedido de orçamento enviado com sucesso!', {
        description: 'Em breve, nossa equipe técnica entrará em contato.',
      });

      // Reset form
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        productType: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting quote request:', error);
      toast.error('Erro ao enviar pedido de orçamento', {
        description: error?.message || 'Por favor, tente novamente mais tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Solicitar Orçamento"
        description="Solicite um orçamento personalizado para implementos rodoviários Rodotec. Preencha o formulário e receba uma proposta sob medida para suas necessidades."
        keywords="orçamento rodotec, preço poliguindaste, cotação implementos rodoviários"
      />
      
      <div className="min-h-screen bg-[#020617] pt-20">
        <Navbar />
        <NewSideNav />
        <ScrollToTop />
        
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 pt-8">
          <Breadcrumbs items={[{ label: "Solicitar Orçamento" }]} />
        </div>

        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 to-transparent" />
          
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 relative">
            <div className="max-w-4xl">
              <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">
                Faça seu pedido
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Solicite um <span className="text-[#3B4BA8]">Orçamento</span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                Preencha o formulário abaixo com suas necessidades e nossa equipe técnica entrará 
                em contato para elaborar um orçamento personalizado. Os contratos são fechados 
                presencialmente em nossa fábrica após análise detalhada.
              </p>
            </div>
          </div>
        </section>

        {/* Formulário + Info */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Formulário */}
              <div className="lg:col-span-2">
                <form className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-lg" onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold text-white mb-6">Dados para orçamento</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">
                        Nome completo <span className="text-[#3B4BA8]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#3B4BA8] focus:outline-none transition-colors"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">Empresa</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#3B4BA8] focus:outline-none transition-colors"
                        placeholder="Nome da empresa (opcional)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">
                        E-mail <span className="text-[#3B4BA8]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#3B4BA8] focus:outline-none transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">
                        Telefone / WhatsApp <span className="text-[#3B4BA8]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#3B4BA8] focus:outline-none transition-colors"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white mb-2 text-sm font-medium">
                      Tipo de implemento <span className="text-[#3B4BA8]">*</span>
                    </label>
                    <select
                      required
                      value={formData.productType}
                      onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl text-white focus:border-[#3B4BA8] focus:outline-none transition-colors"
                    >
                      <option value="">Selecione...</option>
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.nome}
                        </option>
                      ))}
                      <option value="reforma">Reforma / Manutenção</option>
                      <option value="outros">Outros / Projeto Especial</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white mb-2 text-sm font-medium">
                      Descrição da necessidade <span className="text-[#3B4BA8]">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#3B4BA8] focus:outline-none transition-colors resize-none"
                      placeholder="Descreva detalhes como: tipo de chassi, capacidade desejada, aplicação do equipamento, prazo esperado, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2 group shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar pedido de orçamento
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                      </>
                    )}
                  </button>

                  <p className="text-gray-500 text-sm mt-4 text-center">
                    Campos marcados com <span className="text-[#3B4BA8]">*</span> são obrigatórios
                  </p>
                </form>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="bg-[#0B1220] border border-[#3B4BA8] rounded-3xl p-8 shadow-lg mt-6">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="w-5 h-5 text-[#3B4BA8]" strokeWidth={2} />
                      <p className="text-white text-sm leading-relaxed">
                        Seu pedido de orçamento foi enviado com sucesso! Em breve, nossa equipe técnica entrará em contato para fornecer um orçamento personalizado.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Info Lateral */}
              <div className="space-y-6">
                {/* Contato Rápido */}
                <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 shadow-lg">
                  <h3 className="text-white text-xl font-bold mb-6">Contato direto</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#3B4BA8] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Telefone</p>
                        <a 
                          href="tel:+557932412329"
                          className="text-white hover:text-[#3B4BA8] transition-colors"
                        >
                          (79) 3241-2329
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#3B4BA8] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <p className="text-gray-400 text-sm mb-1">E-mail</p>
                        <a 
                          href="mailto:contato@rodotecse.com.br"
                          className="text-white hover:text-[#3B4BA8] transition-colors break-all text-sm"
                        >
                          contato@rodotecse.com.br
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#3B4BA8] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Endereço</p>
                        <p className="text-white text-sm">
                          R. S Pq Dos Farois, 169<br />
                          Lot. Itacanema II<br />
                          N. Sra. do Socorro - SE<br />
                          49160-000
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#3B4BA8] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Horário</p>
                        <p className="text-white text-sm">
                          Seg - Sex: 8h às 18h<br />
                          Sáb: 8h às 12h
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <Link
                      to="/contato"
                      className="w-full py-3 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-white/40 transition-all font-medium text-center block"
                    >
                      Ver localização
                    </Link>
                  </div>
                </div>

                {/* Informações Importantes */}
                <div className="bg-gradient-to-br from-[#3B4BA8]/10 to-[#3B4BA8]/5 border border-[#3B4BA8]/20 rounded-3xl p-8">
                  <h3 className="text-white text-lg font-bold mb-4">Importante</h3>
                  <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#3B4BA8] rounded-full mt-2 flex-shrink-0" />
                      <span>Orçamentos são elaborados sem compromisso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#3B4BA8] rounded-full mt-2 flex-shrink-0" />
                      <span>Contratos são fechados presencialmente na fábrica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#3B4BA8] rounded-full mt-2 flex-shrink-0" />
                      <span>Prazo de resposta: até 48 horas úteis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#3B4BA8] rounded-full mt-2 flex-shrink-0" />
                      <span>Projetos especiais sob medida disponíveis</span>
                    </li>
                  </ul>
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

