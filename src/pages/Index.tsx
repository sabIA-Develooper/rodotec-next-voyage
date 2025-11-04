import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Award, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-truck.jpg";
import productCarroceria from "@/assets/product-carroceria.jpg";
import productReboque from "@/assets/product-reboque.jpg";
import techWelding from "@/assets/tech-welding.jpg";

const Index = () => {
  const products = [
    {
      title: "Carrocerias em Alumínio",
      image: productCarroceria,
      features: [
        "Redução de até 40% na tara",
        "Maior capacidade de carga útil",
        "Resistência à corrosão"
      ],
      badge: "Nova Geração",
      link: "/produtos/carroceria"
    },
    {
      title: "Reboques Frigoríficos",
      image: productReboque,
      features: [
        "Estanqueidade superior",
        "Isolamento térmico de alta performance",
        "Durabilidade comprovada"
      ],
      link: "/produtos/reboque"
    },
    {
      title: "Implementos Especiais",
      image: productCarroceria,
      features: [
        "Projetos customizados",
        "Engenharia sob medida",
        "Menor custo total de operação"
      ],
      badge: "+ Eficiente",
      link: "/produtos"
    }
  ];

  const technologies = [
    {
      icon: Shield,
      title: "Alumínio Aeronáutico",
      description: "Ligas de alta resistência com menor peso estrutural"
    },
    {
      icon: Zap,
      title: "Solda Robotizada",
      description: "Precisão milimétrica e uniformidade perfeita"
    },
    {
      icon: Award,
      title: "Pintura Cataforética",
      description: "Proteção anticorrosiva de longa duração"
    },
    {
      icon: Users,
      title: "Testes Destrutivos",
      description: "Validação rigorosa de qualidade e segurança"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden md:h-[700px]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Caminhão RODOTEC ao entardecer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-transparent" />
        </div>
        
        <div className="relative container mx-auto flex h-full items-center px-4">
          <div className="max-w-2xl animate-fade-in space-y-6">
            <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Engenharia que move{" "}
              <span className="gradient-text">resultados</span>
            </h1>
            <p className="text-xl text-white/90 md:text-2xl">
              Carrocerias e implementos com performance, leveza e durabilidade.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/produtos">
                <button className="btn-hero">
                  Ver Produtos
                  <ArrowRight className="ml-2 inline h-5 w-5" />
                </button>
              </Link>
              <Link to="/contato">
                <button className="btn-hero-secondary">
                  Pedir Orçamento
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Chevron Pattern Overlay */}
        <div className="chevron-pattern absolute bottom-0 left-0 right-0 h-24 opacity-30" />
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-muted-foreground">
              Soluções de transporte com engenharia de precisão
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/produtos">
              <Button size="lg" className="btn-hero">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-steel/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl">
              Tecnologia & Qualidade
            </h2>
            <p className="text-lg text-muted-foreground">
              Inovação em cada etapa do processo produtivo
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-steel/20 bg-card p-6 transition-all hover:border-rodotec-blue/40 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rodotec-blue/10 text-rodotec-blue transition-colors group-hover:bg-rodotec-blue group-hover:text-white">
                  <tech.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
                  {tech.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-steel/20 bg-card p-8 text-center">
              <div className="mb-2 font-heading text-5xl font-bold text-rodotec-blue">
                -40%
              </div>
              <p className="text-muted-foreground">
                Redução média de tara
              </p>
            </div>
            <div className="rounded-2xl border border-steel/20 bg-card p-8 text-center">
              <div className="mb-2 font-heading text-5xl font-bold text-tech-gold">
                15+
              </div>
              <p className="text-muted-foreground">
                Anos de experiência
              </p>
            </div>
            <div className="rounded-2xl border border-steel/20 bg-card p-8 text-center">
              <div className="mb-2 font-heading text-5xl font-bold text-rodotec-blue">
                3 anos
              </div>
              <p className="text-muted-foreground">
                Garantia estendida
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-navy py-20">
        <div className="chevron-pattern absolute inset-0 opacity-10" />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">
            Encontre um Distribuidor
          </h2>
          <p className="mb-8 text-xl text-white/80">
            Mais de 50 pontos de venda em todo o Brasil
          </p>
          <Link to="/distribuidores">
            <Button size="lg" className="btn-hero">
              Ver Mapa de Distribuidores
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
