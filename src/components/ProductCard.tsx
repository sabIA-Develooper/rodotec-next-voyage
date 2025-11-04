import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  title: string;
  image: string;
  features: string[];
  badge?: string;
  link: string;
}

const ProductCard = ({ title, image, features, badge, link }: ProductCardProps) => {
  return (
    <Card className="card-glow group overflow-hidden rounded-2xl border-steel/30 bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge && (
          <Badge className="absolute right-4 top-4 bg-tech-gold text-navy">
            {badge}
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="mb-4 font-heading text-xl font-bold text-foreground">
          {title}
        </h3>
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-muted-foreground">
              <span className="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rodotec-blue" />
              {feature}
            </li>
          ))}
        </ul>
        <Link to={link}>
          <Button variant="ghost" className="group/btn w-full justify-between text-rodotec-blue hover:bg-rodotec-blue/10">
            Ver detalhes
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
