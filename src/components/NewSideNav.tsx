import { Truck, Package, MapPin, Phone, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function NewSideNav() {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", icon: Home, label: "Início" },
    { id: "produtos", icon: Package, label: "Produtos" },
    { id: "tecnologia", icon: Truck, label: "Tecnologia" },
    { id: "localizacao", icon: MapPin, label: "Localização" },
    { id: "contato", icon: Phone, label: "Contato" },
  ];

  // Scroll spy - detecta seção ativa
  useEffect(() => {
    const handleScroll = () => {
      // If on products page, keep produtos active
      if (location.pathname.startsWith("/produtos")) {
        setActiveSection("produtos");
        return;
      }

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    // Handle produtos specially - navigate to catalog
    if (id === "produtos") {
      navigate("/produtos");
      return;
    }

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
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-20 bg-[#030712]/95 backdrop-blur-md border-r border-white/5 z-40">
        <div className="flex flex-col items-center justify-center h-full py-8 gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                activeSection === item.id 
                  ? "bg-[#3B4BA8] text-white shadow-lg shadow-[#3B4BA8]/40" 
                  : "bg-[#0B1220] text-gray-400 hover:bg-[#0D1528] hover:text-white"
              }`}
            >
              <item.icon className="w-6 h-6" strokeWidth={1.5} />
              
              {/* Tooltip */}
              <span className="absolute left-full ml-4 px-3 py-2 bg-[#3B4BA8] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium shadow-lg">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#030712]/98 backdrop-blur-md border-t border-white/10 z-50 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                activeSection === item.id 
                  ? "text-[#3B4BA8]" 
                  : "text-gray-400"
              }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

