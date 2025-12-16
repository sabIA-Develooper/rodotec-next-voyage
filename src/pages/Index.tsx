import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Phone, Mail, Loader2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { ImprovedFooter } from "@/components/ImprovedFooter";
import SideNav from "@/components/SideNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { repository } from "@/data/repository";

// Home Sections
import { Hero } from "@/components/home/Hero";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { ProductLinesSection } from "@/components/home/ProductLinesSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { TrustSection } from "@/components/home/TrustSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { DistributorsSection } from "@/components/home/DistributorsSection";
import { PartnershipsSection } from "@/components/home/PartnershipsSection";
import { FinalCTA } from "@/components/home/FinalCTA";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    // Inicializar repository se necessário
    repository.init();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      repository.createQuote({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        company_name: formData.company,
        product_interest: null,
        message: formData.message,
        status: 'NEW',
        internal_notes: null,
      });

      setFormSuccess(true);
      toast.success("Solicitação enviada!", {
        description: "Entraremos em contato em breve."
      });

      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        message: ""
      });

      setTimeout(() => setFormSuccess(false), 5000);
    } catch (error) {
      toast.error("Erro ao enviar", {
        description: "Tente novamente ou entre em contato por telefone."
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Header />
      <SideNav />

      {/* Hero Section */}
      <Hero />

      {/* Solutions Section */}
      <SolutionsSection />

      {/* Product Lines Section */}
      <ProductLinesSection />

      {/* Technology Section */}
      <TechnologySection />

      {/* Trust Section */}
      <TrustSection />

      {/* Partnerships Section */}
      <PartnershipsSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Distributors Section */}
      <DistributorsSection />

      {/* Final CTA Section */}
      <FinalCTA />

      {/* Contact Form Section */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                Solicite um Orçamento
              </h2>
              <p className="text-lg text-white/80">
                Preencha o formulário e entraremos em contato em até 24 horas
              </p>
            </div>

            {formSuccess ? (
              <Card className="border-green-500/40 bg-green-500/10 p-8 text-center glass-dark border-white/20">
                <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
                <h3 className="mb-2 font-heading text-2xl font-bold text-white">
                  Solicitação Enviada!
                </h3>
                <p className="text-white/80">
                  Recebemos sua mensagem e entraremos em contato em breve.
                </p>
              </Card>
            ) : (
              <Card className="glass-dark border-white/20 p-8 md:p-12">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/90">Nome Completo *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Seu nome"
                        disabled={formLoading}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white/90">Empresa</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nome da empresa"
                        disabled={formLoading}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white/90">Telefone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        disabled={formLoading}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/90">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        disabled={formLoading}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white/90">Mensagem *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Conte-nos sobre seu projeto ou necessidade"
                      rows={5}
                      disabled={formLoading}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-brand hover:bg-brand-600 text-white"
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Solicitação
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            )}

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Card className="glass-dark border-white/20 p-6 text-center">
                <Phone className="mx-auto mb-3 h-8 w-8 text-brand" />
                <h3 className="mb-2 font-heading font-bold text-white">
                  Telefone
                </h3>
                <a href="tel:+551130000000" className="text-brand hover:underline">
                  (11) 3000-0000
                </a>
              </Card>
              <Card className="glass-dark border-white/20 p-6 text-center">
                <Mail className="mx-auto mb-3 h-8 w-8 text-brand" />
                <h3 className="mb-2 font-heading font-bold text-white">
                  E-mail
                </h3>
                <a href="mailto:contato@rodotec.com.br" className="text-brand hover:underline">
                  contato@rodotec.com.br
                </a>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <ImprovedFooter />
    </div>
  );
};

export default Index;
