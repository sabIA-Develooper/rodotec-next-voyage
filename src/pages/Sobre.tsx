import { MapPin, Award, Shield, Users } from 'lucide-react';
import Header from '@/components/Header';
import { ImprovedFooter } from '@/components/ImprovedFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

export default function Sobre() {
  const milestones = [
    { year: '1985', title: 'Fundação', description: 'Início das operações em São Paulo' },
    { year: '1995', title: 'Expansão', description: 'Abertura de nova unidade produtiva' },
    { year: '2005', title: 'Certificação ISO', description: 'Conquista da certificação ISO 9001' },
    { year: '2015', title: 'Internacionalização', description: 'Início das exportações para América Latina' },
    { year: '2024', title: 'Inovação', description: 'Implementação de processos Industry 4.0' },
  ];

  const units = [
    {
      name: 'Matriz São Paulo',
      address: 'Av. Industrial, 1000 - São Paulo, SP',
      phone: '(11) 4002-5000',
    },
    {
      name: 'Unidade Minas Gerais',
      address: 'Rod. BR-381, km 445 - Betim, MG',
      phone: '(31) 3200-4000',
    },
  ];

  const certifications = [
    { name: 'ISO 9001:2015', description: 'Gestão da Qualidade' },
    { name: 'ISO 14001:2015', description: 'Gestão Ambiental' },
    { name: 'ISO 45001:2018', description: 'Saúde e Segurança' },
    { name: 'INMETRO', description: 'Certificação de Produtos' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sobre a Rodotec
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Há quase 40 anos transformando aço em soluções de transporte rodoviário, 
              combinando tradição, inovação e compromisso com a excelência.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Quem Somos</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                A Rodotec é referência nacional na fabricação de implementos rodoviários, 
                carrocerias e reboques de alta performance. Fundada em 1985, construímos 
                nossa reputação sobre pilares sólidos: qualidade, inovação e confiabilidade.
              </p>
              <p>
                Nossa missão é fornecer soluções que aumentem a produtividade e segurança 
                do transporte de cargas, superando as expectativas de nossos clientes através 
                de produtos duráveis e tecnicamente superiores.
              </p>
              <p>
                Com duas unidades produtivas estrategicamente localizadas e uma rede de 
                distribuidores em todo território nacional, levamos qualidade Rodotec 
                para todos os cantos do Brasil.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">38+</div>
                <p className="text-sm text-muted-foreground">Anos de experiência</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <p className="text-sm text-muted-foreground">Produtos entregues</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">2</div>
                <p className="text-sm text-muted-foreground">Unidades produtivas</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <p className="text-sm text-muted-foreground">Colaboradores</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Timeline */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Nossa História</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="flex-1 w-0.5 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="text-lg font-semibold text-foreground">{milestone.year}</div>
                  <div className="text-xl font-bold text-foreground mt-1">{milestone.title}</div>
                  <p className="text-muted-foreground mt-2">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Units */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Nossas Unidades</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {units.map((unit, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">{unit.name}</h3>
                <p className="text-muted-foreground mb-2">{unit.address}</p>
                <p className="text-foreground font-medium">{unit.phone}</p>
                <Link to="/distribuidores">
                  <Button variant="outline" className="mt-4 w-full">
                    Ver no Mapa
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Certifications */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <Award className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Qualidade & Certificações</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nosso compromisso com a excelência é reconhecido pelas principais certificações 
            nacionais e internacionais.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-2">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-12 text-center max-w-4xl mx-auto">
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Fale com um Especialista</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nossa equipe está pronta para atender suas necessidades e apresentar as melhores 
            soluções em implementos rodoviários.
          </p>
          <Link to="/contato">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Entre em Contato
            </Button>
          </Link>
        </div>
      </section>

      <ImprovedFooter />
    </div>
  );
}
