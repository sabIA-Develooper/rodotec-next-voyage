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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-heading text-xl font-bold text-primary-foreground">R</span>
          </div>
          <span className="font-heading text-xl font-bold text-foreground">RODOTEC</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-1 lg:flex">
          {navigation.map((item) => (
            item.hasMega ? (
              <button
                key={item.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setMegaMenuOpen(!megaMenuOpen);
                }}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-muted/50 rounded-md"
              >
                {item.name}
                <ChevronDown className={`h-4 w-4 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-muted/50 rounded-md"
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/80 hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-foreground/80 hover:text-foreground sm:flex"
          >
            <Globe className="h-5 w-5" />
          </Button>

          <Link to="/contato" className="hidden lg:block">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Pedir Orçamento
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-card">
              <nav className="flex flex-col space-y-4 pt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.hasMega ? "/produtos" : item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/contato" className="block">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-6 w-full">
                    Pedir Orçamento
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
