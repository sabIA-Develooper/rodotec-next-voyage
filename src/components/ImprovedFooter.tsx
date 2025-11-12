import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
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
    <footer className="bg-card border-t border-border">
      {/* Top CTA Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Encontre um Distribuidor</h3>
            <p className="text-muted-foreground">Localize o representante mais próximo de você</p>
          </div>
          <div className="flex gap-3">
            <Link to="/distribuidores">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                Ver no Mapa
              </Button>
            </Link>
            <a href="tel:+551140025000">
              <Button size="lg" variant="outline">
                <Phone className="h-5 w-5 mr-2" />
                (11) 4002-5000
              </Button>
            </a>
          </div>
        </div>
      </div>

      <Separator />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="font-heading text-xl font-bold text-primary-foreground">R</span>
              </div>
              <span className="font-heading text-xl font-bold text-foreground">RODOTEC</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Excelência em implementos rodoviários desde 1985
            </p>
            <div className="flex gap-2">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Youtube className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase text-sm tracking-wide">Produtos</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase text-sm tracking-wide">Sobre Nós</h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase text-sm tracking-wide">Tecnologia</h4>
            <ul className="space-y-2">
              {techLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold text-foreground mb-3 uppercase text-sm tracking-wide">Distribuidores</h4>
              <ul className="space-y-2">
                {distributorLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & News Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase text-sm tracking-wide">Novidades</h4>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/novidades" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog Rodotec
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Downloads
                </Link>
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3 uppercase text-sm tracking-wide">Contato</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Av. Industrial, 1000<br />São Paulo, SP - Brasil</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+551140025000" className="hover:text-primary">(11) 4002-5000</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:contato@rodotec.com.br" className="hover:text-primary">contato@rodotec.com.br</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Rodotec. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link to="/privacidade" className="hover:text-primary transition-colors">
              Privacidade
            </Link>
            <Link to="/termos" className="hover:text-primary transition-colors">
              Termos de Uso
            </Link>
            <Link to="/lgpd" className="hover:text-primary transition-colors">
              LGPD
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
