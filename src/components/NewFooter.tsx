import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function NewFooter() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    // If not on homepage, navigate to homepage first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-[#030712] border-t border-white/5 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:pl-28 lg:pr-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 lg:mb-16">
          {/* Sobre a Rodotec */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-[#3B4BA8] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-tight">RODOTEC</span>
                <p className="text-gray-500 text-xs">Equipamentos Rodoviários</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Há mais de 12 anos fabricando implementos rodoviários de alta performance, 
              com foco em resistência, segurança e produtividade para frotas de todo o Brasil.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex items-center gap-3">
              <a 
                href="#facebook" 
                className="w-10 h-10 bg-[#0B1220] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3B4BA8] hover:border-[#3B4BA8] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/rodotecse/?hl=pt" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0B1220] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3B4BA8] hover:border-[#3B4BA8] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#linkedin" 
                className="w-10 h-10 bg-[#0B1220] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3B4BA8] hover:border-[#3B4BA8] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white mb-6 font-semibold">Links Rápidos</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <Link to="/" className="block hover:text-white transition-colors hover:translate-x-1 transform duration-200">Início</Link>
              <Link to="/quem-somos" className="block hover:text-white transition-colors hover:translate-x-1 transform duration-200">Quem Somos</Link>
              <Link to="/produtos" className="block hover:text-white transition-colors hover:translate-x-1 transform duration-200">Produtos</Link>
              <Link to="/servicos" className="block hover:text-white transition-colors hover:translate-x-1 transform duration-200">Serviços</Link>
              <Link to="/representantes" className="block hover:text-white transition-colors hover:translate-x-1 transform duration-200">Representantes</Link>
              <Link to="/contato" className="block hover:text-white transition-colors hover:translate-x-1 transform duration-200">Contato</Link>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white mb-6 font-semibold">Contato</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#3B4BA8] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="text-gray-400 leading-relaxed">
                  R. S Pq Dos Farois, 169<br />
                  Lot. Itacanema II<br />
                  N. Sra. do Socorro - SE<br />
                  49160-000
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#3B4BA8] flex-shrink-0" strokeWidth={1.5} />
                <a href="tel:+5579991412582" className="text-gray-400 hover:text-white transition-colors">
                  (79) 99141-2582
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#3B4BA8] flex-shrink-0" strokeWidth={1.5} />
                <a href="mailto:contato@rodotecse.com.br" className="text-gray-400 hover:text-white transition-colors text-xs break-all">
                  contato@rodotecse.com.br
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Rodotec Equipamentos Rodoviários. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>

      {/* Padding extra para mobile bottom navigation */}
      <div className="lg:hidden h-20" />
    </footer>
  );
}

