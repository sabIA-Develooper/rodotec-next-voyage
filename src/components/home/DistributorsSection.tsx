import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const DistributorsSection = () => {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Map Background Placeholder - In a real project, use a real map image or component */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.5" />
          {/* Abstract map dots */}
          <circle cx="20" cy="30" r="1" fill="currentColor" />
          <circle cx="50" cy="50" r="1" fill="currentColor" />
          <circle cx="80" cy="20" r="1" fill="currentColor" />
          <circle cx="30" cy="70" r="1" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-background/80 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center shadow-2xl">
          <MapPin className="h-12 w-12 text-brand mx-auto mb-6" />

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Encontre um Distribuidor Rodotec
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Estamos presentes em todo o território nacional. Localize o representante mais próximo e agende uma visita.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/distribuidores">
              <Button size="lg" className="bg-brand hover:bg-brand-600 text-white px-8 py-6 text-lg">
                Ver Mapa de Distribuidores
              </Button>
            </Link>
            <a href="tel:+550800000000">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                <Phone className="mr-2 h-5 w-5" />
                0800 123 4567
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
