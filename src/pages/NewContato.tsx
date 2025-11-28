import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/Navbar";
import { NewSideNav } from "@/components/NewSideNav";
import { NewFooter } from "@/components/NewFooter";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import api from "@/services/api";
import type { Product } from "@/types/api";
import { toast } from "sonner";

export default function NewContato() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    productId: "",
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
      if (!formData.name || !formData.email || !formData.message) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        setIsSubmitting(false);
        return;
      }

      // Enviar para API
      await api.quotes.createPublic({
        nome: formData.name,
        telefone: "",
        email: formData.email,
        empresa: undefined,
        produto: formData.productId || undefined,
        mensagem: formData.message,
      });

      setIsSubmitted(true);
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Retornaremos em breve. Obrigado pelo contato.',
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        productId: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting contact:', error);
      toast.error('Erro ao enviar mensagem', {
        description: error?.message || 'Por favor, tente novamente mais tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contato"
        description="Entre em contato com a Rodotec. Nossa equipe está pronta para atender você e esclarecer suas dúvidas sobre implementos rodoviários. Telefone, e-mail e localização."
        keywords="contato rodotec, telefone rodotec, email rodotec, endereço rodotec sergipe"
      />
      
      <div className="min-h-screen bg-[#020617] pt-20">
        <Navbar />
        <NewSideNav />
        <ScrollToTop />
        <WhatsAppButton />
        
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 pt-8">
          <Breadcrumbs items={[{ label: "Contato" }]} />
        </div>

        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/50 to-transparent" />
          
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 relative">
            <div className="max-w-4xl">
              <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">
                Fale conosco
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Entre em <span className="text-[#3B4BA8]">Contato</span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                Nossa equipe está pronta para atender você. Entre em contato por telefone, 
                e-mail ou preencha o formulário abaixo. Teremos prazer em ajudar.
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
                  <h2 className="text-2xl font-bold text-white mb-6">Envie sua mensagem</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">
                        Nome <span className="text-[#3B4BA8]">*</span>
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
                  </div>

                  <div className="mb-6">
                    <label className="block text-white mb-2 text-sm font-medium">
                      Assunto <span className="text-[#3B4BA8]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#3B4BA8] focus:outline-none transition-colors"
                      placeholder="Sobre o que você gostaria de falar?"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-white mb-2 text-sm font-medium">
                      Mensagem <span className="text-[#3B4BA8]">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#3B4BA8] focus:outline-none transition-colors resize-none"
                      placeholder="Digite sua mensagem aqui..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2 group shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin w-5 h-5 border-2 border-white/50 border-t-[#3B4BA8] rounded-full" />
                    ) : (
                      <>
                        Enviar mensagem
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                      </>
                    )}
                  </button>

                  {isSubmitted && (
                    <p className="text-gray-500 text-sm mt-4 text-center">
                      <CheckCircle className="w-5 h-5 inline-block mr-1 text-[#3B4BA8]" />
                      Mensagem enviada com sucesso!
                    </p>
                  )}

                  {!isSubmitted && (
                    <p className="text-gray-500 text-sm mt-4 text-center">
                      Campos marcados com <span className="text-[#3B4BA8]">*</span> são obrigatórios
                    </p>
                  )}
                </form>
              </div>

              {/* Info Lateral */}
              <div className="space-y-6">
                {/* Informações de Contato */}
                <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 shadow-lg">
                  <h3 className="text-white text-xl font-bold mb-6">Informações de contato</h3>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#3B4BA8]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#3B4BA8]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Endereço</p>
                        <p className="text-white">
                          R. S Pq Dos Farois, 169 - Lot. Itacanema II, Nossa Sra. do Socorro - SE, 49160-000
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#3B4BA8]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-[#3B4BA8]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Telefone</p>
                        <a
                          href="tel:+5579991412582"
                          className="text-white hover:text-[#3B4BA8] transition-colors block"
                        >
                          (79) 99141-2582
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#3B4BA8]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[#3B4BA8]" strokeWidth={1.5} />
                      </div>
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
                      <div className="w-10 h-10 bg-[#3B4BA8]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-[#3B4BA8]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Horário de atendimento</p>
                        <p className="text-white text-sm">
                          Segunda a Sexta: 8h às 18h<br />
                          Sábado: 8h às 12h<br />
                          Domingo: Fechado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Redes Sociais */}
                <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-8 shadow-lg">
                  <h3 className="text-white text-xl font-bold mb-6">Redes sociais</h3>
                  
                  <div className="flex items-center gap-3">
                    <a 
                      href="#facebook" 
                      className="w-12 h-12 bg-[#020617] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3B4BA8] hover:border-[#3B4BA8] transition-all"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.instagram.com/rodotecse/?hl=pt" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#020617] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3B4BA8] hover:border-[#3B4BA8] transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a 
                      href="#linkedin" 
                      className="w-12 h-12 bg-[#020617] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3B4BA8] hover:border-[#3B4BA8] transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Mapa */}
                <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-6 shadow-lg">
                  <h3 className="text-white font-bold mb-4">Localização</h3>
                  <div className="aspect-video bg-[#020617] rounded-2xl overflow-hidden border border-white/10">
                    <iframe
                      src="https://maps.google.com/maps?q=Rua+S+Parque+dos+Farois,+169,+Loteamento+Itacanema+II,+Nossa+Senhora+do+Socorro,+SE,+49160-000,+Brazil&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localização Rodotec"
                    />
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Rua+S+Parque+dos+Farois,+169,+Loteamento+Itacanema+II,+Nossa+Senhora+do+Socorro,+SE,+49160-000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-3 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-white/40 transition-all font-medium text-center text-sm block"
                  >
                    Ver rota no Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Orçamento */}
        <section className="py-16 sm:py-20">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
            <div className="bg-gradient-to-br from-[#0B1220] to-[#020617] border border-[#3B4BA8]/20 rounded-3xl p-8 lg:p-12 text-center shadow-lg">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Precisa de um orçamento específico?
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                Acesse nosso formulário de orçamento para receber uma proposta personalizada 
                para seu projeto de implemento rodoviário.
              </p>
              
              <Link
                to="/orcamento"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-xl transition-all font-medium gap-2 group shadow-lg"
              >
                Solicitar orçamento
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>

        <NewFooter />
      </div>
    </>
  );
}

