import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MegaMenu } from "@/components/MegaMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Produtos", href: "/produtos", hasMega: true },
    { name: "Tecnologia", href: "/tecnologia" },
    { name: "Distribuidores", href: "/distribuidores" },
    { name: "Sobre Nós", href: "/sobre" },
    { name: "Novidades", href: "/novidades" },
    { name: "Contato", href: "/contato" },
    { name: "Downloads", href: "/downloads" },
  ];

  // Close mega menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > 120) {
        setMegaMenuOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (megaMenuOpen) {
        setMegaMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [megaMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${lastScrollY > 20
          ? "bg-background/90 backdrop-blur-md border-border py-2 shadow-lg"
          : "bg-transparent border-transparent py-6"
        }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/20 transition-transform group-hover:scale-105">
            <span className="font-heading text-2xl font-bold">R</span>
          </div>
          <span className="font-heading text-2xl font-bold text-white tracking-tight group-hover:text-brand-100 transition-colors">RODOTEC</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-2 lg:flex">
          {navigation.map((item) => (
            item.hasMega ? (
              <button
                key={item.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setMegaMenuOpen(!megaMenuOpen);
                }}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white hover:bg-white/5 rounded-md uppercase tracking-wide"
              >
                {item.name}
                <ChevronDown className={`h-4 w-4 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white hover:bg-white/5 rounded-md uppercase tracking-wide"
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden text-gray-300 hover:text-white hover:bg-white/10 sm:flex"
          >
            <Globe className="h-5 w-5" />
          </Button>

          <Link to="/contato" className="hidden lg:block">
            <Button className="bg-brand hover:bg-brand-600 text-white font-bold shadow-lg shadow-brand/20 border border-brand-400/20">
              PEDIR ORÇAMENTO
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-surface border-l border-border">
              <nav className="flex flex-col space-y-4 pt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.hasMega ? "/produtos" : item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-300 transition-colors hover:text-white hover:pl-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/contato" className="block pt-4">
                  <Button className="bg-brand hover:bg-brand-600 text-white w-full font-bold">
                    PEDIR ORÇAMENTO
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />
    </header>
  );
};

export default Header;
