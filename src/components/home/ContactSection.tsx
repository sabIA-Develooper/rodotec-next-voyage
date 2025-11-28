import { Send, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/services/api";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    city: "",
    productType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

      toast.success('Solicitação enviada com sucesso!', {
        description: 'Retornaremos em breve. Obrigado pelo contato.',
      });

      // Reset form
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        city: "",
        productType: "",
        message: "",
      });
    } catch (error: any) {
      console.error('Error submitting quote request:', error);
      toast.error('Erro ao enviar solicitação', {
        description: error?.message || 'Por favor, tente novamente mais tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[#020617] relative overflow-hidden" id="contato">
      {/* Linha decorativa */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-[#3B4BA8] text-sm uppercase tracking-widest mb-4 font-medium">Entre em Contato</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            <span className="text-white">Solicite um </span>
            <span className="text-[#3B4BA8]">orçamento</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Conte o que sua frota precisa e nós indicamos o implemento ideal para sua operação
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Formulário - 2 colunas em desktop */}
          <div className="lg:col-span-2 bg-[#0B1220] border border-white/5 rounded-3xl p-6 lg:p-10 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Nome */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block font-medium">Nome completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite seu nome"
                    className="w-full px-4 py-3.5 bg-[#020617] border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-[#3B4BA8] focus:outline-none focus:ring-2 focus:ring-[#3B4BA8]/20 transition-all"
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block font-medium">Empresa</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nome da empresa"
                    className="w-full px-4 py-3.5 bg-[#020617] border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-[#3B4BA8] focus:outline-none focus:ring-2 focus:ring-[#3B4BA8]/20 transition-all"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block font-medium">Telefone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3.5 bg-[#020617] border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-[#3B4BA8] focus:outline-none focus:ring-2 focus:ring-[#3B4BA8]/20 transition-all"
                  />
                </div>

                {/* E-mail */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block font-medium">E-mail *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3.5 bg-[#020617] border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-[#3B4BA8] focus:outline-none focus:ring-2 focus:ring-[#3B4BA8]/20 transition-all"
                  />
                </div>

                {/* Cidade/Estado */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block font-medium">Cidade/Estado</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Cidade - UF"
                    className="w-full px-4 py-3.5 bg-[#020617] border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-[#3B4BA8] focus:outline-none focus:ring-2 focus:ring-[#3B4BA8]/20 transition-all"
                  />
                </div>

                {/* Tipo de implemento */}
                <div>
                  <label className="text-gray-400 text-sm mb-2 block font-medium">Tipo de implemento</label>
                  <select 
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#020617] border border-white/10 rounded-2xl text-white focus:border-[#3B4BA8] focus:outline-none focus:ring-2 focus:ring-[#3B4BA8]/20 transition-all"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="poliguindaste">Poliguindaste</option>
                    <option value="carroceria">Carroceria</option>
                    <option value="basculante">Caçamba Basculante</option>
                    <option value="tanque">Tanque</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              {/* Mensagem */}
              <div className="mb-6">
                <label className="text-gray-400 text-sm mb-2 block font-medium">Mensagem *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Conte mais sobre sua necessidade, tipo de operação, volume de carga..."
                  className="w-full px-4 py-3.5 bg-[#020617] border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-[#3B4BA8] focus:outline-none focus:ring-2 focus:ring-[#3B4BA8]/20 transition-all resize-none"
                />
              </div>

              {/* Botão */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#3B4BA8] hover:bg-[#4C5EBF] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-2xl transition-all font-medium flex items-center justify-center gap-2 group shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar solicitação
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Cards de Contato - 1 coluna */}
          <div className="space-y-6">
            {/* Telefone */}
            <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-6 lg:p-8 hover:bg-[#0D1528] hover:border-[#3B4BA8]/30 transition-all group shadow-lg">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:border-[#3B4BA8]/40 transition-all">
                <Phone className="w-6 h-6 lg:w-7 lg:h-7 text-[#3B4BA8]" strokeWidth={1.5} />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Telefone</h3>
              <p className="text-gray-400 mb-4 text-sm">Ligue para nossa central</p>
              <a href="tel:+557932412329" className="text-[#3B4BA8] hover:text-white transition-colors font-medium">
                (79) 3241-2329
              </a>
            </div>

            {/* E-mail */}
            <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-6 lg:p-8 hover:bg-[#0D1528] hover:border-[#3B4BA8]/30 transition-all group shadow-lg">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:border-[#3B4BA8]/40 transition-all">
                <Mail className="w-6 h-6 lg:w-7 lg:h-7 text-[#3B4BA8]" strokeWidth={1.5} />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">E-mail</h3>
              <p className="text-gray-400 mb-4 text-sm">Envie sua mensagem</p>
              <a href="mailto:contato@rodotecse.com.br" className="text-[#3B4BA8] hover:text-white transition-colors text-sm font-medium break-all">
                contato@rodotecse.com.br
              </a>
            </div>

            {/* Horário */}
            <div className="bg-[#0B1220] border border-white/5 rounded-3xl p-6 lg:p-8 hover:bg-[#0D1528] hover:border-[#3B4BA8]/30 transition-all group shadow-lg">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#3B4BA8]/10 border border-[#3B4BA8]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:border-[#3B4BA8]/40 transition-all">
                <Clock className="w-6 h-6 lg:w-7 lg:h-7 text-[#3B4BA8]" strokeWidth={1.5} />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Horário</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Seg - Sex: 08h às 18h<br />
                Sábado: 08h às 12h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

