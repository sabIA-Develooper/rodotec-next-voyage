import { Star } from "lucide-react";

export const StatsSection = () => {
    return (
        <section className="py-20 bg-surface border-y border-border relative">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-border">

                    <div className="text-center px-4 py-4">
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                            2000<span className="text-brand">+</span>
                        </div>
                        <div className="text-lg text-muted-foreground font-medium uppercase tracking-wide">
                            Frotas Atendidas
                        </div>
                    </div>

                    <div className="text-center px-4 py-4">
                        <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                            50<span className="text-brand">+</span>
                        </div>
                        <div className="text-lg text-muted-foreground font-medium uppercase tracking-wide">
                            Pontos de Distribuição
                        </div>
                    </div>

                    <div className="text-center px-4 py-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">4.9</span>
                            <div className="flex flex-col items-start">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground mt-1">500+ Reviews</span>
                            </div>
                        </div>
                        <div className="text-lg text-muted-foreground font-medium uppercase tracking-wide">
                            Satisfação do Cliente
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
