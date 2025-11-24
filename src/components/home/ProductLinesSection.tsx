import { Link } from "react-router-dom";
import { ArrowRight, Truck, Container, Anchor, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "carrocerias",
    title: "Carrocerias",
    description: "Leveza e resistência para grãos e carga geral.",
    icon: Truck,
    features: ["Alumínio Aeronáutico", "Assoalho Antiderrapante", "Tara Reduzida"],
    link: "/produtos?categoria=carrocerias"
  },
  {
    id: "reboques",
    title: "Reboques",
    description: "Estabilidade e segurança para longas distâncias.",
    icon: Container,
    features: ["Chassi Reforçado", "Suspensão Pneumática", "Freios ABS/EBS"],
    link: "/produtos?categoria=reboques"
  },
  {
    id: "tanques",
    title: "Tanques",
    description: "Segurança máxima para transporte de líquidos.",
    icon: Anchor, // Using Anchor as a placeholder for Tank/Liquid
    features: ["Aço Inox 304", "Isolamento Térmico", "Certificação Inmetro"],
    link: "/produtos?categoria=tanques"
  },
  {
    id: "implementos",
    title: "Especiais",
    description: "Projetos customizados para necessidades específicas.",
    icon: Package,
    features: ["Projeto Sob Medida", "Alta Complexidade", "Consultoria Técnica"],
    link: "/produtos?categoria=implementos"
  }
];

export const ProductLinesSection = () => {
  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-brand font-bold uppercase tracking-widest mb-2">Nossas Linhas</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold text-white">
              PRODUTOS DE <span className="text-brand">ALTA PERFORMANCE</span>
            </h3>
          </div>
          <Link to="/produtos">
            <Button variant="ghost" className="text-white hover:text-brand group">
              Ver Catálogo Completo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="group relative bg-background border border-border rounded-xl overflow-hidden hover:border-brand/50 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="h-24 w-24 text-brand" />
                </div>

                <div className="p-8 h-full flex flex-col">
                  <div className="mb-6 bg-surface-2 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                    <Icon className="h-7 w-7 text-muted-foreground group-hover:text-white" />
                  </div>

                  <h4 className="text-2xl font-bold text-white mb-3">{cat.title}</h4>
                  <p className="text-muted-foreground mb-6 flex-grow">{cat.description}</p>

                  <ul className="space-y-2 mb-8">
                    {cat.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to={cat.link}>
                    <Button className="w-full bg-surface-2 hover:bg-brand text-white border-none">
                      Ver Linha
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
