import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RodotecLogo } from "./RodotecLogo";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Início", path: "/" },
    { name: "Quem Somos", path: "/quem-somos" },
    { name: "Produtos", path: "/produtos" },
    { name: "Serviços", path: "/servicos" },
    { name: "Representantes", path: "/representantes" },
    { name: "Contato", path: "/contato" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/98 backdrop-blur-md border-b border-white/5" role="navigation" aria-label="Navegação principal">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-24 lg:pl-28 h-20 flex items-center justify-between">
        {/* Logo */}
        <RodotecLogo variant="navbar" showText={false} />

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8" role="menubar">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              role="menuitem"
              className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#030712] rounded px-2 py-1 ${
                isActive(item.path)
                  ? "text-[#3B4BA8]"
                  : "text-gray-300 hover:text-white"
              }`}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/orcamento"
            className="hidden sm:block px-5 py-2.5 bg-[#3B4BA8] hover:bg-[#4C5EBF] text-white rounded-lg transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] focus:ring-offset-2 focus:ring-offset-[#030712]"
          >
            Pedir Orçamento
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] rounded"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-[#030712] border-t border-white/5" role="menu">
          <div className="px-6 py-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                role="menuitem"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B4BA8] rounded px-2 ${
                  isActive(item.path)
                    ? "text-[#3B4BA8]"
                    : "text-gray-300 hover:text-white"
                }`}
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/orcamento"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full mt-3 px-5 py-3 bg-[#3B4BA8] text-white rounded-lg font-medium text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#3B4BA8]"
            >
              Pedir Orçamento
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

