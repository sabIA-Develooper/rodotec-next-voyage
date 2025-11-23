import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CtaSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-700 to-brand-600" />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
                <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    PRONTO PARA EVOLUIR SUA FROTA?
                </h2>
                <p className="text-xl md:text-2xl text-brand-100 mb-10 max-w-3xl mx-auto">
                    Solicite um orçamento personalizado hoje mesmo e descubra o impacto da tecnologia Rodotec nos seus resultados.
                </p>

                <Link to="/contato">
                    <Button size="lg" className="bg-white text-brand-700 hover:bg-gray-100 text-lg px-10 py-8 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        SOLICITAR ORÇAMENTO
                        <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                </Link>
            </div>
        </section>
    );
};
