import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Truck, Box, Container, Wrench, Layers, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: "carrocerias", label: "Carrocerias", icon: Truck, path: "/produtos", color: "rodotec-blue" },
    { id: "sobre-chassi", label: "Sobre-Chassi", icon: Box, path: "/produtos", color: "rodotec-blue" },
    { id: "reboques", label: "Reboques", icon: Container, path: "/produtos", color: "rodotec-blue" },
    { id: "pecas", label: "Peças & Reposição", icon: Wrench, path: "/produtos", color: "rodotec-blue" },
    { id: "tecnologia", label: "Tecnologia", icon: Layers, path: "/tecnologia", color: "rodotec-blue" },
    { id: "distribuidores", label: "Distribuidores", icon: MapPin, path: "/distribuidores", color: "tech-gold" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        "fixed left-0 top-20 z-40 hidden h-[calc(100vh-5rem)] bg-steel/95 backdrop-blur-sm transition-all duration-300 lg:block",
        isExpanded ? "w-80" : "w-24"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="flex h-full flex-col gap-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "group flex items-center gap-4 rounded-xl p-4 transition-all duration-200",
                active
                  ? `bg-${item.color} text-white shadow-[0_0_32px_hsl(var(--${item.color})/0.3)]`
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("h-6 w-6 shrink-0", active && "animate-pulse")} />
              <span
                className={cn(
                  "whitespace-nowrap font-medium transition-all duration-300",
                  isExpanded ? "opacity-100" : "opacity-0 w-0"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Chevron Pattern Accent */}
      <div className="chevron-pattern absolute bottom-0 left-0 right-0 h-32 opacity-10" />
    </aside>
  );
};

export default SideNav;
