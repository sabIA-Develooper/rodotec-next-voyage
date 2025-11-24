import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function ImprovedFooter() {
  const productLinks = [
    { name: 'Carrocerias', href: '/produtos/carrocerias' },
    { name: 'Reboques', href: '/produtos/reboques' },
    { name: 'Implementos', href: '/produtos/implementos' },
    { name: 'Peças & Reposição', href: '/produtos/pecas' },
  ];

  const aboutLinks = [
    { name: 'Nossa História', href: '/sobre#historia' },
    { name: 'Missão e Valores', href: '/sobre#missao' },
    { name: 'Unidades', href: '/sobre#unidades' },
    { name: 'Qualidade', href: '/sobre#qualidade' },
  ];

  const techLinks = [
    { name: 'Processos', href: '/tecnologia#processos' },
    { name: 'Soldagem Avançada', href: '/tecnologia#soldagem' },
    { name: 'Pintura Industrial', href: '/tecnologia#pintura' },
  ];

  const distributorLinks = [
    { name: 'Brasil', href: '/distribuidores?region=brasil' },
    { name: 'América Latina', href: '/distribuidores?region=latam' },
    { name: 'Seja um Distribuidor', href: '/contato?subject=distribuidor' },
  ];

  return (
    <footer className="bg-background border-t border-border pt-16">
      {/* Top CTA Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface to-surface-2 p-10 border border-border">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Encontre um Distribuidor</h3>
              <p className="text-muted-foreground text-lg">Localize o representante mais próximo da sua operação.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link to="/distribuidores" className="w-full md:w-auto">
                <Button size="lg" className="w-full bg-brand hover:bg-brand-600 text-white font-bold h-12">
                  <MapPin className="h-5 w-5 mr-2" />
                  Ver no Mapa
                </Button>
              </Link>
              <a href="tel:+551140025000" className="w-full md:w-auto">
                <Button size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-12">
                  <Phone className="h-5 w-5 mr-2" />
                  (11) 4002-5000
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border opacity-50" />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white">
                <span className="font-heading text-xl font-bold">R</span>
              </div>
              <span className="font-heading text-xl font-bold text-white tracking-tight">RODOTEC</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Excelência em implementos rodoviários desde 1985. Tecnologia que move o Brasil.
            </p>
            <div className="flex gap-2">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-brand hover:bg-brand/10">
                  <Youtube className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-brand hover:bg-brand/10">
                  <Facebook className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-brand hover:bg-brand/10">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-brand hover:bg-brand/10">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Produtos</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Sobre Nós</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Column */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Tecnologia</h4>
            <ul className="space-y-3">
              {techLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Distribuidores</h4>
              <ul className="space-y-3">
                {distributorLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-brand transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & News Column */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Contato</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand flex-shrink-0" />
                <span>Av. Industrial, 1000<br />São Paulo, SP - Brasil</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand flex-shrink-0" />
                <a href="tel:+551140025000" className="hover:text-white transition-colors">(11) 4002-5000</a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand flex-shrink-0" />
                <a href="mailto:contato@rodotec.com.br" className="hover:text-white transition-colors">contato@rodotec.com.br</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border opacity-50" />

      {/* Bottom Bar */}
      <div className="bg-surface-2/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Rodotec. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <Link to="/privacidade" className="hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link to="/termos" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <Link to="/lgpd" className="hover:text-white transition-colors">
                LGPD
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
